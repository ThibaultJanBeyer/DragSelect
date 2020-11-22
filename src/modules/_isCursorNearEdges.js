import '../types.js'
import { _getCursorPos, _getAreaRect } from './'

/**
 * Check if the selector is near a edges of the area
 * @param {DSSelectorArea} area
 * @param {DSEvent} [event]
 * @return {Array.<'top'|'bottom'|'left'|'right'|undefined>}
 */
export default (area, event) => {
  const cursorPosition = _getCursorPos(area, event)
  const areaRect = _getAreaRect(area)

  const tolerance = {
    x: 10,
    y: 10,
  }

  const edges = []
  if (cursorPosition.y < tolerance.y) edges.push('top')
  if (areaRect.height - cursorPosition.y < tolerance.y) edges.push('bottom')
  if (areaRect.width - cursorPosition.x < tolerance.x) edges.push('right')
  if (cursorPosition.x < tolerance.x) edges.push('left')

  return /** @type {Array.<'top'|'bottom'|'left'|'right'|undefined>} */ (edges)
}
