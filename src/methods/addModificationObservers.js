// @ts-check
import '../types'

/**
 * Adds event-listeners to the selectorArea
 * @param {DSArea[]} nodes
 * @param {DSModificationCallback} callback
 * @param {MutationObserver} modificationObserver
 */
export default (nodes, callback, modificationObserver) => {
  window.addEventListener('resize', callback)
  window.addEventListener('scroll', callback)

  nodes.forEach((el, i) => {
    modificationObserver.observe(el, {
      childList: i !== 0,
      attributes: true,
    })
  })
}
