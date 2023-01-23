// @ts-check
import '../types'
import { isCollision } from '.'

/**
 * Logic for checking and filtering out elements that are
 * parents of other selected elements as well as intersecting
 * @param {Array} list
 * @param {Array} listRects
 * @param {DSBoundingRect | DOMRect} rect
 * @returns {Array}
 */
export default (list, listRects, rect) => {
  const toRemove = []
  for (let i = 0; i < list.length; i++)
    for (let j = 0; j < list.length; j++) {
      const parent = list[i]
      const parentRect = listRects[i]
      const child = list[j]
      const childRect = listRects[j]
      if (parent === child || !isCollision(childRect, parentRect, 0) ||
        parent.parentNode === null || child.parentNode === null ||
        parent.parentNode === child.parentNode)
        continue
      else if (parent.parentNode.contains(child.parentNode) &&
        // Continue to select if user draws a rectangle that
        // covers more than then child ifself
        isCollision(rect, childRect, 1)) {
        toRemove.push(parent)
        break
      }
    }

  return toRemove
}
