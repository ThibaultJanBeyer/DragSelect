import { DSBoundingRect, DSEdges, DSInputElement, Vect2 } from "../types"
import { setStylePosition } from "./setStylePosition"

type Props<E extends DSInputElement> = {
  element: E
  edges: DSEdges
  elementRect: DSBoundingRect
  containerRect: DSBoundingRect
  elementPos: Vect2
  useTransform: boolean
}

/**
 * pushes element back the overflow amount
 * (top - top gives overflow, then new position pushed back by overflow)
 */
export const handleElementOverflow = <E extends DSInputElement>({
  element,
  edges,
  elementRect,
  containerRect,
  elementPos,
  useTransform,
}: Props<E>) => {
  if (edges.includes('top')) {
    setStylePosition(
      element,
      {
        y: elementPos.y + containerRect.top - elementRect.top,
        x: elementPos.x,
      },
      useTransform
    )
  }
  if (edges.includes('left')) {
    setStylePosition(
      element,
      {
        y: elementPos.y,
        x: elementPos.x + containerRect.left - elementRect.left,
      },
      useTransform
    )
  }
  if (edges.includes('bottom')) {
    setStylePosition(
      element,
      {
        y: elementPos.y + containerRect.bottom - elementRect.bottom,
        x: elementPos.x,
      },
      useTransform
    )
  }
  if (edges.includes('right')) {
    setStylePosition(
      element,
      {
        y: elementPos.y,
        x: elementPos.x + containerRect.right - elementRect.right,
      },
      useTransform
    )
  }
}
