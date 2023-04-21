import { DSBoundingRect, DSElement, Vect2 } from "../types"
import { getOverflowEdges } from "./getOverflowEdges"
import { getStylePosition } from "./getStylePosition"
import { handleElementOverflow } from "./handleElementOverflow"
import { setStylePosition } from "./setStylePosition"
import { calcVect } from "./vect2"

type Props = {
  element: DSElement
  posDirection: Vect2
  containerRect: DSBoundingRect
  useTransform: boolean
}

/** Moves the element in a posDirection */
export const moveElement = ({ element, posDirection, containerRect, useTransform }: Props) => {
  const elementPos = getStylePosition(element, useTransform)
  const newPos = calcVect(elementPos, '+', posDirection)
  setStylePosition(element, newPos, useTransform)

  const elementRect = element.getBoundingClientRect()
  const edges = getOverflowEdges({
    elementRect,
    containerRect,
  })

  handleElementOverflow({
    element,
    edges,
    elementRect,
    containerRect,
    elementPos: newPos,
    useTransform,
  })
}
