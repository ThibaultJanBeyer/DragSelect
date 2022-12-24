// @ts-check
import '../types'

export default class PubSub {
  subscribers = {}

  constructor({ DS }) {
    this.DS = DS
  }

  /**
   * Subscribe to an event
   * @memberof DragSelect#
   * @function subscribe
   * @param {DSCallbackNames} eventName
   * @param {DSCallback} callback
   * @returns {number} event id, can be used to unsubscribe more efficiently
   */
  subscribe = (eventName, callback) => {
    if (!Array.isArray(this.subscribers[eventName]))
      this.subscribers[eventName] = []
    this.subscribers[eventName].push(callback)
    return this.subscribers[eventName].length - 1
  }

  /**
   * Removes event subscription
   * @memberof DragSelect#
   * @function unsubscribe
   * @param {DSCallbackNames} eventName
   * @param {DSCallback} [callback] the callback method signature, has to be exactly the same as when subscribing. Consider using "id" instead.
   * @param {number} [id] event id returned when subscribed (more performant than callback search)
   */
  unsubscribe = (eventName, callback, id) => {
    if (id >= 0) this.subscribers[eventName].splice(id, 1)
    else if (callback)
      this.subscribers[eventName] = this.subscribers[eventName].filter(
        (cb) => cb !== callback
      )
  }

  /**
   * Publishes an event to all subscribers
   * @memberof DragSelect#
   * @function publish
   * @param {DSCallbackNames|DSCallbackNames[]} eventName
   * @param {CallbackObject} data passed to the subscription method
   */
  publish = (eventName, data) => {
    if (Array.isArray(eventName))
      eventName.forEach((name) => this._publish(name, data))
    else this._publish(eventName, data)
  }

  _publish = (eventName, data) => {
    const subscribers = this.subscribers[eventName]
    if (!Array.isArray(subscribers)) return
    if (eventName.includes(`:pre`)) this._handlePrePublish(subscribers, data)
    else this._handlePublish(subscribers, data)
  }

  // non-pre events are executed first in first out
  _handlePublish = (subscribers, data) => {
    for (let i = 0, il = subscribers.length; i < il; i++) {
      if (this.DS.stopped) return
      subscribers[i](data)
    }
  }

  // pre events are executed last in first out (so user callbacks are called before DS callbacks)
  _handlePrePublish = (subscribers, data) => {
    let i = subscribers.length
    while (i--) {
      if (this.DS.stopped) return
      subscribers[i](data)
    }
  }
}
