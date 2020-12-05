// @ts-check
import '../types'

/**
 * Updates element style left, top, width, height values
 * according to pos input object.
 * @param {HTMLElement} element
 * @param {DSElementPos} pos
 */
export default (element, pos) => {
  element.style.left = `${pos.x}px`
  element.style.top = `${pos.y}px`
  element.style.width = `${pos.w}px`
  element.style.height = `${pos.h}px`
}
