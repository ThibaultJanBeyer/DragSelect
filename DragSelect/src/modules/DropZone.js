// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import {
  isCollision,
  toArray,
  debounce,
  addModificationObservers,
  getAllParentNodes,
} from '../methods'

export default class DropZone {
  /**
   * @type {string}
   */
  id

  /**
   * @type {DSElement}
   */
  element

  /**
   * @type {DSElements}
   */
  _droppables

  /**
   * @type {DOMRect}
   * @private
   */
  _rect

  /**
   * @type {{cleanup:()=>void}}
   * @private
   */
  _observers

  /**
   * @type {NodeJS.Timeout}
   * @private
   */
  _timeout

  /**
   * @type {DSElements}
   * @private
   */
  _itemsDropped = []

  /**
   * @type {DSElements}
   * @private
   */
  _itemsInside

  /**
   * @constructor Drag
   * @param {Object} obj
   * @param {DragSelect} obj.DS
   * @param {string} obj.id
   * @param {DSElement} obj.element
   * @param {DSInputElements} [obj.droppables]
   * @ignore
   */
  constructor({ DS, id, element, droppables }) {
    this.DS = DS
    this.Settings = DS.stores.SettingsStore.s

    this.id = id
    this.element = element
    if (droppables) this.droppables = toArray(droppables)
    this.element.classList.add(`${this.Settings.dropZoneClass}`)

    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:dropZoneClass', ({ settings }) => {
      if (!this.element) return
      this.element.classList.remove(settings['dropZoneClass:pre'])
      this.element.classList.add(settings.dropZoneClass)
    })

    this._observers = addModificationObservers(
      this.parentNodes,
      debounce(() => (this._rect = null), this.Settings.refreshMemoryRate)
    )

    this.DS.subscribe('Interaction:start', this.start)
    this.DS.subscribe('Interaction:end', this.stop)
  }

  /**
   * @param {'add'|'remove'} action
   */
  setReadyClasses = (action) => {
    if (this.isDestroyed) return
    const selectedEls = this.droppables.filter((el) =>
      this.DS.SelectedSet.has(el)
    )
    if (!selectedEls.length) return
    selectedEls.forEach((item) => {
      item.classList[action](`${this.Settings.droppableClass}`)
      item.classList[action](`${this.Settings.droppableClass}-${this.id}`)
    })
    this.element.classList[action](`${this.Settings.dropZoneReadyClass}`)
  }

  /**
   * This zone is NOT the target of a drop
   */
  handleNoDrop = () => {
    if (this.isDestroyed) return
    // for each selected element that is not part of the target zone, remove the classes
    this.DS.SelectedSet.forEach((item) => {
      item.classList.remove(this.Settings.droppedTargetClass)
      item.classList.remove(`${this.Settings.droppedTargetClass}-${this.id}`)
    })
    // and remove them from the zones dropped items
    this._itemsDropped = this._itemsDropped.filter(
      (item) => !this.DS.SelectedSet.has(item)
    )
    // if the zone has no dropped left, also remove the zones class
    if (!this._itemsDropped?.length)
      this.element.classList.remove(`${this.Settings.dropZoneTargetClass}`)
  }

  /**
   * This zone IS the target of a drop
   */
  handleDrop = () => {
    if (this.isDestroyed) return
    this._itemsDropped = [
      // @ts-ignore
      ...new Set([
        ...this._itemsDropped,
        ...this.droppables?.filter((item) => this.DS.SelectedSet.has(item)),
      ]),
    ]
    // add the target class to the zones dropped items
    this._itemsDropped?.forEach((item) => {
      item.classList.add(`${this.Settings.droppedTargetClass}`)
      item.classList.add(`${this.Settings.droppedTargetClass}-${this.id}`)
    })
    // if the zone has dropped, add the zones class
    if (this._itemsDropped?.length)
      this.element.classList.add(`${this.Settings.dropZoneTargetClass}`)
  }

  handleItemsInsideClasses = () => {
    let isAnyInside = false
    this.droppables.forEach((item) => {
      if (this.itemsInside.includes(item)) {
        item.classList.add(`${this.Settings.droppedInsideClass}`)
        item.classList.add(`${this.Settings.droppedInsideClass}-${this.id}`)
        isAnyInside = true
      } else {
        item.classList.remove(`${this.Settings.droppedInsideClass}-${this.id}`)
        if (!item.className.includes(`${this.Settings.droppedInsideClass}-`))
          item.classList.remove(`${this.Settings.droppedInsideClass}`)
      }
    })

    if (isAnyInside)
      this.element.classList.add(`${this.Settings.dropZoneInsideClass}`)
    else this.element.classList.remove(`${this.Settings.dropZoneInsideClass}`)
  }

  start = ({ isDragging }) => {
    if (!isDragging || this.isDestroyed) return
    this.setReadyClasses('add')
  }

  stop = ({ isDragging }) => {
    if (!isDragging || this.isDestroyed) return
    this.setReadyClasses('remove')
    this.handleItemsInsideClasses()
  }

  destroy() {
    this._observers.cleanup()
    this.element.classList.remove(`${this.Settings.dropZoneClass}`)
    this.element.classList.remove(`${this.Settings.dropZoneTargetClass}`)
    this.element.classList.remove(`${this.Settings.dropZoneReadyClass}`)
    this.droppables.forEach((item) => {
      item.classList.remove(`${this.Settings.droppedTargetClass}`)
      item.classList.remove(`${this.Settings.droppedTargetClass}-${this.id}`)
      item.classList.remove(`${this.Settings.droppableClass}`)
      item.classList.remove(`${this.Settings.droppableClass}-${this.id}`)
    })
    this.DS.unsubscribe('Interaction:start', this.start)
    this.DS.unsubscribe('Interaction:end', this.stop)
    this.element = null
    this.droppables = null
    this.id = null
    this._itemsDropped = null
    this._itemsInside = null
    this.isDestroyed = true
  }

  /**
   * @returns {DSDropZone}
   */
  toObject = () => ({
    id: this.id,
    element: this.element,
    droppables: this.droppables,
    itemsDropped: this.itemsDropped,
    itemsInside: this.itemsInside,
  })

  get rect() {
    if (this.isDestroyed) return null
    if (this._rect) return this._rect
    return (this._rect = this.element.getBoundingClientRect())
  }

  get itemsDropped() {
    if (this.isDestroyed) return null
    return this._itemsDropped
  }

  get itemsInside() {
    if (this.isDestroyed) return null
    if (this._itemsInside) return this._itemsInside

    this._itemsInside = this.droppables.flatMap((item) => {
      if (
        isCollision(
          this.DS.SelectableSet.rects.get(item),
          this.rect,
          this.Settings.dropInsideThreshold
        )
      )
        return [item]
      return []
    })

    // since elements can be moved while this getter is called, we need to update the values every X seconds
    if (this._timeout) clearTimeout(this._timeout)
    this._timeout = setTimeout(
      () => (this._itemsInside = null),
      this.Settings.refreshMemoryRate
    )

    return this._itemsInside
  }

  get parentNodes() {
    if (this._parentNodes) return this._parentNodes
    return (this._parentNodes = getAllParentNodes(this.element))
  }

  get droppables() {
    if (this._droppables) return this._droppables
    return this.DS.SelectableSet.elements
  }

  set droppables(value) {
    this._droppables = value
  }
}
