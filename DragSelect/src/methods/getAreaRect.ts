import { DSArea, DSBoundingRect } from '../types'
/**
 * Returns the top/left/bottom/right/width/height
 * values of an area. If area is document then everything
 * except the sizes will be nulled.
 */
export const getAreaRect = (area: DSArea, zoom: number): DSBoundingRect => {
  if (area instanceof Document)
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    }

  const rect = area.getBoundingClientRect()
  return {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
    width: (area.clientWidth || rect.width) * zoom,
    height: (area.clientHeight || rect.height) * zoom,
  }
}
