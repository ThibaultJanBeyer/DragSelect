// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { toArray, handleElementPositionAttribute } from '../methods'

export default class SelectableSet extends Set {
  /**
   * @constructor SelectableSet
   * @param {{DS:DragSelect}} obj
   * @ignore
   */
  constructor({ DS }) {
    super()
    this.DS = DS
    this.DS.subscribe('Interaction:init', this.init)
    // @ts-ignore: @todo: update to typescript
    this.DS.PubSub.subscribe('Settings:updated:selectables', () => {
      this.clear()
      this.init()
    })
    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:selectableClass', ({ settings }) => {
      this.forEach((el) => {
        el.classList.remove(settings['selectableClass:pre'])
        el.classList.add(settings['selectableClass'])
      })
    })
  }

  init = () =>
    toArray(this.DS.stores.SettingsStore.s.selectables).forEach((el) =>
      this.add(el)
    )

  /** @param {DSElement} element */
  add(element) {
    if (super.has(element)) return
    const publishData = {
      items: this.elements,
      item: element,
    }
    this.DS.publish('Selectable:added:pre', publishData)
    element.classList.add(this.DS.stores.SettingsStore.s.selectableClass)
    element.addEventListener('click', this._onClick)
    element.addEventListener('mousedown', this._onPointer)
    element.addEventListener('touchstart', this._onPointer, {
      // @ts-ignore
      passive: false,
    })

    if (
      this.DS.stores.SettingsStore.s.draggability &&
      !this.DS.stores.SettingsStore.s.useTransform
    )
      handleElementPositionAttribute({
        computedStyle: window.getComputedStyle(element),
        node: element,
      })

    this.DS.publish('Selectable:added', publishData)
    return super.add(element)
  }

  /** @param {DSElement} element */
  delete(element) {
    if (!super.has(element)) return
    const publishData = {
      items: this.elements,
      item: element,
    }
    this.DS.publish('Selectable:removed:pre', publishData)
    element.classList.remove(this.DS.stores.SettingsStore.s.selectableClass)
    element.classList.remove(this.DS.stores.SettingsStore.s.hoverClass)
    element.removeEventListener('click', this._onClick)
    element.removeEventListener('mousedown', this._onPointer)
    element.removeEventListener('touchstart', this._onPointer, {
      // @ts-ignore
      passive: false,
    })
    this.DS.publish('Selectable:removed', publishData)
    return super.delete(element)
  }

  clear = () => this.forEach((el) => this.delete(el))

  _onClick = (event) =>
    this.DS.publish(['Selectable:click:pre', 'Selectable:click'], { event })
  _onPointer = (event) =>
    this.DS.publish(['Selectable:pointer:pre', 'Selectable:pointer'], { event })

  /** @param {DSElements} elements */
  addAll = (elements) => elements.forEach((el) => this.add(el))
  /** @param {DSElements} elements */
  deleteAll = (elements) => elements.forEach((el) => this.delete(el))
  /** @return {DSElements} */
  get elements() {
    return Array.from(this.values())
  }
}
