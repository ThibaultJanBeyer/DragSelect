export default class Area {
    /**
     * @constructor Area
     * @param {{DS:DragSelect}} p
     * @ignore
     */
    constructor({ DS }: {
        DS: DragSelect;
    });
    /**
     * @type {DragSelect}
     * @private
     */
    private DS;
    /**
     * @type {{cleanup:() => void}}
     * @private
     */
    private _observers;
    /**
     * @type {DSArea}
     * @private
     */
    private _node;
    /**
     * @type {DSArea[]}
     * @private
     */
    private _parentNodes;
    /**
     * @type {CSSStyleDeclaration}
     * @private
     * */
    private _computedStyle;
    /**
     * @type {{top:number,bottom:number,left:number,right:number}}
     * @private
     * */
    private _computedBorder;
    /**
     * @type {DSBoundingRect}
     * @private
     * */
    private _rect;
    /** @param {DSArea} area */
    setArea: (area: DSArea) => void;
    start: () => void;
    reset: () => void;
    stop: () => void;
    /**
     * Scroll the area in the specified direction
     * @param {Array.<'top'|'bottom'|'left'|'right'|undefined>} directions
     * @param {number} multiplier
     */
    scroll: (directions: Array<'top' | 'bottom' | 'left' | 'right' | undefined>, multiplier: number) => void;
    get HTMLNode(): DSArea;
    /**
     * The computed border from the element (caches result)
     * @type {{top:number,bottom:number,left:number,right:number}}
     */
    get computedBorder(): {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    /**
     * The computed styles from the element (caches result)
     * @type {CSSStyleDeclaration}
     */
    get computedStyle(): CSSStyleDeclaration;
    /**
     * The element rect (caches result) (without scrollbar or borders)
     * @type {DSBoundingRect}
     */
    get rect(): DSBoundingRect;
    get parentNodes(): DSArea[];
}
import DragSelect from "../DragSelect";
import "../types"
