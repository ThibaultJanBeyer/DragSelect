type EnsureArray = {
  /**
   * Transforms any list or single dom node to an array so user doesn’t have to care. Also removes duplicates.
   * @param items a single item, a Node-list or any element group
   */
  <T>(items?: T | T[] | [T]): T[]
}

export const ensureArray: EnsureArray = input => {
  if (!input) return []
  if (!Array.isArray(input) && typeof (input as any)[Symbol.iterator] !== 'function') return [input]
  return [...new Set([...(input as any)])]
}
