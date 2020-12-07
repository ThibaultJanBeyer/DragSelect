// @ts-check
import DragSelect from '../DragSelect'
import '../types'

export default class Interaction {
  /** @type {DSArea} @private */
  _areaElement

  /**
   * @constructor Interaction
   * @param {Object} obj
   * @param {DSArea} obj.areaElement
   * @param {DragSelect} obj.DS
   * @ignore
   */
  constructor({ areaElement, DS }) {
    this._areaElement = areaElement
    this.DS = DS
  }

  init = () => {
    this.stop()
    this._areaElement.addEventListener('mousedown', this.start)
    this._areaElement.addEventListener('touchstart', this.start, {
      passive: false,
    })
    this.DS.publish('Interaction:init', {})
  }

  start = (event) => {
    if (event.type === 'touchstart') event.preventDefault() // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
    if (/** @type {*} */ (event).button === 2) return // right-clicks
    this.DS.publish('Interaction:start', { event })

    document.addEventListener('mouseup', this.reset)
    document.addEventListener('touchend', this.reset)
  }

  stop = () => {
    this._areaElement.removeEventListener('mousedown', this.start)
    this._areaElement.removeEventListener('touchstart', this.start, {
      // @ts-ignore
      passive: false,
    })
    document.removeEventListener('mouseup', this.reset)
    document.removeEventListener('touchend', this.reset)
  }

  reset = (event) => {
    this.stop()
    this.init()
    this.DS.publish('Interaction:end', { event })
  }
}
