import DragSelect from "../DragSelect"
import PubSub from "./PubSub"
import { DSBoundingRect, DSInputElement } from "../types"
import { DSSettings } from "../stores/SettingsStore"
import { InteractionEvent } from "./Interaction"
import { handleElementPositionAttribute } from "../methods/handleElementPositionAttribute"
import { ensureArray } from "../methods/ensureArray"

export type DSSelectablePublishEventNames = "Selectable:added:pre"|"Selectable:added"|"Selectable:removed"|"Selectable:removed:pre"|"Selectable:click:pre"|"Selectable:click"|"Selectable:pointer:pre"|"Selectable:pointer"

export type DSSelectablePublishEventData<E extends DSInputElement> = {
  /** The items currently selected */
  items: E[],
  /** The item currently selected */
  item: E,
};

export type DSSelectablePublish<E extends DSInputElement> = {
  "Selectable:added:pre": DSSelectablePublishEventData<E>
  "Selectable:added": DSSelectablePublishEventData<E>
  "Selectable:removed:pre": DSSelectablePublishEventData<E>
  "Selectable:removed": DSSelectablePublishEventData<E>
  "Selectable:click:pre": { event: MouseEvent }
  "Selectable:click": { event: MouseEvent }
  "Selectable:pointer:pre": { event: InteractionEvent }
  "Selectable:pointer": { event: InteractionEvent }
}

export default class SelectableSet<E extends DSInputElement> extends Set<E> {
  private _rects?: Map<E, DSBoundingRect>
  private _timeout?: NodeJS.Timeout
  private DS: DragSelect<E>
  private PS: PubSub<E>
  private Settings: DSSettings<E>

  constructor({ DS, PS }: { DS: DragSelect<E>, PS: PubSub<E> }) {
    super()
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s
    this.PS.subscribe('Interaction:init', this.init)
    this.PS.subscribe('Settings:updated:selectables', () => {
      this.clear()
      this.init()
    })
    this.PS.subscribe('Settings:updated:selectableClass', ({ settings }) => {
      this.forEach((el) => {
        el.classList.remove(settings['selectableClass:pre'])
        el.classList.add(settings.selectableClass)
      })
    })
  }

  private init = () => ensureArray(this.Settings.selectables).forEach((el) => this.add(el))

  public add(element: E) {
    if (!element || super.has(element)) return this
    const publishData = {
      items: this.elements,
      item: element,
    }
    this.PS.publish('Selectable:added:pre', publishData)
    element.classList.add(this.Settings.selectableClass)
    element.addEventListener('click', this._onClick)

    if (this.Settings.usePointerEvents)
      element.addEventListener('pointerdown', this._onPointer, { passive: false })
    else element.addEventListener('mousedown', this._onPointer)

    element.addEventListener('touchstart', this._onPointer, { passive: false })

    if (this.Settings.draggability && !this.Settings.useTransform)
      handleElementPositionAttribute({
        computedStyle: window.getComputedStyle(element),
        node: element,
      })

    this.PS.publish('Selectable:added', publishData)
    return super.add(element)
  }

  public delete(element: E) {
    if (!element || !super.has(element)) return true
    const publishData = {
      items: this.elements,
      item: element,
    }
    this.PS.publish('Selectable:removed:pre', publishData)
    element.classList.remove(this.Settings.selectableClass)
    element.classList.remove(this.Settings.hoverClass)
    element.removeEventListener('click', this._onClick)

    if (this.Settings.usePointerEvents)
      element.removeEventListener('pointerdown', this._onPointer, {
        // @ts-ignore
        passive: false,
      })
    else element.removeEventListener('mousedown', this._onPointer)

    element.removeEventListener('touchstart', this._onPointer, {
      // @ts-ignore
      passive: false,
    })
    this.PS.publish('Selectable:removed', publishData)
    return super.delete(element)
  }

  public clear = () => this.forEach((el) => this.delete(el))

  private _onClick = (event: Event) => // we know it’s only a MouseEvent
    this.PS.publish(['Selectable:click:pre', 'Selectable:click'], { event: event as MouseEvent })

  private _onPointer = (event: Event) => // we know it’s only an InteractionEvent
    this.PS.publish(['Selectable:pointer:pre', 'Selectable:pointer'], { event: event as InteractionEvent })

  public addAll = (elements: E[]) => elements.forEach((el) => this.add(el))

  public deleteAll = (elements: E[]) => elements.forEach((el) => this.delete(el))

  /**
   * Gets the bounding rect from private memory if available. If not gets it from the DOM.
   * => Does not force rect calculation on all elements
   */
  public getElementRect = (element: E) => this._rects ? this._rects.get(element) : element.getBoundingClientRect()

  get elements() {
    return Array.from(this.values())
  }

  get rects() {
    if (this._rects) return this._rects
    this._rects = new Map()
    this.forEach((element) =>
      this._rects?.set(element, element.getBoundingClientRect())
    )

    // since elements can be moved, we need to update the rects every X ms
    if (this._timeout) clearTimeout(this._timeout)
    this._timeout = setTimeout(
      () => (this._rects = undefined),
      this.Settings.refreshMemoryRate
    )

    return this._rects
  }
}
