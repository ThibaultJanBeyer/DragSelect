import '../types.js'
import { _getCursorPos, _getAreaRect } from './'

/**
 * Check if the selector is near an edge of the area
 * @memberof DragSelect#
 * @function isCursorNearEdge
 * @param {DSArea} area
 * @param {DSZoom} zoom
 * @param {DSEvent} [event]
 * @return {('top'|'bottom'|'left'|'right'|false)}
 */
export default (area, zoom, event) => {
  const cursorPosition = _getCursorPos(area, zoom, event)
  const areaRect = _getAreaRect(area)

  const tolerance = {
    x: 5,
    y: 5,
  }

  if (cursorPosition.y < tolerance.y) return 'top'
  if (areaRect.height - cursorPosition.y < tolerance.y) return 'bottom'
  if (areaRect.width - cursorPosition.x < tolerance.x) return 'right'
  if (cursorPosition.x < tolerance.x) return 'left'

  return false
}
