import '../types.js'

/**
 * Create the selector node when not provided by options object.
 * @param {boolean} customStyles
 * @param {DSArea} area
 * @return {HTMLElement}
 */
export default (customStyles, area) => {
  const selector = document.createElement('div')

  selector.style.position = 'absolute'
  if (!customStyles) {
    selector.style.background = 'rgba(0, 0, 255, 0.1)'
    selector.style.border = '1px solid rgba(0, 0, 255, 0.45)'
    selector.style.display = 'none'
    selector.style.pointerEvents = 'none' // fix for issue #8 (ie11+)
  }

  const _area = area === document ? document.body : area
  _area.appendChild(selector)

  return selector
}
