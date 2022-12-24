export default class Selection {
    /**
     * @constructor Selection
     * @param {{ DS:DragSelect }} p
     * @ignore
     */
    constructor({ DS }: {
        DS: DragSelect;
    });
    /**
     * @type {Set}
     * @private
     * */
    private _prevSelectedSet;
    DS: DragSelect;
    Settings: Settings;
    /**
     * Stores the previous selection (solves #9)
     * @param {DSEvent} event
     * @private
     * */
    private _storePrevious;
    /** @param {{event:DSEvent,isDragging:boolean}} event */
    start: ({ event, isDragging }: {
        event: DSEvent;
        isDragging: boolean;
    }) => void;
    update: ({ isDragging }: {
        isDragging: any;
    }) => void;
    /**
     * Checks if any selectable element is inside selection.
     * @param {boolean} [force]
     * @param {DSEvent} [event]
     * @private
     */
    private _handleInsideSelection;
}
import DragSelect from "../DragSelect";
import "../types"
