// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { vect2, moveElement, handleKeyboardDragPosDifference } from '../methods'

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
    this.handleZIndex(true)

    const posDirection = handleKeyboardDragPosDifference({
      shiftKey: this.DS.stores.KeyStore.currentValues.includes('shift'),
      keyboardDragSpeed: this.DS.stores.SettingsStore.s.keyboardDragSpeed,
      zoom: this.DS.stores.SettingsStore.s.zoom,
      key: _key,
      scrollCallback: this.DS.Area.scroll,
      scrollDiff: this._scrollDiff,
      canScroll: this.DS.stores.ScrollStore.canScroll,
      dragKeys: this._dragKeys,
    })

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

    const posDirection = vect2.calc(this._cursorDiff, '+', this._scrollDiff)

    this._elements.forEach((element) =>
      moveElement({
        element,
        posDirection,
        containerRect: this.DS.SelectorArea.rect,
        useTransform: this.DS.stores.SettingsStore.s.useTransform,
      })
    )
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
