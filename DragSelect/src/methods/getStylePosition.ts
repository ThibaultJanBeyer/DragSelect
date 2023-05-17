import { DSInputElement, Vect2 } from "../types"

const getComputedTranslatePositions = <E extends DSInputElement>(element: E) => {
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

const getTranslatedPositions = <E extends DSInputElement>(element: E) => {
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

const getTopLeftPosition = <E extends DSInputElement>(element: E) => {
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
 */
export const getStylePosition = <E extends DSInputElement>(element: E, useTranslate?: boolean): Vect2 => {
  if (useTranslate) return getTranslatedPositions(element)
  return getTopLeftPosition(element)
}
