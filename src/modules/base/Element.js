// @ts-check
import '../../types.js'
import { getAreaRect } from '../../methods'

export default class Element {
  /** @type {number} */
  _zoom
  /** @type {DSArea} */
  _node
  /** @type {[DSArea]} */
  _parentNodes
  /** @type {CSSStyleDeclaration} @private */
  _computedStyle
  /** @type {{top:number,bottom:number,left:number,right:number}} */
  _computedBorder
  /** @type {DSBoundingRect} @private */
  _boundingClientRect

  /**
   * @class AreaElement
   * @constructor AreaElement
   * @param {Object} obj
   * @param {DSArea} [obj.node]
   * @param {number} [obj.zoom]
   * @ignore
   */
  constructor({ node, zoom = 1 }) {
    this.HTMLNode = node
    this._zoom = zoom
  }

  reset() {
    this._computedStyle = undefined
    this._boundingClientRect = undefined
    this._computedBorder = undefined
    this._parentNodes = undefined
  }

  stop() {
    this.reset()
  }

  /** @type {DSArea} */
  get HTMLNode() {
    return this._node
  }

  /** @param {DSArea} element */
  set HTMLNode(element) {
    this._node = element
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
      return (this._computedStyle = getComputedStyle(this.HTMLNode.body))
    else return (this._computedStyle = getComputedStyle(this.HTMLNode))
  }

  /**
   * The element rect (caches result) (without scrollbar or borders)
   * @type {DSBoundingRect}
   */
  get boundingClientRect() {
    if (this._boundingClientRect) return this._boundingClientRect

    return (this._boundingClientRect = getAreaRect(this.HTMLNode, this._zoom))
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
