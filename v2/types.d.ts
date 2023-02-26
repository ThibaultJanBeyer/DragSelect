/**
 * The Settings to be passed to the Class
 */
type Settings = {
    /**
     * area in which you can drag. If not provided it will be the whole document
     */
    area?: HTMLElement | SVGElement | Document;
    /**
     * the elements that can be selected
     */
    selectables?: DSInputElements;
    /**
     * Speed in which the area scrolls while selecting (if available). Unit is pixel per movement.
     */
    autoScrollSpeed?: number;
    /**
     * Tolerance for autoScroll (how close one has to be near an edges for autoScroll to start)
     */
    overflowTolerance?: Vect2;
    /**
     * Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom.
     */
    zoom?: number;
    /**
     * if set to true, no styles (except for position absolute) will be applied by default
     */
    customStyles?: boolean;
    /**
     * Add newly selected elements to the selection instead of replacing them
     */
    multiSelectMode?: boolean;
    /**
     * Whether or not to toggle already active elements while multi-selecting
     */
    multiSelectToggling?: boolean;
    /**
     * Keys that allows switching to the multi-select mode (see the multiSelectMode option). Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). Note that the best support is given for <kbd>Control</kbd>, <kbd>Shift</kbd> and <kbd>Meta</kbd>. Provide an empty array `[]` if you want to turn off the functionality.
     */
    multiSelectKeys?: DSMultiSelectKeys;
    /**
     * the square that will draw the selection
     */
    selector?: HTMLElement;
    /**
     * how much % of the element has to be selected to be considered selected (0 = just touching, 1 = inside the selection)
     */
    selectionThreshold?: number;
    /**
     * When a user is dragging on an already selected element, the selection is dragged.
     */
    draggability?: boolean;
    /**
     * Whether an element is draggable from the start or needs to be selected first
     */
    immediateDrag?: boolean;
    /**
     * Whether or not the user can drag with the keyboard (we don't recommend disabling it)
     */
    keyboardDrag?: boolean;
    /**
     * The keys available to drag element using the keyboard.
     */
    dragKeys?: DSDragKeys;
    /**
     * The speed at which elements are dragged using the keyboard. In pixels per keydown.
     */
    keyboardDragSpeed?: number;
    /**
     * Whether to use hardware accelerated css transforms when dragging or top/left instead
     */
    useTransform?: boolean;
    /**
     * Refresh rate on memoization, higher numbers mean better performance but more lag if elements are moving, lower numbers mean less lag but worse performance. If none of your DOMNodes are moving, you can set it to a very high number to increase performance. Value in milliseconds.
     */
    refreshMemoryRate?: number;
    /**
     * one or more drop-elements: where the selectables can be dropped into
     */
    dropZones?: DSInputDropZone[];
    /**
     * how much % of the item has to be inside the dropzone to be considered inside (0 = barely touching, 1 = completely inside)
     */
    dropInsideThreshold?: number;
    /**
     * how much % of the zone does the pointer has to be in to be considered a target (0 = anywhere in the zone, max: 0.5 = has to point at the center of the zone)
     */
    dropTargetThreshold?: number;
    /**
     * Whether to use Pointer Events to replace traditional Mouse or Touch Events. Useful for tools like Google Blockly.
     */
    usePointerEvents?: boolean;
    /**
     * the class assigned to the mouse hovered items
     */
    hoverClass?: string;
    /**
     * the class assigned to the elements that can be selected
     */
    selectableClass?: string;
    /**
     * the class assigned to the selected items
     */
    selectedClass?: string;
    /**
     * the class assigned to the square selector helper
     */
    selectorClass?: string;
    /**
     * the class assigned to the square in which the selector resides. By default it's invisible
     */
    selectorAreaClass?: string;
    /**
     * on an item corresponding the target dropzone. This is also the prefix for ds-dropped-target-${zone.id}
     */
    droppedTargetClass?: string;
    /**
     * on an item that is within its dropzone bounds after a drop. This is also the prefix for ds-dropped-inside-${zone.id}
     */
    droppedInsideClass?: string;
    /**
     * on element that can be dropped into at least one container. This is also the prefix for ds-droppable-${zone.id}
     */
    droppableClass?: string;
    /**
     * on each dropZone
     */
    dropZoneClass?: string;
    /**
     * on corresponding dropZone when element is dragged
     */
    dropZoneReadyClass?: string;
    /**
     * on dropZone that has elements from any successful target drop
     */
    dropZoneTargetClass?: string;
    /**
     * on dropZone that has elements inside after any drop
     */
    dropZoneInsideClass?: string;
    /**
     * whether to drag multiple elements as a single block or as individual items
     */
    dragAsBlock?: boolean;
};
/**
 * The Object that is passed back to any callback method
 */
type CallbackObject = {
    /**
     * The items currently selected
     */
    items?: Array<HTMLElement | SVGElement | any>;
    /**
     * The respective event object
     */
    event?: MouseEvent | TouchEvent | PointerEvent | KeyboardEvent | Event;
    /**
     * The single item currently interacted with
     */
    item?: HTMLElement | SVGElement | any;
    /**
     * Whether the interaction is a drag or a select
     */
    isDragging?: boolean;
    /**
     * Whether or not the drag interaction is via keyboard
     */
    isDraggingKeyboard?: boolean;
    /**
     * Pressed key (lowercase)
     */
    key?: string;
    /**
     * the settings being updates/manipulated/passed, also holds the previous value. i.e. updating selectorClass will publish { settings: { selectorClass: 'newVal', 'selectorClass:pre': 'oldVal' } }
     */
    settings?: Settings;
    scroll_directions?: Array<'top' | 'bottom' | 'left' | 'right' | undefined>;
    scroll_multiplier?: number;
    /**
     * The dropZone element that the element was dropped into (or the mouse is currently hovering over)
     */
    dropTarget?: DSDropZone;
};
type DSCallback = Function;
type DSInputDropZone = {
    /**
     * can be any unique identifier of type string
     */
    id: string;
    /**
     * is the dropzone itself
     */
    element: DSElement;
    /**
     * the elements that can be dropped into that zone. This is optional, by default it will be all selectables
     */
    droppables?: DSInputElements;
};
type DSDropZone = {
    id: string;
    element: DSElement;
    droppables: DSElements;
    /**
     * the items related to the target zone
     */
    itemsDropped?: DSElements;
    /**
     * the items that are within the targets bounds
     */
    itemsInside?: DSElements;
};
type Vect2 = {
    x: number;
    y: number;
};
type DSElementPos = {
    x: number;
    y: number;
    w: number;
    h: number;
    r: number;
    b: number;
};
type DSEdges = Array<'top' | 'bottom' | 'left' | 'right' | undefined>;
/**
 * area within which you can drag
 */
type DSArea = HTMLElement | SVGElement | Document;
/**
 * area in which you can drag
 */
type DSSelectorArea = HTMLElement;
/**
 * the elements that can be selected
 */
type DSInputElements = Array<HTMLElement | SVGElement> | HTMLElement | SVGElement;
/**
 * the elements that can be selected
 */
type DSElements = Array<HTMLElement | SVGElement>;
/**
 * a single element that can be selected
 */
type DSElement = HTMLElement | SVGElement;
/**
 * en event from a touch or mouse interaction
 */
type DSEvent = MouseEvent | TouchEvent | PointerEvent;
/**
 * An array of keys that allows switching to the multi-select mode
 */
type DSMultiSelectKeys = Array<'Shift' | 'Control' | 'Meta' | string>;
type DSEventNames = 'dragmove' | 'autoscroll' | 'dragstart' | 'elementselect' | 'elementunselect' | 'callback';
type DSInternalEventNames = 'Interaction:init' | 'Interaction:start' | 'Interaction:end' | 'Interaction:update' | 'Area:modified' | 'Area:scroll' | 'PointerStore:updated' | 'Selected:added' | 'Selected:removed' | 'Selectable:click' | 'Selectable:added' | 'Selectable:removed' | 'Selectable:pointer' | 'KeyStore:down' | 'KeyStore:up';
type DSInternalEventNamesPre = 'Interaction:init:pre' | 'Interaction:start:pre' | 'Interaction:end:pre' | 'Interaction:update:pre' | 'Area:modified:pre' | 'Area:scroll:pre' | 'PointerStore:updated:pre' | 'Selected:added:pre' | 'Selected:removed:pre' | 'Selectable:click:pre' | 'Selectable:added:pre' | 'Selectable:removed:pre' | 'Selectable:pointer:pre' | 'KeyStore:down:pre' | 'KeyStore:up:pre';
type DSInternalSettingEvents = 'Settings:updated' | 'Settings:updated:pre' | 'Settings:updated:*' | 'Settings:updated:*:pre';
/**
 * the name of the callback
 */
type DSCallbackNames = DSEventNames | DSInternalEventNames | DSInternalEventNamesPre | DSInternalSettingEvents;
type DSBoundingRect = {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
};
type DSDragKeys = {
    up: string[];
    down: string[];
    left: string[];
    right: string[];
};
type DSModificationCallback = (event: any) => any;
