declare function _default({ shiftKey, keyboardDragSpeed, zoom, key, dragKeys, scrollDiff, canScroll, scrollCallback, }: {
    key: string;
    shiftKey: boolean;
    canScroll: boolean;
    keyboardDragSpeed: number;
    zoom: number;
    scrollCallback: ScrollCallback;
    scrollDiff: Vect2;
    dragKeys: DSDragKeys;
}): Vect2;
export default _default;
export type ScrollCallback = Function;
import "../types"
