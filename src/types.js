/**
 * The Settings to be passed to the Class
 * @typedef {Object} Settings
 * @property {HTMLElement|SVGElement|HTMLDocument} [area=document] area in which you can drag. If not provided it will be the whole document
 * @property {number} [autoScrollSpeed=10] Speed in which the area scrolls while selecting (if available). Unit is pixel per movement.
 * @property {number} [zoom=1] Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom.
 * @property {boolean} [customStyles=false] if set to true, no styles (except for position absolute) will be applied by default
 * @property {string} [hoverClass=ds-hover] the class assigned to the mouse hovered items
 * @property {boolean} [multiSelectMode=false] Add newly selected elements to the selection instead of replacing them.
 * @property {string} [selectableClass=ds-selectable] the class assigned to the elements that can be selected
 * @property {HTMLElement[] | SVGElement[] | HTMLElement | SVGElement} [selectables=[]] the elements that can be selected
 * @property {string} [selectedClass=ds-selected] the class assigned to the selected items
 * @property {HTMLElement} [selector=HTMLElement] the square that will draw the selection
 * @property {string} [selectorClass=ds-selector] the class assigned to the square selector helper
 * @property {string} [selectorAreaClass=ds-selector-area] the class assigned to the square in which the selector resides. By default it's invisible
 * @property {DSCallbackEvent} [callback] Deprecated: please use DragSelect.subscribe('callback', callback) instead
 * @property {DSDragMoveEvent} [onDragMove] Deprecated: please use DragSelect.subscribe('onDragMove', onDragMove) instead
 * @property {DSDragMoveBeginEvent} [onDragStartBegin]  Deprecated: please use DragSelect.subscribe('onDragStartBegin', onDragStartBegin) instead
 * @property {DSDragStartEvent} [onDragStart]  Deprecated: please use DragSelect.subscribe('onDragStart', onDragStart) instead
 * @property {DSElementSelectEvent} [onElementSelect]  Deprecated: please use DragSelect.subscribe('onElementSelect', onElementSelect) instead
 * @property {DSElementUnSelectEvent} [onElementUnselect]  Deprecated: please use DragSelect.subscribe('onElementUnselect', onElementUnselect) instead
 * @property {Array.<'ctrlKey'|'shiftKey'|'metaKey'>} [multiSelectKeys=['ctrlKey', 'shiftKey', 'metaKey']] An array of keys that allows switching to the multi-select mode (see the @multiSelectMode option). The only possible values are keys that are provided via the event object. So far: <kbd>ctrlKey</kbd>, <kbd>shiftKey</kbd>, <kbd>metaKey</kbd> and <kbd>altKey</kbd>. Provide an empty array `[]` if you want to turn off the functionality.
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
/** @typedef {Array.<'ctrlKey'|'shiftKey'|'metaKey'>} DSMultiSelectKeys An array of keys that allows switching to the multi-select mode */

/** @typedef {'dragmove'|'dragstartbegin'|'dragstart'|'elementselect'|'elementunselect'|'callback'} DSEventNames */
/** @typedef {'Area:startmove'|'Area:move'|'Area:endmove'|'Area:modified'} DSAreaEventNames */

/** @typedef {DSEventNames|DSAreaEventNames} DSCallbackNames the name of the callback */

/** @typedef {{top:number,left:number,bottom:number,right:number,width:number,height:number}} DSBoundingRect */

/**
 * @callback DSModificationCallback
 * @param {*} event
 */
