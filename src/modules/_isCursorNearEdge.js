import '../types.js'
import { _getCursorPos, _getAreaRect } from './'

/**
 * Check if the selector is near an edge of the area
 * @param {DSSelectorArea} area
 * @param {DSEvent} [event]
 * @return {('top'|'bottom'|'left'|'right'|false)}
 */
export default (area, event) => {
  const cursorPosition = _getCursorPos(area, event)
  const areaRect = _getAreaRect(area)

  const tolerance = {
    x: 10,
    y: 10,
  }

  if (cursorPosition.y < tolerance.y) return 'top'
  if (areaRect.height - cursorPosition.y < tolerance.y) return 'bottom'
  if (areaRect.width - cursorPosition.x < tolerance.x) return 'right'
  if (cursorPosition.x < tolerance.x) return 'left'

  return false
}
