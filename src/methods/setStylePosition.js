// @ts-check
import '../types'

/**
 * Sets the style position to the X and Y coordinates
 * Can handle translate and top/left
 * @param {DSElement} element
 * @param {Vect2} values
 * @param {boolean} [useTranslate]
 * @return {DSElement}
 */
export default (element, values, useTranslate) => {
  if (useTranslate) {
    const prevTransform = element.style.transform
    element.style.transform = `translate3d(${values.x}px,${
      values.y
    }px,1px) ${prevTransform.replace(/translate.*?\)/g, '')}`
  } else {
    element.style.left = `${values.x}px`
    element.style.top = `${values.y}px`
  }

  return element
}
