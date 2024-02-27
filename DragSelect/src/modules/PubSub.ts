import DragSelect from '../DragSelect'
import { DSAreaPublish } from './Area'
import { DSInteractionPublish } from './Interaction'
import { DSKeyStorePublish } from '../stores/KeyStore'
import { DSPointerStorePublish } from '../stores/PointerStore'
import { DSSelectablePublish } from './SelectableSet'
import { DSSelectedPublish } from './SelectedSet'
import { DSSettingsPublish } from '../stores/SettingsStore'
import { DSPublicPublish } from '../methods/subscriberAliases'
import { DSInputElement } from '../types'

export type DSPublishMappings<E extends DSInputElement> = DSSettingsPublish<E> &
  DSAreaPublish<E> &
  DSKeyStorePublish &
  DSPointerStorePublish &
  DSInteractionPublish &
  DSSelectablePublish<E> &
  DSSelectedPublish<E> &
  DSPublicPublish<E>

export type DSCallback<T> = (data: T) => any

export default class PubSub<E extends DSInputElement> {
  subscribers: {
    [K in keyof DSPublishMappings<E>]?: DSCallback<DSPublishMappings<E>[K]>[]
  } = {}
  DS: DragSelect<E>

  constructor({ DS }: { DS: DragSelect<E> }) {
    this.DS = DS
  }

  /**
   * Subscribe to an event
   * @returns event id, can be used to unsubscribe more efficiently
   */
  subscribe = <K extends keyof DSPublishMappings<E>>(
    eventName: K,
    callback: DSCallback<DSPublishMappings<E>[K]>
  ) => {
    if (!Array.isArray(this.subscribers[eventName]))
      this.subscribers[eventName] = []
    const subscribers = this.subscribers[eventName] as DSCallback<
      DSPublishMappings<E>[K]
    >[]
    subscribers.push(callback)
    return subscribers.length - 1
  }

  /**
   * Removes event subscription
   * @param callback the callback method signature, has to be exactly the same as when subscribing. Consider using "id" instead.
   * @param id event id returned when subscribed (more performant than callback search)
   */
  unsubscribe = <K extends keyof DSPublishMappings<E>>(
    eventName: K,
    callback?: DSCallback<DSPublishMappings<E>[K]> | null,
    id?: number
  ) => {
    const index =
      id ?? this.subscribers[eventName]?.findIndex((cb) => cb === callback)
    this.subscribers[eventName]?.splice(Number(index), 1)
  }

  /**
   * Publishes an event to all subscribers
   * @param eventName
   * @param data passed to the subscription method
   */
  publish = <K extends keyof DSPublishMappings<E>>(
    eventName: K | K[],
    data: DSPublishMappings<E>[K]
  ) => {
    if (Array.isArray(eventName))
      eventName.forEach((name) => this._publish(name, data))
    else this._publish(eventName, data)
  }

  private _publish = <K extends keyof DSPublishMappings<E>>(
    eventName: K,
    data: DSPublishMappings<E>[K]
  ) => {
    const subscribers: DSCallback<DSPublishMappings<E>[K]>[] =
      this.subscribers[eventName] ?? []
    if (eventName.includes(`:pre`)) this._handlePrePublish(subscribers, data)
    else this._handlePublish(subscribers, data)
  }

  // non-pre events are executed first in first out
  private _handlePublish = <K extends keyof DSPublishMappings<E>>(
    subscribers: DSCallback<DSPublishMappings<E>[K]>[],
    data: DSPublishMappings<E>[K]
  ) => {
    for (let i = 0, il = subscribers.length; i < il; i++) {
      if (this.DS.stopped) return
      subscribers[i]?.(data)
    }
  }

  // pre events are executed last in first out (so user callbacks are called before DS callbacks)
  _handlePrePublish = <K extends keyof DSPublishMappings<E>>(
    subscribers: DSCallback<DSPublishMappings<E>[K]>[],
    data: DSPublishMappings<E>[K]
  ) => {
    let i = subscribers.length
    while (i--) {
      if (this.DS.stopped) return
      subscribers[i]?.(data)
    }
  }
}
