declare function _default(nodes: DSArea[], cb: DSModificationCallback): {
    observer: MutationObserver;
    callback: DSModificationCallback;
    cleanup: DSCleanup;
};
export default _default;
/**
 * Removes event-listeners from the DOMNode
 */
export type DSCleanup = () => void;
import "../types"
