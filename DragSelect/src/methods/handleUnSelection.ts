import SelectedSet from "../modules/SelectedSet"
import { DSInputElement } from "../types"

type Props<E extends DSInputElement> = {
  element: E
  force?: boolean
  SelectedSet: SelectedSet<E>
  PrevSelectedSet: Set<E>
  hoverClassName: string
}

/** Logic when an element is de-selected */
export const handleUnSelection = <E extends DSInputElement>({
  element,
  force,
  SelectedSet,
  PrevSelectedSet,
  hoverClassName,
}: Props<E>) => {
  if (!element.classList.contains(hoverClassName) && !force) return

  const inSelection = SelectedSet.has(element)
  const inPrevSelection = PrevSelectedSet.has(element)

  /**
   * Special for issue #9.
   * if a multi-select-key is pressed, ds 'remembers' the last selection and reverts
   * to that state if the selection is not kept, to mimic the natural OS behaviour
   * = if item was selected and is not in selection anymore, reselect it
   * = if item was not selected and is not in selection anymore, unselect it
   */
  if (inSelection && !inPrevSelection) SelectedSet.delete(element)
  else if (!inSelection && inPrevSelection) SelectedSet.add(element)

  element.classList.remove(hoverClassName)
}
