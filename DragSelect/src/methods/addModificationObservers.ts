export type AddModificationObservers<T> = {
  /** Adds modification listeners to DOMNode(s) */
  (
    nodes: Node[],
    cb: T
  ): {
    observer: MutationObserver
    callback: T
    /** Removes event-listeners from the DOMNode(s) */
    cleanup: () => void
  }
}

export type MutationCallbackEvent =
  | UIEvent
  | Event
  | MutationRecord[]
  | ResizeObserverEntry[]
type ModificationListenerCallback = (event: MutationCallbackEvent) => any

export const addModificationObservers: AddModificationObservers<
  ModificationListenerCallback
> = (nodes, cb) => {
  const callback = cb

  window.addEventListener('resize', callback)
  window.addEventListener('scroll', callback)

  const observer = new MutationObserver(callback)
  const resizeObserver = new ResizeObserver(callback)

  nodes.forEach((el, i) => {
    observer.observe(el, {
      childList: i !== 0,
      attributes: true,
    })
    if (el instanceof Element) resizeObserver.observe(el)
  })

  /**
   * Removes all observers
   */
  const cleanup = () => {
    window.removeEventListener('resize', callback)
    window.removeEventListener('scroll', callback)
    observer.disconnect()
    resizeObserver.disconnect()
  }

  return { observer, resizeObserver, callback, cleanup }
}
