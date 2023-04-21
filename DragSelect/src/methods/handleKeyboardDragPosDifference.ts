import { DSDragKeys, DSEdges, Vect2 } from "../types"

type ScrollCallback = (directions: DSEdges, multiplier: number) => void

type Props = {
  /** The keyboard key that was pressed */
  key: string
  shiftKey: boolean
  canScroll: boolean
  keyboardDragSpeed: number
  zoom: number
  scrollCallback: ScrollCallback
  scrollDiff: Vect2
  dragKeys?: DSDragKeys
}
export const handleKeyboardDragPosDifference = ({
  shiftKey,
  keyboardDragSpeed,
  zoom,
  key,
  dragKeys,
  scrollDiff,
  canScroll,
  scrollCallback,
}: Props): Vect2 => {
  const posDirection = { x: 0, y: 0 }
  const increase = shiftKey
    ? keyboardDragSpeed * 4 * zoom
    : keyboardDragSpeed * zoom

  if (dragKeys?.left.includes(key)) {
    posDirection.x = scrollDiff.x || -increase
    if (!shiftKey && !scrollDiff.x && canScroll)
      scrollCallback(['left'], keyboardDragSpeed)
  }
  if (dragKeys?.right.includes(key)) {
    posDirection.x = scrollDiff.x || increase
    if (!shiftKey && !scrollDiff.x && canScroll)
      scrollCallback(['right'], keyboardDragSpeed)
  }
  if (dragKeys?.up.includes(key)) {
    posDirection.y = scrollDiff.y || -increase
    if (!shiftKey && !scrollDiff.y && canScroll)
      scrollCallback(['top'], keyboardDragSpeed)
  }
  if (dragKeys?.down.includes(key)) {
    posDirection.y = scrollDiff.y || increase
    if (!shiftKey && !scrollDiff.y && canScroll)
      scrollCallback(['bottom'], keyboardDragSpeed)
  }
  return posDirection
}
