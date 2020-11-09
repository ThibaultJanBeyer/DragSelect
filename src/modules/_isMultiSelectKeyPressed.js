import '../types.js'

/**
 * Check if some multi-selection modifier key is pressed
 * @param {DSMultiSelectKeys} multiSelectKeys
 * @param {boolean} multiSelectMode
 * @param {DSEvent} event
 * @return {boolean}
 */
export default (multiSelectKeys, multiSelectMode, event) => {
  if (multiSelectMode) return true
  return multiSelectKeys.some(mKey => event[mKey])
}
