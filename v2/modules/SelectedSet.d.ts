export default class SelectedSet extends Set<any> {
    /**
     * @constructor SelectableSet
     * @param {{DS:DragSelect}} obj
     * @ignore
     */
    constructor({ DS }: {
        DS: DragSelect;
    });
    DS: DragSelect;
    /**
     * @param {DSElement} element
     * @return {this}
     * */
    add(element: DSElement): this;
    /** @param {DSElement} element */
    delete(element: DSElement): boolean;
    /**
     * Adds/Removes an element. If it is already selected = remove, if not = add.
     * @param {DSElement} element
     * @return {DSElement}
     */
    toggle(element: DSElement): DSElement;
    /** @param {DSElements} elements */
    addAll: (elements: DSElements) => void;
    /** @param {DSElements} elements */
    deleteAll: (elements: DSElements) => void;
    /** @return {DSElements} */
    get elements(): DSElements;
}
import DragSelect from "../DragSelect";
import "../types"
