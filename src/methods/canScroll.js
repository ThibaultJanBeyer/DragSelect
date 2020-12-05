// @ts-check
import '../types'
import { getCurrentScroll } from './'

/**
 * Checks whether the area can scroll or not
 * @param {DSArea} area
 * @return {boolean} scroll X/Y
 */
export default (area) => {
  let scroll = getCurrentScroll(area)
  if (scroll.x || scroll.y) return true

  const _area = area instanceof HTMLDocument ? area.documentElement : area
  _area.scrollTop = 1
  if (_area.scrollTop) return true

  return false
}
