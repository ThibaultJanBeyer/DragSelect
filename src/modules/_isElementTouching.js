import '../types.js'
import { _getScroll, _getAreaRect, _isCollision } from './'

/**
 * Checks if there is a collision between the element and the selector
 * (whether they touch each other)
 * @param {DSElement} element
 * @param {HTMLElement} selector
 * @param {DSZoom} zoom
 * @param {DSArea} area
 * @return {boolean}
 */
export default (element, selector, zoom, area) => {
  const scroll = _getScroll(area)

  const selectionRect = {
    y: selector.getBoundingClientRect().top / zoom + scroll.y,
    x: selector.getBoundingClientRect().left / zoom + scroll.x,
    h: selector.offsetHeight,
    w: selector.offsetWidth,
  }

  const areaR = _getAreaRect(area)
  const areaRect = {
    y: areaR.top,
    x: areaR.left,
    h: areaR.height,
    w: areaR.width
  }

  const rect = element.getBoundingClientRect()
  const elementRect = {
    y: rect.top / zoom + scroll.y,
    x: rect.left / zoom + scroll.x,
    h: rect.height / zoom,
    w: rect.width / zoom,
  }

  if (
    _isCollision(areaRect, elementRect) && 
    _isCollision(selectionRect, elementRect)
  ) return true

  return false
}
