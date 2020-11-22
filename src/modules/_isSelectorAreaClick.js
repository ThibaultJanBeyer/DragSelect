import '../types.js'
import { _isCollision } from './'

/**
 * @private
 * @type {TouchEvent}
 */
let _lastTouch

/**
 * Based on a click event object in an area,
 * checks if the click was triggered onto a scrollbar.
 * @param {DSSelectorArea} area
 * @param {DSEvent} event
 * @return {boolean}
 */
export default (area, event) => {
  // touchend has not touches. so we take the last touch if a touchevent, we need to store the positions
  if ('touches' in event && event.type !== 'touchend') _lastTouch = event
  // if a touchevent, return the last touch rather than the regular event
  // we need .touches[0] from that event instead
  const _event = 'touches' in event ? _lastTouch.touches[0] : event

  const cPos = {
    x: _event.clientX,
    y: _event.clientY,
    w: 0,
    h: 0,
  }

  const areaRect = {
    x: area.getBoundingClientRect().left,
    y: area.getBoundingClientRect().top,
    w: area.offsetWidth,
    h: area.offsetHeight,
  }

  return _isCollision(cPos, areaRect)
}
