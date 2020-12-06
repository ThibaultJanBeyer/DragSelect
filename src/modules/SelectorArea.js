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
  _autoScrollSpeed

  /**
   * @class SelectorArea
   * @constructor SelectorArea
   * @param {{ DS:DragSelect, selectorAreaClass:string, autoScrollSpeed:number}} obj
   * @ignore
   */
  constructor({ DS, selectorAreaClass, autoScrollSpeed }) {
    this._autoScrollSpeed = autoScrollSpeed
    this.DS = DS
    this.Element = new Element({
      node: createSelectorAreaElement(selectorAreaClass),
    })

    this.HTMLNode.append(this.DS.Selector.HTMLNode)
    document.body.append(this.HTMLNode)

    this.DS.subscribe('Area:modified', this.updatePos)
    this.DS.subscribe('MainLoop:update', this.handleAutoScroll)
    this.DS.subscribe('MainLoop:end', this.stop)
  }

  stop = () => {
    this.Element.stop()
  }

  /** Updates the selectorAreas positions to match the areas */
  updatePos = () => {
    const rect = this.DS.Area.boundingClientRect
    const border = this.DS.Area.computedBorder
    const { style } = this.HTMLNode
    const top = `${rect.top + border.top}px`
    const left = `${rect.left + border.left}px`
    const width = `${rect.width}px`
    const height = `${rect.height}px`
    if (style.top !== top) style.top = top
    if (style.left !== left) style.left = left
    if (style.width !== width) style.width = width
    if (style.height !== height) style.height = height
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Autoscroll

  /** Creates an interval that autoscrolls while the cursor is near the edge */
  handleAutoScroll = ({ dt }) => {
    const {
      stores: { PointerStore },
      Area,
    } = this.DS

    const currentEdges = isCursorNearEdges({
      position: PointerStore.currentValArea,
      boundingRect: Area.boundingClientRect,
    })

    if (currentEdges.length) {
      Area.scroll(currentEdges, this._autoScrollSpeed / dt)
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
}

export default SelectorArea
