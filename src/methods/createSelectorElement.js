// @ts-check
import '../types'

/**
 * Create the selector node
 * @param {boolean} customStyles
 * @return {HTMLElement}
 */
export default (customStyles) => {
  const selector = document.createElement('div')

  selector.style.position = 'absolute'
  if (!customStyles) {
    selector.style.background = 'rgba(0, 0, 255, 0.1)'
    selector.style.border = '1px solid rgba(0, 0, 255, 0.45)'
    selector.style.display = 'none'
    selector.style.pointerEvents = 'none' // fix for issue #8 (ie11+)
  }

  return selector
}
