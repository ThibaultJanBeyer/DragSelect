// @ts-check
import '../types'

/**
 * Updates element style left, top, width, height values
 * according to pos input object.
 * @param {HTMLElement} element
 * @param {{left:number,top:number,width:number,height:number}} pos
 */
export default (element, pos) => {
  element.style.left = `${pos.left}px`
  element.style.top = `${pos.top}px`
  element.style.width = `${pos.width}px`
  element.style.height = `${pos.height}px`
}
