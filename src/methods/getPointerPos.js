// @ts-check
import '../types'
import { vect2 } from './'

/**
 * Returns cursor x, y position based on event object
 * @param {Object} p
 * @param {Vect2} [p.documentScroll] - document scroll: needed when document is scroll-able but area is not
 * @param {MouseEvent|Touch} p.event
 * @return {Vect2} cursor X/Y position
 */
export default ({ event, documentScroll }) =>
  vect2.calc(
    {
      x: event.clientX,
      y: event.clientY,
    },
    '+',
    {
      x: documentScroll.x || 0,
      y: documentScroll.y || 0,
    }
  )
