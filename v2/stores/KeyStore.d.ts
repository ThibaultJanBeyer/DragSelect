export default class KeyStore {
    /**
     * @class KeyStore
     * @constructor KeyStore
     * @param {{DS:DragSelect}} p
     * @ignore
     */
    constructor({ DS }: {
        DS: DragSelect;
    });
    /**
     * @type {Set<string>}
     * @private
     * */
    private _currentValues;
    /**
     * @type {{control:string,shift:string,meta:string}}
     * @private
     * */
    private _keyMapping;
    DS: DragSelect;
    init: () => void;
    /** @param {KeyboardEvent} event */
    keydown: (event: KeyboardEvent) => void;
    /** @param {KeyboardEvent} event */
    keyup: (event: KeyboardEvent) => void;
    stop: () => void;
    reset: () => void;
    /** @param {KeyboardEvent|MouseEvent|PointerEvent|TouchEvent} [event] */
    isMultiSelectKeyPressed(event?: KeyboardEvent | MouseEvent | PointerEvent | TouchEvent): boolean;
    get currentValues(): string[];
}
import DragSelect from "../DragSelect";
import "../types"
