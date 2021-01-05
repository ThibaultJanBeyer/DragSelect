// @ts-check
import '../types'

/**
 * Removes event-listeners to the selectorArea
 * @param {MutationObserver} modificationObserver
 * @param {DSModificationCallback} callback
 */
export default (modificationObserver, callback) => {
  window.removeEventListener('resize', callback)
  window.removeEventListener('scroll', callback)
  modificationObserver.disconnect()
}
