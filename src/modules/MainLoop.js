// @ts-check
import DragSelect from '../DragSelect'
import '../types'

export default class MainLoop {
  /** @type {DSArea} @private */
  _areaElement
  /** @type {number} @private */
  _time
  /** @type {boolean} @private */
  isRunning = false

  /** @param {{areaElement:DSArea, DS:DragSelect}} p */
  constructor({ areaElement, DS }) {
    this._areaElement = areaElement
    this.DS = DS
    this.DS.subscribe('MainLoop:end', this.reset)
    this.init()
  }

  _startEvent = (event) => {
    if (event.type === 'touchstart') event.preventDefault() // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
    if (/** @type {*} */ (event).button === 2) return // right-clicks
    this.DS.publish('MainLoop:start', { event })
    this.start()
  }
  _endEvent = (event) => this.DS.publish('MainLoop:end', { event })

  init = () => {
    this._areaElement.addEventListener('mousedown', this._startEvent)
    this._areaElement.addEventListener('touchstart', this._startEvent, {
      passive: false,
    })
    this.DS.publish('MainLoop:init', {})
  }

  start = () => {
    document.addEventListener('mouseup', this._endEvent)
    document.addEventListener('touchend', this._endEvent)

    if (!this.DS.SelectorArea.isClicked()) return
    this.isRunning = true
    this.mainLoop()
  }

  stop = () => {
    this.isRunning = false
    this._areaElement.removeEventListener('mousedown', this._startEvent)
    this._areaElement.removeEventListener('touchstart', this._startEvent, {
      // @ts-ignore
      passive: false,
    })
    document.removeEventListener('mouseup', this._endEvent)
    document.removeEventListener('touchend', this._endEvent)
  }

  reset = () => {
    this.stop()
    this.init()
  }

  mainLoop = (timestamp) => {
    if (this.isRunning) {
      requestAnimationFrame(this.mainLoop)
      const dt = timestamp - (this._time || timestamp) || 0

      this.DS.publish('MainLoop:update', { dt })

      this._time = timestamp
    }
  }
}
