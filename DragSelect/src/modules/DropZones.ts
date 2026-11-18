import DragSelect from '../DragSelect'
import DropZone from './DropZone'
import PubSub, { DSCallback } from './PubSub'
import { DSInputDropZone, DSInputElement, Vect2 } from '../types'
import { DSSettings } from '../stores/SettingsStore'
import { isCollision } from '../methods/isCollision'
import { DSInteractionPublishEventData } from './Interaction'

export default class DropZones<E extends DSInputElement> {
  /** Get the drop zone by the zone element */
  private _zoneByElement: Map<Element, DropZone<E>> = new Map()
  /** Get the drop zone by the zone id */
  private _zoneById: Map<string, DropZone<E>> = new Map()
  /** All drop zones, in the order they were added */
  private _zones: DropZone<E>[] = []
  /** Each zone as it was passed in, for `get` */
  private _inputs: Map<DropZone<E>, DSInputDropZone<E>> = new Map()
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

  /** Replaces all drop zones (the `dropZones` setting) */
  private setDropZones = ({
    dropZones,
  }: {
    dropZones: DSInputDropZone<E>[]
  }) => {
    if (!dropZones) return
    this.remove(this._zones.map((zone) => zone.element))
    this.add(dropZones)
  }

  /** Adds drop zones. A zone with the same id or element as an existing one replaces it. */
  public add = (zones: DSInputDropZone<E>[]) => {
    this.remove(zones.flatMap((zone) => [zone.id, zone.element]))
    zones.forEach((input) => {
      const zone = new DropZone({ DS: this.DS, PS: this.PS, ...input })
      this._zones.push(zone)
      this._inputs.set(zone, input)
      this._zoneByElement.set(zone.element, zone)
      this._zoneById.set(zone.id, zone)
    })
  }

  /** Removes drop zones by id or by element. The other zones are not touched. */
  public remove = (idsOrElements: (string | E)[]) => {
    const match = new Set<string | E>(idsOrElements)
    const removed = this._zones.filter(
      (zone) => match.has(zone.id) || match.has(zone.element)
    )
    if (!removed.length) return
    removed.forEach((zone) => {
      zone.destroy()
      this._zoneByElement.delete(zone.element)
      this._zoneById.delete(zone.id)
      this._inputs.delete(zone)
    })
    this._zones = this._zones.filter((zone) => !removed.includes(zone))
  }

  /** The current drop zones, as they were passed in */
  public get = (): DSInputDropZone<E>[] =>
    this._zones.map((zone) => ({ ...this._inputs.get(zone)! }))

  /** Zones removed by `stopZones` (when DragSelect stops), added back by `startZones` */
  private _stopped: DSInputDropZone<E>[] = []

  /** Removes the zones (and their listeners) but remembers them for `startZones` */
  public stopZones = () => {
    this._stopped = this.get()
    this.remove(this._zones.map((zone) => zone.element))
  }

  public startZones = () => {
    if (!this._stopped.length) return
    this.add(this._stopped)
    this._stopped = []
  }

  private _handleDrops = (target?: DropZone<E>) => {
    this._zones.forEach((zone) => {
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

  /** The zone under the pointer (or the keyboard-dragged items) when the last interaction ended.
   * Looked up once in `stop`, the `DS:end` events use it too. */
  public endTarget?: DropZone<E>

  private stop: DSCallback<DSInteractionPublishEventData> = ({
    isDragging,
    isDraggingKeyboard,
  }) => {
    this.endTarget = this.getTarget({ isDraggingKeyboard })
    if (isDragging) this._handleDrops(this.endTarget)
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

  /** No pointer when dragging with the keyboard: the zone under any of the dragged (selected) items */
  private getKeyboardTarget = () => {
    const threshold = Math.min(this.Settings.dropTargetThreshold, 0.5)
    for (const rect of this.DS.SelectedSet.rects.values()) {
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const point = { left: x, right: x, top: y, bottom: y }
      if (!this._zones.some((zone) => isCollision(zone.rect, point, threshold)))
        continue
      const zone = this.getTargetAt({ x, y })
      if (zone) return zone
    }
  }

  /** Returns first DropsZone under current pointer or coordinates if passed */
  public getTarget = ({
    coordinates,
    isDraggingKeyboard,
  }: {
    coordinates?: Vect2
    isDraggingKeyboard?: boolean
  }): DropZone<E> | undefined => {
    if (!this._zones.length) return
    if (!coordinates && isDraggingKeyboard) return this.getKeyboardTarget()
    return this.getTargetAt(coordinates ?? this.DS.stores.PointerStore.currentVal)
  }

  /** The topmost zone at this point */
  private getTargetAt = ({ x, y }: Vect2) =>
    this._getZoneByElementsFromPoint(document.elementsFromPoint(x, y), { x, y })
}
