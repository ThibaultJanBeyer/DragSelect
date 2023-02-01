// @ts-check
import '../types'

import {
  getStylePosition,
  setStylePosition,
  handleElementOverflow,
  getOverflowEdges,
  vect2,
} from './'

/**
 * Moves the element in a posDirection
 * @param {Object} p
 * @param {DSElement} p.element
 * @param {Vect2} p.posDirection
 * @param {DSBoundingRect} p.containerRect
 * @param {boolean} p.useTransform
 */
export default ({ element, posDirection, containerRect, useTransform }) => {
  const elementPos = getStylePosition(element, useTransform)
  const newPos = vect2.calc(elementPos, '+', posDirection)
  setStylePosition(element, newPos, useTransform)

  const elementRect = element.getBoundingClientRect()
  const edges = getOverflowEdges({
    elementRect,
    containerRect,
  })

  handleElementOverflow({
    element,
    edges,
    elementRect,
    containerRect,
    elementPos: newPos,
    useTransform,
  })
}
