// @ts-check
import '../types.js'

import { Element } from './'
import {
  getSelectorPosition,
  updateElementStylePos,
  createSelectorElement,
} from '../methods'
import DragSelect from '../DragSelect'

export default class Selector {
  /**
   * @constructor Selector
   * @param {Object} obj
   * @param {DragSelect} obj.DS
   * @param {HTMLElement} obj.selector
   * @param {string} obj.selectorClass
   * @param {boolean} obj.customStyles
   * @ignore
   */
  constructor({ DS, selector, selectorClass, customStyles }) {
    this.DS = DS
    this.Element = new Element({
      node: selector || createSelectorElement(customStyles),
    })
    this.HTMLNode.classList.add(selectorClass)

    this.DS.subscribe('MainLoop:start', this.start)
    this.DS.subscribe('MainLoop:update', this.update)
    this.DS.subscribe('MainLoop:end', this.stop)
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
    this.Element.stop()
  }

  /** Moves the selection to the correct place */
  update = () => {
    const {
      stores: { ScrollStore, PointerStore },
      checkIfInsideSelection,
    } = this.DS
    const pos = getSelectorPosition({
      scrollAmount: ScrollStore.scrollAmount,
      initialPointerPos: PointerStore.initialValArea,
      pointerPos: PointerStore.currentValArea,
    })
    updateElementStylePos(this.HTMLNode, pos)
    checkIfInsideSelection()
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Node

  /** @type {HTMLElement} */
  get HTMLNode() {
    return /** @type {HTMLElement} */ (this.Element.HTMLNode)
  }

  /** @param {HTMLElement} element */
  set HTMLNode(element) {
    this.Element.HTMLNode = element
  }
}
