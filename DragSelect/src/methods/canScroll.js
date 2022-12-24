// @ts-check
import '../types'
import { getCurrentScroll } from '.'

/**
 * Checks whether the area can scroll or not
 * @param {DSArea} area
 * @return {boolean} scroll X/Y
 */
export default (area) => {
  const scroll = getCurrentScroll(area)
  if (scroll.x || scroll.y) return true

  if (area instanceof Document) {
    if (area.body) return !!(area.body.scrollTop = 1)
    return !!(area.documentElement.scrollTop = 1)
  }

  return !!(area.scrollTop = 1)
}
