import { DSArea, Vect2 } from '../types'
import { getDocumentScroll } from './getDocumentScroll'

export type GetCurrentScroll = {
  (area: DSArea): Vect2
}

export const getCurrentScroll: GetCurrentScroll = area => {
  if (!area || area instanceof Document) return getDocumentScroll()
  return {
    x: area.scrollLeft >= 0 ? area.scrollLeft : getDocumentScroll().x,
    y: area.scrollTop >= 0 ? area.scrollTop : getDocumentScroll().y,
  }
}
