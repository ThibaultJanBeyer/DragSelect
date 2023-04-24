type EnsureArray = {
  /**
   * Transforms any list or single dom node to an array so user doesn’t have to care. Also removes duplicates.
   * @param items a single item, a Node-list or any element group
   */
  <T>(items: T | T[] | [T]): T[]
}

export const ensureArray: EnsureArray = items => {
  if (!items) return []
  if (!Array.isArray(items)) return [items]
  return [...new Set([...items])]
}
