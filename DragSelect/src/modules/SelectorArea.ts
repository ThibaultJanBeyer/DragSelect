import DragSelect from '../DragSelect'
import { createSelectorAreaElement } from '../methods/createSelectorAreaElement'
import { getOverflowEdges } from '../methods/getOverflowEdges'
import { isCollision } from '../methods/isCollision'
import { vect2rect } from '../methods/vect2'
import { DSSettings } from '../stores/SettingsStore'
import { DSBoundingRect, DSEdges, DSEvent, DSInputElement } from '../types'
import PubSub from './PubSub'

type AppendRemove = 'append' | 'remove'

export default class SelectorArea<E extends DSInputElement> {
  private _scrollInterval?: NodeJS.Timeout
  private _rect?: DSBoundingRect
  private currentEdges: DSEdges = []
  private DS: DragSelect<E>
  private PS: PubSub<E>
  private Settings: DSSettings<E>
  public HTMLNode: HTMLElement

  constructor({ DS, PS }: { DS: DragSelect<E>; PS: PubSub<E> }) {
    this.DS = DS
    this.PS = PS
    this.Settings = this.DS.stores.SettingsStore.s
    this.HTMLNode = createSelectorAreaElement()

    this.PS.subscribe('Settings:updated:selectorAreaClass', ({ settings }) => {
      this.HTMLNode.classList.remove(settings['selectorAreaClass:pre'])
      this.HTMLNode.classList.add(settings['selectorAreaClass'])
    })
    this.HTMLNode.classList.add(this.Settings.selectorAreaClass)

    this.PS.subscribe('Area:modified', this.updatePos)
    this.PS.subscribe('Area:modified', this.updatePos)
    this.PS.subscribe('Interaction:init', this.init)
    this.PS.subscribe('Interaction:start', ({ isDraggingKeyboard }) =>
      this.startAutoScroll({ isDraggingKeyboard })
    )
    this.PS.subscribe('Interaction:end', () => {
      this.updatePos()
      this.stopAutoScroll()
    })
  }

  private init = () => {
    this.applyElements('append')
    this.updatePos()
  }

  /** Adding / Removing elements to document */
  private applyElements = <K extends keyof AppendRemove>(
    method: AppendRemove[K]
  ) => {
    const docEl = document.body ? 'body' : 'documentElement'
    const methodName = `${method}Child` as `${AppendRemove}Child`
    this.HTMLNode[methodName](this.DS.Selector.HTMLNode)
    document[docEl][methodName](this.HTMLNode)
  }

  /** Updates the selectorAreas positions to match the areas */
  private updatePos = () => {
    this._rect = undefined
    const rect = this.DS.Area.rect
    const border = this.DS.Area.computedBorder
    const { style } = this.HTMLNode
    const top = `${rect.top + border.top}px`
    const left = `${rect.left + border.left}px`
    const width = `${rect.width}px`
    const height = `${rect.height}px`
    if (style.top !== top) style.top = top
    if (style.left !== left) style.left = left
    if (style.width !== width) style.width = width
    if (style.height !== height) style.height = height
  }

  public stop = (remove: boolean) => {
    this.stopAutoScroll()
    if (remove) this.applyElements('remove')
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // AutoScroll

  private startAutoScroll = ({
    isDraggingKeyboard,
  }: {
    isDraggingKeyboard?: boolean
  }) => {
    if (isDraggingKeyboard) return
    this.currentEdges = []
    this._scrollInterval = setInterval(() => this.handleAutoScroll(), 16)
  }

  /** Creates an interval that auto-scrolls while the cursor is near the edge */
  private handleAutoScroll = () => {
    if (this.DS.continue) return
    const {
      stores: { PointerStore },
      Area,
    } = this.DS

    this.currentEdges = getOverflowEdges({
      elementRect: vect2rect(PointerStore.currentVal),
      containerRect: this.rect,
      tolerance: this.Settings.overflowTolerance,
    })

    if (this.currentEdges.length)
      Area.scroll(this.currentEdges, this.Settings.autoScrollSpeed)
  }

  private stopAutoScroll = () => {
    this.currentEdges = []
    clearInterval(this._scrollInterval)
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Booleans

  /**
   * Checks if the element is either inside the Selector Area (as a reachable child or touching the area)
   * @param elementRect - slight performance improvements when passed
   */
  public isInside = (element: E, elementRect?: DSBoundingRect) => {
    if (
      this.DS.Area.HTMLNode.contains(element) &&
      this.DS.stores.ScrollStore.canScroll
    )
      return true
    return isCollision(
      this.rect,
      elementRect || element.getBoundingClientRect()
    )
  }

  /** checks if the click was triggered on the area. */
  public isClicked(event?: DSEvent) {
    const {
      stores: { PointerStore },
    } = this.DS

    const initialVal = event
      ? PointerStore.getPointerPosition(event)
      : PointerStore.initialVal

    return isCollision(
      {
        left: initialVal.x,
        top: initialVal.y,
        right: initialVal.x,
        bottom: initialVal.y,
      },
      this.rect
    )
  }

  public get rect() {
    if (this._rect) return this._rect
    return (this._rect = this.HTMLNode.getBoundingClientRect())
  }
}
