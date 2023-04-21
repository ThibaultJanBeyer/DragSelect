import { DSElement, DSInputElements } from "../types"

type ToArray = {
  /**
   * Transforms any list or single dom node to an array so user doesn’t have to care. Also removes duplicates.
   * @param items a single item, a Node-list or any element group
   */
  (items: DSInputElements): DSElement[]
}

export const toArray: ToArray = (items) => {
  if (!items) return []
  if (
    !Array.isArray(items) &&
    (items instanceof HTMLElement || items instanceof SVGElement)
  )
    return [items]
  // @ts-ignore
  return [...new Set([...items])]
}
