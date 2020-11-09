import '../types.js'

/**
 * Scroll the area in the direction of edge
 * @param {DSArea} area
 * @param {('top'|'bottom'|'left'|'right'|false)} edge
 * @param {number} autoScrollSpeed
 */
export default (area, edge, autoScrollSpeed) => {
  const docEl =
    document &&
    document.documentElement &&
    document.documentElement.scrollTop &&
    document.documentElement
  const _area = area instanceof HTMLDocument ? docEl || document.body : area

  const scrollTop = edge === 'top' && _area.scrollTop > 0
  const scrollBot = edge === 'bottom'
  const scrollLeft = edge === 'left' && _area.scrollLeft > 0
  const scrollRight = edge === 'right'

  if (scrollTop) _area.scrollTop -= 1 * autoScrollSpeed
  else if (scrollBot) _area.scrollTop += 1 * autoScrollSpeed
  else if (scrollLeft) _area.scrollLeft -= 1 * autoScrollSpeed
  else if (scrollRight) _area.scrollLeft += 1 * autoScrollSpeed
}
