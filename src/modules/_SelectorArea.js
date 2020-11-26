// @ts-check
import '../types.js'
import { _getAreaRect, _getComputedBorder } from './'

/**
 * @callback DSModificationCallback
 * @param {*} event
 */

class SelectorArea {
  /** @type {DSModificationCallback} */
  modificationCallback
  /** @type {MutationObserver} */
  modificationObserver
  /** @type {HTMLDivElement} */
  node

  /**
   * @class SelectorArea
   * @constructor SelectorArea
   * @param {{ Area:*, selectorAreaClass:string, selector:HTMLElement}} obj
   * @ignore
   */
  constructor({ Area, selectorAreaClass, selector }) {
    this.Area = Area
    this.selectorAreaClass = selectorAreaClass
    this.selector = selector
    this.setup()
  }

  /**
   * - Create Selector Area
   * - Update Selector Area Position
   * - Create modification callbacks and observers
   * - Append selector to Selector Area
   * - Append Selector Area to body
   */
  setup() {
    this.node = createSelectorArea(this.selectorAreaClass)
    this.update()

    this.modificationCallback = (event) => this.update()
    this.modificationObserver = new MutationObserver(this.modificationCallback)

    this.node.append(this.selector)
    document.body.append(this.node)
  }

  /**
   * Add observers
   */
  start() {
    addObservers(
      this.Area.node,
      this.modificationCallback,
      this.modificationObserver
    )
  }

  /**
   * Update Position
   */
  update() {
    updatePosition(this.node, this.Area.node)
  }

  /**
   * Remove observers
   */
  stop() {
    removeObservers(this.modificationObserver, this.modificationCallback)
  }

  /**
   * - Remove observers
   * - Remove selector
   * - Remove Selector Area
   */
  teardown() {
    this.stop()
    this.selector.remove()
    this.node.remove()
  }
}

/**
 * Creates the SelectorArea
 * @param {string} selectorAreaClass
 * @return {HTMLDivElement}
 * @private
 */
const createSelectorArea = (selectorAreaClass) => {
  const node = document.createElement('div')
  node.style.position = 'fixed'
  node.style.overflow = 'hidden'
  node.style.pointerEvents = 'none'
  node.classList.add(selectorAreaClass)
  return node
}

/**
 * Adds event-listeners to the selectorArea
 * @param {DSArea} area
 * @param {DSModificationCallback} callback
 * @param {MutationObserver} modificationObserver
 * @private
 */
const addObservers = (area, callback, modificationObserver) => {
  window.addEventListener('resize', callback)
  window.addEventListener('scroll', callback)
  modificationObserver.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
  })
  modificationObserver.observe(area, { attributes: true })
}

/**
 * Removes event-listeners to the selectorArea
 * @param {MutationObserver} modificationObserver
 * @param {DSModificationCallback} callback
 * @private
 */
const removeObservers = (modificationObserver, callback) => {
  window.removeEventListener('resize', callback)
  window.removeEventListener('scroll', callback)
  modificationObserver.disconnect()
}

/**
 * Updates the selectorAreas positions to match the areas
 * @param {HTMLElement} selectorArea
 * @param {DSArea} area
 * @return {HTMLElement}
 * @private
 */
const updatePosition = (selectorArea, area) => {
  const rect = _getAreaRect(area)
  const border = _getComputedBorder(area)
  selectorArea.style.top = `${rect.top + border.top}px`
  selectorArea.style.left = `${rect.left + border.left}px`
  selectorArea.style.width = `${rect.width - border.left - border.right}px`
  selectorArea.style.height = `${rect.height - border.top - border.bottom}px`
  return selectorArea
}

export default SelectorArea
