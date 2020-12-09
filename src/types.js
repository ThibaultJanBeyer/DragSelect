/**
 * The Settings to be passed to the Class
 * @typedef {Object} Settings
 * @property {HTMLElement|SVGElement|HTMLDocument} [area=document] area in which you can drag. If not provided it will be the whole document
 * @property {DSInputElements} [selectables=[]] the elements that can be selected
 * @property {number} [autoScrollSpeed=50] Speed in which the area scrolls while selecting (if available). Unit is pixel per movement.
 * @property {number} [zoom=1] Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom.
 * @property {boolean} [customStyles=false] if set to true, no styles (except for position absolute) will be applied by default
 * @property {boolean} [multiSelectMode=false] Add newly selected elements to the selection instead of replacing them
 * @property {boolean} [multiSelectToggling=true] Whether or not to toggle already active elements while multi-selecting
 * @property {DSMultiSelectKeys} [multiSelectKeys=['Control', 'Shift', 'Meta']] Keys that allows switching to the multi-select mode (see the multiSelectMode option). Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). Note that the best support is given for <kbd>Control</kbd>, <kbd>Shift</kbd> and <kbd>Meta</kbd>. Provide an empty array `[]` if you want to turn off the functionality.
 * @property {HTMLElement} [selector=HTMLElement] the square that will draw the selection
 * @property {boolean} [stopForMove=false] When a user is dragging on an already selected element, the selection is not fired. This is required to plug-in drag-and-drop functionality.
 * @property {string} [hoverClass=ds-hover] the class assigned to the mouse hovered items
 * @property {string} [selectableClass=ds-selectable] the class assigned to the elements that can be selected
 * @property {string} [selectedClass=ds-selected] the class assigned to the selected items
 * @property {string} [selectorClass=ds-selector] the class assigned to the square selector helper
 * @property {string} [selectorAreaClass=ds-selector-area] the class assigned to the square in which the selector resides. By default it's invisible
 * @property {DSCallbackEvent} [callback] Deprecated: please use DragSelect.subscribe('callback', callback) instead
 * @property {DSDragMoveEvent} [onDragMove] Deprecated: please use DragSelect.subscribe('onDragMove', onDragMove) instead
 * @property {DSDragMoveBeginEvent} [onDragStartBegin]  Deprecated: please use DragSelect.subscribe('onDragStartBegin', onDragStartBegin) instead
 * @property {DSDragStartEvent} [onDragStart]  Deprecated: please use DragSelect.subscribe('onDragStart', onDragStart) instead
 * @property {DSElementSelectEvent} [onElementSelect]  Deprecated: please use DragSelect.subscribe('onElementSelect', onElementSelect) instead
 * @property {DSElementUnSelectEvent} [onElementUnselect]  Deprecated: please use DragSelect.subscribe('onElementUnselect', onElementUnselect) instead
 */

/**
 * The Object that is passed back to any callback method
 * @typedef {Object} CallbackObject
 * @property {Array<HTMLElement|SVGElement|any>} items The items currently selected
 * @property {MouseEvent|TouchEvent|Event} [event] The respective event object
 * @property {HTMLElement|SVGElement|any} [item] The single item currently interacted with
 */
/**
 * @typedef {function} DSCallback
 * @param {CallbackObject} selected
 */
/**
 * Callback function that gets fired when the element is selected.
 * @typedef {DSCallback} DSCallbackEvent
 */
/**
 * Fired while the user drags.
 * @typedef {DSCallback} DSDragMoveEvent
 */
/**
 * Fired while the user drags.
 * @typedef {DSCallback} DSDragMoveBeginEvent
 */
/**
 * When the user clicks in the area.
 * @typedef {DSCallback} DSDragStartEvent
 */
/**
 * Fired every time an element is selected.
 * @typedef {DSCallback} DSElementSelectEvent
 */
/**
 * Fired every time an element is un-selected.
 * @typedef {DSCallback} DSElementUnSelectEvent
 */

/** @typedef {{x: number, y: number}} Vect2 */
/** @typedef {{x:number,y:number,w:number,h:number}} DSElementPos */
/** @typedef {Array.<'top'|'bottom'|'left'|'right'|undefined>} DSEdges */

/** @typedef {HTMLElement|SVGElement|HTMLDocument} DSArea area within which you can drag */
/** @typedef {HTMLElement} DSSelectorArea area in which you can drag */
/** @typedef {Array.<HTMLElement|SVGElement> | HTMLElement | SVGElement} DSInputElements the elements that can be selected */
/** @typedef {Array.<HTMLElement|SVGElement>} DSElements the elements that can be selected */
/** @typedef {HTMLElement|SVGElement} DSElement a single element that can be selected */
/** @typedef {MouseEvent|TouchEvent} DSEvent en event from a touch or mouse interaction */
/** @typedef {Array.<'Shift'|'Control'|'Meta'|string>} DSMultiSelectKeys An array of keys that allows switching to the multi-select mode */

/** @typedef {'dragmove'|'autoscroll'|'dragstart'|'elementselect'|'elementunselect'|'callback'} DSEventNames */
/** @typedef {'Interaction:init'|'Interaction:start'|'Interaction:end'|'Interaction:update'|'Area:modified'|'Area:scroll'|'PointerStore:updated'|'Selected:added'|'Selected:removed'|'Selectable:click'} DSInternalEventNames */
/** @typedef {DSEventNames|DSInternalEventNames} DSCallbackNames the name of the callback */

/** @typedef {{top:number,left:number,bottom:number,right:number,width:number,height:number}} DSBoundingRect */

/**
 * @callback DSModificationCallback
 * @param {*} event
 */
