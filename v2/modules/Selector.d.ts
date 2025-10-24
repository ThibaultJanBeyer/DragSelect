export default class Selector {
    /**
     * @constructor Selector
     * @param {{ DS:DragSelect }} p
     * @ignore
     */
    constructor({ DS }: {
        DS: DragSelect;
    });
    /**
     * @type {DSBoundingRect}
     * @private
     */
    private _rect;
    DS: DragSelect;
    attachSelector: () => void;
    HTMLNode: HTMLElement;
    start: ({ isDragging }: {
        isDragging: any;
    }) => void;
    stop: () => void;
    /** Moves the selection to the correct place */
    update: ({ isDragging }: {
        isDragging: any;
    }) => void;
    get rect(): DSBoundingRect | DOMRect;
}
import DragSelect from "../DragSelect";
import "../types"
