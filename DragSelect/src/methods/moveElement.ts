import { DSBoundingRect, DSInputElement, Vect2 } from "../types"
import { getOverflowEdges } from "./getOverflowEdges"
import { getStylePosition } from "./getStylePosition"
import { handleElementOverflow } from "./handleElementOverflow"
import { setStylePosition } from "./setStylePosition"
import { calcVect } from "./vect2"

type Props<E extends DSInputElement> = {
  element: E
  posDirection: Vect2
  containerRect: DSBoundingRect
  useTransform: boolean
}

/** Moves the element in a posDirection */
export const moveElement = <E extends DSInputElement>({ element, posDirection, containerRect, useTransform }: Props<E>) => {
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
