// @ts-check
import '../types'

/**
 * Check if the selector is near a edges of the area
 * @param {{position:Vect2,boundingRect:DSBoundingRect}} props
 * @return {DSEdges}
 */
export default ({ position, boundingRect }) => {
  const tolerance = {
    x: 10,
    y: 10,
  }

  const edges = []
  if (position.y < tolerance.y) edges.push('top')
  if (boundingRect.height - position.y < tolerance.y) edges.push('bottom')
  if (boundingRect.width - position.x < tolerance.x) edges.push('right')
  if (position.x < tolerance.x) edges.push('left')

  return /** @type {DSEdges} */ (edges)
}
