import DragSelect from "../DragSelect"
import DropZone from "./DropZone"
import PubSub from "./PubSub"
import { DSInputDropZone, DSInputElement, Vect2 } from "../types"
import { DSSettings } from "../stores/SettingsStore"
import { isCollision } from "../methods/isCollision"

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

    this.PS.subscribe('Settings:updated:dropZones', 
      ({ settings }) => this.setDropZones(settings))
    this.setDropZones({ dropZones: this.Settings.dropZones })
    this.PS.subscribe('Interaction:end', this.stop)
  }

  private setDropZones = ({ dropZones }: { dropZones: DSInputDropZone<E>[] }) => {
    if (!dropZones) return
    if (this._zones) this._zones.forEach((zone) => zone.destroy())

    this._zones = dropZones.map((zone) => new DropZone({ DS: this.DS, PS: this.PS, ...zone }))
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

  private _handleDrop = (target?: DropZone<E>) => {
    this._zones?.forEach((zone) => zone === target && zone.handleNoDrop())
    if (!target) return
    target.handleDrop()
  }

  private _getZoneByElementsFromPoint = (elements: Element[], { x, y }: Vect2) => {
    for (let i = 0, il = elements.length; i < il; i++) {
      const zone = this._zoneByElement.get(elements[i])
      if (
        isCollision(
          zone?.rect,
          { left: x, right: x, top: y, bottom: y },
          Math.min(this.Settings.dropTargetThreshold, 0.5)
        )
      ) return zone
    }
  }

  private stop = ({ isDragging }: { isDragging: boolean }) => {
    if (!isDragging) return
    const target = this.getTarget()
    this._handleDrop(target)
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

  /** Returns first DropsZone under current pointer or coordinates if passed */
  public getTarget = (coordinates?: Vect2) => {
    if (!this._zones?.length) return

    const x = coordinates?.x || this.DS.stores.PointerStore.currentVal.x
    const y = coordinates?.y || this.DS.stores.PointerStore.currentVal.y

    const elements = document.elementsFromPoint(x, y)
    return this._getZoneByElementsFromPoint(elements, { x, y })
  }
}
