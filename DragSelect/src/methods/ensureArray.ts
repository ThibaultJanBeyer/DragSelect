type EnsureArray = {
  /**
   * Transforms any list or single item (dom node, string) to an array so user doesn’t have to care. Also removes duplicates.
   * @param items a single item, a Node-list or any element group
   */
  <T>(items?: T | T[] | [T]): T[]
}

export const ensureArray: EnsureArray = input => {
  if (!input) return []
  // strings are iterable too, but a string is one item (e.g. an id), not a list of characters
  if (
    typeof input === 'string' ||
    (!Array.isArray(input) && typeof (input as any)[Symbol.iterator] !== 'function')
  )
    return [input]
  return [...new Set([...(input as any)])]
}
