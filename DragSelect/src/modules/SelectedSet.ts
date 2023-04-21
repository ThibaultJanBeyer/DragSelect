import DragSelect from "../DragSelect"
import PubSub from "./PubSub"
import { DSElement } from "../types"
import { DSSettings } from "../stores/SettingsStore"

export type DSSelectedPublishEventNames = "Selected:added:pre"|"Selected:added"|"Selected:removed"|"Selected:removed:pre"

export type DSSelectedPublishEventData = {
  items: DSElement[],
  item: DSElement,
};

export type DSSelectedPublish = {
  [K in DSSelectedPublishEventNames]: DSSelectedPublishEventData
}

export default class SelectedSet extends Set<DSElement> {
  private DS: DragSelect
  private PS: PubSub
  private Settings: DSSettings

  constructor({ DS, PS }: { DS: DragSelect, PS: PubSub }) {
    super()
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s
  }

  public add(element?: DSElement) {
    if (!element || super.has(element)) return this
    const publishData = {
      items: this.elements,
      item: element,
    }
    this.PS.publish('Selected:added:pre', publishData)
    super.add(element)
    element.classList.add(this.Settings.selectedClass)
    element.style.zIndex = `${(parseInt(element.style.zIndex) || 0) + 1}`
    this.PS.publish('Selected:added', publishData)
    return this
  }

  public delete(element: DSElement) {
    if (!element || !super.has(element)) return true
    const publishData = {
      items: this.elements,
      item: element,
    }
    this.PS.publish('Selected:removed:pre', publishData)
    const deleted = super.delete(element)
    element.classList.remove(this.Settings.selectedClass)
    element.style.zIndex = `${(parseInt(element.style.zIndex) || 0) - 1}`
    this.PS.publish('Selected:removed', publishData)
    return deleted
  }

  public clear = () => this.forEach((el) => this.delete(el))

  /** Adds/Removes an element. If it is already selected = remove, if not = add. */
  public toggle(element: DSElement) {
    if (this.has(element)) this.delete(element)
    else this.add(element)
    return element
  }

  public addAll = (elements: DSElement[]) => elements.forEach((el) => this.add(el))

  public deleteAll = (elements: DSElement[]) => elements.forEach((el) => this.delete(el))

  get elements() {
    return Array.from(this.values())
  }
}
