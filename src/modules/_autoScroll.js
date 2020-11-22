import '../types.js'

/**
 * Scroll the area in the direction of edge
 * @param {DSArea} area
 * @param {Array.<'top'|'bottom'|'left'|'right'|undefined>} edges
 * @param {number} autoScrollSpeed
 */
export default (area, edges, autoScrollSpeed) => {
  const docEl =
    document &&
    document.documentElement &&
    document.documentElement.scrollTop &&
    document.documentElement
  const _area = area instanceof HTMLDocument ? docEl || document.body : area

  const scrollTop = edges.includes('top') && _area.scrollTop > 0
  const scrollBot = edges.includes('bottom')
  const scrollLeft = edges.includes('left') && _area.scrollLeft > 0
  const scrollRight = edges.includes('right')

  if (scrollTop) _area.scrollTop -= 1 * autoScrollSpeed
  if (scrollBot) _area.scrollTop += 1 * autoScrollSpeed
  if (scrollLeft) _area.scrollLeft -= 1 * autoScrollSpeed
  if (scrollRight) _area.scrollLeft += 1 * autoScrollSpeed
}
