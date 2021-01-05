// @ts-check
import '../types'
import DragSelect from '../DragSelect'
import { getCurrentScroll, vect2, canScroll } from '../methods'

export default class ScrollStore {
  /**
   * @type {Vect2}
   * @private */
  _initialVal
  /**
   * @type {Vect2}
   * @private */
  _currentVal
  /**
   * @type {DSArea}
   * @private */
  _areaElement
  /**
   * @type {boolean}
   * @private */
  _canScroll

  /**
   * @class ScrollStore
   * @constructor ScrollStore
   * @param {{ DS:DragSelect, areaElement: DSArea, zoom:number }} p
   * @ignore
   */
  constructor({ DS, areaElement, zoom }) {
    this._areaElement = areaElement
    this.DS = DS
    this.zoom = zoom

    this.DS.subscribe('Interaction:init', this.init)
    this.DS.subscribe('Interaction:start', () => this.start())
    this.DS.subscribe('Interaction:end', () => this.reset())
  }

  init = () => this._areaElement.addEventListener('scroll', this.update)

  start = () => {
    this._currentVal = this._initialVal = getCurrentScroll(this._areaElement)
    this._areaElement.addEventListener('scroll', this.update)
  }

  update = () => (this._currentVal = getCurrentScroll(this._areaElement))

  stop = () => {
    this._areaElement.removeEventListener('scroll', this.update)
    this._initialVal = { x: 0, y: 0 }
    this._canScroll = null
  }

  reset = () => {
    this.stop()
    this.start()
  }

  get canScroll() {
    if (typeof this._canScroll === 'boolean') return this._canScroll
    return (this._canScroll = canScroll(this._areaElement))
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
    if (!this._currentVal)
      this._currentVal = getCurrentScroll(this._areaElement)
    return this._currentVal
  }
}
