export default class PointerStore {
    /**
     * @class PointerStore
     * @constructor PointerStore
     * @param {{DS:DragSelect}} p
     * @ignore
     */
    constructor({ DS }: {
        DS: DragSelect;
    });
    /** @type {boolean} */
    _isMouseInteraction: boolean;
    /**
     * @type {Vect2}
     * @private
     * */
    private _initialValArea;
    /**
     * @type {Vect2}
     * @private
     * */
    private _currentValArea;
    /**
     * @type {Vect2}
     * @private
     * */
    private _lastValArea;
    /**
     * @type {Vect2}
     * @private
     * */
    private _initialVal;
    /**
     * @type {Vect2}
     * @private
     * */
    private _currentVal;
    /**
     * @type {Vect2}
     * @private
     * */
    private _lastVal;
    /**
     * @type {TouchEvent}
     * @private
     * */
    private _lastTouch;
    DS: DragSelect;
    Settings: Settings;
    init: () => void;
    /** @param {DSEvent} [event] */
    start(event?: DSEvent): void;
    set currentVal(arg: Vect2);
    /** Current pointer position */
    get currentVal(): Vect2;
    set initialVal(arg: Vect2);
    /** First recorded pointer position */
    get initialVal(): Vect2;
    /** @param {DSEvent} event */
    getPointerPosition: (event: DSEvent) => Vect2;
    /** @param {DSEvent} [event] */
    update: (event?: DSEvent) => void;
    stop: () => void;
    /** @param {DSEvent} [event] */
    reset: (event?: DSEvent) => void;
    set lastVal(arg: Vect2);
    /** Last recorded pointer position */
    get lastVal(): Vect2;
    /**
     * @param {DSEvent} event
     * @return {MouseEvent|PointerEvent|Touch}
     * @private
     */
    private _normalizedEvent;
    /** First recorded pointer position within the area */
    get initialValArea(): Vect2;
    /** Current pointer position within the area */
    get currentValArea(): Vect2;
    /** Last recorded pointer position within the area */
    get lastValArea(): Vect2;
}
import DragSelect from "../DragSelect";
import "../types"
