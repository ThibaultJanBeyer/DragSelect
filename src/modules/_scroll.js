import '../types.js'

/**
 * @param {'scrollTop'|'scrollHeight'} y
 * @param {'scrollLeft'|'scrollWidth'} x
 * @param {DSArea} [area]
 * @return {{x:number,y:number}} scroll X/Y
 */
const unified = (y, x, area) => {
  const body = {
    y: document.body[y] > 0 ? document.body[y] : document.documentElement[y],
    x: document.body[x] > 0 ? document.body[x] : document.documentElement[x],
  }

  return {
    y: area && area[y] >= 0 ? area[y] : body.y,
    x: area && area[x] >= 0 ? area[x] : body.x,
  }
}

/**
 * Returns the current x, y scroll value of area
 * If area has no scroll it will return 0
 * If area scrollTop/Left is not available
 * @param {DSArea} [area]
 * @return {{x:number,y:number}} scroll X/Y
 */
export const getCurrent = (area) => unified('scrollTop', 'scrollLeft', area)

/**
 * Returns the maximum x, y scroll value of area
 * If area has no scroll it is the same as the elements height
 * @param {DSArea} [area]
 * @return {{x:number,y:number}} scroll X/Y
 */
export const getMax = (area) => unified('scrollHeight', 'scrollWidth', area)

/**
 * Checks whether the area can scroll or not
 * @param {DSArea} area
 * @return {boolean} scroll X/Y
 */
export const canScroll = (area) => {
  let scroll = getCurrent(area)
  if (scroll.x || scroll.y) return true

  const _area = area instanceof HTMLDocument ? area.documentElement : area
  _area.scrollTop = 1
  if (_area.scrollTop) return true

  return false
}
