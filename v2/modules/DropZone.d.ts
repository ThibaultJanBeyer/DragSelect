export default class DropZone {
    /**
     * @constructor Drag
     * @param {Object} obj
     * @param {DragSelect} obj.DS
     * @param {string} obj.id
     * @param {DSElement} obj.element
     * @param {DSInputElements} [obj.droppables]
     * @ignore
     */
    constructor({ DS, id, element, droppables }: {
        DS: DragSelect;
        id: string;
        element: DSElement;
        droppables?: DSInputElements;
    });
    /**
     * @type {string}
     */
    id: string;
    /**
     * @type {DSElement}
     */
    element: DSElement;
    /**
     * @type {DSElements}
     */
    _droppables: DSElements;
    /**
     * @type {DOMRect}
     * @private
     */
    private _rect;
    /**
     * @type {{cleanup:()=>void}}
     * @private
     */
    private _observers;
    /**
     * @type {NodeJS.Timeout}
     * @private
     */
    private _timeout;
    /**
     * @type {DSElements}
     * @private
     */
    private _itemsDropped;
    /**
     * @type {DSElements}
     * @private
     */
    private _itemsInside;
    DS: DragSelect;
    Settings: Settings;
    set droppables(arg: DSElements);
    get droppables(): DSElements;
    /**
     * @param {'add'|'remove'} action
     */
    setReadyClasses: (action: 'add' | 'remove') => void;
    /**
     * This zone is NOT the target of a drop
     */
    handleNoDrop: () => void;
    /**
     * This zone IS the target of a drop
     */
    handleDrop: () => void;
    handleItemsInsideClasses: () => void;
    start: ({ isDragging }: {
        isDragging: any;
    }) => void;
    stop: ({ isDragging }: {
        isDragging: any;
    }) => void;
    destroy(): void;
    isDestroyed: boolean;
    /**
     * @returns {DSDropZone}
     */
    toObject: () => DSDropZone;
    get rect(): DOMRect;
    get itemsDropped(): DSElements;
    get itemsInside(): DSElements;
    get parentNodes(): DSElements;
    _parentNodes: DSElements;
}
import DragSelect from "../DragSelect";
import "../types"
