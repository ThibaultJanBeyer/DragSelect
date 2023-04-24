import DragSelect from "../DragSelect"
import PubSub from "./PubSub"
import { DSBoundingRect, DSElement } from "../types"
import { DSSettings } from "../stores/SettingsStore"
import { InteractionEvent } from "./Interaction"
import { handleElementPositionAttribute } from "../methods/handleElementPositionAttribute"
import { ensureArray } from "../methods/ensureArray"

export type DSSelectablePublishEventNames = "Selectable:added:pre"|"Selectable:added"|"Selectable:removed"|"Selectable:removed:pre"|"Selectable:click:pre"|"Selectable:click"|"Selectable:pointer:pre"|"Selectable:pointer"

export type DSSelectablePublishEventData = {
  /** The items currently selected */
  items: DSElement[],
  /** The item currently selected */
  item: DSElement,
};

export type DSSelectablePublish = {
  "Selectable:added:pre": DSSelectablePublishEventData
  "Selectable:added": DSSelectablePublishEventData
  "Selectable:removed:pre": DSSelectablePublishEventData
  "Selectable:removed": DSSelectablePublishEventData
  "Selectable:click:pre": { event: MouseEvent }
  "Selectable:click": { event: MouseEvent }
  "Selectable:pointer:pre": { event: InteractionEvent }
  "Selectable:pointer": { event: InteractionEvent }
}

export default class SelectableSet extends Set<DSElement> {
  private _rects?: Map<DSElement,DSBoundingRect>
  private _timeout?: NodeJS.Timeout
  private DS: DragSelect
  private PS: PubSub
  private Settings: DSSettings

  constructor({ DS, PS }: { DS: DragSelect, PS: PubSub }) {
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

  public add(element: DSElement) {
    if (super.has(element)) return this
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

  public delete(element: DSElement) {
    if (!super.has(element)) return true
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

  public addAll = (elements: DSElement[]) => elements.forEach((el) => this.add(el))

  public deleteAll = (elements: DSElement[]) => elements.forEach((el) => this.delete(el))

  public getRect = (element: DSElement) => this._rects ? this.rects.get(element) : element.getBoundingClientRect()

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

    return this._rects as Map<DSElement,DSBoundingRect>
  }
}
