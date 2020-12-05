// @ts-check
import '../types.js'
import DragSelect from '../DragSelect'
import { Element } from './'
import {
  createSelectorAreaElement,
  isCollision,
  isCursorNearEdges,
  isInsideElement,
} from '../methods'

class SelectorArea {
  /** @type {DSEdges} @private */
  _currentEdges
  /** @type {number} @private */
  _autoScrollInterval
  /** @type {number} */
  autoScrollSpeed
  /** @type {number} @private */
  _subAreaModified

  /**
   * @class SelectorArea
   * @constructor SelectorArea
   * @param {{ DS:DragSelect, selectorAreaClass:string, autoScrollSpeed:number}} obj
   * @ignore
   */
  constructor({ DS, selectorAreaClass, autoScrollSpeed }) {
    this.autoScrollSpeed = autoScrollSpeed === 0 ? 0 : autoScrollSpeed
    this.DS = DS
    this.Element = new Element({
      node: createSelectorAreaElement(selectorAreaClass),
    })

    this.HTMLNode.append(this.DS.Selector.HTMLNode)
    document.body.append(this.HTMLNode)
  }

  /** Add observers */
  start() {
    this._subAreaModified = this.DS.subscribe('Area:modified', this.updatePos)
  }

  /** Remove observers */
  stop() {
    this.DS.unsubscribe('Area:modified', null, this._subAreaModified)

    if (this._autoScrollInterval) {
      window.clearInterval(this._autoScrollInterval)
      this._autoScrollInterval = null
    }

    this.Element.stop()
  }

  /**
   * Updates the selectorAreas positions to match the areas
   */
  updatePos = () => {
    console.log('UPDATE POS')
    const rect = this.DS.Area.boundingClientRect
    const border = this.DS.Area.computedBorder
    this.HTMLNode.style.top = `${rect.top + border.top}px`
    this.HTMLNode.style.left = `${rect.left + border.left}px`
    this.HTMLNode.style.width = `${rect.width}px`
    this.HTMLNode.style.height = `${rect.height}px`
  }

  reset() {
    this.stop()
    this.start()
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Autoscroll

  /**
   * Creates an interval that autoscrolls while the cursor is near the edge
   */
  handleAutoscroll() {
    const {
      stores: { PointerStore, ScrollStore },
      Area,
      Selector,
    } = this.DS

    this._currentEdges = isCursorNearEdges({
      position: PointerStore.currentValArea,
      boundingRect: Area.boundingClientRect,
    })

    if (this._currentEdges.length) {
      if (this._autoScrollInterval) return

      this._autoScrollInterval = window.setInterval(() => {
        ScrollStore.update()
        Selector.update()
        Area.scroll(this._currentEdges, this.autoScrollSpeed)
      }, 25)
    } else if (!this._currentEdges.length && this._autoScrollInterval) {
      window.clearInterval(this._autoScrollInterval)
      this._autoScrollInterval = null
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Booleans

  /**
   * Checks if the element is either inside the Selector Area
   * (as a reachable child or touching the area)
   * @param {DSElement} element
   * @returns {boolean}
   */
  isInside = (element) =>
    isInsideElement(element, this.DS.Area.HTMLNode, this.HTMLNode)

  /**
   * checks if the click was triggered on the area.
   * @returns {boolean}
   */
  isClicked() {
    const {
      stores: { PointerStore },
    } = this.DS

    const cPos = {
      x: PointerStore.initialVal.x,
      y: PointerStore.initialVal.y,
      w: 0,
      h: 0,
    }

    const areaRect = {
      x: this.boundingClientRect.left,
      y: this.boundingClientRect.top,
      w: this.HTMLNode.offsetWidth,
      h: this.HTMLNode.offsetHeight,
    }

    return isCollision(cPos, areaRect)
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Aliases

  get HTMLNode() {
    return /** @type {HTMLElement} */ (this.Element.HTMLNode)
  }

  get boundingClientRect() {
    return this.Element.boundingClientRect
  }

  get computedBorder() {
    return this.Element.computedBorder
  }

  get computedStyle() {
    return this.Element.computedStyle
  }

  set HTMLNode(element) {
    this.Element.HTMLNode = element
  }
}

export default SelectorArea
