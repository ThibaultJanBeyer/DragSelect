import '../types.js'

/**
 * @param {DSArea} area
 */
export default area => {
  if (area instanceof HTMLDocument) return 0
  const computedStyles = getComputedStyle(area)
  return parseInt(computedStyles.borderWidth) || 0
}
