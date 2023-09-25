import { DSDragKeys, DSEdges, Vect2 } from "../types"

type Props = {
  /** The keyboard key that was pressed */
  key: string
  shiftKey: boolean
  keyboardDragSpeed: number
  zoom: number
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
}: Props): Vect2 => {
  const posDirection = { x: 0, y: 0 }
  const increase = shiftKey
    ? keyboardDragSpeed * 4 * zoom
    : keyboardDragSpeed * zoom

  if (dragKeys?.left.includes(key))
    posDirection.x = scrollDiff.x || -increase
  if (dragKeys?.right.includes(key))
    posDirection.x = scrollDiff.x || increase
  if (dragKeys?.up.includes(key))
    posDirection.y = scrollDiff.y || -increase
  if (dragKeys?.down.includes(key))
    posDirection.y = scrollDiff.y || increase
  
  return posDirection
}
