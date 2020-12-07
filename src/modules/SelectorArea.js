// @ts-check
import '../types.js'
import DragSelect from '../DragSelect'
import {
  createSelectorAreaElement,
  isCollision,
  isCursorNearEdges,
  isInsideElement,
} from '../methods'

export default class SelectorArea {
  /** @type {number} @private */
  _autoScrollSpeed
  /** @type {*} @private */
  _scrollInterval

  /**
   * @class SelectorArea
   * @constructor SelectorArea
   * @param {{ DS:DragSelect, selectorAreaClass:string, autoScrollSpeed:number}} obj
   * @ignore
   */
  constructor({ DS, selectorAreaClass, autoScrollSpeed }) {
    this._autoScrollSpeed = autoScrollSpeed
    this.DS = DS

    this.HTMLNode = createSelectorAreaElement(selectorAreaClass)
    this.HTMLNode.append(this.DS.Selector.HTMLNode)
    const docEl = document.body ? 'body' : 'documentElement'
    document[docEl].append(this.HTMLNode)

    this.DS.subscribe('Area:modified', this.updatePos)
    this.DS.subscribe('Interaction:start', this.startAutoScroll)
    this.DS.subscribe('Interaction:end', this.stopAutoScroll)
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
  // AutoScroll

  startAutoScroll = () =>
    (this._scrollInterval = setInterval(() => this.handleAutoScroll(), 16))

  /** Creates an interval that auto-scrolls while the cursor is near the edge */
  handleAutoScroll = () => {
    const {
      stores: { PointerStore },
      Area,
    } = this.DS

    const currentEdges = isCursorNearEdges({
      position: PointerStore.currentValArea,
      boundingRect: Area.boundingClientRect,
    })

    if (currentEdges.length) Area.scroll(currentEdges, this._autoScrollSpeed)
  }

  stopAutoScroll = () => clearInterval(this._scrollInterval)

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

    const boundingClientRect = this.HTMLNode.getBoundingClientRect()

    const areaRect = {
      x: boundingClientRect.left,
      y: boundingClientRect.top,
      w: this.HTMLNode.offsetWidth,
      h: this.HTMLNode.offsetHeight,
    }

    return isCollision(cPos, areaRect)
  }
}
