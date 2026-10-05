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
  private _scrollInterval?: ReturnType<typeof setInterval>
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

    this.PS.subscribe('Area:modified', this.updateParent)
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

  /**
   * Where the selector area gets appended to.
   * Modal dialogs and popovers render in the browser's top layer, above anything else in the document regardless of z-index.
   * So if the area lives inside one, the selector area has to live there too, otherwise it is drawn underneath.
   * See [#302](https://github.com/ThibaultJanBeyer/DragSelect/issues/302)
   */
  private get parentNode(): HTMLElement {
    const area = this.DS.Area.HTMLNode
    const topLayer =
      area instanceof Element
        ? area.closest<HTMLElement>('dialog, [popover]')
        : null
    return topLayer || document.body || document.documentElement
  }

  /** Adding / Removing elements to document */
  private applyElements = (method: AppendRemove) => {
    if (method === 'append') {
      this.HTMLNode.appendChild(this.DS.Selector.HTMLNode)
      this.parentNode.appendChild(this.HTMLNode)
    } else {
      this.DS.Selector.HTMLNode.remove()
      this.HTMLNode.remove()
    }
  }

  /** Moves the selector area to the right parent if the area changed */
  private updateParent = () => {
    if (!this.HTMLNode.isConnected) return
    const parent = this.parentNode
    if (this.HTMLNode.parentNode !== parent) parent.appendChild(this.HTMLNode)
  }

  /** Updates the selectorAreas positions to match the areas */
  private updatePos = () => {
    this._rect = undefined
    const rect = this.DS.Area.rect
    const border = this.DS.Area.computedBorder
    const top = rect.top + border.top
    const left = rect.left + border.left
    this.setPos(top, left, rect.width, rect.height)

    // Fixed elements are positioned relative to the viewport,
    // unless an ancestor (i.e. a dialog) has a transform, filter, etc. which makes it the containing block.
    // In that case we compensate for the offset of that containing block.
    if (!this.HTMLNode.getClientRects().length) return
    const actual = this.HTMLNode.getBoundingClientRect()
    const offsetTop = actual.top - top
    const offsetLeft = actual.left - left
    if (Math.abs(offsetTop) > 0.01 || Math.abs(offsetLeft) > 0.01)
      this.setPos(top - offsetTop, left - offsetLeft, rect.width, rect.height)
    this._rect = undefined
  }

  private setPos = (
    top: number,
    left: number,
    width: number,
    height: number
  ) => {
    const { style } = this.HTMLNode
    const _top = `${top}px`
    const _left = `${left}px`
    const _width = `${width}px`
    const _height = `${height}px`
    if (style.top !== _top) style.top = _top
    if (style.left !== _left) style.left = _left
    if (style.width !== _width) style.width = _width
    if (style.height !== _height) style.height = _height
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
