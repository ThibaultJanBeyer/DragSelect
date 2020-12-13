// @ts-check
import '../types'

/**
 * @param {DSElement} element
 * @return {Vect2}
 */
const getComputedTranslatePositions = (element) => {
  const computed = window.getComputedStyle(element)
  if (!computed.transform || computed.transform === 'none')
    return { x: 0, y: 0 }

  if (computed.transform.indexOf('3d') >= 0) {
    const matched = computed.transform.match(
      // matches the values inside translate(3d)
      /(?<=matrix3d\()(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?)(?=\))/
    )
    return {
      x: parseInt(matched[13]) || 0,
      y: parseInt(matched[14]) || 0,
    }
  } else {
    const matched = computed.transform.match(
      // matches the values inside translate(3d)
      /(?<=matrix\()(.*?),(.*?),(.*?),(.*?),(.*?),(.*?)(?=\))/
    )
    return {
      x: parseInt(matched[5]) || 0,
      y: parseInt(matched[6]) || 0,
    }
  }
}

/**
 * @param {DSElement} element
 * @return {Vect2}
 */
const getTranslatedPositions = (element) => {
  const transform = element.style.transform

  if (!transform || transform.indexOf('translate') < 0)
    return getComputedTranslatePositions(element)

  const regex =
    transform.indexOf('3d') >= 0
      ? /(?<=translate3d\()(.*?),(.*?),(.*?)(?=\))/
      : /(?<=translate\()(.*?),(.*?)(?=\))/
  const translate = transform.match(regex)

  const position = {
    x: parseInt(translate[1]) || 0,
    y: parseInt(translate[2]) || 0,
  }

  if (!position.x && !position.x) return getComputedTranslatePositions(element)

  return position
}

/**
 * @param {DSElement} element
 * @return {Vect2}
 */
const getTopLeftPosition = (element) => {
  const style = element.style

  const position = {
    x: parseInt(style.left) || 0,
    y: parseInt(style.top) || 0,
  }

  // initial positions
  if (!position.x && !position.x) {
    const computed = window.getComputedStyle(element)
    return {
      x: parseInt(computed.left) || 0,
      y: parseInt(computed.top) || 0,
    }
  }

  return position
}

/**
 * Returns the X and Y coordinates based on styles
 * Can handle translate and top/left
 * @param {DSElement} element
 * @param {boolean} [useTranslate]
 * @return {Vect2}
 */
export default (element, useTranslate) => {
  if (useTranslate) return getTranslatedPositions(element)
  else return getTopLeftPosition(element)
}
