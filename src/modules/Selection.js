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

    /** @type {any} */
    const elRects = SelectableSet.rects

    const select = []
    const unselect = []

    for(const [element, rect] of elRects) {
      if (!SelectorArea.isInside(element, rect)) continue
      if (isCollision(rect, Selector.rect, this.Settings.selectionThreshold)) select.push(element)
      else unselect.push(element)
    }

    const multiSelectionToggle =
      (this.DS.stores.KeyStore.isMultiSelectKeyPressed(event)) &&
      this.Settings.multiSelectToggling

    if (this.DS.continue) return
    select.forEach((element) =>
      handleSelection({
        element,
        force,
        multiSelectionToggle,
        SelectedSet: this.DS.SelectedSet,
        hoverClassName: this.Settings.hoverClass,
      })
    )
    unselect.forEach((element) =>
      handleUnSelection({
        element,
        force,
        SelectedSet: this.DS.SelectedSet,
        hoverClassName: this.Settings.hoverClass,
        PrevSelectedSet: this._prevSelectedSet,
      })
    )
  }
}
