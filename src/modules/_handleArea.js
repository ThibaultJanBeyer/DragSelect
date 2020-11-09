import '../types.js'

/**
 * Fix: Area has to have a special position attribute for calculations
 * @param {DSArea} area
 * @returns {DSArea}
 */
export default area => {
  if (area instanceof HTMLDocument) return area
  const computedStyles = getComputedStyle(area)
  const position = computedStyles.position
  const isPositioned =
    position === 'absolute' || position === 'relative' || position === 'fixed'
  if (!isPositioned) area.style.position = 'relative'
  return area
}
