import DragSelect from '../DragSelect'
import { getPointerPos, vect2 } from '../methods'

export default class PointerStore {
  // multiselect
  /** @type {boolean} @private */
  _multiSelectMode
  /** @type {DSMultiSelectKeys} @private */
  _multiSelectKeys
  /** @type {boolean} */
  _isMultiSelect = false
  /** @type {boolean} */
  _isMouseInteraction = false

  // Pointer Positions within Area
  /** @type {Vect2} @private */
  _initialValArea
  /** @type {Vect2} @private */
  _currentValArea
  /** @type {Vect2} @private */
  _lastValArea

  // General Pointer Position
  /** @type {Vect2} @private */
  _initialVal
  /** @type {Vect2} @private */
  _currentVal
  /** @type {Vect2} @private */
  _lastVal

  /** @type {TouchEvent} @private */
  _lastTouch

  /** @param {{DS:DragSelect,multiSelectKeys:DSMultiSelectKeys,multiSelectMode:boolean}} p */
  constructor({ DS, multiSelectKeys, multiSelectMode }) {
    this.DS = DS
    this._multiSelectKeys = multiSelectKeys
    this._multiSelectMode = multiSelectMode

    this.DS.subscribe('Interaction:start', ({ event }) => this.start(event))
    this.DS.subscribe('Interaction:end', ({ event }) => this.stop(event))
  }

  /** @param {DSEvent} [event] */
  start(event) {
    if (!event) return
    this._isMouseInteraction = true
    this._isMultiSelect = this._isMultiSelectKeyPressed(event)
    this.currentVal = this.initialVal = getPointerPos({
      event: this._normalizedEvent(event),
    })

    document.addEventListener('mousemove', this.update)
    document.addEventListener('touchmove', this.update, {
      // @ts-ignore
      passive: false,
    })
  }

  /** @param {DSEvent} [event] */
  update = (event) => {
    if (!event) return
    this.currentVal = getPointerPos({
      event: this._normalizedEvent(event),
    })
    this.DS.publish('PointerStore:updated', { event })
  }

  /** @param {DSEvent} [event] */
  stop = (event) => {
    if (!event) return

    document.removeEventListener('mousemove', this.update)
    document.removeEventListener('touchmove', this.update, {
      // @ts-ignore
      passive: false,
    })

    this.currentVal = this.lastVal = getPointerPos({
      event: this._normalizedEvent(event),
    })
    this.initialVal = { x: 0, y: 0 }

    // debounce in order "onClick" to work
    setTimeout(() => (this._isMouseInteraction = false), 100)
  }

  /**
   * @param {DSEvent} event
   * @return {MouseEvent|Touch}
   * @private
   */
  _normalizedEvent(event) {
    // touchend has not touches. so we take the last touch if a touchevent, we need to store the positions
    if ('touches' in event && event.type !== 'touchend') this._lastTouch = event
    // if a touchevent, return the last touch rather than the regular event
    // we need .touches[0] from that event instead
    return 'touches' in event ? this._lastTouch.touches[0] : event
  }

  /**
   * @param {DSEvent} event
   * @return {boolean}
   * @private
   */
  _isMultiSelectKeyPressed(event) {
    if (this._multiSelectMode) return true
    return this._multiSelectKeys.some((mKey) => event[mKey])
  }

  get isMultiSelect() {
    return this._isMultiSelect
  }

  get isMouseInteraction() {
    return this._isMouseInteraction
  }

  /** First recorded pointer position within the area */
  get initialValArea() {
    if (!this._initialValArea) return { x: 0, y: 0 }
    return this._initialValArea
  }

  /** Current pointer position within the area */
  get currentValArea() {
    if (!this._currentValArea) return { x: 0, y: 0 }
    return this._currentValArea
  }

  /** Last recorded pointer position within the area */
  get lastValArea() {
    if (!this._lastValArea) return { x: 0, y: 0 }
    return this._lastValArea
  }

  /** First recorded pointer position */
  get initialVal() {
    if (!this._initialVal) return { x: 0, y: 0 }
    return this._initialVal
  }

  /** Current pointer position */
  get currentVal() {
    if (!this._currentVal) return { x: 0, y: 0 }
    return this._currentVal
  }

  /** Last recorded pointer position */
  get lastVal() {
    if (!this._lastVal) return { x: 0, y: 0 }
    return this._lastVal
  }

  set initialVal(value) {
    this._initialVal = value
    this._initialValArea =
      value &&
      vect2.calc(
        value,
        '-',
        vect2.calc(
          vect2.rect2vect(this.DS.Area.boundingClientRect),
          '+',
          vect2.rect2vect(this.DS.Area.computedBorder)
        )
      )
  }

  set currentVal(value) {
    this._currentVal = value
    this._currentValArea =
      value &&
      vect2.calc(
        value,
        '-',
        vect2.calc(
          vect2.rect2vect(this.DS.Area.boundingClientRect),
          '+',
          vect2.rect2vect(this.DS.Area.computedBorder)
        )
      )
  }

  set lastVal(value) {
    this._lastVal = value
    this._lastValArea =
      value &&
      vect2.calc(
        value,
        '-',
        vect2.calc(
          vect2.rect2vect(this.DS.Area.boundingClientRect),
          '+',
          vect2.rect2vect(this.DS.Area.computedBorder)
        )
      )
  }
}