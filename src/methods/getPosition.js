// @ts-check
import '../types'
/**
 * Returns cursor x, y position based on event object
 * @param {DSElement} element
 * @return {DSElementPos}
 */
export default (element) => {
  const boundingClientRect = element.getBoundingClientRect()
  return {
    x: boundingClientRect.left,
    y: boundingClientRect.top,
    w: boundingClientRect.width,
    h: boundingClientRect.height,
  }
}
