import DragSelect from '../DragSelect'
import PubSub from './PubSub'
import { DSEdges, DSInputElement } from '../types'
import { DSSettings } from '../stores/SettingsStore'

export type DSInteractionPublishEventNames =
  | 'Interaction:init:pre'
  | 'Interaction:init'
  | 'Interaction:start:pre'
  | 'Interaction:start'
  | 'Interaction:update:pre'
  | 'Interaction:update'
  | 'Interaction:end:pre'
  | 'Interaction:end'

export type DSInteractionPublishEventData = {
  event: InteractionEvent | KeyboardEvent
  /** Whether the interaction is a drag or a select */
  isDragging: boolean
  /** Whether or not the drag interaction is via keyboard */
  isDraggingKeyboard?: boolean
  key?: string
  scroll_directions?: DSEdges
  scroll_multiplier?: number
}

export type DSInteractionPublish = {
  'Interaction:init:pre': {}
  'Interaction:init': {}
  'Interaction:start:pre': DSInteractionPublishEventData
  'Interaction:start': DSInteractionPublishEventData
  'Interaction:update:pre': Partial<DSInteractionPublishEventData>
  'Interaction:update': Partial<DSInteractionPublishEventData>
  'Interaction:end:pre': DSInteractionPublishEventData
  'Interaction:end': DSInteractionPublishEventData
}

export type InteractionEvent = MouseEvent | PointerEvent | TouchEvent

export default class Interaction<E extends DSInputElement> {
  private isInteracting?: boolean
  public isDragging: boolean = false
  private DS: DragSelect<E>
  private PS: PubSub<E>
  private Settings: DSSettings<E>

  constructor({ DS, PS }: { DS: DragSelect<E>; PS: PubSub<E> }) {
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s

    // not on every modification, just on change of area
    this.PS.subscribe('Settings:updated:area', ({ settings }) => {
      this.removeAreaEventListeners(settings['area:pre'])
      this.setAreaEventListeners(settings['area'])
    })
    this.PS.subscribe('PointerStore:updated', ({ event }) =>
      this.update({ event })
    )
    this.PS.subscribe('Selectable:click', this.onClick)
    this.PS.subscribe('Selectable:pointer', ({ event }) => this.start(event))
    this.PS.subscribe('Interaction:start:pre', ({ event }) =>
      this._start(event)
    )
    this.PS.subscribe('Interaction:init:pre', this._init)
    this.PS.subscribe('Interaction:end:pre', ({ event }) => this._reset(event))
    this.PS.subscribe('Area:scroll', this.update)
  }

  public init = () => this.PS.publish('Interaction:init:pre', { init: true })

  private _init = () => {
    this.stop()
    this.setAreaEventListeners()
    this.PS.publish('Interaction:init', { init: true })
  }

  private _canInteract(event: KeyboardEvent | InteractionEvent) {
    const isKeyboardClick =
      'clientX' in event &&
      event.clientX === 0 &&
      event.clientY === 0 &&
      event.detail === 0 &&
      event.target

    if (
      ('button' in event && event.button === 2) || // right-clicks
      this.isInteracting || // fix double-click issues
      (event.target && !this.DS.SelectorArea.isInside(event.target as E)) || // fix outside elements issue
      (!isKeyboardClick && !this.DS.SelectorArea.isClicked(event)) // make sure the mouse click is inside the area
    )
      return false

    return true
  }

  private start = (event: Event) =>
    this.PS.publish('Interaction:start:pre', {
      event: event as InteractionEvent, // Event to satisfy event listeners but we know it’s an InteractionEvent
      isDragging: this.isDragging,
    })

  private _start = (event: KeyboardEvent | InteractionEvent) => {
    if (event.type === 'touchstart') event.preventDefault() // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
    if (!this._canInteract(event)) return

    this.isInteracting = true
    this.isDragging = this.isDragEvent(event)

    this.PS.publish('Interaction:start', {
      event,
      isDragging: this.isDragging,
    })

    this.setDocEventListeners()
  }

  private isDragEvent = (event: InteractionEvent | KeyboardEvent) => {
    let clickedElement: E | null = null
    if (event.target && 'closest' in event.target)
      clickedElement = (event.target as E).closest(
        `.${this.Settings.selectableClass}`
      )

    if (
      !this.Settings.draggability ||
      this.DS.stores.KeyStore.isMultiSelectKeyPressed(event) ||
      !clickedElement
    )
      return false

    if (this.Settings.immediateDrag) {
      if (!this.DS.SelectedSet.size) this.DS.SelectedSet.add(clickedElement)
      else if (!this.DS.SelectedSet.has(clickedElement)) {
        this.DS.SelectedSet.clear()
        this.DS.SelectedSet.add(clickedElement)
      }
    }

    if (this.DS.SelectedSet.has(clickedElement)) return true

    return false
  }

  /**
   * Triggers when a node is actively selected: <button> nodes that are pressed via the keyboard.
   * Making DragSelect accessible for everyone!
   */
  private onClick = ({ event }: { event: MouseEvent }) => {
    if (!this._canInteract(event)) return
    if (event.detail > 0) return // mouse interaction

    const {
      stores: { PointerStore, KeyStore },
      SelectableSet,
      SelectedSet,
    } = this.DS

    PointerStore.start(event)

    const node = event.target as E
    if (node && !SelectableSet.has(node)) return

    if (!KeyStore.isMultiSelectKeyPressed(event)) SelectedSet.clear()
    if (node) SelectedSet.toggle(node)

    this.reset(event) // simulate mouse-up (that does not exist on keyboard)
  }

  stop = (area = this.DS.Area.HTMLNode) => {
    this.removeAreaEventListeners(area)
    this.removeDocEventListeners()
  }

  update = ({
    event,
    scroll_directions,
    scroll_multiplier,
  }: {
    event?: InteractionEvent
    scroll_directions?: DSEdges
    scroll_multiplier?: number
  }) => {
    if (this.isInteracting)
      this.PS.publish(['Interaction:update:pre', 'Interaction:update'], {
        event,
        scroll_directions,
        scroll_multiplier,
        isDragging: this.isDragging,
      })
  }

  reset = (event: InteractionEvent) =>
    this.PS.publish('Interaction:end:pre', {
      event,
      isDragging: this.isDragging,
    })

  _reset = (event: InteractionEvent | KeyboardEvent) => {
    const { isDragging } = this
    this.isInteracting = false
    this.isDragging = false
    this.removeDocEventListeners()
    this.PS.publish('Interaction:end', { event, isDragging })
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Event Listeners

  private setAreaEventListeners = (area = this.DS.Area.HTMLNode) => {
    // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
    if (this.Settings.usePointerEvents)
      area.addEventListener('pointerdown', this.start, {
        passive: false,
      })
    else area.addEventListener('mousedown', this.start)
    area.addEventListener('touchstart', this.start, {
      passive: false,
    })
  }
  private removeAreaEventListeners = (area = this.DS.Area.HTMLNode) => {
    // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
    if (this.Settings.usePointerEvents) {
      area.removeEventListener('pointerdown', this.start, {
        // @ts-ignore
        passive: false,
      })
    } else area.removeEventListener('mousedown', this.start)
    area.removeEventListener('touchstart', this.start, {
      // @ts-ignore
      passive: false,
    })
  }

  private setDocEventListeners = () => {
    // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
    if (this.Settings.usePointerEvents) {
      document.addEventListener('pointerup', this.reset)
      document.addEventListener('pointercancel', this.reset)
    } else document.addEventListener('mouseup', this.reset)
    document.addEventListener('touchend', this.reset)
  }
  private removeDocEventListeners = () => {
    // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
    if (this.Settings.usePointerEvents) {
      document.removeEventListener('pointerup', this.reset)
      document.removeEventListener('pointercancel', this.reset)
    } else document.removeEventListener('mouseup', this.reset)
    document.removeEventListener('touchend', this.reset)
  }
}
