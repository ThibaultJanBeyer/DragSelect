import '../types.js'
import { _getAreaRect, _getComputedBorder } from './'

/**
 * Creates the SelectorArea
 * @return {HTMLElement}
 */
export const create = () => {
  const selectorArea = document.createElement('div')
  selectorArea.style.position = 'fixed'
  selectorArea.style.overflow = 'hidden'
  selectorArea.style.pointerEvents = 'none'
  return selectorArea
}

/**
 * @param {HTMLElement} selectorArea
 * @param {DSArea} area
 * @param {DSZoom} zoom
 * @return {function}
 */
const modificationEvent = (selectorArea, area, zoom) => (event) => updatePosition(selectorArea, area, zoom)

/** @type {*} */
let modificationCallback
/** @type {MutationObserver} */
let modificationObserver

/**
 * Adds event-listeners to the selectorArea
 * @param {HTMLElement} selectorArea
 * @param {DSArea} area
 * @param {DSZoom} zoom
 */
export const addObservers = (selectorArea, area, zoom) => {
  modificationCallback = modificationEvent(selectorArea, area, zoom)
  window.addEventListener('resize', modificationCallback)
  window.addEventListener('scroll', modificationCallback)
  modificationObserver = new MutationObserver(modificationCallback);
  modificationObserver.observe(document.body, { subtree: true, childList: true, attributes: true });
  modificationObserver.observe(area, { attributes: true, });
}

/**
 * Removes event-listeners to the selectorArea
 */
export const removeObservers = () => {
  window.removeEventListener('resize', modificationCallback)
  window.removeEventListener('scroll', modificationCallback)
  modificationObserver.disconnect()
}

/**
 * Updates the selectorAreas positions to match the areas
 * @param {HTMLElement} selectorArea
 * @param {DSArea} area
 * @param {DSZoom} zoom
 * @return {HTMLElement}
 */
export const updatePosition = (selectorArea, area, zoom) => {
  const rect = _getAreaRect(area)
  const border = _getComputedBorder(area)
  selectorArea.style.top = `${rect.top + border.top}px`
  selectorArea.style.left = `${rect.left + border.left}px`
  selectorArea.style.width = `${rect.width * zoom}px`
  selectorArea.style.height = `${rect.height * zoom}px`
  return selectorArea
}
