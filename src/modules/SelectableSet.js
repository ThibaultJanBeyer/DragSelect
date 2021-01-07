// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { toArray, handleElementPositionAttribute } from '../methods'

export default class SelectableSet extends Set {
  /**
   * @type {DSElements}
   * @private
   * */
  _initElements
  /**
   * @type {string}
   * @private
   * */
  _className
  /**
   * @type {string}
   * @private
   * */
  _hoverClassName
  /**
   * @type {boolean}
   * @private
   * */
  _useTransform
  /**
   * @type {boolean}
   * @private
   * */
  _draggability

  /**
   * @constructor SelectableSet
   * @param {Object} p
   * @param {DSInputElements} p.elements
   * @param {DragSelect} p.DS
   * @param {string} p.className
   * @param {string} p.hoverClassName
   * @param {boolean} p.useTransform
   * @param {boolean} p.draggability
   * @ignore
   */
  constructor({
    elements,
    className,
    hoverClassName,
    draggability,
    useTransform,
    DS,
  }) {
    super()
    this.DS = DS
    this._initElements = toArray(elements)
    this._className = className
    this._hoverClassName = hoverClassName
    this._useTransform = useTransform
    this._draggability = draggability

    this.DS.subscribe('Interaction:init', this.init)
  }

  init = () => this._initElements.forEach((el) => this.add(el))

  /** @param {DSElement} element */
  add(element) {
    element.classList.add(this._className)
    element.addEventListener('click', this._onClick)
    element.addEventListener('mousedown', this._onPointer)
    element.addEventListener('touchstart', this._onPointer, {
      // @ts-ignore
      passive: false,
    })

    if (this._draggability && !this._useTransform)
      handleElementPositionAttribute({
        computedStyle: window.getComputedStyle(element),
        node: element,
      })

    return super.add(element)
  }

  /** @param {DSElement} element */
  delete(element) {
    element.classList.remove(this._className)
    element.classList.remove(this._hoverClassName)
    element.removeEventListener('click', this._onClick)
    element.removeEventListener('mousedown', this._onPointer)
    element.removeEventListener('touchstart', this._onPointer, {
      // @ts-ignore
      passive: false,
    })
    return super.delete(element)
  }

  clear = () => this.forEach((el) => this.delete(el))

  _onClick = (event) => this.DS.publish('Selectable:click', { event })
  _onPointer = (event) => this.DS.publish('Selectable:pointer', { event })

  /** @param {DSElements} elements */
  addAll = (elements) => elements.forEach((el) => this.add(el))
  /** @param {DSElements} elements */
  deleteAll = (elements) => elements.forEach((el) => this.delete(el))
  /** @return {DSElements} */
  get elements() {
    return Array.from(this.values())
  }
}
