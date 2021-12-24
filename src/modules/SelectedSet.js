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
    if (super.has(element)) return
    const publishData = {
      items: this.elements,
      item: element,
    }
    this.DS.publish('Selected:added:pre', publishData)
    super.add(element)
    element.classList.add(this._className)
    element.style.zIndex = `${(parseInt(element.style.zIndex) || 0) + 1}`
    this.DS.publish('Selected:added', publishData)
    return this
  }

  /** @param {DSElement} element */
  delete(element) {
    if (!super.has(element)) return
    const publishData = {
      items: this.elements,
      item: element,
    }
    this.DS.publish('Selected:removed:pre', publishData)
    const deleted = super.delete(element)
    element.classList.remove(this._className)
    element.style.zIndex = `${(parseInt(element.style.zIndex) || 0) - 1}`
    this.DS.publish('Selected:removed', publishData)
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
