import { DSArea } from '../types'
import { getCurrentScroll } from './getCurrentScroll'

/** Checks whether the area can scroll or not */
export type CanScroll = {
  (area: DSArea): boolean
}

export const canScroll: CanScroll = area => {
  const scroll = getCurrentScroll(area)
  if (scroll.x || scroll.y) return true

  if (area instanceof Document) {
    if (area.body) return Boolean(area.body.scrollTop = 1)
    return Boolean(area.documentElement.scrollTop = 1)
  }

  return Boolean(area.scrollTop = 1)
}
