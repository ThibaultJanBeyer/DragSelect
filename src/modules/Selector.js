// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import {
  createSelectorElement,
  getSelectorPosition,
  updateElementStylePos,
  vect2,
} from '../methods'

export default class Selector {
  /**
   * @type {DSBoundingRect}
   * @private
   */
  _rect

  /**
   * @constructor Selector
   * @param {{ DS:DragSelect }} p
   * @ignore
   */
  constructor({ DS }) {
    this.DS = DS

    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:selectorClass', ({ settings }) => {
      this.HTMLNode.classList.remove(settings['selectorClass:pre'])
      this.HTMLNode.classList.add(settings.selectorClass)
    })
    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:selector', this.attachSelector)
    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:customStyles', this.attachSelector)
    this.attachSelector()

    this.DS.subscribe('Interaction:start', this.start)
    this.DS.subscribe('Interaction:update', this.update)
    this.DS.subscribe('Interaction:end', this.stop)
  }

  attachSelector = () => {
    if (this.HTMLNode && this.DS.SelectorArea?.HTMLNode)
      this.DS.SelectorArea.HTMLNode.removeChild(this.HTMLNode)
    this.HTMLNode =
      this.DS.stores.SettingsStore.s.selector ||
      createSelectorElement(this.DS.stores.SettingsStore.s.customStyles)
    this.HTMLNode.classList.add(this.DS.stores.SettingsStore.s.selectorClass)
    if (this.HTMLNode && this.DS.SelectorArea?.HTMLNode)
      this.DS.SelectorArea.HTMLNode.appendChild(this.HTMLNode)
  }

  start = ({ isDragging }) => {
    if (isDragging) return
    const {
      stores: { PointerStore },
    } = this.DS
    const pPos = PointerStore.initialValArea
    updateElementStylePos(this.HTMLNode, vect2.vect2rect(pPos, 1))
    this.HTMLNode.style.display = 'block'
    this._rect = null
  }

  stop = () => {
    this.HTMLNode.style.width = '0'
    this.HTMLNode.style.height = '0'
    this.HTMLNode.style.display = 'none'
  }

  /** Moves the selection to the correct place */
  update = ({ isDragging }) => {
    if (isDragging || this.DS.continue) return
    const {
      stores: { ScrollStore, PointerStore },
    } = this.DS
    const pos = getSelectorPosition({
      scrollAmount: ScrollStore.scrollAmount,
      initialPointerPos: PointerStore.initialValArea,
      pointerPos: PointerStore.currentValArea,
    })
    updateElementStylePos(this.HTMLNode, pos)
    this._rect = null
  }

  get rect() {
    if (this._rect) return this._rect
    return (this._rect = this.HTMLNode.getBoundingClientRect())
  }
}
