// @ts-check
import '../types'

// [PUBLICLY EXPOSED METHOD]

/**
 * Axis-Aligned Bounding Box Collision Detection.
 * Imagine following Example:
 *
 *
 *        b01
 *     a01[1]a02
 *        b02      b11
 *              a11[2]a12
 *                 b12
 *
 *
 * to check if those two boxes collide we do this AABB calculation:
 * 1. a01 < a12 (left border pos box1 smaller than right border pos box2)
 * 2. a02 > a11 (right border pos box1 larger than left border pos box2)
 * 3. b01 < b12 (top border pos box1 smaller than bottom border pos box2)
 * 4. b02 > b11 (bottom border pos box1 larger than top border pos box2)
 * {@link https://en.wikipedia.org/wiki/Minimum_bounding_box#Axis-aligned_minimum_bounding_box Wikipedia}
 * {@link https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection MDN}
 * @param {{left:number,right:number,top:number,bottom:number}} el1
 * @param {{left:number,right:number,top:number,bottom:number}} el2
 * @param {number} [percent=0]
 *  1 = the element has to be completely inside the other element
 *  0.8 = the element has to be 80% inside the other element
 *  0.5 = the element has to be 50% inside the other element
 *  0.2 = the element has to be 20% inside the other element
 *  0 = the element only has to touch the other element
 * @returns {boolean}
 */
export default (el1, el2, percent = 0) => {
  let element1 = el1

  if (percent > 0) {
    const widthPoint = (el1.right - el1.left) * percent
    const heightPoint = (el1.bottom - el1.top) * percent
    element1 = {
      left: el1.left + widthPoint,
      right: el1.right - widthPoint,
      top: el1.top + heightPoint,
      bottom: el1.bottom - heightPoint,
    }
  }

  if (
    element1.left < el2.right && // 1.
    element1.right > el2.left && // 2.
    element1.top < el2.bottom && // 3.
    element1.bottom > el2.top // 4.
  )
    return true
  // collision detected!
  return false
}
