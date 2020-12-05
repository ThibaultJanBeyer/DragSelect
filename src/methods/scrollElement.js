// @ts-check
import '../types'

/**
 * Scroll the element in the specified direction
 * @param {DSArea} element
 * @param {Array.<'top'|'bottom'|'left'|'right'|undefined>} directions
 * @param {number} multiplier
 */
export default (element, directions, multiplier) => {
  if (!directions.length) return

  const docEl =
    document &&
    document.documentElement &&
    document.documentElement.scrollTop &&
    document.documentElement
  const _element =
    element instanceof HTMLDocument ? docEl || document.body : element

  const scrollTop = directions.includes('top') && _element.scrollTop > 0
  const scrollBot =
    directions.includes('bottom') && _element.scrollTop < _element.scrollHeight
  const scrollLeft = directions.includes('left') && _element.scrollLeft > 0
  const scrollRight =
    directions.includes('right') && _element.scrollLeft < _element.scrollWidth

  if (scrollTop) _element.scrollTop -= 1 * multiplier
  if (scrollBot) _element.scrollTop += 1 * multiplier
  if (scrollLeft) _element.scrollLeft -= 1 * multiplier
  if (scrollRight) _element.scrollLeft += 1 * multiplier
}
