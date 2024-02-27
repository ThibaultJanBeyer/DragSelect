type DSDropZone<E extends DSInputElement> = {
    id: string;
    element: E;
    droppables: E[];
    /** items related to the target zone */
    itemsDropped?: E[];
    /** items that are within the targets bounds */
    itemsInside?: E[];
};
declare class DropZone<E extends DSInputElement> {
    id: string;
    element: E;
    private _droppables?;
    private _rect?;
    private _observers?;
    private _timeout?;
    private _itemsDropped;
    private _itemsInside?;
    private DS;
    private PS;
    private Settings;
    private isDestroyed;
    private _parentNodes?;
    constructor({ DS, PS, id, element, droppables, }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
        id: string;
        element: E;
        droppables?: E[];
    });
    private setReadyClasses;
    /** This zone is NOT the target of a drop */
    handleNoDrop: () => void;
    /** This zone IS the target of a drop */
    handleDrop: () => void;
    handleItemsInsideClasses: () => void;
    private start;
    private stop;
    destroy(): void;
    toObject: () => DSDropZone<E>;
    get rect(): DOMRect | undefined;
    get itemsDropped(): E[] | undefined;
    get itemsInside(): E[] | undefined;
    private get parentNodes();
    get droppables(): E[];
    private set droppables(value);
}

type DSInteractionPublishEventNames = 'Interaction:init:pre' | 'Interaction:init' | 'Interaction:start:pre' | 'Interaction:start' | 'Interaction:update:pre' | 'Interaction:update' | 'Interaction:end:pre' | 'Interaction:end';
type DSInteractionPublishEventData = {
    event: InteractionEvent | KeyboardEvent;
    /** Whether the interaction is a drag or a select */
    isDragging: boolean;
    /** Whether or not the drag interaction is via keyboard */
    isDraggingKeyboard?: boolean;
    key?: string;
    scroll_directions?: DSEdges;
    scroll_multiplier?: number;
};
type DSInteractionPublish = {
    'Interaction:init:pre': {};
    'Interaction:init': {};
    'Interaction:start:pre': DSInteractionPublishEventData;
    'Interaction:start': DSInteractionPublishEventData;
    'Interaction:update:pre': Partial<DSInteractionPublishEventData>;
    'Interaction:update': Partial<DSInteractionPublishEventData>;
    'Interaction:end:pre': DSInteractionPublishEventData;
    'Interaction:end': DSInteractionPublishEventData;
};
type InteractionEvent = MouseEvent | PointerEvent | TouchEvent;
declare class Interaction<E extends DSInputElement> {
    private isInteracting?;
    isDragging: boolean;
    private DS;
    private PS;
    private Settings;
    constructor({ DS, PS }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
    });
    init: () => void;
    private _init;
    private _canInteract;
    private start;
    private _start;
    private isDragEvent;
    /**
     * Triggers when a node is actively selected: <button> nodes that are pressed via the keyboard.
     * Making DragSelect accessible for everyone!
     */
    private onClick;
    stop: (area?: DSArea) => void;
    update: ({ event, scroll_directions, scroll_multiplier, }: {
        event?: InteractionEvent | undefined;
        scroll_directions?: DSEdges | undefined;
        scroll_multiplier?: number | undefined;
    }) => void;
    reset: (event: InteractionEvent) => void;
    _reset: (event: InteractionEvent | KeyboardEvent) => void;
    private setAreaEventListeners;
    private removeAreaEventListeners;
    private setDocEventListeners;
    private removeDocEventListeners;
}

type DSPublicPublishAdditionalEventData<E extends DSInputElement> = {
    /** The dropZone element that the element was dropped into (or the mouse is currently hovering over) */
    dropTarget?: DSDropZone<E>;
    /** Selected Elements */
    items: E[];
    /** Whether the user is dragging or selecting */
    isDragging: boolean;
};
type SelectionCB<E extends DSInputElement> = DSSelectedPublishEventData<E> & {
    /** Whether the user is dragging or selecting */
    isDragging: boolean;
};
type ScrollCB<E extends DSInputElement> = Pick<DSAreaPublishEventData<E>, 'scroll_directions' | 'scroll_multiplier'> & {
    /** Selected Elements */
    items: E[];
    /** Whether the user is dragging or selecting */
    isDragging: boolean;
};
type InteractionCB = DSInteractionPublishEventData;
type InteractionEndCB<E extends DSInputElement> = Partial<DSInteractionPublishEventData> & DSPublicPublishAdditionalEventData<E>;
type DSPublicPublish<E extends DSInputElement> = {
    preelementselect: SelectionCB<E>;
    elementselect: SelectionCB<E>;
    'DS:select:pre': SelectionCB<E>;
    'DS:select': SelectionCB<E>;
    preelementunselect: SelectionCB<E>;
    elementunselect: SelectionCB<E>;
    'DS:unselect:pre': SelectionCB<E>;
    'DS:unselect': SelectionCB<E>;
    'DS:added:pre': SelectionCB<E>;
    'DS:added': SelectionCB<E>;
    'DS:removed:pre': SelectionCB<E>;
    'DS:removed': SelectionCB<E>;
    preautoscroll: ScrollCB<E>;
    autoscroll: ScrollCB<E>;
    'DS:scroll': ScrollCB<E>;
    'DS:scroll:pre': ScrollCB<E>;
    predragstart: InteractionCB;
    dragstart: InteractionCB;
    'DS:start': InteractionCB;
    'DS:start:pre': InteractionCB;
    predragmove: InteractionCB;
    dragmove: InteractionCB;
    'DS:update': InteractionCB;
    'DS:update:pre': InteractionCB;
    precallback: InteractionEndCB<E>;
    callback: InteractionEndCB<E>;
    'DS:end': InteractionEndCB<E>;
    'DS:end:pre': InteractionEndCB<E>;
};

type DSSelectablePublishEventNames = "Selectable:added:pre" | "Selectable:added" | "Selectable:removed" | "Selectable:removed:pre" | "Selectable:click:pre" | "Selectable:click" | "Selectable:pointer:pre" | "Selectable:pointer";
type DSSelectablePublishEventData<E extends DSInputElement> = {
    /** The items currently selected */
    items: E[];
    /** The item currently selected */
    item: E;
};
type DSSelectablePublish<E extends DSInputElement> = {
    "Selectable:added:pre": DSSelectablePublishEventData<E>;
    "Selectable:added": DSSelectablePublishEventData<E>;
    "Selectable:removed:pre": DSSelectablePublishEventData<E>;
    "Selectable:removed": DSSelectablePublishEventData<E>;
    "Selectable:click:pre": {
        event: MouseEvent;
    };
    "Selectable:click": {
        event: MouseEvent;
    };
    "Selectable:pointer:pre": {
        event: InteractionEvent;
    };
    "Selectable:pointer": {
        event: InteractionEvent;
    };
};
declare class SelectableSet<E extends DSInputElement> extends Set<E> {
    private _rects?;
    private _timeout?;
    private DS;
    private PS;
    private Settings;
    constructor({ DS, PS }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
    });
    private init;
    add(element: E): this;
    delete(element: E): boolean;
    clear: () => void;
    private _onClick;
    private _onPointer;
    addAll: (elements: E[]) => void;
    deleteAll: (elements: E[]) => void;
    /**
     * Gets the bounding rect from private memory if available. If not gets it from the DOM.
     * => Does not force rect calculation on all elements
     */
    getElementRect: (element: E) => DSBoundingRect | DOMRect | undefined;
    get elements(): E[];
    get rects(): Map<E, DSBoundingRect>;
}

type DSKeyStorePublishEventNames = "KeyStore:down:pre" | "KeyStore:down" | "KeyStore:up:pre" | "KeyStore:up";
type DSKeyStorePublishEventData = {
    event: KeyboardEvent;
    /** Pressed key (lowercase) */
    key: string;
};
type DSKeyStorePublish = {
    [K in DSKeyStorePublishEventNames]: DSKeyStorePublishEventData;
};
declare class KeyStore<E extends DSInputElement> {
    private _currentValues;
    private _keyMapping;
    private DS;
    private PS;
    private settings;
    /**
     * @class KeyStore
     * @constructor KeyStore
     * @ignore
     */
    constructor({ DS, PS }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
    });
    private init;
    private keydown;
    private keyup;
    stop: () => void;
    private reset;
    isMultiSelectKeyPressed(event?: KeyboardEvent | MouseEvent | PointerEvent | TouchEvent): boolean;
    get currentValues(): string[];
}

type DSPointerStorePublishEventNames = 'PointerStore:updated:pre' | 'PointerStore:updated';
type DSPointerStorePublishEventData = {
    event: PointerEvent | MouseEvent | TouchEvent;
};
type DSPointerStorePublish = {
    [K in DSPointerStorePublishEventNames]: DSPointerStorePublishEventData;
};
declare class PointerStore<E extends DSInputElement> {
    private _isMouseInteraction;
    private _initialValArea;
    private _currentValArea;
    private _lastValArea;
    private _initialVal;
    private _currentVal;
    private _lastVal;
    private _lastTouch?;
    private DS;
    private PS;
    private settings;
    constructor({ DS, PS }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
    });
    private init;
    start(event?: DSEvent): void;
    getPointerPosition: (event?: DSEvent) => Vect2;
    private update;
    stop: () => void;
    private reset;
    private _normalizedEvent;
    /** First recorded pointer position within the area */
    get initialValArea(): Vect2;
    /** Current pointer position within the area */
    get currentValArea(): Vect2;
    /** Last recorded pointer position within the area */
    get lastValArea(): Vect2;
    /** First recorded pointer position */
    get initialVal(): Vect2;
    /** Current pointer position */
    get currentVal(): Vect2;
    /** Last recorded pointer position */
    get lastVal(): Vect2;
    set initialVal(value: Vect2);
    set currentVal(value: Vect2);
    set lastVal(value: Vect2);
}

type WithPostfix<T, Postfix extends string> = {
    [K in keyof T as K | `${string & K}${Postfix}`]: T[K];
};
type DSSettings<E extends DSInputElement> = WithPostfix<Required<Settings<E>>, ':pre'>;
type DSSettingsPublishEventNames = "Settings:updated:pre" | "Settings:updated" | `Settings:updated:${string}:pre` | `Settings:updated:${string}`;
type DSSettingsPublishEventData<E extends DSInputElement> = {
    /** whether this is the initial settings call */
    'settings:init': boolean;
    /** the settings being updates/manipulated/passed, holds all settings including the previous value. i.e. updating selectorClass will publish { settings: { ...settings, selectorClass: 'newVal', 'selectorClass:pre': 'oldVal' } } this is a deep cloned copy so manipulating it will have no effect */
    settings: DSSettings<E>;
    /** the new settings that are passed, not available on the initial settings call */
    'settings:new'?: Settings<E>;
};
type DSSettingsPublish<E extends DSInputElement> = {
    [K in DSSettingsPublishEventNames]: DSSettingsPublishEventData<E>;
};
declare class SettingsStore<E extends DSInputElement> {
    private _settings;
    /**
     * Holds the settings and their previous value `:pre`
     * @example {
     *    autoScrollSpeed: 3,
     *    'autoScrollSpeed:pre': 5
     * }
     **/
    s: DSSettings<E>;
    private PS;
    /**
     * @class ScrollStore
     * @constructor ScrollStore
     * @param {{ DS:DragSelect, settings:Settings }} p
     * @ignore
     */
    constructor({ PS, settings }: {
        PS: PubSub<E>;
        settings: Settings<E>;
    });
    update: ({ settings, init }: {
        settings: Settings<E>;
        init?: boolean | undefined;
    }) => void;
    private _update;
}

type Vect2 = {
    x: number;
    y: number;
};
type Settings<E extends DSInputElement> = {
    /** area in which you can drag. If not provided it will be the whole document. Default Document */
    area?: HTMLElement | SVGElement | Document;
    /** [=[]] the elements that can be selected. */
    selectables?: E | E[];
    /** [=5] Speed in which the area scrolls while selecting (if available). Unit is pixel per movement. */
    autoScrollSpeed?: number;
    /** [={x:25,y:25}] Tolerance for autoScroll (how close one has to be near an edges for autoScroll to start). */
    overflowTolerance?: Vect2;
    /** [=1] Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom. */
    zoom?: number;
    /** [=false] if set to true, no styles (except for position absolute) will be applied by default */
    customStyles?: boolean;
    /** [=false] Add newly selected elements to the selection instead of replacing them */
    multiSelectMode?: boolean;
    /** [=true] Whether or not to toggle already active elements while multi-selecting */
    multiSelectToggling?: boolean;
    /** [=['Control', 'Shift', 'Meta']] Keys that allows switching to the multi-select mode (see the multiSelectMode option). Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). Note that the best support is given for <kbd>Control</kbd>, <kbd>Shift</kbd> and <kbd>Meta</kbd>. Provide an empty array `[]` if you want to turn off the functionality. */
    multiSelectKeys?: DSMultiSelectKeys;
    /** [=HTMLElement] the square that will draw the selection */
    selector?: HTMLElement;
    /** [=0] how much % of the element has to be selected to be considered selected (0 = just touching, 1 = inside the selection) */
    selectionThreshold?: number;
    /** [=true] When a user is dragging on an already selected element, the selection is dragged. */
    draggability?: boolean;
    /** [=true] Whether an element is draggable from the start or needs to be selected first */
    immediateDrag?: boolean;
    /** [=true] Whether or not the user can drag with the keyboard (we don't recommend disabling it) */
    keyboardDrag?: boolean;
    /** [={up:['ArrowUp'],down:['ArrowDown'],left:['ArrowLeft'],righ:['ArrowRight']}] The keys available to drag element using the keyboard. */
    dragKeys?: DSDragKeys;
    /** [=10] The speed at which elements are dragged using the keyboard. In pixels per keydown. */
    keyboardDragSpeed?: number;
    /** [=true] Whether to use hardware accelerated css transforms when dragging or top/left instead */
    useTransform?: boolean;
    /** [=80] Refresh rate on memoization, higher numbers mean better performance but more lag if elements are moving, lower numbers mean less lag but worse performance. If none of your DOMNodes are moving, you can set it to a very high number to increase performance. Value in milliseconds. */
    refreshMemoryRate?: number;
    /** [=[]] one or more drop-elements: where the selectables can be dropped into */
    dropZones?: DSInputDropZone<E>[];
    /** [=1] how much % of the item has to be inside the dropzone to be considered inside (0 = barely touching, 1 = completely inside) */
    dropInsideThreshold?: number;
    /** [=0] how much % of the zone does the pointer has to be in to be considered a target (0 = anywhere in the zone, max: 0.5 = has to point at the center of the zone) */
    dropTargetThreshold?: number;
    /** [=false] Whether to use Pointer Events to replace traditional Mouse or Touch Events. Useful for tools like Google Blockly. */
    usePointerEvents?: boolean;
    /** [=ds-hover] the class assigned to the mouse hovered items */
    hoverClass?: string;
    /** [=ds-selectable] the class assigned to the elements that can be selected */
    selectableClass?: string;
    /** [=ds-selected] the class assigned to the selected items */
    selectedClass?: string;
    /** [=ds-selector] the class assigned to the square selector helper */
    selectorClass?: string;
    /** [=ds-selector-area] the class assigned to the square in which the selector resides. By default it's invisible */
    selectorAreaClass?: string;
    /** [=ds-dropped-target] on an item corresponding the target dropzone. This is also the prefix for ds-dropped-target-${zone.id} */
    droppedTargetClass?: string;
    /** [=ds-dropped-inside] on an item that is within its dropzone bounds after a drop. This is also the prefix for ds-dropped-inside-${zone.id} */
    droppedInsideClass?: string;
    /** [=ds-droppable] on element that can be dropped into at least one container. This is also the prefix for ds-droppable-${zone.id} */
    droppableClass?: string;
    /** [=ds-dropzone] on each dropZone */
    dropZoneClass?: string;
    /** [=ds-dropzone-ready] on corresponding dropZone when element is dragged */
    dropZoneReadyClass?: string;
    /** [=ds-dropzone-target] on dropZone that has elements from any successful target drop */
    dropZoneTargetClass?: string;
    /** [=ds-dropzone-inside] on dropZone that has elements inside after any drop */
    dropZoneInsideClass?: string;
};
type DSCallbackObject<E extends DSInputElement> = Readonly<Partial<DSSettingsPublishEventData<E> & DSAreaPublishEventData<E> & DSKeyStorePublishEventData & DSPointerStorePublishEventData & DSInteractionPublishEventData & DSSelectablePublishEventData<E> & DSSelectedPublishEventData<E> & DSPublicPublishAdditionalEventData<E>>>;
type DSInputDropZone<E extends DSInputElement> = {
    /** can be any unique identifier of type string */
    id: string;
    /** the dropzone itself */
    element: E;
    /** elements that can be dropped into that zone. This is optional, by default it will be all selectables */
    droppables?: E[];
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
type DSEdgesObj = {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
/** area within which you can drag */
type DSArea = HTMLElement | SVGElement | Document;
/** area in which you can drag */
type DSSelectorArea = HTMLElement;
/** elements that can be selected */
type DSInputElement = HTMLElement | SVGElement;
/** element that can be selected */
/** An array of keys that allows switching to the multi-select mode */
type DSMultiSelectKeys = Array<'Shift' | 'Control' | 'Meta' | string>;
type DSEvent = KeyboardEvent | MouseEvent | PointerEvent | TouchEvent;
type DSInternalEventName = DSSettingsPublishEventNames | DSAreaPublishEventNames | DSKeyStorePublishEventNames | DSPointerStorePublishEventNames | DSInteractionPublishEventNames | DSSelectablePublishEventNames | DSSelectedPublishEventNames;
type DSBoundingRectBase = {
    top: number;
    left: number;
    bottom: number;
    right: number;
};
interface DSBoundingRect extends DSBoundingRectBase {
    width: number;
    height: number;
}
type DSDragKeys = {
    up: Array<string>;
    down: Array<string>;
    left: Array<string>;
    right: Array<string>;
};

type DSSelectedPublishEventNames = "Selected:added:pre" | "Selected:added" | "Selected:removed" | "Selected:removed:pre";
type DSSelectedPublishEventData<E extends DSInputElement> = {
    items: E[];
    item: E;
};
type DSSelectedPublish<E extends DSInputElement> = {
    [K in DSSelectedPublishEventNames]: DSSelectedPublishEventData<E>;
};
declare class SelectedSet<E extends DSInputElement> extends Set<E> {
    private _rects?;
    private _timeout?;
    private DS;
    private PS;
    private Settings;
    constructor({ DS, PS }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
    });
    add(element?: E): this;
    delete(element: E): boolean;
    clear: () => void;
    /** Adds/Removes an element. If it is already selected = remove, if not = add. */
    toggle(element: E): E;
    addAll: (elements: E[]) => void;
    deleteAll: (elements: E[]) => void;
    get elements(): E[];
    get rects(): Map<E, DSBoundingRect>;
}

type DSPublishMappings<E extends DSInputElement> = DSSettingsPublish<E> & DSAreaPublish<E> & DSKeyStorePublish & DSPointerStorePublish & DSInteractionPublish & DSSelectablePublish<E> & DSSelectedPublish<E> & DSPublicPublish<E>;
type DSCallback<T> = (data: T) => any;
declare class PubSub<E extends DSInputElement> {
    subscribers: {
        [K in keyof DSPublishMappings<E>]?: DSCallback<DSPublishMappings<E>[K]>[];
    };
    DS: DragSelect<E>;
    constructor({ DS }: {
        DS: DragSelect<E>;
    });
    /**
     * Subscribe to an event
     * @returns event id, can be used to unsubscribe more efficiently
     */
    subscribe: <K extends DSSettingsPublishEventNames | DSKeyStorePublishEventNames | DSPointerStorePublishEventNames | DSSelectedPublishEventNames | keyof DSAreaPublish<E> | keyof DSInteractionPublish | keyof DSSelectablePublish<E> | keyof DSPublicPublish<E>>(eventName: K, callback: DSCallback<DSPublishMappings<E>[K]>) => number;
    /**
     * Removes event subscription
     * @param callback the callback method signature, has to be exactly the same as when subscribing. Consider using "id" instead.
     * @param id event id returned when subscribed (more performant than callback search)
     */
    unsubscribe: <K extends DSSettingsPublishEventNames | DSKeyStorePublishEventNames | DSPointerStorePublishEventNames | DSSelectedPublishEventNames | keyof DSAreaPublish<E> | keyof DSInteractionPublish | keyof DSSelectablePublish<E> | keyof DSPublicPublish<E>>(eventName: K, callback?: DSCallback<DSPublishMappings<E>[K]> | null | undefined, id?: number) => void;
    /**
     * Publishes an event to all subscribers
     * @param eventName
     * @param data passed to the subscription method
     */
    publish: <K extends DSSettingsPublishEventNames | DSKeyStorePublishEventNames | DSPointerStorePublishEventNames | DSSelectedPublishEventNames | keyof DSAreaPublish<E> | keyof DSInteractionPublish | keyof DSSelectablePublish<E> | keyof DSPublicPublish<E>>(eventName: K | K[], data: DSPublishMappings<E>[K]) => void;
    private _publish;
    private _handlePublish;
    _handlePrePublish: <K extends DSSettingsPublishEventNames | DSKeyStorePublishEventNames | DSPointerStorePublishEventNames | DSSelectedPublishEventNames | keyof DSAreaPublish<E> | keyof DSInteractionPublish | keyof DSSelectablePublish<E> | keyof DSPublicPublish<E>>(subscribers: DSCallback<DSPublishMappings<E>[K]>[], data: DSPublishMappings<E>[K]) => void;
}

type MutationCallbackEvent = UIEvent | Event | MutationRecord[] | ResizeObserverEntry[];

type DSAreaPublishEventNames = 'Area:modified:pre' | 'Area:modified' | 'Area:scroll' | 'Area:scroll:pre';
type DSAreaPublishEventData<E extends DSInputElement> = {
    /** The single item currently interacted with */
    item: DSArea;
    /** The respective event object */
    event?: MutationCallbackEvent;
    scroll_directions: DSEdges;
    scroll_multiplier: number;
};
type DSAreaPublish<E extends DSInputElement> = {
    'Area:modified:pre': Pick<DSAreaPublishEventData<E>, 'event' | 'item'>;
    'Area:modified': Pick<DSAreaPublishEventData<E>, 'event' | 'item'>;
    'Area:scroll:pre': Pick<DSAreaPublishEventData<E>, 'scroll_directions' | 'scroll_multiplier'>;
    'Area:scroll': Pick<DSAreaPublishEventData<E>, 'scroll_directions' | 'scroll_multiplier'>;
};
declare class Area<E extends DSInputElement> {
    private DS;
    private PS;
    private Settings;
    private _observers?;
    private _node;
    private _parentNodes?;
    private _computedStyle?;
    private _computedBorder?;
    private _rect?;
    constructor({ DS, PS }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
    });
    private setArea;
    private init;
    private reset;
    stop: () => void;
    /** Scroll the area in the specified direction */
    scroll: (directions: DSEdges, multiplier: number) => void;
    get HTMLNode(): DSArea;
    /** The computed border from the element (caches result) */
    get computedBorder(): DSEdgesObj;
    /** The computed styles from the element (caches result) */
    private get computedStyle();
    /** The element rect (caches result) (without scrollbar or borders) */
    get rect(): DSBoundingRect;
    private get parentNodes();
}

declare class DropZones<E extends DSInputElement> {
    /** Get the drop zone by the zone element */
    private _zoneByElement;
    /** Get the drop zone by the zone id */
    private _zoneById;
    /** Get the drop zones by one zone item */
    private _zonesByDroppable;
    /** Get the drop zones by one zone item */
    private _zones?;
    private DS;
    private PS;
    private Settings;
    constructor({ DS, PS }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
    });
    private setDropZones;
    private _handleDrops;
    private _getZoneByElementsFromPoint;
    private stop;
    getItemsDroppedById: (zoneId: string) => void | E[];
    getItemsInsideById: (zoneId: string, addClasses?: boolean) => void | E[];
    private getKeyboardItemCenter;
    /** Returns first DropsZone under current pointer or coordinates if passed */
    getTarget: ({ coordinates, isDraggingKeyboard, event, }: {
        coordinates?: Vect2 | undefined;
        isDraggingKeyboard?: boolean | undefined;
        event?: InteractionEvent | KeyboardEvent | undefined;
    }) => DropZone<E> | undefined;
}

declare class ScrollStore<E extends DSInputElement> {
    private _initialVal;
    private _currentVal;
    private _canScroll?;
    private DS;
    private PS;
    private Settings;
    constructor({ DS, PS }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
    });
    private init;
    private addListeners;
    private removeListeners;
    private start;
    private update;
    stop: () => void;
    private reset;
    get canScroll(): boolean;
    get scrollAmount(): {
        x: number;
        y: number;
    };
    private get initialVal();
    get currentVal(): Vect2;
}

declare class Selector<E extends DSInputElement> {
    private _rect?;
    private DS;
    private PS;
    private Settings;
    HTMLNode: HTMLElement;
    constructor({ DS, PS }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
    });
    private attachSelector;
    private start;
    stop: () => void;
    /** Moves the selection to the correct place */
    private update;
    get rect(): DSBoundingRect | DOMRect;
}

declare class Selection<E extends DSInputElement> {
    private _prevSelectedSet;
    private _boundingRect?;
    private _timeout?;
    private DS;
    private PS;
    private Settings;
    constructor({ DS, PS }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
    });
    /** Stores the previous selection (solves #9) */
    private _storePrevious;
    private start;
    private update;
    /** Checks if any selectable element is inside selection. */
    private _handleInsideSelection;
    get boundingRect(): DSBoundingRect;
    /**
     * Can be overridden to apply further filtering logic after the items to select are identified but before they actually get selected
     * Is expected to return the select / unselect maps in the same shape as passed in
     */
    filterSelected: ({ select, unselect, selectorRect, }: {
        select: Map<E, DSBoundingRect>;
        unselect: Map<E, DSBoundingRect>;
        selectorRect: DSBoundingRect;
    }) => {
        select: Map<E, DSBoundingRect>;
        unselect: Map<E, DSBoundingRect>;
    };
}

declare class SelectorArea<E extends DSInputElement> {
    private _scrollInterval?;
    private _rect?;
    private currentEdges;
    private DS;
    private PS;
    private Settings;
    HTMLNode: HTMLElement;
    constructor({ DS, PS }: {
        DS: DragSelect<E>;
        PS: PubSub<E>;
    });
    private init;
    /** Adding / Removing elements to document */
    private applyElements;
    /** Updates the selectorAreas positions to match the areas */
    private updatePos;
    stop: (remove: boolean) => void;
    private startAutoScroll;
    /** Creates an interval that auto-scrolls while the cursor is near the edge */
    private handleAutoScroll;
    private stopAutoScroll;
    /**
     * Checks if the element is either inside the Selector Area (as a reachable child or touching the area)
     * @param elementRect - slight performance improvements when passed
     */
    isInside: (element: E, elementRect?: DSBoundingRect) => boolean;
    /** checks if the click was triggered on the area. */
    isClicked(event?: DSEvent): boolean;
    get rect(): DSBoundingRect | DOMRect;
}

type IsCollision = {
    /**
     * Axis-Aligned Bounding Box Collision Detection.
     * Imagine following Example:
     *
     *
     *        b01
     *     a01[1]a02
     *        b02      b11
     *              a11[2]a12
     *                 b12
     *
     *
     * to check if those two boxes collide we do this AABB calculation:
     * 1. a01 < a12 (left border pos box1 smaller than right border pos box2)
     * 2. a02 > a11 (right border pos box1 larger than left border pos box2)
     * 3. b01 < b12 (top border pos box1 smaller than bottom border pos box2)
     * 4. b02 > b11 (bottom border pos box1 larger than top border pos box2)
     * {@link https://en.wikipedia.org/wiki/Minimum_bounding_box#Axis-aligned_minimum_bounding_box Wikipedia}
     * {@link https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection MDN}
  
     * @param percent
     *  1 = the element has to be completely inside the other element
     *  0.8 = the element has to be 80% inside the other element
     *  0.5 = the element has to be 50% inside the other element
     *  0.2 = the element has to be 20% inside the other element
     *  0 = the element only has to touch the other element
     */
    (el1?: DSBoundingRectBase, el2?: DSBoundingRectBase, percent?: number): boolean;
};

declare class DragSelect<E extends DSInputElement = DSInputElement> {
    /** used to skip all current Selection and dragNdrop functionality */
    continue: boolean;
    private PubSub;
    stores: {
        SettingsStore: SettingsStore<E>;
        PointerStore: PointerStore<E>;
        ScrollStore: ScrollStore<E>;
        KeyStore: KeyStore<E>;
    };
    Area: Area<E>;
    Selector: Selector<E>;
    SelectorArea: SelectorArea<E>;
    SelectableSet: SelectableSet<E>;
    SelectedSet: SelectedSet<E>;
    Selection: Selection<E>;
    private Drag;
    DropZones: DropZones<E>;
    Interaction: Interaction<E>;
    stopped: boolean;
    constructor(settings: Settings<E>);
    static isCollision: IsCollision;
    /** Subscribe to events */
    subscribe: <T extends keyof DSPublicPublish<E>>(eventName: T, callback: DSCallback<DSPublishMappings<E>[T]>) => void;
    /** Un-Subscribe from events */
    unsubscribe: <T extends keyof DSPublicPublish<E>>(eventName: T, callback?: DSCallback<DSPublishMappings<E>[T]> | undefined, id?: number) => void;
    /** Publish events */
    publish: <T extends keyof DSPublicPublish<E> | DSInternalEventName>(eventName: T | T[], data: DSPublishMappings<E>[T]) => void;
    /** Initializes the functionality. Automatically triggered when created. Also, reset the functionality after a teardown */
    start: () => void;
    /**
     * Complete function teardown
     * Will teardown/stop the whole functionality
     * @param remove if elements should be removed.
     * @param fromSelection if elements should also be added/removed to the selection.
     * @param withCallback if elements should also be added/removed to the selection.
     */
    stop(remove?: boolean, fromSelection?: boolean, withCallback?: boolean): void;
    /**
     * Utility to override DragSelect internal functionality:
     * Break will skip the selection or dragging functionality (until after the callback) but let everything continue to run.
     * Useful utility to write your own functionality/move/dragNdrop based on DragSelect pointer positions.
     */
    break: () => boolean;
    /** Update any setting dynamically */
    setSettings: (settings: Settings<E>) => void;
    /** Returns the current selected nodes */
    getSelection: () => E[];
    /**
     * Adds several elements to the selection list also adds the specific classes and take into account all calculations.
     * Does not clear the selection, in contrary to .setSelection. Can add multiple elements at once
     * @param elements one or multiple elements
     * @param triggerCallback if callback should be called
     * @param dontAddToSelectables if element should not be added to the list of selectable elements
     * @return all selected elements
     */
    addSelection(elements: E | E[], triggerCallback?: boolean, dontAddToSelectables?: boolean): E[];
    /**
     * Removes specific elements from the selection
     * Multiple elements can be given at once, in contrary to unselect
     * @param elements one or multiple elements
     * @param triggerCallback if callback should be called
     * @param removeFromSelectables if element should be removed from the list of selectable elements
     * @return all selected elements
     */
    removeSelection(elements: E | E[], triggerCallback?: boolean, removeFromSelectables?: boolean): E[];
    /**
     * Toggles specific elements from the selection:
     * If element is not in selection it will be added, if it is already selected, it will be removed.
     * Multiple elements can be given at once.
     * @param elements one or multiple elements
     * @param triggerCallback if callback should be called
     * @param removeFromSelectables if element should not be added/removed to the list of selectable elements accordingly
     * @return all selected elements
     */
    toggleSelection(elements: E | E[], triggerCallback?: boolean, removeFromSelectables?: boolean): E[];
    /**
     * Sets the current selected elements and optionally run the callback
     * By default, adds new elements also to the list of selectables
     * @param elements dom elements
     * @param triggerCallback if callback should be called
     * @param dontAddToSelectables if element should not be added to the list of selectable elements
     */
    setSelection(elements: E | E[], triggerCallback?: boolean, dontAddToSelectables?: boolean): E[];
    /**
     * Unselect / Deselect all current selected Nodes
     * @param triggerCallback if callback should be called
     * @return this.selected, should be empty
     */
    clearSelection(triggerCallback?: boolean): E[];
    /**
     * Add elements that can be selected. No node is added twice
     * @param elements dom element(s)
     * @param addToSelection if elements should also be added to current selection
     * @param triggerCallback if callback should be called
     * @return the added element(s)
     */
    addSelectables(elements: E | E[], addToSelection?: boolean, triggerCallback?: boolean): E[];
    /** Gets all nodes that can potentially be selected */
    getSelectables: () => E[];
    /**
     * Remove elements from the elements that can be selected.
     * @param elements dom element(s)
     * @param removeFromSelection if elements should also be removed from current selection
     * @param triggerCallback if callback should be called
     * @return the removed element(s)
     */
    removeSelectables(elements: E | E[], removeFromSelection?: boolean, triggerCallback?: boolean): E[];
    /** The starting/initial position of the cursor/selector */
    getInitialCursorPosition: () => Vect2;
    /** The last seen position of the cursor/selector */
    getCurrentCursorPosition: () => Vect2;
    /** The previous position of the cursor/selector */
    getPreviousCursorPosition: () => Vect2;
    /** The starting/initial position of the cursor/selector */
    getInitialCursorPositionArea: () => Vect2;
    /** The last seen position of the cursor/selector */
    getCurrentCursorPositionArea: () => Vect2;
    /** The previous position of the cursor/selector */
    getPreviousCursorPositionArea: () => Vect2;
    /** Whether the multi-selection key was pressed */
    isMultiSelect: (event: MouseEvent | TouchEvent | PointerEvent | KeyboardEvent) => boolean;
    /** Whether the user is currently drag n dropping elements (instead of selection) */
    isDragging: () => boolean;
    /** Returns first DropsZone under coordinates, if no coordinated provided current pointer coordinates are used */
    getZoneByCoordinates: (coordinates?: Vect2) => DSDropZone<E> | undefined;
    /** Returns itemsDropped into zone by zone id */
    getItemsDroppedByZoneId: (zoneId: string) => void | E[];
    /**
     * Returns itemsInside by zone id
     * @param addClasses whether or not to add/remove the "inside" classes to the items
     */
    getItemsInsideByZoneId: (zoneId: string, addClasses?: boolean) => void | E[];
}

type DSPubCallback<T extends keyof DSPublicPublish<E>, E extends DSInputElement = DSInputElement> = DSCallback<DSPublishMappings<E>[T]>;

export { type DSArea, type DSBoundingRect, type DSBoundingRectBase, type DSCallbackObject, type DSDragKeys, type DSEdges, type DSEdgesObj, type DSElementPos, type DSEvent, type DSInputDropZone, type DSInputElement, type DSInternalEventName, type DSMultiSelectKeys, type DSPubCallback, type DSSelectorArea, type Settings, type Vect2, DragSelect as default };
