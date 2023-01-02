// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { toArray, handleElementPositionAttribute } from '../methods'

export default class SelectableSet extends Set {
  /**
   * @type {Map<DSElement,DSBoundingRect>}
   * @private
   */
  _rects

  /**
   * @type {NodeJS.Timeout}
   * @private
   */
  _timeout

  /**
   * @constructor SelectableSet
   * @param {{DS:DragSelect}} obj
   * @ignore
   */
  constructor({ DS }) {
    super()
    this.DS = DS
    this.Settings = DS.stores.SettingsStore.s
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
        el.classList.add(settings.selectableClass)
      })
    })
  }

  init = () => toArray(this.Settings.selectables).forEach((el) => this.add(el))

  /** @param {DSElement} element */
  add(element) {
    if (super.has(element)) return
    const publishData = {
      items: this.elements,
      item: element,
    }
    this.DS.publish('Selectable:added:pre', publishData)
    element.classList.add(this.Settings.selectableClass)
    element.addEventListener('click', this._onClick)

    if (this.Settings.usePointerEvents)
      element.addEventListener('pointerdown', this._onPointer, {
        // @ts-ignore
        passive: false,
      })
    else element.addEventListener('mousedown', this._onPointer)

    element.addEventListener('touchstart', this._onPointer, {
      // @ts-ignore
      passive: false,
    })

    if (this.Settings.draggability && !this.Settings.useTransform)
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
    element.classList.remove(this.Settings.selectableClass)
    element.classList.remove(this.Settings.hoverClass)
    element.removeEventListener('click', this._onClick)

    if (this.Settings.usePointerEvents)
      element.removeEventListener('pointerdown', this._onPointer, {
        // @ts-ignore
        passive: false,
      })
    else element.removeEventListener('mousedown', this._onPointer)

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

  /** @param {DSElement} element */
  /** @return {Boolean} whether the element can be dragged */
  canBeDragged = (element) =>
    !element.classList.contains(this.DS.stores.SettingsStore.s.noDragClass)

  /** @param {DSElement} element */
  makeDraggable = (element) =>
    element.classList.remove(this.DS.stores.SettingsStore.s.noDragClass)

  /** @param {DSElement} element */
  makeNonDraggable = (element) =>
    element.classList.add(this.DS.stores.SettingsStore.s.noDragClass)

  /** @return {DSElements} */
  get elements() {
    return Array.from(this.values())
  }

  get rects() {
    if (this._rects) return this._rects
    this._rects = new Map()
    this.forEach((element) =>
      this._rects.set(element, element.getBoundingClientRect())
    )

    // since elements can be moved, we need to update the rects every X ms
    if (this._timeout) clearTimeout(this._timeout)
    this._timeout = setTimeout(
      () => (this._rects = null),
      this.Settings.refreshMemoryRate
    )

    return this._rects
  }
}
