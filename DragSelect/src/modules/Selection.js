// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { isCollision, handleSelection, handleUnSelection } from '../methods'

export default class Selection {
  /**
   * @type {Set}
   * @private
   * */
  _prevSelectedSet

  /**
   * @constructor Selection
   * @param {{ DS:DragSelect }} p
   * @ignore
   */
  constructor({ DS }) {
    this.DS = DS
    this.Settings = this.DS.stores.SettingsStore.s
    this.DS.subscribe('Interaction:start', this.start)
    this.DS.subscribe('Interaction:update', this.update)
  }

  /**
   * Stores the previous selection (solves #9)
   * @param {DSEvent} event
   * @private
   * */
  _storePrevious(event) {
    const {
      stores: { KeyStore },
      SelectedSet,
    } = this.DS

    if (KeyStore.isMultiSelectKeyPressed(event))
      this._prevSelectedSet = new Set(SelectedSet)
    else this._prevSelectedSet = new Set()
  }

  /** @param {{event:DSEvent,isDragging:boolean}} event */
  start = ({ event, isDragging }) => {
    if (isDragging) return
    this._storePrevious(event)
    this._handleInsideSelection(true, event)
  }

  update = ({ isDragging }) => {
    if (isDragging || this.DS.continue) return
    this._handleInsideSelection()
  }

  /**
   * Checks if any selectable element is inside selection.
   * @param {boolean} [force]
   * @param {DSEvent} [event]
   * @private
   */
  _handleInsideSelection = (force, event) => {
    const { SelectableSet, SelectorArea, Selector } = this.DS

    const multiSelectionToggle =
      this.DS.stores.KeyStore.isMultiSelectKeyPressed(event) &&
      this.Settings.multiSelectToggling
    const selectionThreshold = this.Settings.selectionThreshold

    /** @type {any} */
    const elRects = SelectableSet.rects
    const selectorRect = Selector.rect

    /** @type {Map<DSElement,DSBoundingRect>} */
    const select = new Map()
    /** @type {Map<DSElement,DSBoundingRect>} */
    const unselect = new Map()

    for (const [element, elementRect] of elRects) {
      if (!SelectorArea.isInside(element, elementRect)) continue
      if (isCollision(elementRect, selectorRect, selectionThreshold))
        select.set(element, elementRect)
      else unselect.set(element, elementRect)
    }

    if (this.DS.continue) return

    const { select: filteredSelect, unselect: filteredUnselect } =
      this.filterSelected({ select, unselect, selectorRect })

    filteredSelect.forEach((_, element) =>
      handleSelection({
        element,
        force,
        multiSelectionToggle,
        SelectedSet: this.DS.SelectedSet,
        hoverClassName: this.Settings.hoverClass,
      })
    )
    filteredUnselect.forEach((_, element) =>
      handleUnSelection({
        element,
        force,
        SelectedSet: this.DS.SelectedSet,
        hoverClassName: this.Settings.hoverClass,
        PrevSelectedSet: this._prevSelectedSet,
      })
    )
  }

  // [PUBLICLY EXPOSED METHODS]

  /**
   * Can be overridden to apply further filtering logic after the items to select are identified but before they actually get selected
   * Is expected to return the select / unselect maps in the same shape as passed in
   * @param {{select:Map<DSElement,DSBoundingRect>, unselect:Map<DSElement,DSBoundingRect>, selectorRect:DSBoundingRect}} obj 
   * @returns {{select:Map<DSElement,DSBoundingRect>, unselect:Map<DSElement,DSBoundingRect>}}
   */
  filterSelected = ({ select, unselect, selectorRect }) => ({ select, unselect })
}
