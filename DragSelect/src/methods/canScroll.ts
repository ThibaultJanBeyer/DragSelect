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
    if (area.body) return _canScroll(area.body)
    return _canScroll(area.documentElement)
  }

  return _canScroll(area)
}

// @TODO: Determine if there is a better way to test scrollability
const _canScroll = (el: Element): boolean => {
  const currentScrollTop = el.scrollTop
  const canScroll = Boolean(el.scrollTop = 1)
  el.scrollTop = currentScrollTop
  return canScroll
}
