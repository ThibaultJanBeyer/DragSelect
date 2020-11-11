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
 * @return {function}
 */
const modificationEvent = (selectorArea, area) => (event) => updatePosition(selectorArea, area)

/** @type {*} */
let modificationCallback
/** @type {MutationObserver} */
let modificationObserver

/**
 * Adds event-listeners to the selectorArea
 * @param {HTMLElement} selectorArea
 * @param {DSArea} area
 */
export const addObservers = (selectorArea, area) => {
  modificationCallback = modificationEvent(selectorArea, area)
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
 * @return {HTMLElement}
 */
export const updatePosition = (selectorArea, area) => {
  const rect = _getAreaRect(area)
  const border = _getComputedBorder(area)
  selectorArea.style.top = `${rect.top + border.top}px`
  selectorArea.style.left = `${rect.left + border.left}px`
  selectorArea.style.width = `${rect.width}px`
  selectorArea.style.height = `${rect.height}px`
  return selectorArea
}
