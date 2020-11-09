import '../types.js'

/**
 * Returns the current x, y scroll value of area
 * If area has no scroll it will return 0
 * If area scrollTop/Left is not available
 * @param {DSArea} [area]
 * @return {{x:number,y:number}} scroll X/Y
 */
export default area => {
  const body = {
    top:
      document.body.scrollTop > 0
        ? document.body.scrollTop
        : document.documentElement.scrollTop,
    left:
      document.body.scrollLeft > 0
        ? document.body.scrollLeft
        : document.documentElement.scrollLeft,
  }

  // when the rectangle is bound to the document, no scroll is needed
  const scroll = {
    // @ts-ignore
    y: area && area.scrollTop >= 0 ? area.scrollTop : body.top,
    // @ts-ignore
    x: area && area.scrollLeft >= 0 ? area.scrollLeft : body.left,
  }
  return scroll
}
