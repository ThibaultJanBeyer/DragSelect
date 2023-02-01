// @ts-check
import '../types'

import { removeModificationObservers } from '.'

/**
 * Removes event-listeners from the DOMNode
 * @typedef {()=>void} DSCleanup
 */

/**
 * Adds event-listeners to a DOMNode
 * @param {DSArea[]} nodes
 * @param {DSModificationCallback} cb
 * @return {{observer:MutationObserver,callback:DSModificationCallback,cleanup:DSCleanup}}
 */
export default (nodes, cb) => {
  const callback = cb

  window.addEventListener('resize', callback)
  window.addEventListener('scroll', callback)

  const observer = new MutationObserver(callback)

  nodes.forEach((el, i) => {
    observer.observe(el, {
      childList: i !== 0,
      attributes: true,
    })
  })

  /**
   * Removes all observers
   */
  const cleanup = () => removeModificationObservers(observer, callback)

  return { observer, callback, cleanup }
}
