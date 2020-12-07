// @ts-check
import '../types'

/**
 * Returns cursor x, y position based on event object
 * @param {Object} p
 * @param {MouseEvent|Touch} p.event
 * @return {Vect2} cursor X/Y position
 */
export default ({ event }) => ({
  x: event.clientX,
  y: event.clientY,
})
