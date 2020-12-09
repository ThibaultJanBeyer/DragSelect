// @ts-check
import '../types'
import { isCollision } from './'

/**
 * Checks if there is a collision between the element and the selector
 * (whether they touch each other)
 * @param {DSElement} element
 * @param {DSElementPos} selectorPos
 * @return {boolean}
 */
export default (element, selectorPos) => {
  const rect = element.getBoundingClientRect()
  const elementPos = {
    y: rect.top,
    x: rect.left,
    h: rect.height,
    w: rect.width,
  }

  return isCollision(selectorPos, elementPos)
}
