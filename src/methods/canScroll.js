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

  if (area instanceof HTMLDocument) {
    if (area.body) return !!(area.body.scrollTop = 1)
    else return !!(area.documentElement.scrollTop = 1)
  }

  return !!(area.scrollTop = 1)
}
