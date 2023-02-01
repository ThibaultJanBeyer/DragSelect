// @ts-check
import '../types'

/**
 * @typedef {function} ScrollCallback
 * @property {Array.<'top'|'bottom'|'left'|'right'|undefined>} directions
 * @property {number} multiplier
 */
/**
 * @param {Object} p
 * @param {string} p.key the keyboard key that was pressed
 * @param {boolean} p.shiftKey
 * @param {boolean} p.canScroll
 * @param {number} p.keyboardDragSpeed
 * @param {number} p.zoom
 * @param {ScrollCallback} p.scrollCallback
 * @param {Vect2} p.scrollDiff
 * @param {DSDragKeys} p.dragKeys
 * @returns {Vect2}
 */
export default ({
  shiftKey,
  keyboardDragSpeed,
  zoom,
  key,
  dragKeys,
  scrollDiff,
  canScroll,
  scrollCallback,
}) => {
  const posDirection = { x: 0, y: 0 }
  const increase = shiftKey
    ? keyboardDragSpeed * 4 * zoom
    : keyboardDragSpeed * zoom

  if (dragKeys.left.includes(key)) {
    posDirection.x = scrollDiff.x || -increase
    if (!shiftKey && !scrollDiff.x && canScroll)
      scrollCallback(['left'], keyboardDragSpeed)
  }
  if (dragKeys.right.includes(key)) {
    posDirection.x = scrollDiff.x || increase
    if (!shiftKey && !scrollDiff.x && canScroll)
      scrollCallback(['right'], keyboardDragSpeed)
  }
  if (dragKeys.up.includes(key)) {
    posDirection.y = scrollDiff.y || -increase
    if (!shiftKey && !scrollDiff.y && canScroll)
      scrollCallback(['top'], keyboardDragSpeed)
  }
  if (dragKeys.down.includes(key)) {
    posDirection.y = scrollDiff.y || increase
    if (!shiftKey && !scrollDiff.y && canScroll)
      scrollCallback(['bottom'], keyboardDragSpeed)
  }
  return posDirection
}
