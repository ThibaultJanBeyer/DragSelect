// @ts-check
/* 
    ____                   _____      __          __ 
   / __ \_________ _____ _/ ___/___  / /__  _____/ /_
  / / / / ___/ __ `/ __ `/\__ \/ _ \/ / _ \/ ___/ __/
 / /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_  
/_____/_/   \__,_/\__, //____/\___/_/\___/\___/\__/  
                 /____/                              

 {*} {*} STAR THIS PLUGIN ON GITHUB {*} {*}

 https://github.com/ThibaultJanBeyer/DragSelect
 Please give it a like, this is what makes me happy :-)
 Thank You

 {*} {*} STAR THIS PLUGIN ON GITHUB {*} {*}

 ******************************************
 ********* The MIT License (MIT) **********
 ******************************************
 Copyright (c) 2017 ThibaultJanBeyer
 web: http://www.dragselect.com/
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
  Drag,
  DropZones,
  Interaction,
  PubSub,
  SelectableSet,
  SelectedSet,
  Selection,
  Selector,
  SelectorArea,
} from './modules'
import { PointerStore, ScrollStore, KeyStore, SettingsStore } from './stores'
import { toArray, subscriberAliases, isCollision } from './methods'

// Setup
/// ///////////////////////////////////////////////////////////////////////////////////

class DragSelect {
  /**
   * used to skip all current Selection and dragNdrop functionality
   * @type {boolean}
   */
  continue = false

  /**
   * @class DragSelect
   * @constructor DragSelect
   * @param {Settings} settings
   */
  constructor(settings) {
    this.PubSub = new PubSub({ DS: this })
    this.subscribe = this.PubSub.subscribe
    this.unsubscribe = this.PubSub.unsubscribe
    this.publish = this.PubSub.publish

    this.stores = /** @type {{ SettingsStore:SettingsStore, PointerStore:PointerStore, ScrollStore:ScrollStore, KeyStore:KeyStore }} */ ({})
    this.stores.SettingsStore = new SettingsStore({ DS: this, settings })
    this.stores.PointerStore = new PointerStore({ DS: this })
    this.stores.ScrollStore = new ScrollStore({ DS: this })
    this.stores.KeyStore = new KeyStore({ DS: this })

    this.Area = new Area({ DS: this })
    this.Selector = new Selector({ DS: this })
    this.SelectorArea = new SelectorArea({ DS: this })

    this.SelectableSet = new SelectableSet({ DS: this })
    this.SelectedSet = new SelectedSet({ DS: this })
    this.Selection = new Selection({ DS: this })

    this.Drag = new Drag({ DS: this })

    this.DropZones = new DropZones({ DS: this })

    this.Interaction = new Interaction({ DS: this })

    // Subscriber Aliases
    subscriberAliases({
      subscribe: this.subscribe,
      publish: this.publish,
      SelectedSet: this.SelectedSet,
      Interaction: this.Interaction,
      DropZones: this.DropZones,
    })

    this.subscribe('Interaction:end', () => (this.continue = false))

    this.start()
  }

  // Useful methods for the user
  /// ///////////////////////////////////////////////////////////////////////////////////
  /**
   * Initializes the functionality. Automatically triggered when created.
   * Also, reset the functionality after a teardown
   */
  start = () => {
    this.stopped = false
    this.Interaction.init()
  }

  /**
   * Complete function teardown
   * Will teardown/stop the whole functionality
   * @param {boolean} [remove] - if elements should be removed.
   * @param {boolean} [fromSelection] - if elements should also be added/removed to the selection.
   * @param {boolean} [withCallback] - if elements should also be added/removed to the selection.
   */
  stop(remove = true, fromSelection = true, withCallback = false) {
    if (withCallback) this.publish('callback', { items: this.getSelection() })

    this.Interaction.stop()
    this.Area.stop()
    this.Drag.stop()
    this.Selector.stop()
    this.SelectorArea.stop(remove)
    this.stores.KeyStore.stop()
    this.stores.PointerStore.stop()
    this.stores.ScrollStore.stop()

    if (remove) this.SelectableSet.clear()
    if (fromSelection) this.SelectedSet.clear()

    this.stopped = true
  }

  /**
   * Utility to override DragSelect internal functionality:
   * Break will skip the selection or dragging functionality (until after the callback) but let everything continue to run.
   * Useful utility to write your own functionality/move/dragNdrop based on DragSelect pointer positions.
   */
  break = () => (this.continue = true)

  /**
   * Update any setting dynamically
   * @param {Settings} settings
   * @return {void}
   */
  setSettings = (settings) => this.stores.SettingsStore.update({ settings })

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
  addSelection(
    elements,
    triggerCallback = false,
    dontAddToSelectables = false
  ) {
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
  removeSelection(
    elements,
    triggerCallback = false,
    removeFromSelectables = false
  ) {
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
   * @param {boolean} [removeFromSelectables] - if element should not be added/removed to the list of selectable elements accordingly
   * @return {DSElements} all selected elements
   */
  toggleSelection(
    elements,
    triggerCallback = false,
    removeFromSelectables = false
  ) {
    toArray(elements).forEach((el) =>
      this.SelectedSet.has(el)
        ? this.removeSelection(elements, triggerCallback, removeFromSelectables)
        : this.addSelection(elements, triggerCallback, removeFromSelectables)
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
  setSelection(
    elements,
    triggerCallback = false,
    dontAddToSelectables = false
  ) {
    this.clearSelection()
    this.addSelection(elements, triggerCallback, dontAddToSelectables)
    return this.getSelection()
  }

  /**
   * Unselect / Deselect all current selected Nodes
   * @param {boolean} [triggerCallback] - if callback should be called
   * @return {DSElements} this.selected, should be empty
   */
  clearSelection(triggerCallback = false) {
    this.SelectedSet.clear()
    if (triggerCallback)
      this.PubSub.publish('callback', { items: this.getSelection() })
    return this.getSelection()
  }

  /**
   * Add elements that can be selected. No node is added twice
   * @param {DSInputElements} elements dom element(s)
   * @param {boolean} [addToSelection] if elements should also be added to current selection
   * @param {boolean} [triggerCallback] - if callback should be called
   * @return {DSInputElements} the added element(s)
   */
  addSelectables(elements, addToSelection, triggerCallback) {
    const els = toArray(elements)
    this.SelectableSet.addAll(els)
    if (addToSelection) this.SelectedSet.addAll(els)
    if (triggerCallback)
      this.PubSub.publish('callback', { items: this.getSelection() })
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
  setSelectables(
    elements,
    removeFromSelection = false,
    addToSelection = false
  ) {
    console.warn(
      '[DragSelect] DEPRECATION ".setSelectables" is deprecated and will be removed soon. Please use "ds.setSettings({ selectables: << new dom elements >> })" instead (see docs)'
    )
    this.removeSelectables(elements, removeFromSelection)
    return this.addSelectables(elements, addToSelection)
  }

  /**
   * Remove elements from the elements that can be selected.
   * @param {DSInputElements} elements – dom element(s)
   * @param {boolean} [removeFromSelection] if elements should also be removed from current selection
   * @param {boolean} [triggerCallback] - if callback should be called
   * @return {DSInputElements} the removed element(s)
   */
  removeSelectables(elements, removeFromSelection, triggerCallback) {
    this.SelectableSet.deleteAll(toArray(elements))
    if (removeFromSelection) this.removeSelection(elements)
    if (triggerCallback)
      this.PubSub.publish('callback', { items: this.getSelection() })
    return elements
  }

  /** The starting/initial position of the cursor/selector @return {Vect2} */
  getInitialCursorPosition = () => this.stores.PointerStore.initialVal

  /** The last seen position of the cursor/selector @return {Vect2} */
  getCurrentCursorPosition = () => this.stores.PointerStore.currentVal

  /** The previous position of the cursor/selector @return {Vect2} */
  getPreviousCursorPosition = () => this.stores.PointerStore.lastVal

  /** The starting/initial position of the cursor/selector @return {Vect2} */
  getInitialCursorPositionArea = () => this.stores.PointerStore.initialValArea

  /** The last seen position of the cursor/selector @return {Vect2} */
  getCurrentCursorPositionArea = () => this.stores.PointerStore.currentValArea

  /** The previous position of the cursor/selector @return {Vect2} */
  getPreviousCursorPositionArea = () => this.stores.PointerStore.lastValArea

  /**
   * Whether the multi-selection key was pressed
   * @param {DSEvent|KeyboardEvent} [event]
   * @return {boolean}
   */
  isMultiSelect = (event) => this.stores.KeyStore.isMultiSelectKeyPressed(event)

  /**
   * Whether the user is currently drag n dropping elements (instead of selection)
   * @return {boolean}
   */
  isDragging = () => this.Interaction.isDragging

  /**
   * Returns first DropsZone under coordinates,
   * if no coordinated provided current pointer coordinates are used
   * @param {Vect2} [coordinates]
   * @returns {DSDropZone | undefined}
   */
  getZoneByCoordinates = (coordinates) =>
    this.DropZones.getTarget(coordinates)?.toObject()

  /**
   * Returns itemsDropped into zone by zone id
   * @param {string} zoneId
   * @returns {DSElements|void}
   */
  getItemsDroppedByZoneId = (zoneId) =>
    this.DropZones.getItemsDroppedById(zoneId)

  /**
   * Returns itemsInside by zone id
   * @param {string} zoneId
   * @param {boolean} addClasses whether or not to add/remove the "inside" classes to the items
   * @returns {DSElements|void}
   */
  getItemsInsideByZoneId = (zoneId, addClasses) =>
    this.DropZones.getItemsInsideById(zoneId, addClasses)
}

DragSelect.isCollision = isCollision

export default DragSelect
