// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { isElementTouching } from '../methods'

export default class Selection {
  /** @type {Set} */
  _prevSelected
  /** @type {string} */
  _hoverClassName
  /** @type {boolean} */
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
    this.DS.subscribe('Selectable:click', this._onClick)
    this.DS.subscribe('Interaction:start', this.start)
    this.DS.subscribe('PointerStore:updated', this.update)
    this.DS.subscribe('Area:scroll', this.update)
  }

  /** Stores the previous selection (solves #9) */
  _storePrevious() {
    const {
      stores: { PointerStore },
      SelectedSet,
    } = this.DS

    if (PointerStore.isMultiSelect) this._prevSelected = new Set(SelectedSet)
    else this._prevSelected = new Set()
  }

  /** If an element is clicked (via keyboard) @param {{ event:DSEvent }} p */
  _onClick = ({ event }) => this.handleClick(event)
  /**
   * Triggers when a node is actively selected.
   * This might be an "onClick" method but it also triggers when
   * <button> nodes are pressed via the keyboard.
   * Making DragSelect accessible for everyone!
   * @param {MouseEvent} event
   * @private
   */
  handleClick(event) {
    const {
      stores: { PointerStore },
      SelectorArea,
      SelectableSet,
      SelectedSet,
      publish,
    } = this.DS

    if (event.button === 2) return // right-click
    if (PointerStore.isMouseInteraction) return // fix firefox doubleclick issue

    PointerStore.start(event)

    const node = /** @type {any} */ (event.target)
    if (!SelectableSet.has(node)) return
    if (!SelectorArea.isInside(node)) return

    if (!PointerStore.isMultiSelect) SelectedSet.clear()
    SelectedSet.toggle(node)

    publish('Interaction:end', { event }) // simulate mouse-up (that does not exist on keyboard)
  }

  start = () => {
    this._storePrevious()
    this._checkIfInsideSelection(true)
  }

  update = () => this._checkIfInsideSelection()

  /**
   * Checks if any selectable element is inside selection.
   * @param {boolean} [force]
   * @return {boolean}
   */
  _checkIfInsideSelection = (force) => {
    const { SelectableSet, SelectorArea, Selector } = this.DS

    let anyInside = false
    SelectableSet.forEach((element) => {
      if (
        SelectorArea.isInside(element) &&
        isElementTouching(element, Selector.HTMLNode)
      ) {
        this._handleSelection(element, force)
        anyInside = true
      } else {
        this._handleUnselection(element, force)
      }
    })

    return anyInside
  }

  /**
   * Logic when an element is selected
   * @param {DSElement} element
   * @param {boolean} force
   * @private
   */
  _handleSelection(element, force) {
    const {
      SelectedSet,
      stores: { PointerStore },
    } = this.DS

    if (element.classList.contains(this._hoverClassName) && !force) return false

    if (!SelectedSet.has(element)) SelectedSet.add(element)
    else if (PointerStore.isMultiSelect && this._multiSelectToggling)
      SelectedSet.delete(element)

    element.classList.add(this._hoverClassName)
  }

  /**
   * Logic when an element is de-selected
   * @param {DSElement} element
   * @param {boolean} [force]
   * @private
   */
  _handleUnselection(element, force) {
    const { SelectedSet } = this.DS

    if (!element.classList.contains(this._hoverClassName) && !force)
      return false

    const inSelection = SelectedSet.has(element)
    const inPrevSelection = this._prevSelected.has(element)

    /**
     * Special for issue #9.
     * if a multi-select-key is pressed, ds 'remembers' the last selection and reverts
     * to that state if the selection is not kept, to mimic the natural OS behaviour
     * = if item was selected and is not in selection anymore, reselect it
     * = if item was not selected and is not in selection anymore, unselect it
     */
    if (inSelection && !inPrevSelection) SelectedSet.delete(element)
    else if (!inSelection && inPrevSelection) SelectedSet.add(element)

    element.classList.remove(this._hoverClassName)
  }
}
