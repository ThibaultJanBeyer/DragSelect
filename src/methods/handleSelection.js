// @ts-check
import '../types'

/**
 * Logic when an element is selected
 * @param {Object} p
 * @param {DSElement} p.element
 * @param {boolean} p.force
 * @param {boolean} p.multiSelectionToggle
 * @param {Set} p.SelectedSet
 * @param {string} p.hoverClassName
 */
export default ({
  element,
  force,
  multiSelectionToggle,
  SelectedSet,
  hoverClassName,
}) => {
  if (element.classList.contains(hoverClassName) && !force) return

  if (!SelectedSet.has(element)) SelectedSet.add(element)
  else if (multiSelectionToggle) SelectedSet.delete(element)

  element.classList.add(hoverClassName)
}
