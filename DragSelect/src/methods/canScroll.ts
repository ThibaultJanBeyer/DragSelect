import { DSArea } from '../types'

/** Checks whether the area can scroll or not */
export type CanScroll = {
  (area: DSArea): boolean
}

export const canScroll: CanScroll = (area) => {
  if (!(area instanceof Document)) return canScrollElement(area)
  // the document scrolls via html (body in quirks mode), or body as its own scroll container
  const main = area.scrollingElement || area.documentElement
  return canScrollElement(main) || (!!area.body && canScrollElement(area.body))
}

/**
 * Whether the element can scroll: probe it by 1px, read it back, restore.
 * Already scrolled means it can (at the very end the probe could not move).
 * Probes +1 then -1, since scrolling can also go negative
 * (RTL scrollLeft, column-reverse scrollTop).
 * `behavior: 'instant'` ignores `scroll-behavior: smooth`,
 * and "did it change" (not `=== 1`) survives zoom rounding.
 */
export const canScrollElement = (el: Element): boolean => {
  const { scrollTop: top, scrollLeft: left } = el
  if (top || left) return true
  const moved = () => el.scrollTop !== top || el.scrollLeft !== left
  el.scrollTo({ top: top + 1, left: left + 1, behavior: 'instant' })
  if (!moved()) el.scrollTo({ top: top - 1, left: left - 1, behavior: 'instant' })
  const canScroll = moved()
  el.scrollTo({ top, left, behavior: 'instant' })
  return canScroll
}
