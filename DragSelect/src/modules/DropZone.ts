import DragSelect from '../DragSelect'
import PubSub from './PubSub'
import { DSInputElement } from '../types'
import { DSSettings } from '../stores/SettingsStore'
import { addModificationObservers } from '../methods/addModificationObservers'
import { debounce } from '../methods/debounce'
import { getAllParentNodes } from '../methods/getAllParentNodes'
import { isCollision } from '../methods/isCollision'
import { ensureArray } from '../methods/ensureArray'

export type DSDropZone<E extends DSInputElement> = {
  id: string
  element: E
  droppables: E[]
  /** items related to the target zone */
  itemsDropped?: E[]
  /** items that are within the targets bounds */
  itemsInside?: E[]
}

export default class DropZone<E extends DSInputElement> {
  public id: string
  public element: E
  private _droppables?: E[]
  private _rect?: DOMRect
  private _observers?: { cleanup: () => void }
  private _timeout?: NodeJS.Timeout
  private _itemsDropped: E[] = []
  private _itemsInside?: E[]
  private DS: DragSelect<E>
  private PS: PubSub<E>
  private Settings: DSSettings<E>
  private isDestroyed: boolean = false
  private _parentNodes?: Node[]

  constructor({
    DS,
    PS,
    id,
    element,
    droppables,
  }: {
    DS: DragSelect<E>
    PS: PubSub<E>
    id: string
    element: E
    droppables?: E[]
  }) {
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s
    this.id = id
    this.element = element
    if (droppables) this.droppables = ensureArray(droppables)
    this.element.classList.add(`${this.Settings.dropZoneClass}`)

    this.PS.subscribe('Settings:updated:dropZoneClass', ({ settings }) => {
      if (!this.element) return
      this.element.classList.remove(settings['dropZoneClass:pre'])
      this.element.classList.add(settings.dropZoneClass)
    })

    this._observers = addModificationObservers(
      this.parentNodes,
      debounce(() => (this._rect = undefined), this.Settings.refreshMemoryRate)
    )

    this.PS.subscribe('Interaction:start', this.start)
    this.PS.subscribe('Interaction:end', this.stop)
  }

  private setReadyClasses = (action: 'add' | 'remove') => {
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

  /** This zone is NOT the target of a drop */
  public handleNoDrop = () => {
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

  /** This zone IS the target of a drop */
  public handleDrop = () => {
    if (this.isDestroyed) return
    this._itemsDropped = [
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

  public handleItemsInsideClasses = () => {
    let isAnyInside = false
    this.droppables.forEach((item) => {
      if (this.itemsInside?.includes(item)) {
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

  private start = ({ isDragging }: { isDragging: boolean }) => {
    if (!isDragging || this.isDestroyed) return
    this.setReadyClasses('add')
  }

  private stop = ({ isDragging }: { isDragging: boolean }) => {
    if (!isDragging || this.isDestroyed) return
    this.setReadyClasses('remove')
    this.handleItemsInsideClasses()
  }

  public destroy() {
    this._observers?.cleanup()
    this.element.classList.remove(`${this.Settings.dropZoneClass}`)
    this.element.classList.remove(`${this.Settings.dropZoneTargetClass}`)
    this.element.classList.remove(`${this.Settings.dropZoneReadyClass}`)
    this.droppables.forEach((item) => {
      item.classList.remove(`${this.Settings.droppedTargetClass}`)
      item.classList.remove(`${this.Settings.droppedTargetClass}-${this.id}`)
      item.classList.remove(`${this.Settings.droppableClass}`)
      item.classList.remove(`${this.Settings.droppableClass}-${this.id}`)
    })
    this.PS.unsubscribe('Interaction:start', this.start)
    this.PS.unsubscribe('Interaction:end', this.stop)
    this.isDestroyed = true
  }

  public toObject = (): DSDropZone<E> => ({
    id: this.id,
    element: this.element,
    droppables: this.droppables,
    itemsDropped: this.itemsDropped,
    itemsInside: this.itemsInside,
  })

  public get rect() {
    if (this.isDestroyed) return undefined
    if (this._rect) return this._rect
    return (this._rect = this.element.getBoundingClientRect())
  }

  public get itemsDropped() {
    if (this.isDestroyed) return undefined
    return this._itemsDropped
  }

  public get itemsInside() {
    if (this.isDestroyed) return undefined
    if (this._itemsInside) return this._itemsInside

    this._itemsInside = this.droppables.flatMap((item) => {
      const itemRect = this.DS.SelectableSet.rects.get(item)
      if (
        this.rect &&
        isCollision(itemRect, this.rect, this.Settings.dropInsideThreshold)
      )
        return [item]
      return []
    })

    // since elements can be moved while this getter is called, we need to update the values every X seconds
    if (this._timeout) clearTimeout(this._timeout)
    this._timeout = setTimeout(
      () => (this._itemsInside = undefined),
      this.Settings.refreshMemoryRate
    )

    return this._itemsInside
  }

  private get parentNodes() {
    if (this._parentNodes) return this._parentNodes
    return (this._parentNodes = getAllParentNodes(this.element))
  }

  public get droppables() {
    if (this._droppables) return this._droppables
    return this.DS.SelectableSet.elements
  }

  private set droppables(value) {
    this._droppables = value
  }
}
