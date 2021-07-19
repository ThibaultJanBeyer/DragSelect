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
   * @type {string}
   * @private
   * */
  _hoverClassName
  /**
   * @type {boolean}
   * @private
   * */
  _multiSelectToggling

  /**
   * @constructor Selection
   * @param {{ DS:DragSelect, hoverClassName:string, multiSelectToggling:boolean }} p
   * @ignore
   */
  constructor({ DS, hoverClassName, multiSelectToggling }) {
    this._hoverClassName = hoverClassName
    this._multiSelectToggling = multiSelectToggling

    this.DS = DS
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
    const elPosCombo = SelectableSet.elements.map((element) => {
      return [element, element.getBoundingClientRect()]
    })

    const select = []
    const unselect = []

    for (let i = 0, il = elPosCombo.length; i < il; i++) {
      if (!SelectorArea.isInside(elPosCombo[i][0], elPosCombo[i][1])) continue
      if (isCollision(elPosCombo[i][1], Selector.rect))
        select.push(elPosCombo[i][0])
      else unselect.push(elPosCombo[i][0])
    }

    const multiSelectionToggle =
      this.DS.stores.KeyStore.isMultiSelectKeyPressed(event) &&
      this._multiSelectToggling

    select.forEach((element) =>
      handleSelection({
        element,
        force,
        multiSelectionToggle,
        SelectedSet: this.DS.SelectedSet,
        hoverClassName: this._hoverClassName,
      })
    )
    unselect.forEach((element) =>
      handleUnSelection({
        element,
        force,
        SelectedSet: this.DS.SelectedSet,
        hoverClassName: this._hoverClassName,
        PrevSelectedSet: this._prevSelectedSet,
      })
    )
  }
}
