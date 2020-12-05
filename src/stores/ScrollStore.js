import DragSelect from '../DragSelect'
import { getCurrentScroll, vect2 } from '../methods'

export default class ScrollStore {
  /** @type {Vect2} @private */
  _initialVal
  /** @type {Vect2} @private */
  _currentVal

  /** @param {{ DS:DragSelect, zoom:number }} p */
  constructor({ DS, zoom }) {
    this.DS = DS
    this.zoom = zoom
  }

  start() {
    this.currentVal = this.initialVal = getCurrentScroll(this.DS.Area.HTMLNode)
  }

  update() {
    this.currentVal = getCurrentScroll(this.DS.Area.HTMLNode)
  }

  reset() {
    this.initialVal = { x: 0, y: 0 }
  }

  get scrollAmount() {
    const scrollDiff = vect2.calc(this.currentVal, '-', this.initialVal)

    // if area is zoomed, the scroll values are skewed, we need to fix that manually :(
    const zoom = vect2.num2vect(this.zoom)
    const zoomScroll = vect2.calc(
      vect2.calc(scrollDiff, '*', zoom),
      '-',
      scrollDiff
    )

    return {
      x: scrollDiff.x + zoomScroll.x,
      y: scrollDiff.y + zoomScroll.y,
    }
  }

  get initialVal() {
    if (!this._initialVal) return { x: 0, y: 0 }
    return this._initialVal
  }

  get currentVal() {
    if (!this._currentVal) return { x: 0, y: 0 }
    return this._currentVal
  }

  set initialVal(value) {
    this._initialVal = value
  }

  set currentVal(value) {
    this._currentVal = value
  }
}
