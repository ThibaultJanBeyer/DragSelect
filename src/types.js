/**
* The Settings to be passed to the Class
* @typedef {Object} Settings
* @property {HTMLElement | SVGElement | Document} [area=document] area in which you can drag. If not provided it will be the whole document
* @property {number} [autoScrollSpeed=1] Speed in which the area scrolls while selecting (if available). Unit is pixel per movement. Default = 1
* @property {number} [zoom=1] Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom. Default = 1
* @property {DSCallback} [callback=() => {}] a callback function that gets fired when the element is dropped. This callback gets a property which is an array that holds all selected nodes. The second property passed is the event object.
* @property {boolean} [customStyles=false] if set to true, no styles (except for position absolute) will be applied by default
* @property {string} [hoverClass=ds-hover] the class assigned to the mouse hovered items
* @property {boolean} [multiSelectMode=false] Add newly selected elements to the selection instead of replacing them. Default = false
* @property {DSGenericInteractionCallbackEvent} [onDragMove=()=>{}] It is fired when the user drags. This callback gets the event object. Executed before DragSelect function code ran, after getting the current mouse position.
* @property {DSGenericInteractionCallbackEvent} [onDragStartBegin=()=>{}] Is fired when the user clicks in the area. This callback gets the event object. Executed *before* DragSelect function code ran.
* @property {DSGenericInteractionCallbackEvent} [onDragStart=()=>{}] It is fired when the user clicks in the area. This callback gets the event object. Executed after DragSelect function code ran, before the setup of event listeners.
* @property {DSInteractionCallbackEvent} [onElementSelect=()=>{}] It is fired every time an element is selected. This callback gets a property which is the just selected node
* @property {DSInteractionCallbackEvent} [onElementUnselect=()=>{}] It is fired every time an element is de-selected. This callback gets a property which is the just de-selected node
* @property {string} [selectableClass=ds-selectable] the class assigned to the elements that can be selected
* @property {HTMLElement[] | SVGElement[] | HTMLElement | SVGElement} [selectables=[]] the elements that can be selected
* @property {string} [selectedClass=ds-selected] the class assigned to the selected items
* @property {HTMLElement} [selector=HTMLElement] the square that will draw the selection
* @property {string} [selectorClass=ds-selector] the class assigned to the square selector helper
* @property {string[]} [multiSelectKeys=['ctrlKey', 'shiftKey', 'metaKey']] An array of keys that allows switching to the multi-select mode (see the @multiSelectMode option). The only possible values are keys that are provided via the event object. So far: <kbd>ctrlKey</kbd>, <kbd>shiftKey</kbd>, <kbd>metaKey</kbd> and <kbd>altKey</kbd>. Provide an empty array `[]` if you want to turn off the functionality.
*/
/**
 * @typedef {function} DSCallback
 * @param {Array<HTMLElement|SVGElement|any>} selected - The selected items
 * @param {MouseEvent|TouchEvent|Event} [event]
 * @return {*}
 */
/**
 * @typedef {function} DSGenericInteractionCallbackEvent
 * @param {MouseEvent|TouchEvent|Event} [event]
 * @return {*}
 */
/**
 * @typedef {function} DSInteractionCallbackEvent
 * @param {HTMLElement|SVGElement|any} item
 * @return {*}
 */
