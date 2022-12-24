export default class PubSub {
    constructor({ DS }: {
        DS: any;
    });
    subscribers: {};
    DS: any;
    /**
     * Subscribe to an event
     * @memberof DragSelect#
     * @function subscribe
     * @param {DSCallbackNames} eventName
     * @param {DSCallback} callback
     * @returns {number} event id, can be used to unsubscribe more efficiently
     */
    subscribe: (eventName: DSCallbackNames, callback: DSCallback) => number;
    /**
     * Removes event subscription
     * @memberof DragSelect#
     * @function unsubscribe
     * @param {DSCallbackNames} eventName
     * @param {DSCallback} [callback] the callback method signature, has to be exactly the same as when subscribing. Consider using "id" instead.
     * @param {number} [id] event id returned when subscribed (more performant than callback search)
     */
    unsubscribe: (eventName: DSCallbackNames, callback?: DSCallback, id?: number) => void;
    /**
     * Publishes an event to all subscribers
     * @memberof DragSelect#
     * @function publish
     * @param {DSCallbackNames|DSCallbackNames[]} eventName
     * @param {CallbackObject} data passed to the subscription method
     */
    publish: (eventName: DSCallbackNames | DSCallbackNames[], data: CallbackObject) => void;
    _publish: (eventName: any, data: any) => void;
    _handlePublish: (subscribers: any, data: any) => void;
    _handlePrePublish: (subscribers: any, data: any) => void;
}
import "../types"
