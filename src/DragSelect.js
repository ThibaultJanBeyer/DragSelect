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
  Area,
  Interaction,
  PubSub,
  SelectableSet,
  SelectedSet,
  Selection,
  Selector,
  SelectorArea,
} from './modules'
import { PointerStore, ScrollStore } from './stores'
import { toArray, vect2 } from './methods'

// Setup
//////////////////////////////////////////////////////////////////////////////////////

class DragSelect {
  /**
   * @class DragSelect
   * @constructor DragSelect
   * @param {Settings} settings
   */
  constructor({
    area = document,
    selectables = [],
    autoScrollSpeed = 50,
    zoom = 1,
    customStyles = false,
    multiSelectMode = false,
    multiSelectToggling = true,
    multiSelectKeys = ['ctrlKey', 'shiftKey', 'metaKey'],
    selector = undefined,
    hoverClass = 'ds-hover',
    selectableClass = 'ds-selectable',
    selectedClass = 'ds-selected',
    selectorClass = 'ds-selector',
    selectorAreaClass = 'ds-selector-area',
    callback,
    onDragMove,
    onDragStartBegin,
    onDragStart,
    onElementSelect,
    onElementUnselect,
  }) {
    // Pub-Sub
    this.PubSub = new PubSub()
    this.subscribe = this.PubSub.subscribe
    this.unsubscribe = this.PubSub.unsubscribe
    this.publish = this.PubSub.publish
    this._callbacksTemp({
      callback,
      onDragMove,
      onDragStart,
      onDragStartBegin,
      onElementSelect,
      onElementUnselect,
    })

    // stores
    this.stores = {
      PointerStore: new PointerStore({
        DS: this,
        multiSelectMode,
        multiSelectKeys,
      }),
      ScrollStore: new ScrollStore({ DS: this, areaElement: area, zoom }),
    }

    // Area
    this.Area = new Area({ area, PS: this.PubSub, zoom })

    // Selector
    this.Selector = new Selector({
      DS: this,
      selector,
      selectorClass,
      customStyles,
    })

    // SelectorArea
    this.SelectorArea = new SelectorArea({
      DS: this,
      selectorAreaClass,
      autoScrollSpeed,
    })

    // Selectables
    this.SelectableSet = new SelectableSet({
      elements: selectables,
      DS: this,
      className: selectableClass,
      hoverClassName: hoverClass,
    })

    // Selected
    this.SelectedSet = new SelectedSet({
      DS: this,
      className: selectedClass,
    })

    // Selection
    this.Selection = new Selection({
      DS: this,
      hoverClassName: hoverClass,
      multiSelectToggling,
    })

    // Interaction
    this.Interaction = new Interaction({ areaElement: area, DS: this })

    // Subscriber Aliases
    this.subscribe('Selected:added', ({ items, item }) =>
      this.publish('elementselect', { items, item })
    )
    this.subscribe('Selected:removed', ({ items, item }) =>
      this.publish('elementunselect', { items, item })
    )
    this.subscribe('PointerStore:updated', ({ event }) =>
      this.publish('dragmove', {
        items: this.getSelection(),
        event,
      })
    )
    this.subscribe('Area:scroll', ({ directions }) =>
      this.publish('autoscroll', {
        data: directions,
      })
    )
    this.subscribe('Interaction:start', ({ event }) =>
      this.publish('dragstart', {
        items: this.getSelection(),
        event,
      })
    )
    this.subscribe('Interaction:end', ({ event }) =>
      this.publish('callback', { items: this.getSelection(), event })
    )

    this.start()
  }

  /**
   * Initializes the functionality. Automatically triggered when created.
   * Also, reset the functionality after a teardown
   */
  start = () => this.Interaction.init()

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
      warnMessage('onDragStartBegin', 'dragstart')
      this.subscribe('dragstart', ({ items, item, event }) =>
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

  // Useful methods for the user
  //////////////////////////////////////////////////////////////////////////////////////
  /**
   * Complete function teardown
   * Will teardown/stop the whole functionality
   * @param {boolean} [remove=true] - if elements should be removed.
   * @param {boolean} [fromSelection=true] - if elements should also be added/removed to the selection.
   * @param {boolean} [withCallback] - if elements should also be added/removed to the selection.
   */
  stop(remove = true, fromSelection = true, withCallback) {
    if (withCallback) this.publish('callback', { items: this.getSelection() })

    this.Interaction.stop()
    this.Selector.stop()
    this.Area.stop()

    if (remove) this.SelectableSet.clear()
    if (fromSelection) this.SelectedSet.clear()
  }
  /**
   * Returns the current selected nodes
   * @return {DSElements}
   */
  getSelection = () => this.SelectedSet.elements
  /**
   * Adds several elements to the selection list also adds the specific classes and take into account all calculations.
   * Does not clear the selection, in contrary to .setSelection. Can add multiple elements at once
   * @param {DSInputElements} elements one or multiple elements
   * @param {boolean} [triggerCallback] - if callback should be called
   * @param {boolean} [dontAddToSelectables] - if element should not be added to the list of selectable elements
   * @return {DSElements} all selected elements
   */
  addSelection(elements, triggerCallback, dontAddToSelectables) {
    this.SelectedSet.addAll(toArray(elements))
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
    this.SelectedSet.deleteAll(toArray(elements))
    if (removeFromSelectables) this.removeSelectables(elements)
    if (triggerCallback)
      this.PubSub.publish('callback', { items: this.getSelection() })
    return this.getSelection()
  }
  /**
   * Toggles specific elements from the selection:
   * If element is not in selection it will be added, if it is already selected, it will be removed.
   * Multiple elements can be given at once.
   * @param {DSInputElements} elements one or multiple elements
   * @param {boolean} [triggerCallback] - if callback should be called
   * @param {boolean} [alsoSelectables] - if element should not be added/removed to the list of selectable elements accordingly
   * @return {DSElements} all selected elements
   */
  toggleSelection(elements, triggerCallback, alsoSelectables) {
    toArray(elements).forEach((el) =>
      this.SelectedSet.has(el)
        ? this.removeSelection(elements, triggerCallback, alsoSelectables)
        : this.addSelection(elements, triggerCallback, alsoSelectables)
    )
    if (triggerCallback)
      this.PubSub.publish('callback', { items: this.getSelection() })
    return this.getSelection()
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
    return this.getSelection()
  }
  /**
   * Unselect / Deselect all current selected Nodes
   * @param {boolean} [triggerCallback] - if callback should be called
   * @return {DSElements} this.selected, should be empty
   */
  clearSelection(triggerCallback) {
    this.SelectedSet.clear()
    if (triggerCallback)
      this.PubSub.publish('callback', { items: this.getSelection() })
    return this.getSelection()
  }
  /**
   * Add elements that can be selected. No node is added twice
   * @param {DSInputElements} elements dom element(s)
   * @param {boolean} [addToSelection] if elements should also be added to current selection
   * @return {DSInputElements} the added element(s)
   */
  addSelectables(elements, addToSelection) {
    const els = toArray(elements)
    this.SelectableSet.addAll(els)
    if (addToSelection) this.SelectedSet.addAll(els)
    return elements
  }
  /**
   * Gets all nodes that can potentially be selected
   * @return {DSElements} this.selectables
   */
  getSelectables = () => this.SelectableSet.elements
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
    this.removeSelectables(elements, removeFromSelection)
    return this.addSelectables(elements, addToSelection)
  }
  /**
   * Remove elements from the elements that can be selected.
   * @param {DSInputElements} elements – dom element(s)
   * @param {boolean} [removeFromSelection] if elements should also be removed from current selection
   * @return {DSInputElements} the removed element(s)
   */
  removeSelectables(elements, removeFromSelection) {
    this.SelectedSet.clear()
    if (removeFromSelection) this.SelectedSet.clear()
    return elements
  }
  /** The starting/initial position of the cursor/selector @return {Vect2} */
  getInitialCursorPosition = () => this.stores.PointerStore.initialVal
  /** The last seen position of the cursor/selector @return {Vect2} */
  getCurrentCursorPosition = () => this.stores.PointerStore.currentVal
  /** The previous position of the cursor/selector @return {Vect2} */
  getPreviousCursorPosition = () => this.stores.PointerStore.lastVal
  /** Whether the multi-selection key was pressed @return {boolean} */
  isMultiSelect = () => this.stores.PointerStore.isMultiSelect
  /**
   * Returns the cursor position difference between start and now
   * If usePreviousCursorDifference is passed,
   * it will output the cursor position difference between the previous selection and now
   * @param {boolean} [usePreviousCursorDifference]
   * @return {Vect2}
   */
  getCursorPositionDifference(usePreviousCursorDifference) {
    var posA = this.getCurrentCursorPosition()
    var posB = usePreviousCursorDifference
      ? this.getPreviousCursorPosition()
      : this.getInitialCursorPosition()
    return vect2.calc(posA, '-', posB)
  }
}

export default DragSelect
