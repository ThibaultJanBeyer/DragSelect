import SelectableSet from '../modules/SelectableSet'
import { DSElement, DSBoundingRect } from '../types'
import { toArray } from './toArray'

/** Returns the compound bounding rect of multiple elements */
export const getBoundingClientRect = (elements: DSElement[], SelectableSet: SelectableSet): DSBoundingRect => {
  const rect = {
    top: Number.POSITIVE_INFINITY,
    left: Number.POSITIVE_INFINITY,
    bottom: Number.NEGATIVE_INFINITY,
    right: Number.NEGATIVE_INFINITY,
    width: Number.NEGATIVE_INFINITY,
    height: Number.NEGATIVE_INFINITY,
  }

  toArray(elements).forEach((element) => {
    const elementRect = SelectableSet.getRect(element)
    rect.top = Math.min(rect.top, elementRect?.top || rect.top)
    rect.left = Math.min(rect.left, elementRect?.left || rect.left)
    rect.bottom = Math.max(rect.bottom, elementRect?.bottom || rect.bottom)
    rect.right = Math.max(rect.right, elementRect?.right || rect.right)
  })

  rect.height = rect.bottom - rect.top
  rect.width = rect.right - rect.left

  return rect
}
