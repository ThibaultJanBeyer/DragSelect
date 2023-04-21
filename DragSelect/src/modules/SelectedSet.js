// @ts-check
import '../types'
import DragSelect from '../DragSelect'

export default class SelectedSet extends Set {
  /**
   * @constructor SelectableSet
   * @param {{DS:DragSelect}} obj
   * @ignore
   */
  constructor({ DS }) {
    super()
    this.DS = DS
  }

  /** 
   * @param {DSElement} element
   * @return {this}
   * */
  add(element) {
    if (super.has(element)) return this
    const publishData = {
      items: this.elements,
      item: element,
    }
    this.DS.publish('Selected:added:pre', publishData)
    super.add(element)
    element.classList.add(this.DS.stores.SettingsStore.s.selectedClass)
    element.style.zIndex = `${(parseInt(element.style.zIndex) || 0) + 1}`
    this.DS.publish('Selected:added', publishData)
    return this
  }

  /** @param {DSElement} element */
  delete(element) {
    if (!super.has(element)) return true
    const publishData = {
      items: this.elements,
      item: element,
    }
    this.DS.publish('Selected:removed:pre', publishData)
    const deleted = super.delete(element)
    element.classList.remove(this.DS.stores.SettingsStore.s.selectedClass)
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
