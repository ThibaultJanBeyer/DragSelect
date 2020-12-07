// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { toArray } from '../methods'

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
   * @constructor SelectableSet
   * @param {Object} p
   * @param {DSInputElements} p.elements
   * @param {DragSelect} p.DS
   * @param {string} p.className
   * @param {string} p.hoverClassName
   * @ignore
   */
  constructor({ elements, className, hoverClassName, DS }) {
    super()
    this.DS = DS
    this._initElements = toArray(elements)
    this._className = className
    this._hoverClassName = hoverClassName

    this.DS.subscribe('Interaction:init', this.init)
  }

  init = () => this._initElements.forEach((el) => this.add(el))

  /** @param {DSElement} element */
  add(element) {
    element.classList.add(this._className)
    element.addEventListener('click', this._onClick)
    return super.add(element)
  }

  /** @param {DSElement} element */
  delete(element) {
    element.classList.remove(this._className)
    element.classList.remove(this._hoverClassName)
    element.removeEventListener('click', this._onClick)
    return super.delete(element)
  }

  clear = () => this.forEach((el) => this.delete(el))

  _onClick = (event) => this.DS.publish('Selectable:click', { event })

  /** @param {DSElements} elements */
  addAll = (elements) => elements.forEach((el) => this.add(el))
  /** @param {DSElements} elements */
  deleteAll = (elements) => elements.forEach((el) => this.delete(el))
  /** @return {DSElements} */
  get elements() {
    return Array.from(this.values())
  }
}
