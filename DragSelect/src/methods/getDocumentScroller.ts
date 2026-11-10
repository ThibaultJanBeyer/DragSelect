import { canScrollElement } from './canScroll'

/**
 * Returns the element that scrolls the document.
 * Usually `document.scrollingElement` (html in standards mode, body in quirks mode).
 * The body can also be its own scroll container,
 * i.e. `html { overflow: hidden } body { overflow: auto }`.
 */
export const getDocumentScroller = (doc: Document = document): HTMLElement => {
  const main = (doc.scrollingElement || doc.documentElement) as HTMLElement
  const { body } = doc
  if (body && body !== main && !canScrollElement(main) && canScrollElement(body))
    return body
  return main
}
