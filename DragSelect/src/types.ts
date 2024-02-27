import {
  type DSPublicPublishAdditionalEventData,
  type DSPublicPublish,
} from './methods/subscriberAliases'
import { DSAreaPublishEventData, DSAreaPublishEventNames } from './modules/Area'
import {
  DSInteractionPublishEventData,
  DSInteractionPublishEventNames,
} from './modules/Interaction'
import {
  DSSelectablePublishEventData,
  DSSelectablePublishEventNames,
} from './modules/SelectableSet'
import {
  DSSelectedPublishEventData,
  DSSelectedPublishEventNames,
} from './modules/SelectedSet'
import {
  DSKeyStorePublishEventData,
  DSKeyStorePublishEventNames,
} from './stores/KeyStore'
import {
  DSPointerStorePublishEventData,
  DSPointerStorePublishEventNames,
} from './stores/PointerStore'
import {
  DSSettingsPublishEventData,
  DSSettingsPublishEventNames,
} from './stores/SettingsStore'

export type Vect2 = {
  x: number
  y: number
}

export type Settings<E extends DSInputElement> = {
  /** area in which you can drag. If not provided it will be the whole document. Default Document */
  area?: HTMLElement | SVGElement | Document
  /** [=[]] the elements that can be selected. */
  selectables?: E | E[]
  /** [=5] Speed in which the area scrolls while selecting (if available). Unit is pixel per movement. */
  autoScrollSpeed?: number
  /** [={x:25,y:25}] Tolerance for autoScroll (how close one has to be near an edges for autoScroll to start). */
  overflowTolerance?: Vect2
  /** [=1] Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom. */
  zoom?: number
  /** [=false] if set to true, no styles (except for position absolute) will be applied by default */
  customStyles?: boolean
  /** [=false] Add newly selected elements to the selection instead of replacing them */
  multiSelectMode?: boolean
  /** [=true] Whether or not to toggle already active elements while multi-selecting */
  multiSelectToggling?: boolean
  /** [=['Control', 'Shift', 'Meta']] Keys that allows switching to the multi-select mode (see the multiSelectMode option). Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). Note that the best support is given for <kbd>Control</kbd>, <kbd>Shift</kbd> and <kbd>Meta</kbd>. Provide an empty array `[]` if you want to turn off the functionality. */
  multiSelectKeys?: DSMultiSelectKeys
  /** [=HTMLElement] the square that will draw the selection */
  selector?: HTMLElement
  /** [=0] how much % of the element has to be selected to be considered selected (0 = just touching, 1 = inside the selection) */
  selectionThreshold?: number
  /** [=true] When a user is dragging on an already selected element, the selection is dragged. */
  draggability?: boolean
  /** [=true] Whether an element is draggable from the start or needs to be selected first */
  immediateDrag?: boolean
  /** [=true] Whether or not the user can drag with the keyboard (we don't recommend disabling it) */
  keyboardDrag?: boolean
  /** [={up:['ArrowUp'],down:['ArrowDown'],left:['ArrowLeft'],righ:['ArrowRight']}] The keys available to drag element using the keyboard. */
  dragKeys?: DSDragKeys
  /** [=10] The speed at which elements are dragged using the keyboard. In pixels per keydown. */
  keyboardDragSpeed?: number
  /** [=true] Whether to use hardware accelerated css transforms when dragging or top/left instead */
  useTransform?: boolean
  /** [=80] Refresh rate on memoization, higher numbers mean better performance but more lag if elements are moving, lower numbers mean less lag but worse performance. If none of your DOMNodes are moving, you can set it to a very high number to increase performance. Value in milliseconds. */
  refreshMemoryRate?: number
  /** [=[]] one or more drop-elements: where the selectables can be dropped into */
  dropZones?: DSInputDropZone<E>[]
  /** [=1] how much % of the item has to be inside the dropzone to be considered inside (0 = barely touching, 1 = completely inside) */
  dropInsideThreshold?: number
  /** [=0] how much % of the zone does the pointer has to be in to be considered a target (0 = anywhere in the zone, max: 0.5 = has to point at the center of the zone) */
  dropTargetThreshold?: number
  /** [=false] Whether to use Pointer Events to replace traditional Mouse or Touch Events. Useful for tools like Google Blockly. */
  usePointerEvents?: boolean
  /** [=ds-hover] the class assigned to the mouse hovered items */
  hoverClass?: string
  /** [=ds-selectable] the class assigned to the elements that can be selected */
  selectableClass?: string
  /** [=ds-selected] the class assigned to the selected items */
  selectedClass?: string
  /** [=ds-selector] the class assigned to the square selector helper */
  selectorClass?: string
  /** [=ds-selector-area] the class assigned to the square in which the selector resides. By default it's invisible */
  selectorAreaClass?: string
  /** [=ds-dropped-target] on an item corresponding the target dropzone. This is also the prefix for ds-dropped-target-${zone.id} */
  droppedTargetClass?: string
  /** [=ds-dropped-inside] on an item that is within its dropzone bounds after a drop. This is also the prefix for ds-dropped-inside-${zone.id} */
  droppedInsideClass?: string
  /** [=ds-droppable] on element that can be dropped into at least one container. This is also the prefix for ds-droppable-${zone.id} */
  droppableClass?: string
  /** [=ds-dropzone] on each dropZone */
  dropZoneClass?: string
  /** [=ds-dropzone-ready] on corresponding dropZone when element is dragged */
  dropZoneReadyClass?: string
  /** [=ds-dropzone-target] on dropZone that has elements from any successful target drop */
  dropZoneTargetClass?: string
  /** [=ds-dropzone-inside] on dropZone that has elements inside after any drop */
  dropZoneInsideClass?: string
}

export type DSCallbackObject<E extends DSInputElement> = Readonly<
  Partial<
    DSSettingsPublishEventData<E> &
      DSAreaPublishEventData<E> &
      DSKeyStorePublishEventData &
      DSPointerStorePublishEventData &
      DSInteractionPublishEventData &
      DSSelectablePublishEventData<E> &
      DSSelectedPublishEventData<E> &
      DSPublicPublishAdditionalEventData<E>
  >
>

export type DSInputDropZone<E extends DSInputElement> = {
  /** can be any unique identifier of type string */
  id: string
  /** the dropzone itself */
  element: E // @TODO this would not be of type InputElement!
  /** elements that can be dropped into that zone. This is optional, by default it will be all selectables */
  droppables?: E[]
}

export type DSElementPos = {
  x: number
  y: number
  w: number
  h: number
  r: number
  b: number
}

export type DSEdges = Array<'top' | 'bottom' | 'left' | 'right' | undefined>
export type DSEdgesObj = {
  top: number
  bottom: number
  left: number
  right: number
}

/** area within which you can drag */
export type DSArea = HTMLElement | SVGElement | Document

/** area in which you can drag */
export type DSSelectorArea = HTMLElement

/** elements that can be selected */
export type DSInputElement = HTMLElement | SVGElement

/** element that can be selected */
// export type DSElement = HTMLElement|SVGElement

/** An array of keys that allows switching to the multi-select mode */
export type DSMultiSelectKeys = Array<'Shift' | 'Control' | 'Meta' | string>

export type DSEvent = KeyboardEvent | MouseEvent | PointerEvent | TouchEvent

export type DSInternalEventName =
  | DSSettingsPublishEventNames
  | DSAreaPublishEventNames
  | DSKeyStorePublishEventNames
  | DSPointerStorePublishEventNames
  | DSInteractionPublishEventNames
  | DSSelectablePublishEventNames
  | DSSelectedPublishEventNames

export type DSBoundingRectBase = {
  top: number
  left: number
  bottom: number
  right: number
}

export interface DSBoundingRect extends DSBoundingRectBase {
  width: number
  height: number
}

export type DSDragKeys = {
  up: Array<string>
  down: Array<string>
  left: Array<string>
  right: Array<string>
}
