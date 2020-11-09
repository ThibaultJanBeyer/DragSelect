import '../types.js'
import { _getScroll } from './'

/**
 * Checks if there is a collision between the element and the selector
 * (whether they touch each other)
 * @param {DSElement} element
 * @param {HTMLElement} selector
 * @param {DSZoom} zoom
 * @param {DSArea} area
 * @return {boolean}
 */
export default (element, selector, zoom, area) => {
  const scroll = _getScroll(area)

  const selectionRect = {
    y: selector.getBoundingClientRect().top / zoom + scroll.y,
    x: selector.getBoundingClientRect().left / zoom + scroll.x,
    h: selector.offsetHeight,
    w: selector.offsetWidth,
  }

  const rect = element.getBoundingClientRect()
  const elementRect = {
    y: rect.top / zoom + scroll.y,
    x: rect.left / zoom + scroll.x,
    h: rect.height / zoom,
    w: rect.width / zoom,
  }

  // Axis-Aligned Bounding Box Collision Detection.
  // Imagine following Example:
  //    b01
  // a01[1]a02
  //    b02      b11
  //          a11[2]a12
  //             b12
  // to check if those two boxes collide we do this AABB calculation:
  //& a01 < a12 (left border pos box1 smaller than right border pos box2)
  //& a02 > a11 (right border pos box1 larger than left border pos box2)
  //& b01 < b12 (top border pos box1 smaller than bottom border pos box2)
  //& b02 > b11 (bottom border pos box1 larger than top border pos box2)
  // See: https://en.wikipedia.org/wiki/Minimum_bounding_box#Axis-aligned_minimum_bounding_box and https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (
    selectionRect.x < elementRect.x + elementRect.w &&
    selectionRect.x + selectionRect.w > elementRect.x &&
    selectionRect.y < elementRect.y + elementRect.h &&
    selectionRect.h + selectionRect.y > elementRect.y
  ) {
    return true // collision detected!
  } else {
    return false
  }
}
