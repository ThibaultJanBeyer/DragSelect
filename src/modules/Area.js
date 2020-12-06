// @ts-check
import '../types.js'

import { Element, PubSub } from './'
import {
  addModificationObservers,
  debounce,
  removeModificationObservers,
  scrollElement,
} from '../methods'

export default class Area {
  /** @type {DSModificationCallback} */
  _modificationCallback
  /** @type {MutationObserver} */
  _modificationObserver

  /**
   * @constructor Area
   * @param {Object} obj
   * @param {DSArea} obj.area
   * @param {PubSub} obj.PS
   * @param {number} obj.zoom
   * @ignore
   */
  constructor({ area, PS, zoom }) {
    this.Element = new Element({ node: area, zoom })
    this.PubSub = PS

    // Fix: Area has to have a special position attribute for calculations
    const position = this.computedStyle.position
    const isPositioned =
      position === 'absolute' || position === 'relative' || position === 'fixed'
    if (!(this.HTMLNode instanceof HTMLDocument) && !isPositioned)
      this.HTMLNode.style.position = 'relative'

    this._modificationCallback = debounce((event) => {
      this.Element.reset()
      this.PubSub.publish('Area:modified', { event, item: this })
    }, 60)
    this._modificationObserver = new MutationObserver(
      this._modificationCallback
    )

    // first immediate debounce to update values after dom-update
    setTimeout(() => {
      this.Element.reset()
      this.PubSub.publish('Area:modified', { event, item: this })
    })

    this.PubSub.subscribe('MainLoop:init', this.start)
    this.PubSub.subscribe('MainLoop:end', () => this.Element.stop())
  }

  /** Add observers */
  start = () => {
    addModificationObservers(
      this.parentNodes,
      this._modificationCallback,
      this._modificationObserver
    )
  }

  /** Remove observers */
  stop = () => {
    removeModificationObservers(
      this._modificationObserver,
      this._modificationCallback
    )
    this.Element.stop()
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Scroll

  /**
   * Scroll the area in the specified direction
   * @param {Array.<'top'|'bottom'|'left'|'right'|undefined>} directions
   * @param {number} multiplier
   */
  scroll = (directions, multiplier) =>
    scrollElement(this.HTMLNode, directions, multiplier)

  //////////////////////////////////////////////////////////////////////////////////////
  // Aliases

  get HTMLNode() {
    this.Element.boundingClientRect
    return /** @type {DSArea} */ (this.Element.HTMLNode)
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

  get parentNodes() {
    return this.Element.parentNodes
  }
}
