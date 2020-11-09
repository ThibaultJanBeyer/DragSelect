import '../types.js'

/**
 * Updates element style left, top, width, height values
 * according to pos input object.
 * @param {DSElement} element
 * @param {{ x:number, y:number, w:number, h:number }} pos
 * @return {DSElement}
 */
export default (element, pos) => {
  element.style.left = `${pos.x}px`
  element.style.top = `${pos.y}px`
  element.style.width = `${pos.w}px`
  element.style.height = `${pos.h}px`
  return element
}
