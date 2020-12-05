// @ts-check
import '../types'
import { isCollision, canScroll } from './'

/**
 * Checks if there is a collision between the element and the selector
 * (whether they touch each other)
 * @param {DSElement} element
 * @param {DSArea} area
 * @param {DSSelectorArea} selectorArea
 * @return {boolean}
 */
export default (element, area, selectorArea) => {
  if (area.contains(element) && canScroll(area)) return true

  const selectorAreaRect = {
    y: selectorArea.getBoundingClientRect().top,
    x: selectorArea.getBoundingClientRect().left,
    h: selectorArea.offsetHeight,
    w: selectorArea.offsetWidth,
  }

  const rect = element.getBoundingClientRect()
  const elementRect = {
    y: rect.top,
    x: rect.left,
    h: rect.height,
    w: rect.width,
  }

  if (isCollision(selectorAreaRect, elementRect)) return true

  return false
}
