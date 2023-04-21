import SelectedSet from "../modules/SelectedSet"
import { DSElement } from "../types"

type Props = {
  element: DSElement
  force?: boolean
  multiSelectionToggle: boolean
  SelectedSet: SelectedSet
  hoverClassName: string
}

/** Logic when an element is selected */
export const handleSelection = ({
  element,
  force,
  multiSelectionToggle,
  SelectedSet,
  hoverClassName,
}: Props) => {
  if (element.classList.contains(hoverClassName) && !force) return

  if (!SelectedSet.has(element)) SelectedSet.add(element)
  else if (multiSelectionToggle) SelectedSet.delete(element)

  element.classList.add(hoverClassName)
}
