// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { vect2, moveElement, handleKeyboardDragPosDifference } from '../methods'

export default class Drag {
  /**
   * @type {boolean}
   * @private
   */
  _useTransform
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
  _dragKeysFlat
  /**
   * @type {number}
   * @private
   */
  _keyboardDragSpeed
  /**
   * @type {number}
   * @private
   */
  _zoom

  /**
   * @param {Object} p
   * @param {DragSelect} p.DS
   * @param {boolean} p.useTransform
   * @param {DSDragKeys} p.dragKeys
   * @param {number} p.keyboardDragSpeed
   * @param {number} p.zoom
   * @ignore
   */
  constructor({ DS, useTransform, dragKeys, keyboardDragSpeed, zoom }) {
    this.DS = DS
    this._useTransform = useTransform
    this._keyboardDragSpeed = keyboardDragSpeed
    this._zoom = zoom

    this._dragKeys = {
      up: dragKeys.up.map((k) => k.toLowerCase()),
      down: dragKeys.down.map((k) => k.toLowerCase()),
      left: dragKeys.left.map((k) => k.toLowerCase()),
      right: dragKeys.right.map((k) => k.toLowerCase()),
    }
    this._dragKeysFlat = [
      ...this._dragKeys.up,
      ...this._dragKeys.down,
      ...this._dragKeys.left,
      ...this._dragKeys.right,
    ]

    this.DS.subscribe('Interaction:start', this.start)
    this.DS.subscribe('Interaction:end', this.stop)
    this.DS.subscribe('Interaction:update', this.update)
    this.DS.subscribe('KeyStore:down', this.keyboardDrag)
    this.DS.subscribe('KeyStore:up', this.keyboardEnd)
  }

  keyboardDrag = ({ event, key }) => {
    if (!this._dragKeysFlat.includes(key) || !this.DS.SelectedSet.size) return
    this._isKeyboard = true
    this.DS.publish('Interaction:start', { event, isDragging: true })

    this._elements = this.DS.getSelection()
    this.handleZIndex(true)

    const posDirection = handleKeyboardDragPosDifference({
      shiftKey: this.DS.stores.KeyStore.currentValues.includes('shift'),
      keyboardDragSpeed: this._keyboardDragSpeed,
      zoom: this._zoom,
      key,
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
        useTransform: this._useTransform,
      })
    )

    this.DS.publish('Interaction:update', { event, isDragging: true })
    this._isKeyboard = false
  }

  keyboardEnd = ({ event, key }) => {
    if (!this._dragKeysFlat.includes(key) || !this.DS.SelectedSet.size) return
    this._isKeyboard = true
    this.DS.publish('Interaction:end', { event, isDragging: true })
    this._isKeyboard = false
  }

  start = ({ isDragging }) => {
    if (!isDragging || this._isKeyboard) return
    this._prevCursorPos = null
    this._prevScrollPos = null
    this._elements = this.DS.getSelection()
    this.handleZIndex(true)
  }

  stop = () => {
    if (this._isKeyboard) return
    this._prevCursorPos = null
    this._prevScrollPos = null
    this.handleZIndex(false)
    this._elements = []
  }

  update = ({ isDragging }) => {
    if (!isDragging || !this._elements.length || this._isKeyboard) return

    const posDirection = vect2.calc(this._cursorDiff, '+', this._scrollDiff)

    this._elements.forEach((element) =>
      moveElement({
        element,
        posDirection,
        containerRect: this.DS.SelectorArea.rect,
        useTransform: this._useTransform,
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
