import DragSelect from '../DragSelect'
import PubSub from './PubSub'
import { DSBoundingRect, DSDragKeys, DSInputElement, Vect2 } from '../types'
import { DSSettings } from '../stores/SettingsStore'
import { calcVect, num2vect, vect2rect } from '../methods/vect2'
import { handleKeyboardDragPosDifference } from '../methods/handleKeyboardDragPosDifference'
import { moveElement } from '../methods/moveElement'
import { limitDirection } from '../methods/limitDirection'

export default class Drag<E extends DSInputElement> {
  private _prevCursorPos?: Vect2
  private _prevScrollPos?: Vect2
  private _elements: E[] = []
  private _dragKeys?: DSDragKeys
  private _dragKeysFlat: string[] = []
  private _selectionRect: DSBoundingRect = vect2rect(num2vect(0))
  DS: DragSelect<E>
  PS: PubSub<E>
  Settings: DSSettings<E>

  constructor({ DS, PS }: { DS: DragSelect<E>; PS: PubSub<E> }) {
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s

    this.PS.subscribe('Settings:updated:dragKeys', this.assignDragKeys)
    this.assignDragKeys()

    this.PS.subscribe('Interaction:start', this.start)
    this.PS.subscribe('Interaction:end', this.stop)
    this.PS.subscribe('Interaction:update', this.update)
    this.PS.subscribe('KeyStore:down', this.keyboardDrag)
    this.PS.subscribe('KeyStore:up', this.keyboardEnd)
  }

  private assignDragKeys = () => {
    this._dragKeys = {
      up: this.Settings.dragKeys.up.map((k) => k.toLowerCase()),
      down: this.Settings.dragKeys.down.map((k) => k.toLowerCase()),
      left: this.Settings.dragKeys.left.map((k) => k.toLowerCase()),
      right: this.Settings.dragKeys.right.map((k) => k.toLowerCase()),
    }
    this._dragKeysFlat = [
      ...this._dragKeys.up,
      ...this._dragKeys.down,
      ...this._dragKeys.left,
      ...this._dragKeys.right,
    ]
  }

  private keyboardDrag = ({
    event,
    key,
  }: {
    event: KeyboardEvent
    key: string
  }) => {
    const _key = key.toLowerCase()
    if (
      !this.Settings.keyboardDrag ||
      !this._dragKeysFlat.includes(_key) ||
      !this.DS.SelectedSet.size ||
      !this.Settings.draggability ||
      this.DS.continue
    )
      return

    const publishData = {
      event,
      isDragging: true,
      isDraggingKeyboard: true,
      key,
    }
    this.PS.publish(['Interaction:start:pre', 'Interaction:start'], publishData)

    this._elements = this.DS.getSelection()
    this._selectionRect = this.DS.Selection.boundingRect
    this.handleZIndex(true)

    let posDirection = handleKeyboardDragPosDifference({
      shiftKey: this.DS.stores.KeyStore.currentValues.includes('shift'),
      keyboardDragSpeed: this.Settings.keyboardDragSpeed,
      zoom: this.Settings.zoom,
      key: _key,
      scrollDiff: this._scrollDiff,
      dragKeys: this._dragKeys,
    })

    posDirection = limitDirection({
      direction: posDirection,
      containerRect: this.DS.SelectorArea.rect,
      scrollAmount: this.DS.stores.ScrollStore.scrollAmount,
      selectionRect: this._selectionRect,
    })

    this.moveElements(posDirection)

    this.PS.publish(
      ['Interaction:update:pre', 'Interaction:update'],
      publishData
    )
  }

  private keyboardEnd = ({
    event,
    key,
  }: {
    event: KeyboardEvent
    key: string
  }) => {
    const _key = key.toLowerCase()
    if (
      !this.Settings.keyboardDrag ||
      !this._dragKeysFlat.includes(_key) ||
      !this.DS.SelectedSet.size ||
      !this.Settings.draggability
    )
      return
    const publishData = {
      event,
      isDragging: this.Settings.draggability,
      isDraggingKeyboard: true,
      key,
    }
    this.PS.publish(['Interaction:end:pre', 'Interaction:end'], publishData)
  }

  private start = ({
    isDragging,
    isDraggingKeyboard,
  }: {
    isDragging?: boolean
    isDraggingKeyboard?: boolean
  }) => {
    if (!isDragging || isDraggingKeyboard) return
    this._prevCursorPos = undefined
    this._prevScrollPos = undefined
    this._elements = this.DS.getSelection()
    this._selectionRect = this.DS.Selection.boundingRect
    this.handleZIndex(true)
  }

  public stop = () => {
    this._prevCursorPos = undefined
    this._prevScrollPos = undefined
    this.handleZIndex(false)
    this._elements = []
  }

  private update = ({
    isDragging,
    isDraggingKeyboard,
  }: {
    isDragging?: boolean
    isDraggingKeyboard?: boolean
  }) => {
    if (
      !isDragging ||
      !this._elements.length ||
      isDraggingKeyboard ||
      this.DS.continue
    )
      return

    let posDirection = calcVect(this._cursorDiff, '+', this._scrollDiff)
    posDirection = limitDirection({
      direction: posDirection,
      containerRect: this.DS.SelectorArea.rect,
      scrollAmount: this.DS.stores.ScrollStore.scrollAmount,
      selectionRect: this._selectionRect,
    })

    this.moveElements(posDirection)
  }

  private handleZIndex = (add: boolean) => {
    this._elements.forEach(
      (element) =>
        (element.style.zIndex = `${
          (parseInt(element.style.zIndex) || 0) + (add ? 9999 : -9998)
        }`)
    )
  }

  private moveElements = (posDirection: Vect2) => {
    // [PUBLICLY EXPOSED METHOD]
    const { elements, direction } = this.filterDragElements({
      elements: this._elements,
      direction: posDirection,
    })
    elements.forEach((element) => {
      moveElement({
        element,
        posDirection: direction,
        containerRect: this.DS.SelectorArea.rect,
        useTransform: this.Settings.useTransform,
      })
    })
  }

  private get _cursorDiff() {
    const currentPointerVal = this.DS.stores.PointerStore.currentVal
    const cursorDiff = this._prevCursorPos
      ? calcVect(currentPointerVal, '-', this._prevCursorPos)
      : { x: 0, y: 0 }
    this._prevCursorPos = currentPointerVal
    return cursorDiff
  }

  private get _scrollDiff() {
    const currentScrollVal = this.DS.stores.ScrollStore.currentVal
    const scrollDiff = this._prevScrollPos
      ? calcVect(currentScrollVal, '-', this._prevScrollPos)
      : { x: 0, y: 0 }
    this._prevScrollPos = currentScrollVal
    return scrollDiff
  }

  ////
  // [PUBLICLY EXPOSED METHODS]

  /**
   * Can be overridden to apply further filtering logic after the items to move are identified but before they actually get moved
   * Is expected to return the elements in the same shape as passed in
   */
  public filterDragElements = ({
    elements,
    direction,
  }: {
    elements: E[]
    direction: Vect2
  }) => ({
    elements,
    direction,
  })
}
