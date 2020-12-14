// @ts-check
import '../types'

import { setStylePosition } from './'

/**
 * pushes element back the overflow amount
 * (top - top gives overflow, then new position pushed back by overflow)
 * @param {Object} p
 * @param {DSElement} p.element
 * @param {DSBoundingRect} p.elementRect
 * @param {DSBoundingRect} p.containerRect
 * @param {Vect2} p.elementPos
 * @param {boolean} p.useTransform
 */
export default ({
  element,
  elementRect,
  containerRect,
  elementPos,
  useTransform,
}) => {
  if (elementRect.top < containerRect.top) {
    setStylePosition(
      element,
      {
        y: elementPos.y + containerRect.top - elementRect.top,
        x: elementPos.x,
      },
      useTransform
    )
  }
  if (elementRect.left < containerRect.left) {
    setStylePosition(
      element,
      {
        y: elementPos.y,
        x: elementPos.x + containerRect.left - elementRect.left,
      },
      useTransform
    )
  }
  if (elementRect.bottom > containerRect.bottom) {
    setStylePosition(
      element,
      {
        y: elementPos.y + containerRect.bottom - elementRect.bottom,
        x: elementPos.x,
      },
      useTransform
    )
  }
  if (elementRect.right > containerRect.right) {
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
