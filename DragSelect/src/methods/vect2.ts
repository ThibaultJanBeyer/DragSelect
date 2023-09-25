import { DSBoundingRect, DSBoundingRectBase, Vect2 } from "../types"

type Operator = '+'|'-'|'*'|'/'
export const calcVect = ({ x: x1, y: y1 }: Vect2, operator: Operator, { x: x2, y: y2 }: Vect2): Vect2 => {
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
export const rect2vect = (rect: DSBoundingRectBase|DSBoundingRect): Vect2 => ({ x: rect.left, y: rect.top })
export const vect2rect = (vect: Vect2, dimension: number = 0): DSBoundingRect => ({
  left: vect.x,
  top: vect.y,
  right: vect.x,
  bottom: vect.y,
  width: dimension,
  height: dimension,
})
export const num2vect = (n: number): Vect2 => ({ x: n, y: n })
