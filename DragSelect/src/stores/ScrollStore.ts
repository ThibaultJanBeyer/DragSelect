import DragSelect from '../DragSelect'
import PubSub from '../modules/PubSub'
import { DSInputElement, Settings, Vect2 } from '../types'
import { calcVect, num2vect } from '../methods/vect2'
import { canScroll } from '../methods/canScroll'
import { getCurrentScroll } from '../methods/getCurrentScroll'

export default class ScrollStore<E extends DSInputElement> {
  private _initialVal: Vect2 = { x: 0, y: 0 }
  private _currentVal: Vect2 = { x: 0, y: 0 }
  private _canScroll?: boolean
  private DS: DragSelect<E>
  private PS: PubSub<E>
  private Settings: Required<Settings<E>>

  constructor({ DS, PS }: { DS: DragSelect<E>; PS: PubSub<E> }) {
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s
    this.PS.subscribe('Area:modified', () => {
      this.stop()
      this.init()
    })
    this.PS.subscribe('Interaction:init', this.init)
    this.PS.subscribe('Interaction:start', () => this.start())
    this.PS.subscribe('Interaction:end', () => this.reset())
  }

  private init = () => this.addListeners()

  private addListeners = () =>
    this.DS.Area.HTMLNode.addEventListener('scroll', this.update)
  private removeListeners = () =>
    this.DS.Area.HTMLNode.removeEventListener('scroll', this.update)

  private start = () => {
    this._currentVal = this._initialVal = getCurrentScroll(
      this.DS.Area.HTMLNode
    )
  }

  private update = () =>
    (this._currentVal = getCurrentScroll(this.DS.Area.HTMLNode))

  public stop = () => {
    this.reset()
    this.removeListeners()
  }

  private reset = () => {
    this._initialVal = { x: 0, y: 0 }
    this._canScroll = undefined
  }

  public get canScroll() {
    if (typeof this._canScroll === 'boolean') return this._canScroll
    return (this._canScroll = canScroll(this.DS.Area.HTMLNode))
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
      this._currentVal = getCurrentScroll(this.DS.Area.HTMLNode)
    return this._currentVal
  }
}
