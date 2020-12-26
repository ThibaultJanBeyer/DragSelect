// @ts-check
import '../types'

/**
 * Logic when an element is de-selected
 * @param {Object} p
 * @param {DSElement} p.element
 * @param {boolean} p.force
 * @param {Set} p.SelectedSet
 * @param {Set} p.PrevSelectedSet
 * @param {string} p.hoverClassName
 */
export default ({
  element,
  force,
  SelectedSet,
  PrevSelectedSet,
  hoverClassName,
}) => {
  if (!element.classList.contains(hoverClassName) && !force) return false

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
