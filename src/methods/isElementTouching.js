// @ts-check
import '../types'
import { isCollision } from './'

/**
 * Checks if there is a collision between the element and the selector
 * (whether they touch each other)
 * @param {DSElement} element
 * @param {HTMLElement} selector
 * @return {boolean}
 */
export default (element, selector) => {
  const selectionRect = {
    y: selector.getBoundingClientRect().top,
    x: selector.getBoundingClientRect().left,
    h: selector.offsetHeight,
    w: selector.offsetWidth,
  }

  const rect = element.getBoundingClientRect()
  const elementRect = {
    y: rect.top,
    x: rect.left,
    h: rect.height,
    w: rect.width,
  }

  if (isCollision(selectionRect, elementRect)) return true

  return false
}
