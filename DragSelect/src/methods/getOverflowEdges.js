// @ts-check
import '../types'

/**
 * Returns the edges that an element is overflowing
 * @param {Object} p
 * @param {DSBoundingRect} p.elementRect
 * @param {DSBoundingRect} p.containerRect
 * @param {Vect2} [p.tolerance]
 * @returns {DSEdges}
 */
export default ({
  elementRect,
  containerRect,
  tolerance = {
    x: 0,
    y: 0,
  },
}) => {
  const edges = []
  if (elementRect.top - tolerance.y < containerRect.top) edges.push('top')
  if (elementRect.left - tolerance.x < containerRect.left) edges.push('left')
  if (elementRect.bottom + tolerance.y > containerRect.bottom)
    edges.push('bottom')
  if (elementRect.right + tolerance.y > containerRect.right) edges.push('right')
  return /** @type {DSEdges} */ (edges)
}
