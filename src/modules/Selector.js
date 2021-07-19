// @ts-check
import '../types.js'
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
    this.DS.subscribe('Interaction:update', this.update)
    this.DS.subscribe('Interaction:end', this.stop)
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
