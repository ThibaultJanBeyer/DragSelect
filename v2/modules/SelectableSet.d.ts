export default class SelectableSet extends Set<any> {
    /**
     * @constructor SelectableSet
     * @param {{DS:DragSelect}} obj
     * @ignore
     */
    constructor({ DS }: {
        DS: DragSelect;
    });
    /**
     * @type {Map<DSElement,DSBoundingRect>}
     * @private
     */
    private _rects;
    /**
     * @type {NodeJS.Timeout}
     * @private
     */
    private _timeout;
    DS: DragSelect;
    Settings: Settings;
    init: () => void;
    /**
     * @param {DSElement} element
     * @return {this}
     * */
    add(element: DSElement): this;
    /** @param {DSElement} element */
    delete(element: DSElement): boolean;
    _onClick: (event: any) => void;
    _onPointer: (event: any) => void;
    /** @param {DSElements} elements */
    addAll: (elements: DSElements) => void;
    /** @param {DSElements} elements */
    deleteAll: (elements: DSElements) => void;
    /** @param {DSElement} element */
    getRect: (element: DSElement) => DSBoundingRect | DOMRect;
    /** @return {DSElements} */
    get elements(): DSElements;
    get rects(): Map<DSElement, DSBoundingRect>;
}
import DragSelect from "../DragSelect";
import "../types"
