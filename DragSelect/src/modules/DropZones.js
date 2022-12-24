// @ts-check

import '../types'
import DragSelect from '../DragSelect'
import DropZone from './DropZone'

import { isCollision } from '../methods'

export default class DropZones {
  /**
   * Get the drop zone by the zone element
   * @type {Map<DSElement, DropZone>}
   * @private
   */
  _zoneByElement = new Map()

  /**
   * Get the drop zone by the zone id
   * @type {Map<string, DropZone>}
   * @private
   */
  _zoneById = new Map()

  /**
   * Get the drop zones by one zone item
   * @type {Map<DSElement,DropZone[]>}
   * @private
   */
  _zonesByDroppable = new Map()

  /**
   * Get the drop zones by one zone item
   * @type {DropZone[]}
   * @private
   */
  _zones

  /**
   * @constructor Drag
   * @param {{DS:DragSelect}} obj
   * @ignore
   */
  constructor({ DS }) {
    this.DS = DS
    this.Settings = DS.stores.SettingsStore.s

    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:dropZones', ({ settings }) =>
      this.setDropZones(settings)
    )
    this.setDropZones({
      dropZones: /** @type {DSDropZone[]} */ (this.DS.stores.SettingsStore.s
        .dropZones),
    })

    this.DS.subscribe('Interaction:end', this.stop)
  }

  /**
   * @param {Object} obj
   * @param {DSDropZone[]} [obj.dropZones]
   */
  setDropZones = ({ dropZones }) => {
    if (!dropZones) return
    if (this._zones) this._zones.forEach((zone) => zone.destroy())

    this._zones = dropZones.map(
      (zone) => new DropZone({ DS: this.DS, ...zone })
    )
    this._zones.forEach((zone) => {
      this._zoneByElement.set(zone.element, zone)
      this._zoneById.set(zone.id, zone)
      zone.droppables.forEach((droppable) => {
        const zones = this._zonesByDroppable.get(droppable)
        if (!zones?.length) return this._zonesByDroppable.set(droppable, [zone])
        // @ts-ignore
        this._zonesByDroppable.set(droppable, [...new Set([...zones, zone])])
      })
    })
  }

  _handleDrop = (target) => {
    this._zones.forEach((zone) => {
      if (zone === target) return
      zone.handleNoDrop()
    })
    if (!target) return
    target.handleDrop()
  }

  /**
   * @param {DSElements} elements
   * @param {Vect2} point
   * @returns {DropZone|undefined}
   */
  _getZoneByElementsFromPoint = (elements, { x, y }) => {
    for (let i = 0, il = elements.length; i < il; i++) {
      const zone = this._zoneByElement.get(elements[i])
      if (
        zone &&
        isCollision(
          zone.rect,
          { left: x, right: x, top: y, bottom: y },
          Math.min(this.Settings.dropTargetThreshold, 0.5)
        )
      ) {
        return zone
      }
    }
  }

  stop = ({ isDragging }) => {
    if (!isDragging) return
    const target = this.getTarget()
    this._handleDrop(target)
  }

  /// ///////////////////////////////////////////////////////////////////////////////////
  // Getters

  /**
   * @param {string} zoneId
   * @returns {DSElements|void}
   */
  getItemsDroppedById = (zoneId) => {
    const zone = this._zoneById.get(zoneId)
    if (!zone) return console.warn(`[DragSelect] No zone found (id: ${zoneId})`)
    return zone.itemsDropped
  }

  /**
   * @param {string} zoneId
   * @param {boolean} addClasses
   * @returns {DSElements|void}
   */
  getItemsInsideById = (zoneId, addClasses) => {
    const zone = this._zoneById.get(zoneId)
    if (!zone) return console.warn(`[DragSelect] No zone found (id: ${zoneId})`)
    const { itemsInside } = zone
    if (addClasses) zone.handleItemsInsideClasses()
    return itemsInside
  }

  /**
   * Returns first DropsZone under current pointer
   * @param {Vect2} [coordinates]
   * @returns {DropZone | undefined}
   */
  getTarget = (coordinates) => {
    if (!this._zones?.length) return

    const x = coordinates?.x || this.DS.stores.PointerStore.currentVal.x
    const y = coordinates?.y || this.DS.stores.PointerStore.currentVal.y

    const elements = document.elementsFromPoint(x, y)
    return this._getZoneByElementsFromPoint(
      /** @type {DSElements} */ (elements),
      { x, y }
    )
  }
}
