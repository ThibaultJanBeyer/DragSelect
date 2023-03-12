// @ts-check
import '../types.js'
import DragSelect from '../DragSelect'
import {
  createSelectorAreaElement,
  isCollision,
  getOverflowEdges,
  vect2,
} from '../methods'

export default class SelectorArea {
  /**
   * @type {*}
   * @private
   * */
  _scrollInterval
  /**
   * @type {DSBoundingRect}
   * @private
   */
  _rect
  /**
   * @type {DSEdges}
   * @private
   */
  currentEdges = []

  /**
   * @class SelectorArea
   * @constructor SelectorArea
   * @param {{ DS:DragSelect }} obj
   * @ignore
   */
  constructor({ DS }) {
    this.DS = DS

    this.HTMLNode = createSelectorAreaElement()
    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:selectorAreaClass', ({ settings }) => {
      this.HTMLNode.classList.remove(settings['selectorAreaClass:pre'])
      this.HTMLNode.classList.add(settings['selectorAreaClass'])
    })
    this.HTMLNode.classList.add(this.DS.stores.SettingsStore.s.selectorAreaClass)

    this.DS.subscribe('Area:modified', this.updatePos)
    this.DS.subscribe('Area:modified', this.updatePos)
    this.DS.subscribe('Interaction:init', this.start)
    this.DS.subscribe('Interaction:start', this.startAutoScroll)
    this.DS.subscribe('Interaction:end', () => {
      this.updatePos()
      this.stopAutoScroll()
    })
  }

  start = () => {
    this.applyElements('append')
    this.updatePos()
  }

  /**
   * Adding / Removing elements to document
   * @param {'append'|'remove'} method
   */
  applyElements = (method = 'append') => {
    const docEl = document.body ? 'body' : 'documentElement'
    const methodName = `${method}Child`
    this.HTMLNode[methodName](this.DS.Selector.HTMLNode)
    document[docEl][methodName](this.HTMLNode)
  }

  /** Updates the selectorAreas positions to match the areas */
  updatePos = () => {
    this._rect = null
    const rect = this.DS.Area.rect
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

  stop = (remove) => {
    this.stopAutoScroll()
    if (remove) this.applyElements('remove')
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // AutoScroll

  startAutoScroll = () => {
    this.currentEdges = []
    this._scrollInterval = setInterval(() => this.handleAutoScroll(), 16)
  }

  /** Creates an interval that auto-scrolls while the cursor is near the edge */
  handleAutoScroll = () => {
    if (this.DS.continue) return
    const {
      stores: { PointerStore },
      Area,
    } = this.DS

    this.currentEdges = getOverflowEdges({
      elementRect: vect2.vect2rect(PointerStore.currentVal),
      containerRect: this.rect,
      tolerance: this.DS.stores.SettingsStore.s.overflowTolerance,
    })

    if (this.currentEdges.length)
      Area.scroll(this.currentEdges, this.DS.stores.SettingsStore.s.autoScrollSpeed)
  }

  stopAutoScroll = () => {
    this.currentEdges = []
    clearInterval(this._scrollInterval)
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Booleans

  /**
   * Checks if the element is either inside the Selector Area
   * (as a reachable child or touching the area)
   * @param {DSElement} element
   * @param {DSBoundingRect} [elementRect] - slight performance improvements
   * @returns {boolean}
   */
  isInside = (element, elementRect) => {
    if (
      this.DS.Area.HTMLNode.contains(element) &&
      this.DS.stores.ScrollStore.canScroll
    )
      return true
    return isCollision(
      this.rect,
      elementRect || element.getBoundingClientRect()
    )
  }

  /**
   * checks if the click was triggered on the area.
   * @param {DSEvent} [event]
   * @returns {boolean}
   */
  isClicked(event) {
    const {
      stores: { PointerStore },
    } = this.DS

    const initialVal = event
      ? PointerStore.getPointerPosition(event)
      : PointerStore.initialVal

    return isCollision(
      {
        left: initialVal.x,
        top: initialVal.y,
        right: initialVal.x,
        bottom: initialVal.y,
      },
      this.rect
    )
  }

  get rect() {
    if (this._rect) return this._rect
    return (this._rect = this.HTMLNode.getBoundingClientRect())
  }
}
