// @ts-check
import '../types'
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
 * @param {DSElementPos} a
 * @param {DSElementPos} b
 */
export default (el1, el2) => {
  if (
    el1.x < el2.x + el2.w && // 1.
    el1.x + el1.w > el2.x && // 2.
    el1.y < el2.y + el2.h && // 3.
    el1.h + el1.y > el2.y // 4.
  ) {
    return true // collision detected!
  } else {
    return false
  }
}
