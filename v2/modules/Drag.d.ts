export default class Drag {
    /**
     * @constructor Drag
     * @param {{DS:DragSelect}} obj
     * @ignore
     */
    constructor({ DS }: {
        DS: DragSelect;
    });
    /**
     * @type {Vect2}
     * @private
     */
    private _prevCursorPos;
    /**
     * @type {Vect2}
     * @private
     */
    private _prevScrollPos;
    /**
     * @type {DSElements}
     * @private
     */
    private _elements;
    /**
     * @type {DSDragKeys}
     * @private
     */
    private _dragKeys;
    /**
     * @type {string[]}
     * @private
     */
    private _dragKeysFlat;
    /**
     * @type {DSBoundingRect}
     * @private
     */
    private _selectionRect;
    DS: DragSelect;
    assignDragkeys: () => void;
    keyboardDrag: ({ event, key }: {
        event: any;
        key: any;
    }) => void;
    keyboardEnd: ({ event, key }: {
        event: any;
        key: any;
    }) => void;
    start: ({ isDragging, isDraggingKeyboard }: {
        isDragging: any;
        isDraggingKeyboard: any;
    }) => void;
    stop: (evt: any) => void;
    update: ({ isDragging, isDraggingKeyboard }: {
        isDragging: any;
        isDraggingKeyboard: any;
    }) => void;
    /**
     * Modify direction value so that the rect of draggable elements
     * does not exceed the boundaries of container rect
     * @param {Vect2} direction
     * @return {Vect2}
     */
    limitDirection: (direction: Vect2) => Vect2;
    handleZIndex: (add: any) => void;
    get _cursorDiff(): Vect2;
    get _scrollDiff(): Vect2;
}
import DragSelect from "../DragSelect";
import "../types"
