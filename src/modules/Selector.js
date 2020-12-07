// @ts-check
import '../types.js'

import {
  getSelectorPosition,
  updateElementStylePos,
  createSelectorElement,
} from '../methods'
import DragSelect from '../DragSelect'

export default class Selector {
  /**
   * @constructor Selector
   * @param {Object} p
   * @param {DragSelect} p.DS
   * @param {HTMLElement} p.selector
   * @param {string} p.selectorClass
   * @param {boolean} p.customStyles
   * @ignore
   */
  constructor({ DS, selector, selectorClass, customStyles }) {
    this.DS = DS

    this.HTMLNode = selector || createSelectorElement(customStyles)
    this.HTMLNode.classList.add(selectorClass)

    this.DS.subscribe('Interaction:start', this.start)
    this.DS.subscribe('PointerStore:updated', this.update)
    this.DS.subscribe('Area:scroll', this.update)
    this.DS.subscribe('Interaction:end', this.stop)
  }

  start = () => {
    const {
      stores: { ScrollStore, PointerStore },
    } = this.DS
    const pPos = PointerStore.currentValArea
    const scroll = ScrollStore.currentVal
    updateElementStylePos(this.HTMLNode, {
      x: pPos.x + scroll.x,
      y: pPos.y + scroll.y,
      w: 0,
      h: 0,
    })
    this.HTMLNode.style.display = 'block'
  }

  stop = () => {
    this.HTMLNode.style.width = '0'
    this.HTMLNode.style.height = '0'
    this.HTMLNode.style.display = 'none'
  }

  /** Moves the selection to the correct place */
  update = () => {
    const {
      stores: { ScrollStore, PointerStore },
    } = this.DS
    const pos = getSelectorPosition({
      scrollAmount: ScrollStore.scrollAmount,
      initialPointerPos: PointerStore.initialValArea,
      pointerPos: PointerStore.currentValArea,
    })
    updateElementStylePos(this.HTMLNode, pos)
  }
}
