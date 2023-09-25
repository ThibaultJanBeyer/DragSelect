import { DSBoundingRect, DSEdges, Vect2 } from '../types'

type Props = {
  elementRect: DSBoundingRect
  containerRect: DSBoundingRect
  tolerance?: Vect2
}

/**
 * Returns the edges that an element is overflowing
 */
export const getOverflowEdges = ({
  elementRect,
  containerRect,
  tolerance = {
    x: 0,
    y: 0,
  },
}: Props): DSEdges => {
  const edges: DSEdges = []
  if (elementRect.top - tolerance.y < containerRect.top) edges.push('top')
  if (elementRect.left - tolerance.x < containerRect.left) edges.push('left')
  if (elementRect.bottom + tolerance.y > containerRect.bottom)
    edges.push('bottom')
  if (elementRect.right + tolerance.y > containerRect.right) edges.push('right')
  return edges
}
