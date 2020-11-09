import '../types.js'
import { _getAreaRect, _getScroll } from './'

/** @type {TouchEvent} */
let _lastTouch

/**
 * Returns cursor x, y position based on event object
 * /!\ for internal calculation reasons it does _not_ take
 * the AREA scroll into consideration unless it’s the outer Document.
 * Use the public .getCursorPos() for anything else, it’s more flexible
 * @param {DSArea} area
 * @param {DSZoom} zoom
 * @param {DSEvent} [event]
 * @return {{x: number, y: number}} cursor X/Y position
 */
export default (area, zoom, event) => {
  if (!event) return { x: 0, y: 0 }

  // touchend has not touches. so we take the last touch if a touchevent, we need to store the positions
  if ('touches' in event && event.type !== 'touchend') _lastTouch = event
  // if a touchevent, return the last touch rather than the regular event
  // we need .touches[0] from that event instead
  const _event = 'touches' in event ? _lastTouch.touches[0] : event

  const cPos = {
    x: _event.pageX,
    y: _event.pageY,
  }

  const areaRect = _getAreaRect(area)
  const docScroll = _getScroll() // needed when document is scroll-able but area is not
  return {
    // if it’s constrained in an area the area should be subtracted calculate
    x: (cPos.x - areaRect.left - docScroll.x) / zoom,
    y: (cPos.y - areaRect.top - docScroll.y) / zoom,
  }
}
