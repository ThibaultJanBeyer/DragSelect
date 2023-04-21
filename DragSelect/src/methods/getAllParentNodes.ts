import { DSArea, DSElement } from "../types"

export const getAllParentNodes = (node: DSElement|DSArea) => {
  const traverse = (toWatch: ParentNode[], index = 0): ParentNode[] => {
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
