import '../types.js'
import { _getCursorPos, _getAreaRect, _getComputedBorder } from './'

/**
 * Based on a click event object in an area,
 * checks if the click was triggered onto a scrollbar.
 * @param {DSArea} area
 * @param {DSZoom} zoom
 * @param {DSEvent} event
 * @return {boolean}
 */
export default (area, zoom, event) => {
  const cPos = _getCursorPos(area, zoom, event)
  const areaRect = _getAreaRect(area)
  const border = _getComputedBorder(area)

  if (areaRect.width + border.left + border.right <= cPos.x) return true
  if (areaRect.height + border.top + border.bottom <= cPos.y) return true
  return false
}
