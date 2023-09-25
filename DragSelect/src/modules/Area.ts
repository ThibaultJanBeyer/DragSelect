import DragSelect from '../DragSelect'
import PubSub from './PubSub'
import {
  DSArea,
  DSBoundingRect,
  DSEdges,
  DSEdgesObj,
  DSInputElement,
} from '../types'
import { DSSettings } from '../stores/SettingsStore'
import {
  MutationCallbackEvent,
  addModificationObservers,
} from '../methods/addModificationObservers'
import { debounce } from '../methods/debounce'
import { getAllParentNodes } from '../methods/getAllParentNodes'
import { getAreaRect } from '../methods/getAreaRect'
import { handleElementPositionAttribute } from '../methods/handleElementPositionAttribute'
import { scrollElement } from '../methods/scrollElement'

export type DSAreaPublishEventNames =
  | 'Area:modified:pre'
  | 'Area:modified'
  | 'Area:scroll'
  | 'Area:scroll:pre'

export type DSAreaPublishEventData<E extends DSInputElement> = {
  /** The single item currently interacted with */
  item: DSArea
  /** The respective event object */
  event?: MutationCallbackEvent
  scroll_directions: DSEdges
  scroll_multiplier: number
}

export type DSAreaPublish<E extends DSInputElement> = {
  'Area:modified:pre': Pick<DSAreaPublishEventData<E>, 'event' | 'item'>
  'Area:modified': Pick<DSAreaPublishEventData<E>, 'event' | 'item'>
  'Area:scroll:pre': Pick<
    DSAreaPublishEventData<E>,
    'scroll_directions' | 'scroll_multiplier'
  >
  'Area:scroll': Pick<
    DSAreaPublishEventData<E>,
    'scroll_directions' | 'scroll_multiplier'
  >
}

export default class Area<E extends DSInputElement> {
  private DS: DragSelect<E>
  private PS: PubSub<E>
  private Settings: DSSettings<E>
  private _observers?: { cleanup: () => void }
  private _node: DSArea
  private _parentNodes?: Node[]
  private _computedStyle?: CSSStyleDeclaration
  private _computedBorder?: DSEdgesObj
  private _rect?: DSBoundingRect

  constructor({ DS, PS }: { DS: DragSelect<E>; PS: PubSub<E> }) {
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s

    this._node = this.Settings.area
    this.setArea(this.Settings.area)
    this.PS.subscribe('Settings:updated:area', ({ settings: { area } }) =>
      this.setArea(area)
    )

    this.PS.subscribe('Interaction:init', this.init)
    this.PS.subscribe('Interaction:end', this.reset)
  }

  private setArea = (area: DSArea) => {
    this.reset()
    this._node = area
    handleElementPositionAttribute({
      computedStyle: this.computedStyle,
      node: this._node,
    })

    // first immediate debounce to update values after dom-update
    setTimeout(() => {
      this.PS.publish('Area:modified:pre', { item: this.HTMLNode })
      this.reset()
      this.PS.publish('Area:modified', { item: this.HTMLNode })
    })
  }

  private init = () => {
    this._observers = addModificationObservers(
      this.parentNodes,
      debounce((event: MutationCallbackEvent) => {
        this.PS.publish('Area:modified:pre', { event, item: this.HTMLNode })
        this.reset()
        this.PS.publish('Area:modified', { event, item: this.HTMLNode })
      }, 60)
    )
  }

  private reset = () => {
    this._computedStyle = undefined
    this._rect = undefined
    this._computedBorder = undefined
    this._parentNodes = undefined
  }

  public stop = () => {
    this._observers?.cleanup()
    this.reset()
  }

  /// ///////////////////////////////////////////////////////////////////////////////////
  // Scroll

  /** Scroll the area in the specified direction */
  public scroll = (directions: DSEdges, multiplier: number) => {
    const data = {
      scroll_directions: directions,
      scroll_multiplier: multiplier,
    }
    this.PS.publish('Area:scroll:pre', data)
    scrollElement(this._node, directions, multiplier)
    this.PS.publish('Area:scroll', data)
  }

  /// ///////////////////////////////////////////////////////////////////////////////////
  // Node Getters

  public get HTMLNode() {
    return this._node
  }

  /** The computed border from the element (caches result) */
  public get computedBorder() {
    if (this._computedBorder) return this._computedBorder
    return {
      top: parseInt(this.computedStyle.borderTopWidth),
      bottom: parseInt(this.computedStyle.borderBottomWidth),
      left: parseInt(this.computedStyle.borderLeftWidth),
      right: parseInt(this.computedStyle.borderRightWidth),
    }
  }

  /** The computed styles from the element (caches result) */
  private get computedStyle() {
    if (this._computedStyle) return this._computedStyle
    if (this.HTMLNode instanceof Document)
      return (this._computedStyle = window.getComputedStyle(
        this.HTMLNode.body || this.HTMLNode.documentElement
      ))
    return (this._computedStyle = window.getComputedStyle(this.HTMLNode!))
  }

  /** The element rect (caches result) (without scrollbar or borders) */
  public get rect() {
    if (this._rect) return this._rect
    return (this._rect = getAreaRect(
      this.HTMLNode,
      this.DS.stores.SettingsStore.s.zoom
    ))
  }

  private get parentNodes() {
    if (this._parentNodes) return this._parentNodes
    return (this._parentNodes = getAllParentNodes(this.HTMLNode))
  }
}
