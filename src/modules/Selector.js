// @ts-check
import '../types.js'
import DragSelect from '../DragSelect'

import {
  createSelectorElement,
  getPosition,
  getSelectorPosition,
  updateElementStylePos,
} from '../methods'

export default class Selector {
  /**
   * @type {DSElementPos}
   * @private
   */
  _position

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

  start = () => {
    const {
      stores: { PointerStore },
    } = this.DS
    const pPos = PointerStore.initialValArea
    updateElementStylePos(this.HTMLNode, {
      x: pPos.x,
      y: pPos.y,
      w: 1,
      h: 1,
    })
    this.HTMLNode.style.display = 'block'
    this._position = null
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
    this._position = null
  }

  get position() {
    if (this._position) return this._position
    return (this._position = getPosition(this.HTMLNode))
  }
}
