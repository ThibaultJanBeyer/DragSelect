// @ts-check
import '../types'
/**
 * Returns the compound bounding rect of multiple elements.
 * @param {DSElements} elements
 * @returns {DSBoundingRect}
 */
export default (elements) => {
  const rect = {
    top: Number.POSITIVE_INFINITY,
    left: Number.POSITIVE_INFINITY,
    bottom: Number.NEGATIVE_INFINITY,
    right: Number.NEGATIVE_INFINITY,
    width: Number.NEGATIVE_INFINITY,
    height: Number.NEGATIVE_INFINITY,
  }

  elements = Array.isArray(elements) ? elements : [elements]
  elements.forEach((element) => {
    const elementRect = element.getBoundingClientRect()
    rect.top = Math.min(rect.top, elementRect.top)
    rect.left = Math.min(rect.left, elementRect.left)
    rect.bottom = Math.max(rect.bottom, elementRect.bottom)
    rect.right = Math.max(rect.right, elementRect.right)
  })

  rect.height = rect.bottom - rect.top
  rect.width = rect.right - rect.left

  return rect
}
