// v 2.0.0
// @ts-check
/* 
    ____                   _____      __          __ 
   / __ \_________ _____ _/ ___/___  / /__  _____/ /_
  / / / / ___/ __ `/ __ `/\__ \/ _ \/ / _ \/ ___/ __/
 / /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_  
/_____/_/   \__,_/\__, //____/\___/_/\___/\___/\__/  
                 /____/                              

 {*} {*} STAR THIS PLUGIN ON GITHUB: {*} {*}

 https://github.com/ThibaultJanBeyer/DragSelect
 Please give it a like, this is what makes me happy :-)
 Thank You

 {*} {*} STAR THIS PLUGIN ON GITHUB: {*} {*}

 ******************************************
 ********* The MIT License (MIT) **********
 ******************************************
 Copyright (c) 2017 ThibaultJanBeyer
 web: http://www.thibaultjanbeyer.com/
 github: https://github.com/ThibaultJanBeyer/DragSelect
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 --- Notes ---
 Checking types using JS-Docs inspired by this post:
 https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76
 ---
*/

import './types'
import {
  _autoScroll,
  _createSelector,
  _getCursorPos,
  _getSelectorPosition,
  _handleArea,
  _isCursorNearEdges,
  _isElementTouching,
  _isInArea,
  _isMultiSelectKeyPressed,
  _isSelectorAreaClick,
  _scroll,
  _selectorArea,
  _toArray,
  _updatePos,
  _zoomedScroll,
  PubSub,
} from './modules'

// Setup
//////////////////////////////////////////////////////////////////////////////////////

class DragSelect {
  /** @type {boolean} **/
  _multiSelectKeyPressed = false
  /** @type {{x: number, y: number}} */
  _initialCursorPos = { x: 0, y: 0 }
  /** @type {{x: number, y: number}} */
  _newCursorPos = { x: 0, y: 0 }
  /** @type {{x: number, y: number}} */
  _previousCursorPos = { x: 0, y: 0 }
  /** @type {{x: number, y: number}} */
  _initialScroll = { x: 0, y: 0 }
  /** @type {Array.<(SVGElement|HTMLElement)>} */
  _selected = []
  /** @type {Array.<(SVGElement|HTMLElement)>} */
  _prevSelected = [] // memory to fix #9
  /** @type {number|null} */
  _autoScrollInterval = null

  /**
   * @class DragSelect
   * @constructor DragSelect
   * @param {Settings} settings
   */
  constructor({
    area = document,
    autoScrollSpeed = 1,
    customStyles = false,
    hoverClass = 'ds-hover',
    multiSelectKeys = ['ctrlKey', 'shiftKey', 'metaKey'],
    multiSelectMode = false,
    selectableClass = 'ds-selectable',
    selectables = [],
    selectedClass = 'ds-selected',
    selector = undefined,
    selectorClass = 'ds-selector',
    selectorAreaClass = 'ds-selector-area',
    zoom = 1,
    callback,
    onDragMove,
    onDragStart,
    onDragStartBegin,
    onElementSelect,
    onElementUnselect,
  }) {
    this.selectedClass = selectedClass
    this.hoverClass = hoverClass
    this.selectorClass = selectorClass
    this.selectableClass = selectableClass
    this.selectables = []
    this._initialSelectables = _toArray(selectables)
    this.multiSelectKeys = multiSelectKeys
    this.multiSelectMode = multiSelectMode
    this.autoScrollSpeed = autoScrollSpeed === 0 ? 0 : autoScrollSpeed
    this.area = _handleArea(area)
    this.customStyles = customStyles
    this.zoom = zoom

    this._setupPubSub()
    this._callbacksTemp({
      callback,
      onDragMove,
      onDragStart,
      onDragStartBegin,
      onElementSelect,
      onElementUnselect,
    })

    // Selector
    this.selector = selector || _createSelector(this.customStyles)
    this.selector.classList.add(this.selectorClass)

    this.selectorArea = _selectorArea.create(selectorAreaClass)
    _selectorArea.updatePosition(this.selectorArea, this.area)

    this.selectorArea.appendChild(this.selector)
    document.body.appendChild(this.selectorArea)

    this.start()
  }

  _setupPubSub() {
    this.PubSub = new PubSub()
    this.subscribe = this.PubSub.subscribe.bind(this.PubSub)
    this.unsubscribe = this.PubSub.unsubscribe.bind(this.PubSub)
    this.publish = this.PubSub.publish.bind(this.PubSub)
  }

  // @TODO: remove after deprecation
  _callbacksTemp({
    callback,
    onDragMove,
    onDragStart,
    onDragStartBegin,
    onElementSelect,
    onElementUnselect,
  }) {
    const warnMessage = (name, newName) =>
      console.warn(
        `[DragSelect] ${name} is being deprecated. Use DragSelect.subscribe("${newName}", (callbackObject) => {}) instead. See docs for more info`
      )
    if (callback) {
      warnMessage('callback', 'callback')
      this.subscribe('callback', ({ items, item, event }) =>
        callback(items, event)
      )
    }
    if (onDragMove) {
      warnMessage('onDragMove', 'dragmove')
      this.subscribe('dragmove', ({ items, item, event }) => onDragMove(event))
    }
    if (onDragStart) {
      warnMessage('onDragStart', 'dragstart')
      this.subscribe('dragstart', ({ items, item, event }) =>
        onDragStart(event)
      )
    }
    if (onDragStartBegin) {
      warnMessage('onDragStartBegin', 'dragstartbegin')
      this.subscribe('dragstartbegin', ({ items, item, event }) =>
        onDragStartBegin(event)
      )
    }
    if (onElementSelect) {
      warnMessage('onElementSelect', 'elementselect')
      this.subscribe('elementselect', ({ items, item, event }) =>
        onElementSelect(item, event)
      )
    }
    if (onElementUnselect) {
      warnMessage('onElementUnselect', 'elementunselect')
      this.subscribe('elementunselect', ({ items, item, event }) =>
        onElementUnselect(item, event)
      )
    }
  }

  /**
   * Add/Remove Selectables also handles css classes and event listeners.
   * @param {DSElements} selectables - selectable elements.
   * @param {boolean} [remove] - if elements should be removed.
   * @param {boolean} [fromSelection] - if elements should also be added/removed to the selection.
   * @private
   */
  _handleSelectables(selectables, remove, fromSelection) {
    for (let index = 0; index < selectables.length; index++) {
      var selectable = selectables[index]
      var indexOf = this.selectables.indexOf(selectable)

      if (indexOf < 0 && !remove) {
        this._addSelectable(selectable, fromSelection)
      } else if (indexOf > -1 && remove) {
        this._removeSelectable(selectable, indexOf, fromSelection)
      }
    }
  }

  /**
   * @param {(HTMLElement|SVGElement)} selectable
   * @param {boolean} toSelection also adds it to the current selection
   * @private
   */
  _addSelectable(selectable, toSelection) {
    selectable.classList.add(this.selectableClass)
    selectable.addEventListener('click', this._onClick)
    this.selectables.push(selectable)

    // also add to current selection
    if (toSelection && this._selected.indexOf(selectable) < 0) {
      selectable.classList.add(this.selectedClass)
      this._selected.push(selectable)
    }
  }

  /**
   * @param {(HTMLElement|SVGElement)} selectable
   * @param {number} indexOf
   * @param {boolean} [fromSelection] also adds it to the current selection
   * @private
   */
  _removeSelectable(selectable, indexOf, fromSelection) {
    selectable.classList.remove(this.hoverClass)
    selectable.classList.remove(this.selectableClass)
    selectable.removeEventListener('click', this._onClick)
    this.selectables.splice(indexOf, 1)

    // also remove from current selection
    if (fromSelection && this._selected.indexOf(selectable) > -1) {
      selectable.classList.remove(this.selectedClass)
      this._selected.splice(this._selected.indexOf(selectable), 1)
    }
  }

  /**
   * @param {MouseEvent} event
   * @private
   */
  _onClick = (event) => this.handleClick(event)

  /**
   * Triggers when a node is actively selected.
   *
   * This might be an "onClick" method but it also triggers when
   * <button> nodes are pressed via the keyboard.
   * Making DragSelect accessible for everyone!
   *
   * @param {MouseEvent} event
   * @private
   */
  handleClick(event) {
    if (this.mouseInteraction) return // fix firefox doubleclick issue
    if (event.button === 2) return // right-clicks

    /** @type {any} */
    const node = event.target
    if (!this.selectables.includes(node)) return

    if (!_isInArea(node, this.area, this.selectorArea)) return

    // fix for multi-selection issue #9
    this._multiSelectKeyPressed = _isMultiSelectKeyPressed(
      this.multiSelectKeys,
      this.multiSelectMode,
      event
    )
    if (this._multiSelectKeyPressed) this._prevSelected = this._selected.slice()
    else this._prevSelected = []

    // actual selection logic
    this.checkIfInsideSelection(true) // reset selection if no multiselectionkeypressed
    this.toggle(node)

    this._end(event)
  }

  // Start
  //////////////////////////////////////////////////////////////////////////////////////

  /**
   * Starts the functionality. Automatically triggered when created.
   * Also, reset the functionality after a teardown
   */
  start() {
    this._handleSelectables(this._initialSelectables)
    this.area.addEventListener('mousedown', this._startUp)
    this.area.addEventListener('touchstart', this._startUp, { passive: false })
    _selectorArea.addObservers(this.selectorArea, this.area)
  }

  /**
   * @param {DSEvent} event - The event object.
   * @private
   */
  _startUp = (event) => this.startUp(event)

  /**
   * Startup when the area is clicked.
   * @param {DSEvent} event - The event object.
   * @private
   */
  startUp(event) {
    // touchmove handler
    if (event.type === 'touchstart')
      // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
      event.preventDefault()

    this.mouseInteraction = true

    // right-clicks
    if (/** @type {*} */ (event).button === 2) return
    if (!_isSelectorAreaClick(this.selectorArea, event)) return

    // callback
    this.PubSub.publish('dragstartbegin', { items: this.getSelection(), event })
    if (this._breaked) return false

    this.selector.style.display = 'block'

    this._multiSelectKeyPressed = _isMultiSelectKeyPressed(
      this.multiSelectKeys,
      this.multiSelectMode,
      event
    )
    if (this._multiSelectKeyPressed) this._prevSelected = this._selected.slice()
    // #9
    else this._prevSelected = [] // #9

    // move element on location
    this._getStartingPositions(event)
    this.checkIfInsideSelection(true)

    this.selector.style.display = 'none' // hidden unless moved, fix for issue #8

    // callback
    this.PubSub.publish('dragstart', { items: this.getSelection(), event })
    if (this._breaked) return false

    // event listeners
    this.area.removeEventListener('mousedown', this._startUp)
    this.area.removeEventListener('touchstart', this._startUp, {
      // @ts-ignore
      passive: false,
    })
    document.addEventListener('mousemove', this._handleMove)
    document.addEventListener('touchmove', this._handleMove, {
      passive: false,
    })
    document.addEventListener('mouseup', this._end)
    document.addEventListener('touchend', this._end)
  }

  /**
   * Grabs the starting position of all needed elements
   * @param {DSEvent} event - The event object.
   * @private
   */
  _getStartingPositions(event) {
    this._initialCursorPos = this._newCursorPos = _getCursorPos(
      this.selectorArea,
      event
    )
    this._initialScroll = _scroll.getCurrent(this.area)

    var selectorPos = {}
    selectorPos.x = this._initialCursorPos.x + this._initialScroll.x
    selectorPos.y = this._initialCursorPos.y + this._initialScroll.y
    selectorPos.w = 0
    selectorPos.h = 0
    _updatePos(this.selector, selectorPos)
  }

  // Movements/Sizing of selection
  //////////////////////////////////////////////////////////////////////////////////////

  /**
   * @param {DSEvent} event - The event object.
   * @private
   */
  _handleMove = (event) => this.handleMove(event)

  /**
   * Handles what happens while the mouse is moved
   * @param {DSEvent} event - The event object.
   * @private
   */
  handleMove(event) {
    this._newCursorPos = _getCursorPos(this.selectorArea, event)

    // callback
    this.PubSub.publish('dragmove', { items: this.getSelection(), event })
    if (this._breaked) return false

    this.selector.style.display = 'block' // hidden unless moved, fix for issue #8

    // move element on location
    this._moveSelection(event)

    // scroll area if area is scroll-able
    this._setScrollState(event)
  }

  _moveSelection(event, zoom) {
    _updatePos(
      this.selector,
      _getSelectorPosition(
        this.selectorArea,
        this.area,
        this._initialScroll,
        this._initialCursorPos,
        zoom,
        event
      )
    )
    this.checkIfInsideSelection(null)
  }

  // Colision detection
  //////////////////////////////////////////////////////////////////////////////////////

  /**
   * Checks if any selectable element is inside selection.
   * @param {boolean} [force] forces through. Handles first clicks and accessibility. Here is user is clicking directly onto some element at start, (contrary to later hovers) we can assume that he really wants to select/deselect that item.
   * @return {boolean}
   */
  checkIfInsideSelection(force) {
    let anyInside = false
    for (let i = 0, il = this.selectables.length; i < il; i++) {
      const selectable = this.selectables[i]

      if (
        _isElementTouching(
          selectable,
          this.selector,
          this.area,
          this.selectorArea
        )
      ) {
        this._handleSelection(selectable, force)
        anyInside = true
      } else {
        this._handleUnselection(selectable, force)
      }
    }
    return anyInside
  }

  /**
   * Logic when an item is selected
   * @param {(HTMLElement|SVGElement)} item selected item.
   * @param {boolean} [force] forces through.
   * @private
   */
  _handleSelection(item, force) {
    if (item.classList.contains(this.hoverClass) && !force) return false

    if (!this._selected.includes(item)) this.select(item)
    else if (this._multiSelectKeyPressed) this.unselect(item)

    item.classList.add(this.hoverClass)
  }

  /**
   * Logic when an item is de-selected
   * @param {(HTMLElement|SVGElement)} item selected item.
   * @param {boolean} [force] forces through.
   * @private
   */
  _handleUnselection(item, force) {
    if (!item.classList.contains(this.hoverClass) && !force) return false

    const inSelection = this._selected.includes(item)
    const inPrevSelection = this._prevSelected.includes(item) // #9

    /**
     * Special algorithm for issue #9.
     * if a multiselectkey is pressed, ds 'remembers' the last selection and reverts
     * to that state if the selection is not kept, to mimic the natural OS behaviour
     * = if item was selected and is not in selection anymore, reselect it
     * = if item was not selected and is not in selection anymore, unselect it
     */
    if (inSelection && !inPrevSelection) this.unselect(item)
    else if (!inSelection && inPrevSelection) this.select(item)

    item.classList.remove(this.hoverClass)
  }

  /**
   * Adds an item to the selection.
   * @param {(HTMLElement|SVGElement)} item selected item.
   * @return {(HTMLElement|SVGElement|false)} item
   */
  select(item) {
    if (this._selected.indexOf(item) > -1) return false

    this._selected.push(item)
    item.classList.add(this.selectedClass)

    this.PubSub.publish('elementselect', { items: this.getSelection(), item })
    if (this._breaked) return false

    return item
  }

  /**
   * Removes an item from the selection.
   * @param {(HTMLElement|SVGElement)} item selected item.
   * @return {(HTMLElement|SVGElement|false)} item
   */
  unselect(item) {
    if (this._selected.indexOf(item) < 0) return false

    this._selected.splice(this._selected.indexOf(item), 1)
    item.classList.remove(this.selectedClass)

    this.PubSub.publish('elementunselect', { items: this.getSelection(), item })
    if (this._breaked) return false

    return item
  }

  /**
   * Adds/Removes an item to the selection.
   * If it is already selected = remove, if not = add.
   * @param {(HTMLElement|SVGElement)} item – item to select.
   * @return {(HTMLElement|SVGElement)} item
   */
  toggle(item) {
    if (this._selected.includes(item)) this.unselect(item)
    else this.select(item)
    return item
  }

  // Autoscroll
  //////////////////////////////////////////////////////////////////////////////////////

  /**
   * Creates an interval that autoscrolls while the cursor is near the edge
   * @param {DSEvent} event – event object.
   * @private
   */
  _setScrollState(event) {
    const edges = _isCursorNearEdges(this.selectorArea, event)

    if (edges.length) {
      if (this._autoScrollInterval)
        window.clearInterval(this._autoScrollInterval)

      this._autoScrollInterval = window.setInterval(() => {
        this._newCursorPos = _getCursorPos(this.selectorArea, event)
        this._moveSelection(event, this.zoom)
        _autoScroll(this.area, edges, this.autoScrollSpeed)
      })
    } else if (!edges.length && this._autoScrollInterval) {
      window.clearInterval(this._autoScrollInterval)
      this._autoScrollInterval = null
    }
  }

  // Ending
  //////////////////////////////////////////////////////////////////////////////////////

  /**
   * Triggered on mouse click release (end of dragging a selection).
   * Calls the callback method & unbind functions.
   * @param {DSEvent} event - The event object.
   * @private
   */
  _end = (event) => this.reset(event, true)

  /**
   * Unbind functions i.e. when mouse click is released
   * @param {Object} [event] - The event object.
   * @param {boolean} [withCallback] - whether or not the callback should be called
   */
  reset(event, withCallback) {
    this._previousCursorPos = _getCursorPos(this.selectorArea, event)
    _zoomedScroll.reset()
    document.removeEventListener('mouseup', this._end)
    document.removeEventListener('touchend', this._end)
    document.removeEventListener('mousemove', this._handleMove)
    document.removeEventListener('touchmove', this._handleMove, {
      // @ts-ignore
      passive: false,
    })
    this.area.addEventListener('mousedown', this._startUp)
    this.area.addEventListener('touchstart', this._startUp, { passive: false })

    if (withCallback)
      this.PubSub.publish('callback', { items: this.getSelection(), event })
    if (this._breaked) return false

    this.selector.style.width = '0'
    this.selector.style.height = '0'
    this.selector.style.display = 'none'

    if (this._autoScrollInterval) {
      window.clearInterval(this._autoScrollInterval)
      this._autoScrollInterval = null
    }

    setTimeout(
      () =>
        // debounce in order "onClick" to work
        (this.mouseInteraction = false),
      100
    )
  }

  /**
   * Function break: used in callbacks to disable the execution of the upcoming code at the specific moment
   * In contrary to stop():
   * - Event listeners, callback calls and calculation will continue working
   * - Selector won’t display and will not select
   */
  break() {
    this._breaked = true
    setTimeout(
      // debounce the break should only break once instantly after call
      () => (this._breaked = false),
      100
    )
  }

  /**
   * Complete function teardown
   * Will teardown/stop the whole functionality
   * @param {boolean} [remove=true] - if elements should be removed.
   * @param {boolean} [fromSelection=true] - if elements should also be added/removed to the selection.
   * @param {boolean} [withCallback] - if elements should also be added/removed to the selection.
   */
  stop(remove = true, fromSelection = true, withCallback) {
    this.reset(false, withCallback)

    _selectorArea.removeObservers()

    this.area.removeEventListener('mousedown', this._startUp)
    this.area.removeEventListener('touchstart', this._startUp, {
      // @ts-ignore
      passive: false,
    })
    document.removeEventListener('mouseup', this._end)
    document.removeEventListener('touchend', this._end)

    this._handleSelectables([...this.selectables], remove, fromSelection)
  }

  // Useful methods for the user
  //////////////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the current selected nodes
   * @return {Array.<(HTMLElement|SVGElement)>}
   */
  getSelection() {
    return [...this._selected]
  }

  /**
   * Adds several elements to the selection list
   * also adds the specific classes and take into account all calculations.
   * Does not clear the selection, in contrary to .setSelection
   * Can add multiple elements at once, in contrary to .select
   * @param {DSInputElements} elements one or multiple elements
   * @param {boolean} [triggerCallback] - if callback should be called
   * @param {boolean} [dontAddToSelectables] - if element should not be added to the list of selectable elements
   * @return {DSElements} all selected elements
   */
  addSelection(elements, triggerCallback, dontAddToSelectables) {
    const nodes = _toArray(elements)

    nodes.forEach((node) => this.select(node))

    if (!dontAddToSelectables) this.addSelectables(elements)

    if (triggerCallback)
      this.PubSub.publish('callback', { items: this.getSelection() })

    return this.getSelection()
  }

  /**
   * Removes specific elements from the selection
   * Multiple elements can be given at once, in contrary to unselect
   * @param {DSInputElements} elements one or multiple elements
   * @param {boolean} [triggerCallback] - if callback should be called
   * @param {boolean} [removeFromSelectables] - if element should be removed from the list of selectable elements
   * @return {DSElements} all selected elements
   */
  removeSelection(elements, triggerCallback, removeFromSelectables) {
    const nodes = _toArray(elements)
    nodes.forEach((node) => this.unselect(node))

    if (removeFromSelectables) {
      this.removeSelectables(elements)
    }
    if (triggerCallback) {
      this.PubSub.publish('callback', { items: this.getSelection() })
    }

    return this.getSelection()
  }

  /**
   * Toggles specific elements from the selection:
   * If element is not in selection it will be added, if it is already selected, it will be removed.
   * Multiple elements can be given at once.
   * @param {DSInputElements} elements one or multiple elements
   * @param {boolean} [triggerCallback] - if callback should be called
   * @param {boolean} [special] - if true, it also removes selected elements from possible selectable elements & don’t add them to selectables if they are not
   * @return {DSElements} all selected elements
   */
  toggleSelection(elements, triggerCallback, special) {
    var nodes = _toArray(elements)

    for (var index = 0, il = nodes.length; index < il; index++) {
      var node = nodes[index]

      if (this._selected.indexOf(node) < 0) {
        this.addSelection(node, triggerCallback, special)
      } else {
        this.removeSelection(node, triggerCallback, special)
      }
    }

    return this._selected
  }

  /**
   * Sets the current selected elements and optionally run the callback
   * By default, adds new elements also to the list of selectables
   * @param {DSInputElements} elements – dom elements
   * @param {boolean} [triggerCallback] - if callback should be called
   * @param {boolean} [dontAddToSelectables] - if element should not be added to the list of selectable elements
   * @return {DSElements}
   */
  setSelection(elements, triggerCallback, dontAddToSelectables) {
    this.clearSelection()
    this.addSelection(elements, triggerCallback, dontAddToSelectables)

    return this._selected
  }

  /**
   * Unselect / Deselect all current selected Nodes
   * @param {boolean} [triggerCallback] - if callback should be called
   * @return {DSElements} this.selected, should be empty
   */
  clearSelection(triggerCallback) {
    const selection = this._selected.slice()
    selection.forEach((element) => this.unselect(element))

    if (triggerCallback)
      this.PubSub.publish('callback', { items: this.getSelection() })

    return this.getSelection()
  }

  /**
   * Add elements that can be selected.
   * The algorithm makes sure that no node is added twice
   * @param {DSInputElements} elements dom element(s)
   * @param {boolean} [addToSelection] if elements should also be added to current selection
   * @return {DSInputElements} the added element(s)
   */
  addSelectables(elements, addToSelection) {
    var nodes = _toArray(elements)
    this._handleSelectables(nodes, false, addToSelection)
    return elements
  }

  /**
   * Gets all nodes that can be selected
   * @return {DSElements} this.selectables
   */
  getSelectables() {
    return this.selectables
  }

  /**
   * Sets all elements that can be selected.
   * Removes all current selectables (& their respective classes).
   * Adds the new set to the selectables set, thus replacing the original set.
   * @param {DSInputElements} elements – dom element(s)
   * @param {boolean} [removeFromSelection] if elements should also be removed from current selection
   * @param {boolean} [addToSelection] if elements should also be added to current selection
   * @return {DSInputElements} elements – the added element(s)
   */
  setSelectables(elements, removeFromSelection, addToSelection) {
    this._handleSelectables(this.getSelectables(), true, removeFromSelection)
    return this.addSelectables(elements, addToSelection)
  }

  /**
   * Remove elements from the elements that can be selected.
   * @param {DSInputElements} elements – dom element(s)
   * @param {boolean} [removeFromSelection] if elements should also be removed from current selection
   * @return {DSInputElements} the removed element(s)
   */
  removeSelectables(elements, removeFromSelection) {
    const nodes = _toArray(elements)
    this._handleSelectables(nodes, true, removeFromSelection)
    return elements
  }

  /**
   * Returns the starting/initial position of the cursor/selector
   * @return {{x:number,y:number}}
   */
  getInitialCursorPosition() {
    return this._initialCursorPos
  }

  /**
   * Returns the last seen position of the cursor/selector
   * @return {{x:number,y:number}}
   */
  getCurrentCursorPosition() {
    return this._newCursorPos
  }

  /**
   * Returns the previous position of the cursor/selector
   * @return {{x:number,y:number}}
   */
  getPreviousCursorPosition() {
    return this._previousCursorPos
  }

  /**
   * Returns the cursor position difference between start and now
   * If usePreviousCursorDifference is passed,
   * it will output the cursor position difference between the previous selection and now
   * @param {boolean} [usePreviousCursorDifference]
   * @return {{x:number,y:number}}
   */
  getCursorPositionDifference(usePreviousCursorDifference) {
    var posA = this.getCurrentCursorPosition()
    var posB = usePreviousCursorDifference
      ? this.getPreviousCursorPosition()
      : this.getInitialCursorPosition()

    return {
      x: posA.x - posB.x,
      y: posA.y - posB.y,
    }
  }
}

export default DragSelect
