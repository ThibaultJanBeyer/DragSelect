// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import {
  getBoundingClientRect,
  handleKeyboardDragPosDifference,
  moveElement,
  vect2,
} from '../methods'

export default class Drag {
  /**
   * @type {Vect2}
   * @private
   */
  _prevCursorPos

  /**
   * @type {Vect2}
   * @private
   */
  _prevScrollPos

  /**
   * @type {DSElements}
   * @private
   */
  _elements = []

  /**
   * @type {DSDragKeys}
   * @private
   */
  _dragKeys

  /**
   * @type {string[]}
   * @private
   */
  _dragKeysFlat = []

  /**
   * @type {DSBoundingRect}
   * @private
   */
  _selectionRect

  /**
   * @constructor Drag
   * @param {{DS:DragSelect}} obj
   * @ignore
   */
  constructor({ DS }) {
    this.DS = DS

    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:dragKeys', this.assignDragkeys)
    this.assignDragkeys()
    this.DS.subscribe('Interaction:start', this.start)
    this.DS.subscribe('Interaction:end', this.stop)
    this.DS.subscribe('Interaction:update', this.update)
    this.DS.subscribe('KeyStore:down', this.keyboardDrag)
    this.DS.subscribe('KeyStore:up', this.keyboardEnd)
  }

  assignDragkeys = () => {
    this._dragKeys = {
      up: this.DS.stores.SettingsStore.s.dragKeys.up.map((k) =>
        k.toLowerCase()
      ),
      down: this.DS.stores.SettingsStore.s.dragKeys.down.map((k) =>
        k.toLowerCase()
      ),
      left: this.DS.stores.SettingsStore.s.dragKeys.left.map((k) =>
        k.toLowerCase()
      ),
      right: this.DS.stores.SettingsStore.s.dragKeys.right.map((k) =>
        k.toLowerCase()
      ),
    }
    this._dragKeysFlat = [
      ...this._dragKeys.up,
      ...this._dragKeys.down,
      ...this._dragKeys.left,
      ...this._dragKeys.right,
    ]
  }

  keyboardDrag = ({ event, key }) => {
    const _key = key.toLowerCase()
    if (
      !this.DS.stores.SettingsStore.s.keyboardDrag ||
      !this._dragKeysFlat.includes(_key) ||
      !this.DS.SelectedSet.size ||
      !this.DS.stores.SettingsStore.s.draggability ||
      this.DS.continue
    )
      return

    const publishData = {
      event,
      isDragging: true,
      isDraggingKeyboard: true,
    }
    this.DS.publish(['Interaction:start:pre', 'Interaction:start'], publishData)

    this._elements = this.DS.getSelection()
    if (this.DS.stores.SettingsStore.s.dragAsBlock)
      this._selectionRect = getBoundingClientRect(this._elements, this.DS.SelectableSet)
    this.handleZIndex(true)

    let posDirection = handleKeyboardDragPosDifference({
      shiftKey: this.DS.stores.KeyStore.currentValues.includes('shift'),
      keyboardDragSpeed: this.DS.stores.SettingsStore.s.keyboardDragSpeed,
      zoom: this.DS.stores.SettingsStore.s.zoom,
      key: _key,
      scrollCallback: this.DS.Area.scroll,
      scrollDiff: this._scrollDiff,
      canScroll: this.DS.stores.ScrollStore.canScroll,
      dragKeys: this._dragKeys,
    })

    if (this.DS.stores.SettingsStore.s.dragAsBlock)
      posDirection = this.limitDirection(posDirection)

    this._elements.forEach((element) =>
      moveElement({
        element,
        posDirection,
        containerRect: this.DS.SelectorArea.rect,
        useTransform: this.DS.stores.SettingsStore.s.useTransform,
      })
    )

    this.DS.publish(
      ['Interaction:update:pre', 'Interaction:update'],
      publishData
    )
  }

  keyboardEnd = ({ event, key }) => {
    const _key = key.toLowerCase()
    if (
      !this.DS.stores.SettingsStore.s.keyboardDrag ||
      !this._dragKeysFlat.includes(_key) ||
      !this.DS.SelectedSet.size ||
      !this.DS.stores.SettingsStore.s.draggability
    )
      return
    const publishData = {
      event,
      isDragging: this.DS.stores.SettingsStore.s.draggability,
      isDraggingKeyboard: true,
    }
    this.DS.publish(['Interaction:end:pre', 'Interaction:end'], publishData)
  }

  start = ({ isDragging, isDraggingKeyboard }) => {
    if (!isDragging || isDraggingKeyboard) return
    this._prevCursorPos = null
    this._prevScrollPos = null
    this._elements = this.DS.getSelection()
    if (this.DS.stores.SettingsStore.s.dragAsBlock)
      this._selectionRect = getBoundingClientRect(this._elements, this.DS.SelectableSet)
    this.handleZIndex(true)
  }

  stop = (evt) => {
    if (evt?.isKeyboard) return
    this._prevCursorPos = null
    this._prevScrollPos = null
    this.handleZIndex(false)
    this._elements = []
  }

  update = ({ isDragging, isDraggingKeyboard }) => {
    if (
      !isDragging ||
      !this._elements.length ||
      isDraggingKeyboard ||
      this.DS.continue
    )
      return

    let posDirection = vect2.calc(this._cursorDiff, '+', this._scrollDiff)
    if (this.DS.stores.SettingsStore.s.dragAsBlock)
      posDirection = this.limitDirection(posDirection)

    this._elements.forEach((element) =>
      moveElement({
        element,
        posDirection,
        containerRect: this.DS.SelectorArea.rect,
        useTransform: this.DS.stores.SettingsStore.s.useTransform,
      })
    )
  }

  /**
   * Modify direction value so that the rect of draggable elements
   * does not exceed the boundaries of container rect
   * @param {Vect2} direction
   * @return {Vect2}
   */
  limitDirection = (direction) => {
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

  handleZIndex = (add) => {
    this._elements.forEach(
      (element) =>
        (element.style.zIndex = `${
          (parseInt(element.style.zIndex) || 0) + add ? 9999 : -9998
        }`)
    )
  }

  get _cursorDiff() {
    const currentPointerVal = this.DS.stores.PointerStore.currentVal
    const cursorDiff = this._prevCursorPos
      ? vect2.calc(currentPointerVal, '-', this._prevCursorPos)
      : { x: 0, y: 0 }
    this._prevCursorPos = currentPointerVal
    return cursorDiff
  }

  get _scrollDiff() {
    const currentScrollVal = this.DS.stores.ScrollStore.currentVal
    const scrollDiff = this._prevScrollPos
      ? vect2.calc(currentScrollVal, '-', this._prevScrollPos)
      : { x: 0, y: 0 }
    this._prevScrollPos = currentScrollVal
    return scrollDiff
  }
}
