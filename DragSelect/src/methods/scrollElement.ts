import { DSArea, DSEdges } from "../types"

let DOC_ELEMENT: HTMLElement; // we store this in the module cache as it is highly unlikely the user to change document

/** Scroll the element in the specified direction */
export const scrollElement = (element?: DSArea, directions?: DSEdges, multiplier: number = 1) => {
  if (!directions?.length || !element) return
  
  let _element = element as HTMLElement | SVGElement; // we are typecasting because if it's of type Document we grab the corresponding HTMLElement anyhow
  if(element instanceof Document) {
    if(DOC_ELEMENT) _element = DOC_ELEMENT; // cached
    // either the document is scrollable or the body is scrollable
    if(Number.isFinite(document?.documentElement?.scrollTop)) {
      const prev = document.documentElement.scrollTop;
      document.documentElement.scrollTop += 1
      if (document.documentElement.scrollTop === prev) {
        _element = document.body;
        DOC_ELEMENT = document.body;
      } else {
        document.documentElement.scrollTop = prev;
        _element = document.documentElement;
        DOC_ELEMENT = document.documentElement;
      }
    }
  }

  const scrollTop = directions.includes('top') && _element.scrollTop > 0
  const scrollBot =
    directions.includes('bottom') && _element.scrollTop < _element.scrollHeight
  const scrollLeft = directions.includes('left') && _element.scrollLeft > 0
  const scrollRight =
    directions.includes('right') && _element.scrollLeft < _element.scrollWidth
  
  if (scrollTop) _element.scrollTop -= 1 * multiplier
  if (scrollBot) _element.scrollTop += 1 * multiplier
  if (scrollLeft) _element.scrollLeft -= 1 * multiplier
  if (scrollRight) _element.scrollLeft += 1 * multiplier
}
