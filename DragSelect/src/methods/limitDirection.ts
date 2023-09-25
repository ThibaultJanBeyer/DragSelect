import SelectableSet from '../modules/SelectableSet'
import SelectedSet from '../modules/SelectedSet'
import { DSBoundingRect, DSInputElement, Vect2 } from '../types'

type Props = {
  direction: Vect2
  containerRect: DSBoundingRect
  selectionRect: DSBoundingRect
  scrollAmount: Vect2
}

/**
 * Modify direction value so that the rect of draggable elements
 * does not exceed the boundaries of container rect
 */
export const limitDirection = ({ containerRect, selectionRect, direction, scrollAmount }: Props) => {
  const delta = {
    top: containerRect.top - selectionRect.top + scrollAmount.y,
    left: containerRect.left - selectionRect.left + scrollAmount.x,
    bottom: containerRect.bottom - selectionRect.bottom + scrollAmount.y,
    right: containerRect.right - selectionRect.right + scrollAmount.x,
  }
  
  if(direction.x === 0 && direction.y === 0) return direction
  if (direction.y < 0) direction.y = Math.max(direction.y, delta.top)
  if (direction.x < 0) direction.x = Math.max(direction.x, delta.left)
  if (direction.y > 0) direction.y = Math.min(direction.y, delta.bottom)
  if (direction.x > 0) direction.x = Math.min(direction.x, delta.right)
  
  selectionRect.top += direction.y;
  selectionRect.bottom += direction.y;
  selectionRect.left += direction.x;
  selectionRect.right += direction.x;

  return direction
}
