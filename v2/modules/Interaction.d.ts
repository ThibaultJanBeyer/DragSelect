export default class Interaction {
    /**
     * @constructor Interaction
     * @param {{DS:DragSelect}} obj
     * @ignore
     */
    constructor({ DS }: {
        DS: DragSelect;
    });
    /** @type {boolean} */
    isInteracting: boolean;
    /** @type {boolean} */
    isDragging: boolean;
    DS: DragSelect;
    Settings: Settings;
    init: () => void;
    _init: () => void;
    /**
     * @param {DSEvent} event
     */
    _canInteract(event: DSEvent): boolean;
    /**
     * @param {DSEvent} event
     */
    start: (event: DSEvent) => void;
    _start: (event: any) => void;
    /**
     * Drag interaction
     * @param {DSEvent} event
     * @returns {boolean}
     */
    isDragEvent: (event: DSEvent) => boolean;
    /**
     * Triggers when a node is actively selected: <button> nodes that are pressed via the keyboard.
     * Making DragSelect accessible for everyone!
     * @param {{ event:MouseEvent }} prop
     */
    onClick: ({ event }: {
        event: MouseEvent;
    }) => void;
    stop: (area?: DSArea) => void;
    update: ({ event, scroll_directions, scroll_multiplier }: {
        event: any;
        scroll_directions: any;
        scroll_multiplier: any;
    }) => void;
    reset: (event: any) => void;
    _reset: (event: any) => void;
}
import DragSelect from "../DragSelect";
import "../types"
