/**
 * The Settings to be passed to the Class
 * @typedef {Object} Settings
 * @property {HTMLElement|SVGElement|Document} [area=document] area in which you can drag. If not provided it will be the whole document
 * @property {DSInputElements} [selectables=[]] the elements that can be selected
 * @property {number} [autoScrollSpeed=5] Speed in which the area scrolls while selecting (if available). Unit is pixel per movement.
 * @property {Vect2} [overflowTolerance={x:25,y:25}] Tolerance for autoScroll (how close one has to be near an edges for autoScroll to start)
 * @property {number} [zoom=1] Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom.
 * @property {boolean} [customStyles=false] if set to true, no styles (except for position absolute) will be applied by default
 * @property {boolean} [multiSelectMode=false] Add newly selected elements to the selection instead of replacing them
 * @property {boolean} [multiSelectToggling=true] Whether or not to toggle already active elements while multi-selecting
 * @property {DSMultiSelectKeys} [multiSelectKeys=['Control', 'Shift', 'Meta']] Keys that allows switching to the multi-select mode (see the multiSelectMode option). Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). Note that the best support is given for <kbd>Control</kbd>, <kbd>Shift</kbd> and <kbd>Meta</kbd>. Provide an empty array `[]` if you want to turn off the functionality.
 * @property {HTMLElement} [selector=HTMLElement] the square that will draw the selection
 * @property {number} [selectionThreshold=0] how much % of the element has to be selected to be considered selected (0 = just touching, 1 = inside the selection)
 * @property {boolean} [draggability=true] When a user is dragging on an already selected element, the selection is dragged.
 * @property {boolean} [immediateDrag=true] Whether an element is draggable from the start or needs to be selected first
 * @property {boolean} [keyboardDrag=true] Whether or not the user can drag with the keyboard (we don't recommend disabling it)
 * @property {DSDragKeys} [dragKeys={up:['ArrowUp'],down:['ArrowDown'],left:['ArrowLeft'],righ:['ArrowRight']}] The keys available to drag element using the keyboard.
 * @property {number} [keyboardDragSpeed=10] The speed at which elements are dragged using the keyboard. In pixels per keydown.
 * @property {boolean} [useTransform=true] Whether to use hardware accelerated css transforms when dragging or top/left instead
 * @property {number} [refreshMemoryRate=80] Refresh rate on memoization, higher numbers mean better performance but more lag if elements are moving, lower numbers mean less lag but worse performance. If none of your DOMNodes are moving, you can set it to a very high number to increase performance. Value in milliseconds.
 * @property {DSInputDropZone[]} [dropZones=[]] one or more drop-elements: where the selectables can be dropped into
 * @property {number} [dropInsideThreshold=1] how much % of the item has to be inside the dropzone to be considered inside (0 = barely touching, 1 = completely inside)
 * @property {number} [dropTargetThreshold=0] how much % of the zone does the pointer has to be in to be considered a target (0 = anywhere in the zone, max: 0.5 = has to point at the center of the zone)
 * @property {boolean} [usePointerEvents=false] Whether to use Pointer Events to replace traditional Mouse or Touch Events. Useful for tools like Google Blockly.
 * @property {string} [hoverClass=ds-hover] the class assigned to the mouse hovered items
 * @property {string} [selectableClass=ds-selectable] the class assigned to the elements that can be selected
 * @property {string} [selectedClass=ds-selected] the class assigned to the selected items
 * @property {string} [selectorClass=ds-selector] the class assigned to the square selector helper
 * @property {string} [selectorAreaClass=ds-selector-area] the class assigned to the square in which the selector resides. By default it's invisible
 * @property {string} [droppedTargetClass=ds-dropped-target] on an item corresponding the target dropzone. This is also the prefix for ds-dropped-target-${zone.id}
 * @property {string} [droppedInsideClass=ds-dropped-inside] on an item that is within its dropzone bounds after a drop. This is also the prefix for ds-dropped-inside-${zone.id}
 * @property {string} [droppableClass=ds-droppable] on element that can be dropped into at least one container. This is also the prefix for ds-droppable-${zone.id}
 * @property {string} [dropZoneClass=ds-dropzone] on each dropZone
 * @property {string} [dropZoneReadyClass=ds-dropzone-ready] on corresponding dropZone when element is dragged
 * @property {string} [dropZoneTargetClass=ds-dropzone-target] on dropZone that has elements from any successful target drop
 * @property {string} [dropZoneInsideClass=ds-dropzone-inside] on dropZone that has elements inside after any drop
 * @property {boolean} [dragAsBlock=false] whether to drag multiple elements as a single block or as individual items
 */

/**
 * The Object that is passed back to any callback method
 * @typedef {Object} CallbackObject
 * @property {Array<HTMLElement|SVGElement|any>} [items] The items currently selected
 * @property {MouseEvent|TouchEvent|PointerEvent|KeyboardEvent|Event} [event] The respective event object
 * @property {HTMLElement|SVGElement|any} [item] The single item currently interacted with
 * @property {boolean} [isDragging] Whether the interaction is a drag or a select
 * @property {boolean} [isDraggingKeyboard] Whether or not the drag interaction is via keyboard
 * @property {string} [key] Pressed key (lowercase)
 * @property {Settings} [settings] the settings being updates/manipulated/passed, also holds the previous value. i.e. updating selectorClass will publish { settings: { selectorClass: 'newVal', 'selectorClass:pre': 'oldVal' } }
 * @property {Array.<'top'|'bottom'|'left'|'right'|undefined>} [scroll_directions]
 * @property {number} [scroll_multiplier]
 * @property {DSDropZone} [dropTarget] The dropZone element that the element was dropped into (or the mouse is currently hovering over)
 */
/**
 * @typedef {function} DSCallback
 * @param {CallbackObject} data
 */

/**
 * @typedef {Object} DSInputDropZone
 * @property {string} id can be any unique identifier of type string
 * @property {DSElement} element is the dropzone itself
 * @property {DSInputElements} [droppables] the elements that can be dropped into that zone. This is optional, by default it will be all selectables
 */
/**
 * @typedef {Object} DSDropZone
 * @property {string} id
 * @property {DSElement} element
 * @property {DSElements} droppables
 * @property {DSElements} [itemsDropped] the items related to the target zone
 * @property {DSElements} [itemsInside] the items that are within the targets bounds
 */

/** @typedef {{x: number, y: number}} Vect2 */
/** @typedef {{x:number,y:number,w:number,h:number,r:number,b:number}} DSElementPos */
/** @typedef {Array.<'top'|'bottom'|'left'|'right'|undefined>} DSEdges */

/** @typedef {HTMLElement|SVGElement|Document} DSArea area within which you can drag */
/** @typedef {HTMLElement} DSSelectorArea area in which you can drag */
/** @typedef {Array.<HTMLElement|SVGElement> | HTMLElement | SVGElement} DSInputElements the elements that can be selected */
/** @typedef {Array.<HTMLElement|SVGElement>} DSElements the elements that can be selected */
/** @typedef {HTMLElement|SVGElement} DSElement a single element that can be selected */
/** @typedef {MouseEvent|TouchEvent|PointerEvent} DSEvent en event from a touch or mouse interaction */
/** @typedef {Array.<'Shift'|'Control'|'Meta'|string>} DSMultiSelectKeys An array of keys that allows switching to the multi-select mode */

/** @typedef {'dragmove'|'autoscroll'|'dragstart'|'elementselect'|'elementunselect'|'callback'} DSEventNames */
/** @typedef {'Interaction:init'|'Interaction:start'|'Interaction:end'|'Interaction:update'|'Area:modified'|'Area:scroll'|'PointerStore:updated'|'Selected:added'|'Selected:removed'|'Selectable:click'|'Selectable:added'|'Selectable:removed'|'Selectable:pointer'|'KeyStore:down'|'KeyStore:up'} DSInternalEventNames */
/** @typedef {'Interaction:init:pre'|'Interaction:start:pre'|'Interaction:end:pre'|'Interaction:update:pre'|'Area:modified:pre'|'Area:scroll:pre'|'PointerStore:updated:pre'|'Selected:added:pre'|'Selected:removed:pre'|'Selectable:click:pre'|'Selectable:added:pre'|'Selectable:removed:pre'|'Selectable:pointer:pre'|'KeyStore:down:pre'|'KeyStore:up:pre'} DSInternalEventNamesPre */
// @todo: update to typescript for complex defs like `Settings:updated:${string}` | `Settings:updated:${string}:pre`
/** @typedef {'Settings:updated'|'Settings:updated:pre'|'Settings:updated:*'|'Settings:updated:*:pre'} DSInternalSettingEvents */
/** @typedef {DSEventNames|DSInternalEventNames|DSInternalEventNamesPre|DSInternalSettingEvents} DSCallbackNames the name of the callback */

/** @typedef {{top:number,left:number,bottom:number,right:number,width:number,height:number}} DSBoundingRect */
/** @typedef {{up:string[],down:string[],left:string[],right:string[]}} DSDragKeys */

/**
 * @callback DSModificationCallback
 * @param {*} event
 */
