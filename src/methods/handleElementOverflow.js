// @ts-check
import '../types'

import { setStylePosition } from './'

/**
 * pushes element back the overflow amount
 * (top - top gives overflow, then new position pushed back by overflow)
 * @param {Object} p
 * @param {DSElement} p.element
 * @param {DSEdges} p.edges
 * @param {DSBoundingRect} p.elementRect
 * @param {DSBoundingRect} p.containerRect
 * @param {Vect2} p.elementPos
 * @param {boolean} p.useTransform
 */
export default ({
  element,
  edges,
  elementRect,
  containerRect,
  elementPos,
  useTransform,
}) => {
  if (edges.includes('top')) {
    setStylePosition(
      element,
      {
        y: elementPos.y + containerRect.top - elementRect.top,
        x: elementPos.x,
      },
      useTransform
    )
  }
  if (edges.includes('left')) {
    setStylePosition(
      element,
      {
        y: elementPos.y,
        x: elementPos.x + containerRect.left - elementRect.left,
      },
      useTransform
    )
  }
  if (edges.includes('bottom')) {
    setStylePosition(
      element,
      {
        y: elementPos.y + containerRect.bottom - elementRect.bottom,
        x: elementPos.x,
      },
      useTransform
    )
  }
  if (edges.includes('right')) {
    setStylePosition(
      element,
      {
        y: elementPos.y,
        x: elementPos.x + containerRect.right - elementRect.right,
      },
      useTransform
    )
  }
}
