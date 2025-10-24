export default class DropZones {
    /**
     * @constructor Drag
     * @param {{DS:DragSelect}} obj
     * @ignore
     */
    constructor({ DS }: {
        DS: DragSelect;
    });
    /**
     * Get the drop zone by the zone element
     * @type {Map<DSElement, DropZone>}
     * @private
     */
    private _zoneByElement;
    /**
     * Get the drop zone by the zone id
     * @type {Map<string, DropZone>}
     * @private
     */
    private _zoneById;
    /**
     * Get the drop zones by one zone item
     * @type {Map<DSElement,DropZone[]>}
     * @private
     */
    private _zonesByDroppable;
    /**
     * Get the drop zones by one zone item
     * @type {DropZone[]}
     * @private
     */
    private _zones;
    DS: DragSelect;
    Settings: Settings;
    /**
     * @param {Object} obj
     * @param {DSDropZone[]} [obj.dropZones]
     */
    setDropZones: ({ dropZones }: {
        dropZones?: DSDropZone[];
    }) => void;
    _handleDrop: (target: any) => void;
    /**
     * @param {DSElements} elements
     * @param {Vect2} point
     * @returns {DropZone|undefined}
     */
    _getZoneByElementsFromPoint: (elements: DSElements, { x, y }: Vect2) => DropZone | undefined;
    stop: ({ isDragging }: {
        isDragging: any;
    }) => void;
    /**
     * @param {string} zoneId
     * @returns {DSElements|void}
     */
    getItemsDroppedById: (zoneId: string) => DSElements | void;
    /**
     * @param {string} zoneId
     * @param {boolean} addClasses
     * @returns {DSElements|void}
     */
    getItemsInsideById: (zoneId: string, addClasses: boolean) => DSElements | void;
    /**
     * Returns first DropsZone under current pointer
     * @param {Vect2} [coordinates]
     * @returns {DropZone | undefined}
     */
    getTarget: (coordinates?: Vect2) => DropZone | undefined;
}
import DragSelect from "../DragSelect";
import DropZone from "./DropZone";
import "../types"
