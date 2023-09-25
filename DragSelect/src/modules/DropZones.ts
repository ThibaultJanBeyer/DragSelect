import DragSelect from '../DragSelect'
import DropZone from './DropZone'
import PubSub, { DSCallback } from './PubSub'
import { DSInputDropZone, DSInputElement, Vect2 } from '../types'
import { DSSettings } from '../stores/SettingsStore'
import { isCollision } from '../methods/isCollision'
import { DSInteractionPublishEventData, InteractionEvent } from './Interaction'

export default class DropZones<E extends DSInputElement> {
  /** Get the drop zone by the zone element */
  private _zoneByElement: Map<Element, DropZone<E>> = new Map()
  /** Get the drop zone by the zone id */
  private _zoneById: Map<string, DropZone<E>> = new Map()
  /** Get the drop zones by one zone item */
  private _zonesByDroppable: Map<E, DropZone<E>[]> = new Map()
  /** Get the drop zones by one zone item */
  private _zones?: DropZone<E>[]
  private DS: DragSelect<E>
  private PS: PubSub<E>
  private Settings: DSSettings<E>

  constructor({ DS, PS }: { DS: DragSelect<E>; PS: PubSub<E> }) {
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s

    this.PS.subscribe('Settings:updated:dropZones', ({ settings }) =>
      this.setDropZones(settings)
    )
    this.setDropZones({ dropZones: this.Settings.dropZones })
    this.PS.subscribe('Interaction:end', this.stop)
  }

  private setDropZones = ({
    dropZones,
  }: {
    dropZones: DSInputDropZone<E>[]
  }) => {
    if (!dropZones) return
    if (this._zones) this._zones.forEach((zone) => zone.destroy())

    this._zones = dropZones.map(
      (zone) => new DropZone({ DS: this.DS, PS: this.PS, ...zone })
    )
    this._zones.forEach((zone) => {
      this._zoneByElement.set(zone.element, zone)
      this._zoneById.set(zone.id, zone)
      zone.droppables.forEach((droppable) => {
        const zones = this._zonesByDroppable.get(droppable)
        if (!zones?.length) return this._zonesByDroppable.set(droppable, [zone])
        this._zonesByDroppable.set(droppable, [...new Set([...zones, zone])])
      })
    })
  }

  private _handleDrops = (target?: DropZone<E>) => {
    this._zones?.forEach((zone) => {
      if (zone !== target) zone.handleNoDrop()
    })
    if (!target) return
    target.handleDrop()
  }

  private _getZoneByElementsFromPoint = (
    elements: Element[],
    { x, y }: Vect2
  ) => {
    for (let i = 0, il = elements.length; i < il; i++) {
      const zone = this._zoneByElement.get(elements[i])
      if (
        isCollision(
          zone?.rect,
          { left: x, right: x, top: y, bottom: y },
          Math.min(this.Settings.dropTargetThreshold, 0.5)
        )
      )
        return zone
    }
  }

  private stop: DSCallback<DSInteractionPublishEventData> = ({
    isDragging,
    isDraggingKeyboard,
    event,
  }) => {
    if (!isDragging) return
    const target = this.getTarget({ isDraggingKeyboard, event })
    this._handleDrops(target)
  }

  /// ///////////////////////////////////////////////////////////////////////////////////
  // Getters

  public getItemsDroppedById = (zoneId: string) => {
    const zone = this._zoneById.get(zoneId)
    if (!zone) return console.warn(`[DragSelect] No zone found (id: ${zoneId})`)
    return zone.itemsDropped
  }

  public getItemsInsideById = (zoneId: string, addClasses?: boolean) => {
    const zone = this._zoneById.get(zoneId)
    if (!zone) return console.warn(`[DragSelect] No zone found (id: ${zoneId})`)
    if (addClasses) zone.handleItemsInsideClasses()
    return zone.itemsInside
  }

  private getKeyboardItemCenter = (
    isDraggingKeyboard?: boolean,
    event?: InteractionEvent | KeyboardEvent
  ) => {
    if (!isDraggingKeyboard || !event) return
    const rect = (event.target as DSInputElement)?.getBoundingClientRect()
    // center of rect
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    return { x, y }
  }

  /** Returns first DropsZone under current pointer or coordinates if passed */
  public getTarget = ({
    coordinates,
    isDraggingKeyboard,
    event,
  }: {
    coordinates?: Vect2
    isDraggingKeyboard?: boolean
    event?: InteractionEvent | KeyboardEvent
  }) => {
    if (!this._zones?.length) return

    let keyboardCoordinates: Vect2 | undefined
    if (!coordinates && isDraggingKeyboard && event) {
      keyboardCoordinates = this.getKeyboardItemCenter(
        isDraggingKeyboard,
        event
      )
    }

    const x =
      coordinates?.x ||
      keyboardCoordinates?.x ||
      this.DS.stores.PointerStore.currentVal.x
    const y =
      coordinates?.y ||
      keyboardCoordinates?.y ||
      this.DS.stores.PointerStore.currentVal.y

    const elements = document.elementsFromPoint(x, y)
    return this._getZoneByElementsFromPoint(elements, { x, y })
  }
}
