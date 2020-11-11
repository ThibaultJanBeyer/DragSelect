import '../types.js'

/**
 * @param {DSArea} area
 */
export default area => {
  if (area instanceof HTMLDocument) return { top: 0, bottom: 0, left: 0, right: 0 }
  const computedStyles = getComputedStyle(area)
  return { 
    top: parseInt(computedStyles.borderTopWidth) || 0,
    bottom: parseInt(computedStyles.borderBottomWidth) || 0,
    left: parseInt(computedStyles.borderLeftWidth) || 0,
    right: parseInt(computedStyles.borderRightWidth) || 0
  }
}
