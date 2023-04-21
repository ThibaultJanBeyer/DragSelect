import DragSelect from '../DragSelect'
import PubSub from '../modules/PubSub'
import { Settings, Vect2 } from '../types'
import { calcVect, num2vect } from "../methods/vect2"
import { canScroll } from '../methods/canScroll'
import { getCurrentScroll } from '../methods/getCurrentScroll'

export default class ScrollStore {
  private _initialVal: Vect2 = { x: 0, y: 0 }
  private _currentVal: Vect2 = { x: 0, y: 0 }
  private _canScroll?: boolean
  private DS: DragSelect
  private PS: PubSub
  private Settings: Required<Settings>

  constructor({ DS, PS }: { DS: DragSelect, PS: PubSub }) {
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s
    this.PS.subscribe('Interaction:init', this.init)
    this.PS.subscribe('Interaction:start', () => this.start())
    this.PS.subscribe('Interaction:end', () => this.reset())
  }

  private init = () =>
    this.Settings.area.addEventListener('scroll', this.update)

  private start = () => {
    this._currentVal = this._initialVal = getCurrentScroll(this.Settings.area)
    this.Settings.area.addEventListener('scroll', this.update)
  }

  private update = () =>
    (this._currentVal = getCurrentScroll(this.Settings.area))

  public stop = () => {
    this.Settings.area.removeEventListener(
      'scroll',
      this.update
    )
    this._initialVal = { x: 0, y: 0 }
    this._canScroll = undefined
  }

  private reset = () => {
    this.stop()
    this.start()
  }

  public get canScroll() {
    if (typeof this._canScroll === 'boolean') return this._canScroll
    return (this._canScroll = canScroll(this.Settings.area))
  }

  public get scrollAmount() {
    const scrollDiff = calcVect(this.currentVal, '-', this.initialVal)

    // if area is zoomed, the scroll values are skewed, we need to fix that manually :(
    const zoom = num2vect(this.Settings.zoom)
    const zoomScroll = calcVect(
      calcVect(scrollDiff, '*', zoom),
      '-',
      scrollDiff
    )

    return {
      x: scrollDiff.x + zoomScroll.x,
      y: scrollDiff.y + zoomScroll.y,
    }
  }

  private get initialVal() {
    if (!this._initialVal) return { x: 0, y: 0 }
    return this._initialVal
  }

  public get currentVal() {
    if (!this._currentVal)
      this._currentVal = getCurrentScroll(this.Settings.area)
    return this._currentVal
  }
}
