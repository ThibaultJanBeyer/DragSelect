import { DSBoundingRect, DSInputElement, Vect2 } from "../types"
import { getStylePosition } from "./getStylePosition"
import { setStylePosition } from "./setStylePosition"
import { calcVect } from "./vect2"

type Props<E extends DSInputElement> = {
  element: E
  posDirection: Vect2
  containerRect: DSBoundingRect
  useTransform: boolean
}

/** Moves the element in a posDirection */
export const moveElement = <E extends DSInputElement>({ element, posDirection, useTransform }: Props<E>) => {
  const elementPos = getStylePosition(element, useTransform)
  const newPos = calcVect(elementPos, '+', posDirection)
  setStylePosition(element, newPos, useTransform)
}
