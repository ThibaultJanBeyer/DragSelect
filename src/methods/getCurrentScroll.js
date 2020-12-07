// @ts-check
import '../types'
import { documentScroll } from './'

/**
 * @param {DSArea} [area]
 * @return {Vect2} scroll X/Y
 */
export default (area) => {
  if (!area || area instanceof Document) return documentScroll()
  return {
    x: area.scrollLeft >= 0 ? area.scrollLeft : documentScroll().x,
    y: area.scrollTop >= 0 ? area.scrollTop : documentScroll().y,
  }
}
