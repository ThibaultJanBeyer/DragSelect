export default DragSelect;
declare class DragSelect {
    /**
     * @class DragSelect
     * @constructor DragSelect
     * @param {Settings} settings
     */
    constructor(settings: Settings);
    /**
     * used to skip all current Selection and dragNdrop functionality
     * @type {boolean}
     */
    continue: boolean;
    PubSub: PubSub;
    subscribe: (eventName: DSCallbackNames, callback: Function) => number;
    unsubscribe: (eventName: DSCallbackNames, callback?: Function, id?: number) => void;
    publish: (eventName: DSCallbackNames | DSCallbackNames[], data: CallbackObject) => void;
    stores: {
        SettingsStore: SettingsStore;
        PointerStore: PointerStore;
        ScrollStore: ScrollStore;
        KeyStore: KeyStore;
    };
    Area: Area;
    Selector: Selector;
    SelectorArea: SelectorArea;
    SelectableSet: SelectableSet;
    SelectedSet: SelectedSet;
    Selection: Selection;
    Drag: Drag;
    DropZones: DropZones;
    Interaction: Interaction;
    /**
     * Initializes the functionality. Automatically triggered when created.
     * Also, reset the functionality after a teardown
     */
    start: () => void;
    stopped: boolean;
    /**
     * Complete function teardown
     * Will teardown/stop the whole functionality
     * @param {boolean} [remove] - if elements should be removed.
     * @param {boolean} [fromSelection] - if elements should also be added/removed to the selection.
     * @param {boolean} [withCallback] - if elements should also be added/removed to the selection.
     */
    stop(remove?: boolean, fromSelection?: boolean, withCallback?: boolean): void;
    /**
     * Utility to override DragSelect internal functionality:
     * Break will skip the selection or dragging functionality (until after the callback) but let everything continue to run.
     * Useful utility to write your own functionality/move/dragNdrop based on DragSelect pointer positions.
     */
    break: () => boolean;
    /**
     * Update any setting dynamically
     * @param {Settings} settings
     * @return {void}
     */
    setSettings: (settings: Settings) => void;
    /**
     * Returns the current selected nodes
     * @return {DSElements}
     */
    getSelection: () => DSElements;
    /**
     * Adds several elements to the selection list also adds the specific classes and take into account all calculations.
     * Does not clear the selection, in contrary to .setSelection. Can add multiple elements at once
     * @param {DSInputElements} elements one or multiple elements
     * @param {boolean} [triggerCallback] - if callback should be called
     * @param {boolean} [dontAddToSelectables] - if element should not be added to the list of selectable elements
     * @return {DSElements} all selected elements
     */
    addSelection(elements: DSInputElements, triggerCallback?: boolean, dontAddToSelectables?: boolean): DSElements;
    /**
     * Removes specific elements from the selection
     * Multiple elements can be given at once, in contrary to unselect
     * @param {DSInputElements} elements one or multiple elements
     * @param {boolean} [triggerCallback] - if callback should be called
     * @param {boolean} [removeFromSelectables] - if element should be removed from the list of selectable elements
     * @return {DSElements} all selected elements
     */
    removeSelection(elements: DSInputElements, triggerCallback?: boolean, removeFromSelectables?: boolean): DSElements;
    /**
     * Toggles specific elements from the selection:
     * If element is not in selection it will be added, if it is already selected, it will be removed.
     * Multiple elements can be given at once.
     * @param {DSInputElements} elements one or multiple elements
     * @param {boolean} [triggerCallback] - if callback should be called
     * @param {boolean} [removeFromSelectables] - if element should not be added/removed to the list of selectable elements accordingly
     * @return {DSElements} all selected elements
     */
    toggleSelection(elements: DSInputElements, triggerCallback?: boolean, removeFromSelectables?: boolean): DSElements;
    /**
     * Sets the current selected elements and optionally run the callback
     * By default, adds new elements also to the list of selectables
     * @param {DSInputElements} elements – dom elements
     * @param {boolean} [triggerCallback] - if callback should be called
     * @param {boolean} [dontAddToSelectables] - if element should not be added to the list of selectable elements
     * @return {DSElements}
     */
    setSelection(elements: DSInputElements, triggerCallback?: boolean, dontAddToSelectables?: boolean): DSElements;
    /**
     * Unselect / Deselect all current selected Nodes
     * @param {boolean} [triggerCallback] - if callback should be called
     * @return {DSElements} this.selected, should be empty
     */
    clearSelection(triggerCallback?: boolean): DSElements;
    /**
     * Add elements that can be selected. No node is added twice
     * @param {DSInputElements} elements dom element(s)
     * @param {boolean} [addToSelection] if elements should also be added to current selection
     * @param {boolean} [triggerCallback] - if callback should be called
     * @return {DSInputElements} the added element(s)
     */
    addSelectables(elements: DSInputElements, addToSelection?: boolean, triggerCallback?: boolean): DSInputElements;
    /**
     * Gets all nodes that can potentially be selected
     * @return {DSElements} this.selectables
     */
    getSelectables: () => DSElements;
    /**
     * Sets all elements that can be selected.
     * Removes all current selectables (& their respective classes).
     * Adds the new set to the selectables set, thus replacing the original set.
     * @param {DSInputElements} elements – dom element(s)
     * @param {boolean} [removeFromSelection] if elements should also be removed from current selection
     * @param {boolean} [addToSelection] if elements should also be added to current selection
     * @return {DSInputElements} elements – the added element(s)
     */
    setSelectables(elements: DSInputElements, removeFromSelection?: boolean, addToSelection?: boolean): DSInputElements;
    /**
     * Remove elements from the elements that can be selected.
     * @param {DSInputElements} elements – dom element(s)
     * @param {boolean} [removeFromSelection] if elements should also be removed from current selection
     * @param {boolean} [triggerCallback] - if callback should be called
     * @return {DSInputElements} the removed element(s)
     */
    removeSelectables(elements: DSInputElements, removeFromSelection?: boolean, triggerCallback?: boolean): DSInputElements;
    /** The starting/initial position of the cursor/selector @return {Vect2} */
    getInitialCursorPosition: () => Vect2;
    /** The last seen position of the cursor/selector @return {Vect2} */
    getCurrentCursorPosition: () => Vect2;
    /** The previous position of the cursor/selector @return {Vect2} */
    getPreviousCursorPosition: () => Vect2;
    /** The starting/initial position of the cursor/selector @return {Vect2} */
    getInitialCursorPositionArea: () => Vect2;
    /** The last seen position of the cursor/selector @return {Vect2} */
    getCurrentCursorPositionArea: () => Vect2;
    /** The previous position of the cursor/selector @return {Vect2} */
    getPreviousCursorPositionArea: () => Vect2;
    /**
     * Whether the multi-selection key was pressed
     * @param {DSEvent|KeyboardEvent} [event]
     * @return {boolean}
     */
    isMultiSelect: (event?: DSEvent | KeyboardEvent) => boolean;
    /**
     * Whether the user is currently drag n dropping elements (instead of selection)
     * @return {boolean}
     */
    isDragging: () => boolean;
    /**
     * Returns first DropsZone under coordinates,
     * if no coordinated provided current pointer coordinates are used
     * @param {Vect2} [coordinates]
     * @returns {DSDropZone | undefined}
     */
    getZoneByCoordinates: (coordinates?: Vect2) => DSDropZone | undefined;
    /**
     * Returns itemsDropped into zone by zone id
     * @param {string} zoneId
     * @returns {DSElements|void}
     */
    getItemsDroppedByZoneId: (zoneId: string) => DSElements | void;
    /**
     * Returns itemsInside by zone id
     * @param {string} zoneId
     * @param {boolean} addClasses whether or not to add/remove the "inside" classes to the items
     * @returns {DSElements|void}
     */
    getItemsInsideByZoneId: (zoneId: string, addClasses: boolean) => DSElements | void;
}
declare namespace DragSelect {
    export { isCollision };
}
import { PubSub } from "./modules";
import { SettingsStore } from "./stores";
import { PointerStore } from "./stores";
import { ScrollStore } from "./stores";
import { KeyStore } from "./stores";
import { Area } from "./modules";
import { Selector } from "./modules";
import { SelectorArea } from "./modules";
import { SelectableSet } from "./modules";
import { SelectedSet } from "./modules";
import { Selection } from "./modules";
import { Drag } from "./modules";
import { DropZones } from "./modules";
import { Interaction } from "./modules";
import { isCollision } from "./methods";
import "./types"
