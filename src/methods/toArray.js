// @ts-check
import '../types'

/**
 * Transforms any list or single item to an array so user doesn’t have to care.
 * @param {DSInputElements} items a single item, a Node-list or any element group
 * @return {DSElements}
 */
export default (items) => {
  if (!items) return []
  if (
    !Array.isArray(items) &&
    (items instanceof HTMLElement || items instanceof SVGElement)
  )
    return [items]
  return [...items]
}
