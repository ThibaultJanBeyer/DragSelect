// @TODO: 
// - Retrieval of droptargets
// - Retrieval of items within the dropzone
// - Return only the ID and retrievals via ID

// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { toArray } from '../methods'

export default class DropZones {
  /**
   * Get the drop zone by the zone element
   * @type {Map}
   */
  _zoneByElement = new Map()
  /**
   * Get the drop zones by one zone item
   * @type {Map<DSElement,DSDropZone[]>}
   */
  _zonesByDroppable = new Map()
  /**
   * Get the drop zones by one zone item
   * @type {DSDropZone[]}
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
    this.DS.subscribe('Settings:updated:dropZones', this.setDropZones)
    this.setDropZones({ dropZones: /** @type {DSDropZone[]} */(this.DS.stores.SettingsStore.s.dropZones) })

    this.DS.subscribe('Interaction:start', this.start)
    this.DS.subscribe('Interaction:end', this.stop)
  }

  /**
   * @param {Object} obj
   * @param {DSDropZone[]} [obj.dropZones]
   */
  setDropZones = ({ dropZones }) => {
    if (!dropZones) return
    this._zones = dropZones.slice()
    this._zones.forEach((zone) => {
      zone.droppables = toArray(zone.droppables)
      this._zoneByElement.set(zone.element, zone)
      zone.droppables.forEach((droppable) => {
        const zones = this._zonesByDroppable.get(droppable)
        if (!zones?.length) return this._zonesByDroppable.set(droppable, [zone])
        // @ts-ignore
        this._zonesByDroppable.set(droppable, [...new Set([...zones, zone])])
      })
      zone.element.classList.add(this.Settings.dropZoneClass || '')
    })
  }

  /**
   * @param {'add'|'remove'} action
   */
  _setReadyClasses = (action) => {
    this.DS.SelectedSet.forEach((item) => {
      const zones = this._zonesByDroppable.get(item)
      if (!zones?.length) return
      zones.forEach((zone) => {
        item.classList[action](`${this.Settings.droppableClass}`)
        item.classList[action](`${this.Settings.droppableClass}-${zone.id}`)
        zone.element.classList[action](`${this.Settings.dropZoneReadyClass}`)
      })
    })
  }

  _handleDropOutsideOfTarget = (zone) => {
    // for each selected element that is not part of the target zone, remove the classes
    this.DS.SelectedSet.forEach((item) => {
      item.classList.remove(this.Settings.droppedTargetClass)
      item.classList.remove(`${this.Settings.droppedTargetClass}-${zone.id}`)
    })
    // and remove them from the zones dropped items
    zone.itemsDropped = zone.itemsDropped?.filter((item) => !this.DS.SelectedSet.has(item))
    // if the zone has no dropped left, also remove the zones class
    if(!zone.itemsDropped?.length)
      zone.element.classList.remove(this.Settings.dropZoneTargetClass)
  }

  _handleDropOnTarget = (zone) => {
    // add selected droppable items to the zones dropped items
    if(!zone.itemsDropped) zone.itemsDropped = []
    // @ts-ignore
    zone.itemsDropped = [...new Set([...zone.itemsDropped, ...zone.droppables?.filter((item) => this.DS.SelectedSet.has(item))])]
    // add the target class to the zones dropped items
    zone.itemsDropped?.forEach((item) => {
      item.classList.add(this.Settings.droppedTargetClass)
      item.classList.add(`${this.Settings.droppedTargetClass}-${zone.id}`)
    })
    // if the zone has dropped, add the zones class
    if(zone.itemsDropped?.length)
      zone.element.classList.add(this.Settings.dropZoneTargetClass)
  }

  _handleDrop = (target) => {
    this._zones.forEach((zone) => {
      if (zone === target) return
      this._handleDropOutsideOfTarget(zone)
    })
    if(!target) return
    this._handleDropOnTarget(target)
  }

  /**
   * @param {DSElements} elements
   * @returns {DSDropZone|undefined}
   */
  _getZoneByElements = (elements) => {
    for(let i = 0, il = elements.length; i < il; i++) {
      const zone = this._zoneByElement.get(elements[i])
      if(zone) return zone
    }
  }
  /**
   * Returns first DropsZone under current pointer
   * @param {Vect2} [coordinates]
   * @returns {DSDropZone | undefined}
   */
  getTarget = (coordinates) => {
    if(!this._zones?.length) return
    const elements = document.elementsFromPoint(
      coordinates?.x || this.DS.stores.PointerStore.currentVal.x,
      coordinates?.y || this.DS.stores.PointerStore.currentVal.y
    )
    return this._getZoneByElements(/** @type {DSElements} */(elements))
  }

  start = ({ isDragging }) => {
    if (!isDragging) return
    this._setReadyClasses('add')
  }

  stop = ({ isDragging }) => {
    if (!isDragging) return
    this._setReadyClasses('remove')
    const target = this.getTarget()
    this._handleDrop(target)
  }
}
