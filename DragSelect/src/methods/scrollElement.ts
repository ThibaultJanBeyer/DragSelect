import { DSArea, DSEdges } from '../types'
import { getDocumentScroller } from './getDocumentScroller'

/** Scroll the element in the specified direction */
export const scrollElement = (
  element?: DSArea,
  directions?: DSEdges,
  multiplier: number = 1
) => {
  if (!directions?.length || !element) return

  const _element =
    element instanceof Document ? getDocumentScroller(element) : element

  // no bounds checks: the browser clamps scrollTop/Left to the valid range,
  // which can also be negative (RTL scrollLeft, column-reverse scrollTop)
  if (directions.includes('top')) _element.scrollTop -= multiplier
  if (directions.includes('bottom')) _element.scrollTop += multiplier
  if (directions.includes('left')) _element.scrollLeft -= multiplier
  if (directions.includes('right')) _element.scrollLeft += multiplier
}
