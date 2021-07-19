// @ts-check
import DragSelect from '../DragSelect'
import '../types'

export default class Interaction {
  /**
   * @type {DSArea}
   * @private
   * */
  _areaElement
  /**
   * @type {boolean}
   * @private
   * */
  _draggability
  /**
   * @type {boolean}
   * @private
   * */
  _immediateDrag
  /** @type {boolean} */
  isInteracting
  /** @type {boolean} */
  isDragging

  /**
   * @constructor Interaction
   * @param {Object} obj
   * @param {DSArea} obj.areaElement
   * @param {boolean} obj.draggability
   * @param {boolean} obj.immediateDrag
   * @param {DragSelect} obj.DS
   * @ignore
   */
  constructor({ areaElement, DS, draggability, immediateDrag }) {
    this._areaElement = areaElement
    this._draggability = draggability
    this._immediateDrag = immediateDrag
    this.DS = DS
    this.DS.subscribe('PointerStore:updated', this.update)
    this.DS.subscribe('Selectable:click', this.onClick)
    this.DS.subscribe('Selectable:pointer', ({ event }) => this.start(event))
    this.DS.subscribe('Area:scroll', this.update)
  }

  init = () => {
    this.stop()
    this._areaElement.addEventListener('mousedown', this.start)
    this._areaElement.addEventListener('touchstart', this.start, {
      passive: false,
    })
    this.DS.publish('Interaction:init', {})
  }

  /**
   * @param {DSEvent} event
   */
  _canInteract(event) {
    const isKeyboardClick =
      /** @type {MouseEvent} */ (event).clientX === 0 &&
      /** @type {MouseEvent} */ (event).clientY === 0 &&
      /** @type {MouseEvent} */ (event).detail === 0 &&
      event.target

    if (
      /** @type {MouseEvent} */ (event).button === 2 || // right-clicks
      this.isInteracting || // fix double-click issues
      (event.target &&
        !this.DS.SelectorArea.isInside(
          /** @type {DSElement} */ (event.target)
        )) || //fix outside elements issue
      (!isKeyboardClick && !this.DS.SelectorArea.isClicked(event)) // make sure the mouse click is inside the area
    )
      return false

    return true
  }

  /**
   * @param {DSEvent} event
   */
  start = (event) => {
    if (event.type === 'touchstart') event.preventDefault() // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
    if (!this._canInteract(event)) return

    this.isInteracting = true
    this.isDragging = this.isDragEvent(event)

    this.DS.publish('Interaction:start', { event, isDragging: this.isDragging })

    document.addEventListener('mouseup', this.reset)
    document.addEventListener('touchend', this.reset)
  }

  /**
   * Drag interaction
   * @param {DSEvent} event
   * @returns {boolean}
   */
  isDragEvent = (event) => {
    if (
      !this._draggability ||
      this.DS.stores.KeyStore.isMultiSelectKeyPressed(event) ||
      !this.DS.SelectableSet.has(event.target)
    )
      return false

    if (this._immediateDrag) {
      if (!this.DS.SelectedSet.size)
        this.DS.SelectedSet.add(/** @type {DSElement} */ (event.target))
      else if (!this.DS.SelectedSet.has(event.target)) {
        this.DS.SelectedSet.clear()
        this.DS.SelectedSet.add(/** @type {DSElement} */ (event.target))
      }
    }

    if (this.DS.SelectedSet.has(event.target)) return true

    return false
  }

  /**
   * Triggers when a node is actively selected: <button> nodes that are pressed via the keyboard.
   * Making DragSelect accessible for everyone!
   * @param {{ event:MouseEvent }} p
   */
  onClick = ({ event }) => {
    if (!this._canInteract(event)) return
    if (event.detail > 0) return // mouse interaction

    const {
      stores: { PointerStore, KeyStore },
      SelectableSet,
      SelectedSet,
      publish,
    } = this.DS

    PointerStore.start(event)

    const node = /** @type {any} */ (event.target)
    if (!SelectableSet.has(node)) return

    if (!KeyStore.isMultiSelectKeyPressed(event)) SelectedSet.clear()
    SelectedSet.toggle(node)

    publish('Interaction:end', { event, isDragging: this.isDragging }) // simulate mouse-up (that does not exist on keyboard)
  }

  stop = () => {
    this.isInteracting = false
    this.isDragging = false
    this._areaElement.removeEventListener('mousedown', this.start)
    this._areaElement.removeEventListener('touchstart', this.start, {
      // @ts-ignore
      passive: false,
    })
    document.removeEventListener('mouseup', this.reset)
    document.removeEventListener('touchend', this.reset)
  }

  update = ({ event, scroll_directions, scroll_multiplier }) => {
    if (this.isInteracting)
      this.DS.publish('Interaction:update', {
        event,
        scroll_directions,
        scroll_multiplier,
        isDragging: this.isDragging,
      })
  }

  reset = (event) => {
    const isDragging = this.isDragging
    this.stop()
    this.init()
    this.DS.publish('Interaction:end', { event, isDragging })
  }
}
