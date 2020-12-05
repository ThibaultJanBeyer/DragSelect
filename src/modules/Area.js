// @ts-check
import '../types.js'

import { Element, PubSub } from './'
import {
  addModificationObservers,
  debounce,
  removeModificationObservers,
  scrollElement,
} from '../methods'

class Area {
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
  }

  /** Add observers */
  start() {
    addModificationObservers(
      this.parentNodes,
      this._modificationCallback,
      this._modificationObserver
    )

    this.HTMLNode.addEventListener('mousedown', this._startEvent)
    this.HTMLNode.addEventListener('touchstart', this._startEvent, {
      passive: false,
    })
  }

  /**
   * Remove observers
   */
  stop() {
    removeModificationObservers(
      this._modificationObserver,
      this._modificationCallback
    )

    this.HTMLNode.removeEventListener('mousedown', this._startEvent)
    this.HTMLNode.removeEventListener('touchstart', this._startEvent, {
      // @ts-ignore
      passive: false,
    })

    document.removeEventListener('mousemove', this._moveEvent)
    document.removeEventListener('touchmove', this._moveEvent, {
      // @ts-ignore
      passive: false,
    })

    document.removeEventListener('mouseup', this._endEvent)
    document.removeEventListener('touchend', this._endEvent)

    this.Element.stop()
  }

  reset() {
    this.stop()
    this.start()
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
  // Event Handlers

  /**
   * Triggered on dragging selection
   * @param {DSEvent} event
   */
  _moveEvent = (event) => this.PubSub.publish('Area:move', event)

  /**
   * Triggered on end of dragging a selection
   * @param {DSEvent} event
   */
  _endEvent = (event) => this.PubSub.publish('Area:endmove', event)

  /**
   * Triggered on start of dragging a selection
   * @param {DSEvent} event
   */
  _startEvent = (event) => this._started(event)

  /**
   * Adds follow-up listeners when a start is initiated
   * @param {DSEvent} event
   */
  _started(event) {
    this.PubSub.publish('Area:startmove', event)
    document.addEventListener('mousemove', this._moveEvent)
    document.addEventListener('touchmove', this._moveEvent, {
      passive: false,
    })
    document.addEventListener('mouseup', this._endEvent)
    document.addEventListener('touchend', this._endEvent)
  }

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

export default Area
