// @ts-check
import '../types'

/**
 * @param {Vect2} v1
 * @param {'+'|'-'|'*'|'/'} operator
 * @param {Vect2} v2
 * @return {Vect2}
 */
export const calc = ({ x: x1, y: y1 }, operator, { x: x2, y: y2 }) => {
  const calculations = {
    '+': {
      x: x1 + x2,
      y: y1 + y2,
    },
    '-': {
      x: x1 - x2,
      y: y1 - y2,
    },
    '*': {
      x: x1 * x2,
      y: y1 * y2,
    },
    '/': {
      x: x1 / x2,
      y: y1 / y2,
    },
  }
  return calculations[operator]
}

/**
 * @param {{left:number,top:number}} rect
 * @returns {Vect2}
 */
export const rect2vect = (rect) => ({ x: rect.left, y: rect.top })
/**
 * @param {Vect2} vect
 * @param {number} dimension
 * @returns {DSBoundingRect}
 */
export const vect2rect = (vect, dimension = 0) => ({
  left: vect.x,
  top: vect.y,
  right: vect.x,
  bottom: vect.y,
  width: dimension,
  height: dimension,
})
/**
 * @param {number} n
 * @returns {Vect2}
 */
export const num2vect = (n) => ({ x: n, y: n })
