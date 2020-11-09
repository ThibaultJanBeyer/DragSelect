import '../types.js'

/**
 * Returns the top/left/bottom/right/width/height
 * values of an area. If area is document then everything
 * except the sizes will be nulled.
 * @param {DSArea} area
 * @returns {{top:number,left:number,bottom:number,right:number,width:number,height:number}}
 */
export default area => {
  if (area instanceof Document)
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width:
        area.documentElement.clientWidth > 0
          ? area.documentElement.clientWidth
          : window.innerWidth,
      height:
        area.documentElement.clientHeight > 0
          ? area.documentElement.clientHeight
          : window.innerHeight,
    }

  const rect = area.getBoundingClientRect()
  return {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
    width: area.clientWidth || rect.width,
    height: area.clientHeight || rect.height,
  }
}
