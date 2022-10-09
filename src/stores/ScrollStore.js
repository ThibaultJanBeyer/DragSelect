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
   * @type {boolean}
   * @private */
  _canScroll

  /**
   * @class ScrollStore
   * @constructor ScrollStore
   * @param {{ DS:DragSelect }} p
   * @ignore
   */
  constructor({ DS }) {
    this.DS = DS
    this.DS.subscribe('Interaction:init', this.init)
    this.DS.subscribe('Interaction:start', () => this.start())
    this.DS.subscribe('Interaction:end', () => this.reset())
  }

  init = () =>
    this.DS.stores.SettingsStore.s.area.addEventListener('scroll', this.update)

  start = () => {
    this._currentVal = this._initialVal = getCurrentScroll(
      this.DS.stores.SettingsStore.s.area
    )
    this.DS.stores.SettingsStore.s.area.addEventListener('scroll', this.update)
  }

  update = () =>
    (this._currentVal = getCurrentScroll(this.DS.stores.SettingsStore.s.area))

  stop = () => {
    this.DS.stores.SettingsStore.s.area.removeEventListener(
      'scroll',
      this.update
    )
    this._initialVal = { x: 0, y: 0 }
    this._canScroll = null
  }

  reset = () => {
    this.stop()
    this.start()
  }

  get canScroll() {
    if (typeof this._canScroll === 'boolean') return this._canScroll
    return (this._canScroll = canScroll(this.DS.stores.SettingsStore.s.area))
  }

  get scrollAmount() {
    const scrollDiff = vect2.calc(this.currentVal, '-', this.initialVal)

    // if area is zoomed, the scroll values are skewed, we need to fix that manually :(
    const zoom = vect2.num2vect(this.DS.stores.SettingsStore.s.zoom)
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
      this._currentVal = getCurrentScroll(this.DS.stores.SettingsStore.s.area)
    return this._currentVal
  }
}
