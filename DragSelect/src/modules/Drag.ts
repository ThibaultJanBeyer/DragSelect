import DragSelect from '../DragSelect'
import PubSub from './PubSub'
import { DSBoundingRect, DSDragKeys, DSElement, DSEvent, Vect2 } from '../types'
import { DSSettings } from '../stores/SettingsStore'
import { calcVect, num2vect, vect2rect } from '../methods/vect2'
import { getBoundingClientRect } from '../methods/getBoundingClientRect'
import { handleKeyboardDragPosDifference } from '../methods/handleKeyboardDragPosDifference'
import { moveElement } from '../methods/moveElement'

export default class Drag {
  private _prevCursorPos?: Vect2
  private _prevScrollPos?: Vect2
  private _elements: DSElement[] = []
  private _dragKeys?: DSDragKeys
  private _dragKeysFlat: string[] = []
  private _selectionRect: DSBoundingRect = vect2rect(num2vect(0))
  DS: DragSelect
  PS: PubSub
  Settings: DSSettings

  constructor({ DS, PS }: { DS: DragSelect, PS: PubSub }) {
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s

    this.PS.subscribe('Settings:updated:dragKeys', this.assignDragkeys)
    this.assignDragkeys()

    this.PS.subscribe('Interaction:start', this.start)
    this.PS.subscribe('Interaction:end', this.stop)
    this.PS.subscribe('Interaction:update', this.update)
    this.PS.subscribe('KeyStore:down', this.keyboardDrag)
    this.PS.subscribe('KeyStore:up', this.keyboardEnd)
  }

  private assignDragkeys = () => {
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

  private keyboardDrag = ({ event, key }: { event: KeyboardEvent; key: string }) => {
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
    if (this.Settings.dragAsBlock)
      this._selectionRect = getBoundingClientRect(this._elements, this.DS.SelectableSet)
    this.handleZIndex(true)

    let posDirection = handleKeyboardDragPosDifference({
      shiftKey: this.DS.stores.KeyStore.currentValues.includes('shift'),
      keyboardDragSpeed: this.Settings.keyboardDragSpeed,
      zoom: this.Settings.zoom,
      key: _key,
      scrollCallback: this.DS.Area.scroll,
      scrollDiff: this._scrollDiff,
      canScroll: this.DS.stores.ScrollStore.canScroll,
      dragKeys: this._dragKeys,
    })

    if (this.Settings.dragAsBlock)
      posDirection = this.limitDirection(posDirection)

    this._elements.forEach((element) =>
      moveElement({
        element,
        posDirection,
        containerRect: this.DS.SelectorArea.rect,
        useTransform: this.Settings.useTransform,
      })
    )

    this.PS.publish(
      ['Interaction:update:pre', 'Interaction:update'],
      publishData
    )
  }

  private keyboardEnd = ({ event, key }: { event: KeyboardEvent; key: string }) => {
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

  private start = ({ isDragging, isDraggingKeyboard }: { isDragging?: boolean, isDraggingKeyboard?: boolean }) => {
    if (!isDragging || isDraggingKeyboard) return
    this._prevCursorPos = undefined
    this._prevScrollPos = undefined
    this._elements = this.DS.getSelection()
    if (this.Settings.dragAsBlock)
      this._selectionRect = getBoundingClientRect(this._elements, this.DS.SelectableSet)
    this.handleZIndex(true)
  }

  public stop = () => {
    this._prevCursorPos = undefined
    this._prevScrollPos = undefined
    this.handleZIndex(false)
    this._elements = []
  }

  private update = ({ isDragging, isDraggingKeyboard }: { isDragging?: boolean; isDraggingKeyboard?: boolean }) => {
    if (
      !isDragging ||
      !this._elements.length ||
      isDraggingKeyboard ||
      this.DS.continue
    )
      return

    let posDirection = calcVect(this._cursorDiff, '+', this._scrollDiff)
    if (this.Settings.dragAsBlock)
      posDirection = this.limitDirection(posDirection)

    this._elements.forEach((element) =>
      moveElement({
        element,
        posDirection,
        containerRect: this.DS.SelectorArea.rect,
        useTransform: this.Settings.useTransform,
      })
    )
  }

  /**
   * Modify direction value so that the rect of draggable elements
   * does not exceed the boundaries of container rect
   */
  private limitDirection = (direction: Vect2) => {
    const containerRect = this.DS.SelectorArea.rect;
    const scrollAmount = this.DS.stores.ScrollStore.scrollAmount;

    const delta = {
      top: containerRect.top - this._selectionRect.top + scrollAmount.y,
      left: containerRect.left - this._selectionRect.left + scrollAmount.x,
      bottom: containerRect.bottom - this._selectionRect.bottom + scrollAmount.y,
      right: containerRect.right - this._selectionRect.right + scrollAmount.x,
    }
    
    if(direction.x === 0 && direction.y === 0) return direction
    if (direction.y < 0) direction.y = Math.max(direction.y, delta.top)
    if (direction.x < 0) direction.x = Math.max(direction.x, delta.left)
    if (direction.y > 0) direction.y = Math.min(direction.y, delta.bottom)
    if (direction.x > 0) direction.x = Math.min(direction.x, delta.right)
    
    this._selectionRect.top += direction.y;
    this._selectionRect.bottom += direction.y;
    this._selectionRect.left += direction.x;
    this._selectionRect.right += direction.x;

    return direction
  }

  private handleZIndex = (add: boolean) => {
    this._elements.forEach(
      (element) =>
        (element.style.zIndex = `${
          (parseInt(element.style.zIndex) || 0) + (add ? 9999 : -9998)
        }`)
    )
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
}
