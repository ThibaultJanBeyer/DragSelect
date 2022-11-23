/**
 * @param {DSElement|DSArea} node
 * @returns {DSElements}
 */
export default (node) => {
  const traverse = (toWatch, index = 0) => {
    const parent = toWatch[index]?.parentNode
    if (parent) {
      toWatch.push(parent)
      index++
      return traverse(toWatch, index)
    }
    return toWatch
  }

  return traverse([node])
}
