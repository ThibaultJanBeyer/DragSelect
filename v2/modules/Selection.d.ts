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
    /**
     * Can be overridden to apply further filtering logic after the items to select are identified but before they actually get selected
     * Is expected to return the select / unselect maps in the same shape as passed in
     * @param {{select:Map<DSElement,DSBoundingRect>, unselect:Map<DSElement,DSBoundingRect>, selectorRect:DSBoundingRect}} obj
     * @returns {{select:Map<DSElement,DSBoundingRect>, unselect:Map<DSElement,DSBoundingRect>}}
     */
    filterSelected: ({ select, unselect, selectorRect }: {
        select: Map<DSElement, DSBoundingRect>;
        unselect: Map<DSElement, DSBoundingRect>;
        selectorRect: DSBoundingRect;
    }) => {
        select: Map<DSElement, DSBoundingRect>;
        unselect: Map<DSElement, DSBoundingRect>;
    };
}
import DragSelect from "../DragSelect";
import "../types"
