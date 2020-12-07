// @ts-check
import '../types'
import DragSelect from '../DragSelect'

export default class SelectedSet extends Set {
  /**
   * @type {string}
   * @private
   * */
  _className

  /**
   * @constructor SelectableSet
   * @param {Object} p
   * @param {DragSelect} p.DS
   * @param {string} p.className
   * @ignore
   */
  constructor({ className, DS }) {
    super()
    this.DS = DS
    this._className = className
  }

  /** @param {DSElement} element */
  add(element) {
    element.classList.add(this._className)
    super.add(element)
    this.DS.publish('Selected:added', {
      items: this.elements,
      item: element,
    })
    return this
  }

  /** @param {DSElement} element */
  delete(element) {
    element.classList.remove(this._className)
    const deleted = super.delete(element)
    this.DS.publish('Selected:removed', {
      items: this.elements,
      item: element,
    })
    return deleted
  }

  clear = () => this.forEach((el) => this.delete(el))

  /**
   * Adds/Removes an element. If it is already selected = remove, if not = add.
   * @param {DSElement} element
   * @return {DSElement}
   */
  toggle(element) {
    if (this.has(element)) this.delete(element)
    else this.add(element)
    return element
  }

  /** @param {DSElements} elements */
  addAll = (elements) => elements.forEach((el) => this.add(el))
  /** @param {DSElements} elements */
  deleteAll = (elements) => elements.forEach((el) => this.delete(el))
  /** @return {DSElements} */
  get elements() {
    return Array.from(this.values())
  }
}
