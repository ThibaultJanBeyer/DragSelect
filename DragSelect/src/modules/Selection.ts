import DragSelect from '../DragSelect'
import PubSub from './PubSub'
import { DSBoundingRect, DSEvent, DSInputElement } from '../types'
import { DSSettings } from '../stores/SettingsStore'
import { handleSelection } from '../methods/handleSelection'
import { handleUnSelection } from '../methods/handleUnSelection'
import { isCollision } from '../methods/isCollision'
import { getSelectionRect } from '../methods/getSelectionRect'

export default class Selection<E extends DSInputElement> {
  private _prevSelectedSet: Set<E> = new Set()
  private _boundingRect?: DSBoundingRect
  private _timeout?: NodeJS.Timeout
  private DS: DragSelect<E>
  private PS: PubSub<E>
  private Settings: DSSettings<E>

  constructor({ DS, PS }: { DS: DragSelect<E>; PS: PubSub<E> }) {
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s
    this.PS.subscribe('Interaction:start', this.start)
    this.PS.subscribe('Interaction:update', this.update)
  }

  /** Stores the previous selection (solves #9) */
  private _storePrevious(event: DSEvent) {
    const {
      stores: { KeyStore },
      SelectedSet,
    } = this.DS

    if (KeyStore.isMultiSelectKeyPressed(event))
      this._prevSelectedSet = new Set(SelectedSet)
    else this._prevSelectedSet = new Set()
  }

  private start = ({
    event,
    isDragging,
  }: {
    event: DSEvent
    isDragging: boolean
  }) => {
    if (isDragging) return
    this._storePrevious(event)
    this._handleInsideSelection(true, event)
  }

  private update = ({ isDragging }: { isDragging?: boolean }) => {
    if (isDragging || this.DS.continue) return
    this._handleInsideSelection()
  }

  /** Checks if any selectable element is inside selection. */
  private _handleInsideSelection = (force?: boolean, event?: DSEvent) => {
    const { SelectableSet, SelectorArea, Selector } = this.DS

    const multiSelectionToggle =
      this.DS.stores.KeyStore.isMultiSelectKeyPressed(event) &&
      this.Settings.multiSelectToggling
    const selectionThreshold = this.Settings.selectionThreshold

    const elRects = SelectableSet.rects
    const selectorRect = Selector.rect

    const select: Map<E, DSBoundingRect> = new Map()
    const unselect: Map<E, DSBoundingRect> = new Map()

    for (const [element, elementRect] of elRects) {
      if (!SelectorArea.isInside(element, elementRect)) continue
      if (isCollision(elementRect, selectorRect, selectionThreshold))
        select.set(element, elementRect)
      else unselect.set(element, elementRect)
    }

    if (this.DS.continue) return

    // [PUBLICLY EXPOSED METHOD]
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

  get boundingRect() {
    if (this._boundingRect) return this._boundingRect
    this._boundingRect = getSelectionRect(this.DS.SelectedSet)

    // since elements can be moved, we need to update the rects every X ms
    if (this._timeout) clearTimeout(this._timeout)
    this._timeout = setTimeout(
      () => (this._boundingRect = undefined),
      this.Settings.refreshMemoryRate
    )

    return this._boundingRect
  }

  ////
  // [PUBLICLY EXPOSED METHODS]

  /**
   * Can be overridden to apply further filtering logic after the items to select are identified but before they actually get selected
   * Is expected to return the select / unselect maps in the same shape as passed in
   */
  public filterSelected = ({
    select,
    unselect,
    selectorRect,
  }: {
    select: Map<E, DSBoundingRect>
    unselect: Map<E, DSBoundingRect>
    selectorRect: DSBoundingRect
  }) => ({ select, unselect })
}
