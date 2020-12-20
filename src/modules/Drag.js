// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { vect2, moveElement } from '../methods'

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
   * @param {Object} p
   * @param {DragSelect} p.DS
   * @param {boolean} p.useTransform
   * @param {DSDragKeys} p.dragKeys
   */
  constructor({ DS, useTransform, dragKeys }) {
    this.DS = DS
    this._useTransform = useTransform

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
  }

  keyboardDrag = ({ key }) => {
    if (!this._dragKeysFlat.includes(key) || !this.DS.SelectedSet.size) return

    this._elements = this.DS.getSelection()
    this.handleZIndex(true)

    const posDirection = { x: 0, y: 0 }
    const increase = this.DS.stores.KeyStore.currentValues.includes('shift')
      ? 40
      : 10
    if (this._dragKeys.left.includes(key))
      posDirection.x = this._scrollDiff.x || -increase
    if (this._dragKeys.right.includes(key))
      posDirection.x = this._scrollDiff.x || increase
    if (this._dragKeys.up.includes(key))
      posDirection.y = this._scrollDiff.y || -increase
    if (this._dragKeys.down.includes(key))
      posDirection.y = this._scrollDiff.y || increase

    this._elements.forEach((element) =>
      moveElement({
        element,
        posDirection,
        containerRect: this.DS.SelectorArea.rect,
        useTransform: this._useTransform,
      })
    )
  }

  start = ({ isDragging }) => {
    if (!isDragging) return
    this._prevCursorPos = null
    this._prevScrollPos = null
    this._elements = this.DS.getSelection()
    this.handleZIndex(true)
  }

  stop = () => {
    this._prevCursorPos = null
    this._prevScrollPos = null
    this.handleZIndex(false)
    this._elements = []
  }

  update = ({ isDragging }) => {
    if (!isDragging || !this._elements.length) return

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
