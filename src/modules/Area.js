// @ts-check
import '../types.js'

import { PubSub } from './'
import {
  addModificationObservers,
  debounce,
  getAreaRect,
  removeModificationObservers,
  scrollElement,
  handleElementPositionAttribute,
} from '../methods'

/**
 * @typedef {Object} AreaProps
 * @property {DSArea} area
 * @property {PubSub} PS
 * @property {number} zoom
 */

export default class Area {
  /**
   * @type {DSModificationCallback}
   * @private
   */
  _modificationCallback
  /**
   * @type {MutationObserver}
   * @private
   */
  _modificationObserver
  /**
   * @type {number}
   * @private
   */
  _zoom
  /**
   * @type {DSArea}
   * @private
   */
  _node
  /**
   * @type {DSArea[]}
   * @private
   */
  _parentNodes
  /**
   * @type {CSSStyleDeclaration}
   * @private
   * */
  _computedStyle
  /**
   * @type {{top:number,bottom:number,left:number,right:number}}
   * @private
   * */
  _computedBorder
  /**
   * @type {DSBoundingRect}
   * @private
   * */
  _rect

  /**
   * @constructor Area
   * @param {AreaProps} settings
   * @ignore
   */
  constructor({ area, PS, zoom }) {
    this._zoom = zoom
    this.PubSub = PS
    this.setArea(area)

    this._modificationCallback = debounce((event) => {
      this.PubSub.publish('Area:modified:pre', { event, item: this })
      this.reset()
      this.PubSub.publish('Area:modified', { event, item: this })
    }, 60)
    this._modificationObserver = new MutationObserver(
      this._modificationCallback
    )

    this.PubSub.subscribe('Interaction:init', this.start)
    this.PubSub.subscribe('Interaction:end', this.reset)
  }

  /** @param {DSArea} area */
  setArea = (area) => {
    this._node = area
    handleElementPositionAttribute({
      computedStyle: this.computedStyle,
      node: this._node,
    })

    // first immediate debounce to update values after dom-update
    setTimeout(() => {
      this.PubSub.publish('Area:modified:pre', { item: this })
      this.reset()
      this.PubSub.publish('Area:modified', { item: this })
    })
  }

  start = () => {
    addModificationObservers(
      this.parentNodes,
      this._modificationCallback,
      this._modificationObserver
    )
  }

  reset = () => {
    this._computedStyle = undefined
    this._rect = undefined
    this._computedBorder = undefined
    this._parentNodes = undefined
  }

  stop = () => {
    removeModificationObservers(
      this._modificationObserver,
      this._modificationCallback
    )
    this.reset()
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Scroll

  /**
   * Scroll the area in the specified direction
   * @param {Array.<'top'|'bottom'|'left'|'right'|undefined>} directions
   * @param {number} multiplier
   */
  scroll = (directions, multiplier) => {
    const data = {
      scroll_directions: directions,
      scroll_multiplier: multiplier,
    }
    this.PubSub.publish('Area:scroll:pre', data)
    scrollElement(this._node, directions, multiplier)
    this.PubSub.publish('Area:scroll', data)
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Node Getters

  get HTMLNode() {
    return /** @type {DSArea} */ (this._node)
  }

  /**
   * The computed border from the element (caches result)
   * @type {{top:number,bottom:number,left:number,right:number}}
   */
  get computedBorder() {
    if (this._computedBorder) return this._computedBorder
    return {
      top: parseInt(this.computedStyle.borderTopWidth),
      bottom: parseInt(this.computedStyle.borderBottomWidth),
      left: parseInt(this.computedStyle.borderLeftWidth),
      right: parseInt(this.computedStyle.borderRightWidth),
    }
  }

  /**
   * The computed styles from the element (caches result)
   * @type {CSSStyleDeclaration}
   */
  get computedStyle() {
    if (this._computedStyle) return this._computedStyle
    if (this.HTMLNode instanceof HTMLDocument)
      return (this._computedStyle = window.getComputedStyle(
        this.HTMLNode.body || this.HTMLNode.documentElement
      ))
    else return (this._computedStyle = window.getComputedStyle(this.HTMLNode))
  }

  /**
   * The element rect (caches result) (without scrollbar or borders)
   * @type {DSBoundingRect}
   */
  get rect() {
    if (this._rect) return this._rect
    return (this._rect = getAreaRect(this.HTMLNode, this._zoom))
  }

  get parentNodes() {
    if (this._parentNodes) return this._parentNodes

    const traverse = (toWatch, index = 0) => {
      const parent = toWatch[index]?.parentNode
      if (parent) {
        toWatch.push(parent)
        index++
        return traverse(toWatch, index)
      } else {
        return toWatch
      }
    }

    this._parentNodes = traverse([this.HTMLNode])
    return this._parentNodes
  }
}
