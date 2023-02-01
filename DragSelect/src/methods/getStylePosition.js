// @ts-check
import '../types'

/**
 * @param {DSElement} element
 * @return {Vect2}
 */
const getComputedTranslatePositions = (element) => {
  const position = {
    x: 0,
    y: 0,
  }

  const computed = window.getComputedStyle(element)
  if (!computed.transform || computed.transform === 'none') return position

  if (computed.transform.indexOf('3d') >= 0) {
    const match = computed.transform.trim().match(/matrix3d\((.*?)\)/)
    if (match && match.length) {
      const values = match[1]?.split(',')
      position.x = parseInt(values[12]) || 0
      position.y = parseInt(values[13]) || 0
    }
    return position
  }
  const match = computed.transform.trim().match(/matrix\((.*?)\)/)
  if (match && match.length) {
    const values = match[1]?.split(',')
    position.x = parseInt(values[4]) || 0
    position.y = parseInt(values[5]) || 0
  }
  return position
}

/**
 * @param {DSElement} element
 * @return {Vect2}
 */
const getTranslatedPositions = (element) => {
  const { transform } = element.style

  if (!transform || transform.indexOf('translate') < 0)
    return getComputedTranslatePositions(element)

  const position = {
    x: 0,
    y: 0,
  }

  const match = transform.trim().match(/translate[3dD]*?\(.*?\)/)
  if (match) {
    const split = match[0]?.split('(')
    if (split) {
      const values = split[1]?.split(',')
      position.x = parseInt(values[0]) || 0
      position.y = parseInt(values[1]) || 0
    }
  }

  if (!position.x && !position.x) return getComputedTranslatePositions(element)

  return position
}

/**
 * @param {DSElement} element
 * @return {Vect2}
 */
const getTopLeftPosition = (element) => {
  const { style } = element

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
  return getTopLeftPosition(element)
}
