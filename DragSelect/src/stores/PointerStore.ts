import DragSelect from '../DragSelect'
import PubSub from '../modules/PubSub'
import { DSEvent, DSInputElement, Settings, Vect2 } from '../types'
import { getPointerPos } from '../methods/getPointerPos'
import { rect2vect, calcVect } from '../methods/vect2'
import { InteractionEvent } from '../modules/Interaction'

export type DSPointerStorePublishEventNames =
  | 'PointerStore:updated:pre'
  | 'PointerStore:updated'

export type DSPointerStorePublishEventData = {
  event: PointerEvent | MouseEvent | TouchEvent
}

export type DSPointerStorePublish = {
  [K in DSPointerStorePublishEventNames]: DSPointerStorePublishEventData
}

export default class PointerStore<E extends DSInputElement> {
  private _isMouseInteraction = false
  // Position relative to area
  private _initialValArea: Vect2 = { x: 0, y: 0 }
  private _currentValArea: Vect2 = { x: 0, y: 0 }
  private _lastValArea: Vect2 = { x: 0, y: 0 }
  // General Pointer Position
  private _initialVal: Vect2 = { x: 0, y: 0 }
  private _currentVal: Vect2 = { x: 0, y: 0 }
  private _lastVal: Vect2 = { x: 0, y: 0 }
  private _lastTouch?: TouchEvent

  private DS: DragSelect<E>
  private PS: PubSub<E>
  private settings: Required<Settings<E>>

  constructor({ DS, PS }: { DS: DragSelect<E>; PS: PubSub<E> }) {
    this.DS = DS
    this.PS = PS
    this.settings = this.DS.stores.SettingsStore.s
    this.PS.subscribe('Interaction:init', this.init)
    this.PS.subscribe('Interaction:start', ({ event }) => this.start(event))
    this.PS.subscribe('Interaction:end', ({ event }) => this.reset(event))
  }

  private init = () => {
    if (this.settings.usePointerEvents)
      document.addEventListener('pointermove', this.update, { passive: false })
    else document.addEventListener('mousemove', this.update)

    document.addEventListener('touchmove', this.update, { passive: false })
  }

  public start(event?: DSEvent) {
    if (!event) return
    this._isMouseInteraction = true
    this.currentVal = this.initialVal = this.getPointerPosition(event)
  }

  public getPointerPosition = (event?: DSEvent) =>
    getPointerPos({
      event: this._normalizedEvent(event),
    })

  private update = (event: Event) => {
    // type Event to satisfy event listeners, but we know type is : event as InteractionEvent
    if (!event) return
    this.PS.publish('PointerStore:updated:pre', {
      event: event as InteractionEvent,
    })
    this.currentVal = this.getPointerPosition(event as InteractionEvent)
    if (!this._isMouseInteraction) return
    this.PS.publish('PointerStore:updated', {
      event: event as InteractionEvent,
    })
  }

  public stop = () => {
    // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
    if (this.settings.usePointerEvents)
      document.removeEventListener('pointermove', this.update, {
        // @ts-ignore
        passive: false,
      })
    else document.removeEventListener('mousemove', this.update)

    document.removeEventListener('touchmove', this.update, {
      // @ts-ignore
      passive: false,
    })

    this.reset()
  }

  private reset = (event?: DSEvent) => {
    this.currentVal = this.lastVal = this.getPointerPosition(event)
    // debounce in order "onClick" to work
    setTimeout(() => (this._isMouseInteraction = false), 100)
  }

  private _normalizedEvent(event?: DSEvent): MouseEvent | PointerEvent | Touch {
    // null KeyboardEvents
    if (!event || event instanceof KeyboardEvent)
      return { clientX: 0, clientY: 0 } as MouseEvent
    // touchend has not touches. so we take the last touch if a touchevent, we need to store the positions
    if ('touches' in event) {
      if (event.type !== 'touchend') this._lastTouch = event
      // if a touchevent, return the last touch rather than the regular event
      // as we need .touches[0] from that event
      return this._lastTouch?.touches[0] || event.touches[0]
    }
    return event
  }

  /** First recorded pointer position within the area */
  public get initialValArea() {
    if (!this._initialValArea) return { x: 0, y: 0 }
    return this._initialValArea
  }

  /** Current pointer position within the area */
  public get currentValArea() {
    if (!this._currentValArea) return { x: 0, y: 0 }
    return this._currentValArea
  }

  /** Last recorded pointer position within the area */
  public get lastValArea() {
    if (!this._lastValArea) return { x: 0, y: 0 }
    return this._lastValArea
  }

  /** First recorded pointer position */
  public get initialVal() {
    if (!this._initialVal) return { x: 0, y: 0 }
    return this._initialVal
  }

  /** Current pointer position */
  public get currentVal() {
    if (!this._currentVal) return { x: 0, y: 0 }
    return this._currentVal
  }

  /** Last recorded pointer position */
  public get lastVal() {
    if (!this._lastVal) return { x: 0, y: 0 }
    return this._lastVal
  }

  public set initialVal(value) {
    this._initialVal = value
    this._initialValArea =
      value &&
      calcVect(
        value,
        '-',
        calcVect(
          rect2vect(this.DS.Area.rect),
          '+',
          rect2vect(this.DS.Area.computedBorder)
        )
      )
  }

  public set currentVal(value) {
    this._currentVal = value
    this._currentValArea =
      value &&
      calcVect(
        value,
        '-',
        calcVect(
          rect2vect(this.DS.Area.rect),
          '+',
          rect2vect(this.DS.Area.computedBorder)
        )
      )
  }

  public set lastVal(value) {
    this._lastVal = value
    this._lastValArea =
      value &&
      calcVect(
        value,
        '-',
        calcVect(
          rect2vect(this.DS.Area.rect),
          '+',
          rect2vect(this.DS.Area.computedBorder)
        )
      )
  }
}
