/**
 * This module fixes an issue where the position of the selector would be screwed when the area is scaled/zoomed
 * Since apparently also the scroll speed is skewed
 */

/**
 * @private
 */
const initVal = { x: 0, y: 0 }
/**
 * @private
 */
let _zoomedScroll = initVal

export const get = () => ({ ..._zoomedScroll })
export const set = (value) => ({ ...(_zoomedScroll = value) })
export const reset = () => ({ ...(_zoomedScroll = initVal) })
