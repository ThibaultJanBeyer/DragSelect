/* 
    ____                   _____      __          __ 
   / __ \_________ _____ _/ ___/___  / /__  _____/ /_
  / / / / ___/ __ `/ __ `/\__ \/ _ \/ / _ \/ ___/ __/
 / /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_  
/_____/_/   \__,_/\__, //____/\___/_/\___/\___/\__/  
                 /____/                              

 {*} {*} STAR THIS PROJECT ON GITHUB {*} {*}

 https://github.com/ThibaultJanBeyer/DragSelect
 Please give it a like, this is what makes me happy :-)
 Thank You

 {*} {*} STAR THIS PROJECT ON GITHUB {*} {*}

 ***************************************
 ********* GPLv3 / Commercial **********
 ***************************************
 Created 2017 by ThibaultJanBeyer
 Web: http://www.DragSelect.com/
 GitHub: https://github.com/ThibaultJanBeyer/DragSelect
 ***************************************
*/

import Area from './modules/Area'
import Drag from './modules/Drag'
import DropZones from './modules/DropZones'
import Interaction from './modules/Interaction'
import KeyStore from './stores/KeyStore'
import PointerStore from './stores/PointerStore'
import PubSub, {
  type DSCallback,
  type DSPublishMappings,
} from './modules/PubSub'
import ScrollStore from './stores/ScrollStore'
import SelectableSet from './modules/SelectableSet'
import SelectedSet from './modules/SelectedSet'
import Selector from './modules/Selector'
import Selection from './modules/Selection'
import SelectorArea from './modules/SelectorArea'
import SettingsStore from './stores/SettingsStore'
import {
  type DSInternalEventName,
  type DSInputElement,
  type Settings,
  type Vect2,
} from './types'
import { IsCollision, isCollision } from './methods/isCollision'
import {
  type DSPublicPublish,
  deprecatedNamesMap,
  subscriberAliases,
} from './methods/subscriberAliases'
import { ensureArray } from './methods/ensureArray'
import { DSDropZone } from './modules/DropZone'

// Setup
/// ///////////////////////////////////////////////////////////////////////////////////

class DragSelect<E extends DSInputElement = DSInputElement> {
  /** used to skip all current Selection and dragNdrop functionality */
  public continue: boolean = false
  private PubSub: PubSub<E>
  public stores: {
    SettingsStore: SettingsStore<E>
    PointerStore: PointerStore<E>
    ScrollStore: ScrollStore<E>
    KeyStore: KeyStore<E>
  }
  public Area: Area<E>
  public Selector: Selector<E>
  public SelectorArea: SelectorArea<E>
  public SelectableSet: SelectableSet<E>
  public SelectedSet: SelectedSet<E>
  public Selection: Selection<E>
  private Drag: Drag<E>
  public DropZones: DropZones<E>
  public Interaction: Interaction<E>
  public stopped: boolean

  constructor(settings: Settings<E>) {
    this.stopped = false

    this.PubSub = new PubSub({ DS: this })

    this.stores = {} as {
      SettingsStore: SettingsStore<E>
      PointerStore: PointerStore<E>
      ScrollStore: ScrollStore<E>
      KeyStore: KeyStore<E>
    }
    ;(this.stores.SettingsStore = new SettingsStore({
      settings,
      PS: this.PubSub,
    })),
      (this.stores.PointerStore = new PointerStore({
        DS: this,
        PS: this.PubSub,
      })),
      (this.stores.ScrollStore = new ScrollStore({
        DS: this,
        PS: this.PubSub,
      })),
      (this.stores.KeyStore = new KeyStore({ DS: this, PS: this.PubSub })),
      (this.Area = new Area({ DS: this, PS: this.PubSub }))
    this.Selector = new Selector({ DS: this, PS: this.PubSub })
    this.SelectorArea = new SelectorArea({ DS: this, PS: this.PubSub })

    this.SelectableSet = new SelectableSet({ DS: this, PS: this.PubSub })
    this.SelectedSet = new SelectedSet({ DS: this, PS: this.PubSub })
    this.Selection = new Selection({ DS: this, PS: this.PubSub })

    this.Drag = new Drag({ DS: this, PS: this.PubSub })
    this.DropZones = new DropZones({ DS: this, PS: this.PubSub })
    this.Interaction = new Interaction({ DS: this, PS: this.PubSub })

    subscriberAliases({ DS: this, PS: this.PubSub })

    this.PubSub.subscribe('Interaction:end', () => (this.continue = false))
    this.PubSub.subscribe('DS:end', ({ items }) => (this.continue = false))

    this.start()
  }

  // Useful methods for the user
  //////////////////////////////////////////////////////////////////////////////////////

  public static isCollision: IsCollision

  // any input data from the user is valid in this public PubSub but the exposed values are recommended
  /** Subscribe to events */
  public subscribe = <T extends keyof DSPublicPublish<E>>(
    eventName: T,
    callback: DSCallback<DSPublishMappings<E>[T]>
  ) => {
    // Deprecation warnings
    if (deprecatedNamesMap[eventName as keyof typeof deprecatedNamesMap])
      console.warn(
        `[DragSelect]: The event name "${eventName}" is deprecated and was/will be removed in a future version. Please use the new event name "${
          deprecatedNamesMap[eventName as keyof typeof deprecatedNamesMap]
        }" instead.`
      )

    this.PubSub.subscribe(eventName, callback)
  }
  /** Un-Subscribe from events */
  public unsubscribe = <T extends keyof DSPublicPublish<E>>(
    eventName: T,
    callback?: DSCallback<DSPublishMappings<E>[T]>,
    id?: number
  ) => this.PubSub.unsubscribe(eventName, callback, id)
  /** Publish events */
  public publish = <T extends keyof DSPublicPublish<E> | DSInternalEventName>(
    eventName: T | T[],
    data: DSPublishMappings<E>[T]
  ) => this.PubSub.publish(eventName, data)

  /** Initializes the functionality. Automatically triggered when created. Also, reset the functionality after a teardown */
  public start = () => {
    this.stopped = false
    this.Interaction.init()
  }

  /**
   * Complete function teardown
   * Will teardown/stop the whole functionality
   * @param remove if elements should be removed.
   * @param fromSelection if elements should also be added/removed to the selection.
   * @param withCallback if elements should also be added/removed to the selection.
   */
  public stop(
    remove: boolean = true,
    fromSelection: boolean = true,
    withCallback: boolean = false
  ) {
    if (withCallback)
      this.publish('DS:end', {
        items: this.SelectedSet.elements,
        isDragging: this.Interaction.isDragging,
      })

    this.Interaction.stop()
    this.Area.stop()
    this.Drag.stop()
    this.Selector.stop()
    this.SelectorArea.stop(remove)
    this.stores.KeyStore.stop()
    this.stores.PointerStore.stop()
    this.stores.ScrollStore.stop()

    if (remove) this.SelectableSet.clear()
    if (fromSelection) this.SelectedSet.clear()

    this.stopped = true
  }

  /**
   * Utility to override DragSelect internal functionality:
   * Break will skip the selection or dragging functionality (until after the callback) but let everything continue to run.
   * Useful utility to write your own functionality/move/dragNdrop based on DragSelect pointer positions.
   */
  public break = () => (this.continue = true)

  /** Update any setting dynamically */
  public setSettings = (settings: Settings<E>) =>
    this.stores.SettingsStore.update({ settings })

  /** Returns the current selected nodes */
  public getSelection = () => this.SelectedSet.elements

  /**
   * Adds several elements to the selection list also adds the specific classes and take into account all calculations.
   * Does not clear the selection, in contrary to .setSelection. Can add multiple elements at once
   * @param elements one or multiple elements
   * @param triggerCallback if callback should be called
   * @param dontAddToSelectables if element should not be added to the list of selectable elements
   * @return all selected elements
   */
  public addSelection(
    elements: E | E[],
    triggerCallback: boolean = false,
    dontAddToSelectables: boolean = false
  ) {
    const els = ensureArray(elements)
    this.SelectedSet.addAll(els)
    if (!dontAddToSelectables) this.addSelectables(elements, false, false)
    if (triggerCallback)
      this.PubSub.publish('DS:end', {
        items: this.SelectedSet.elements,
        isDragging: this.Interaction.isDragging,
      })
    return this.getSelection()
  }

  /**
   * Removes specific elements from the selection
   * Multiple elements can be given at once, in contrary to unselect
   * @param elements one or multiple elements
   * @param triggerCallback if callback should be called
   * @param removeFromSelectables if element should be removed from the list of selectable elements
   * @return all selected elements
   */
  public removeSelection(
    elements: E | E[],
    triggerCallback: boolean = false,
    removeFromSelectables: boolean = false
  ) {
    const els = ensureArray(elements)
    this.SelectedSet.deleteAll(els)
    if (removeFromSelectables) this.removeSelectables(elements, false, false)
    if (triggerCallback)
      this.PubSub.publish('DS:end', {
        items: this.SelectedSet.elements,
        isDragging: this.Interaction.isDragging,
      })
    return this.getSelection()
  }

  /**
   * Toggles specific elements from the selection:
   * If element is not in selection it will be added, if it is already selected, it will be removed.
   * Multiple elements can be given at once.
   * @param elements one or multiple elements
   * @param triggerCallback if callback should be called
   * @param removeFromSelectables if element should not be added/removed to the list of selectable elements accordingly
   * @return all selected elements
   */
  public toggleSelection(
    elements: E | E[],
    triggerCallback: boolean = false,
    removeFromSelectables: boolean = false
  ) {
    const els = ensureArray(elements)
    els.forEach((el: E) =>
      this.SelectedSet.has(el)
        ? this.removeSelection(elements, triggerCallback, removeFromSelectables)
        : this.addSelection(elements, triggerCallback, removeFromSelectables)
    )
    if (triggerCallback)
      this.PubSub.publish('DS:end', {
        items: this.SelectedSet.elements,
        isDragging: this.Interaction.isDragging,
      })
    return this.getSelection()
  }

  /**
   * Sets the current selected elements and optionally run the callback
   * By default, adds new elements also to the list of selectables
   * @param elements dom elements
   * @param triggerCallback if callback should be called
   * @param dontAddToSelectables if element should not be added to the list of selectable elements
   */
  public setSelection(
    elements: E | E[],
    triggerCallback: boolean = false,
    dontAddToSelectables: boolean = false
  ) {
    this.clearSelection()
    this.addSelection(elements, triggerCallback, dontAddToSelectables)
    return this.getSelection()
  }

  /**
   * Unselect / Deselect all current selected Nodes
   * @param triggerCallback if callback should be called
   * @return this.selected, should be empty
   */
  public clearSelection(triggerCallback: boolean = false) {
    this.SelectedSet.clear()
    if (triggerCallback)
      this.PubSub.publish('DS:end', {
        items: this.SelectedSet.elements,
        isDragging: this.Interaction.isDragging,
      })
    return this.getSelection()
  }

  /**
   * Add elements that can be selected. No node is added twice
   * @param elements dom element(s)
   * @param addToSelection if elements should also be added to current selection
   * @param triggerCallback if callback should be called
   * @return the added element(s)
   */
  public addSelectables(
    elements: E | E[],
    addToSelection?: boolean,
    triggerCallback?: boolean
  ) {
    const els = ensureArray(elements)
    this.SelectableSet.addAll(els)
    if (addToSelection) this.SelectedSet.addAll(els)
    if (triggerCallback)
      this.PubSub.publish('DS:end', {
        items: this.SelectedSet.elements,
        isDragging: this.Interaction.isDragging,
      })
    return els
  }

  /** Gets all nodes that can potentially be selected */
  public getSelectables = () => this.SelectableSet.elements

  /**
   * Remove elements from the elements that can be selected.
   * @param elements dom element(s)
   * @param removeFromSelection if elements should also be removed from current selection
   * @param triggerCallback if callback should be called
   * @return the removed element(s)
   */
  public removeSelectables(
    elements: E | E[],
    removeFromSelection?: boolean,
    triggerCallback?: boolean
  ) {
    const els = ensureArray(elements)
    this.SelectableSet.deleteAll(els)
    if (removeFromSelection) this.removeSelection(elements)
    if (triggerCallback)
      this.PubSub.publish('DS:end', {
        items: this.SelectedSet.elements,
        isDragging: this.Interaction.isDragging,
      })
    return els
  }

  /** The starting/initial position of the cursor/selector */
  public getInitialCursorPosition = (): Vect2 =>
    this.stores.PointerStore.initialVal

  /** The last seen position of the cursor/selector */
  public getCurrentCursorPosition = (): Vect2 =>
    this.stores.PointerStore.currentVal

  /** The previous position of the cursor/selector */
  public getPreviousCursorPosition = (): Vect2 =>
    this.stores.PointerStore.lastVal

  /** The starting/initial position of the cursor/selector */
  public getInitialCursorPositionArea = (): Vect2 =>
    this.stores.PointerStore.initialValArea

  /** The last seen position of the cursor/selector */
  public getCurrentCursorPositionArea = (): Vect2 =>
    this.stores.PointerStore.currentValArea

  /** The previous position of the cursor/selector */
  public getPreviousCursorPositionArea = (): Vect2 =>
    this.stores.PointerStore.lastValArea

  /** Whether the multi-selection key was pressed */
  public isMultiSelect = (
    event: MouseEvent | TouchEvent | PointerEvent | KeyboardEvent
  ): boolean => this.stores.KeyStore.isMultiSelectKeyPressed(event)

  /** Whether the user is currently drag n dropping elements (instead of selection) */
  public isDragging = (): boolean => this.Interaction.isDragging

  /** Returns first DropsZone under coordinates, if no coordinated provided current pointer coordinates are used */
  public getZoneByCoordinates = (
    coordinates?: Vect2
  ): DSDropZone<E> | undefined =>
    this.DropZones.getTarget({ coordinates })?.toObject()

  /** Returns itemsDropped into zone by zone id */
  public getItemsDroppedByZoneId = (zoneId: string) =>
    this.DropZones.getItemsDroppedById(zoneId)

  /**
   * Returns itemsInside by zone id
   * @param addClasses whether or not to add/remove the "inside" classes to the items
   */
  public getItemsInsideByZoneId = (zoneId: string, addClasses?: boolean) =>
    this.DropZones.getItemsInsideById(zoneId, addClasses)
}

DragSelect.isCollision = isCollision
export default DragSelect
export * from './types'
export type DSPubCallback<
  T extends keyof DSPublicPublish<E>,
  E extends DSInputElement = DSInputElement,
> = DSCallback<DSPublishMappings<E>[T]>
