import { DSInputElement, Settings } from '../types'
import DragSelect from '../DragSelect'

import { hydrateSettings } from '../methods/hydrateSettings'
import PubSub from '../modules/PubSub'

type WithPostfix<T, Postfix extends string> = {
  [K in keyof T as K | `${string & K}${Postfix}`]: T[K];
}

export type DSSettings<E extends DSInputElement> = WithPostfix<Required<Settings<E>>, ':pre'>

export type DSSettingsPublishEventNames = "Settings:updated:pre"|"Settings:updated"|`Settings:updated:${string}:pre`|`Settings:updated:${string}`

export type DSSettingsPublishEventData<E extends DSInputElement> = { 
  /** whether this is the initial settings call */
  'settings:init': boolean;
  /** the settings being updates/manipulated/passed, holds all settings including the previous value. i.e. updating selectorClass will publish { settings: { ...settings, selectorClass: 'newVal', 'selectorClass:pre': 'oldVal' } } this is a deep cloned copy so manipulating it will have no effect */
  settings: DSSettings<E>; 
  /** the new settings that are passed, not available on the initial settings call */
  'settings:new'?: Settings<E>;
};

export type DSSettingsPublish<E extends DSInputElement> = {
  [K in DSSettingsPublishEventNames]: DSSettingsPublishEventData<E>;
}

export default class SettingsStore<E extends DSInputElement> {
  private _settings: DSSettings<E> = {} as DSSettings<E>
  /**
   * Holds the settings and their previous value `:pre`
   * @example {
   *    autoScrollSpeed: 3,
   *    'autoScrollSpeed:pre': 5
   * }
   **/
  s: DSSettings<E> = {} as DSSettings<E>
  private PS: PubSub<E>

  /**
   * @class ScrollStore
   * @constructor ScrollStore
   * @param {{ DS:DragSelect, settings:Settings }} p
   * @ignore
   */
  constructor({
    PS,
    settings
  }: { PS: PubSub<E>, settings: Settings<E> }) {
    this.PS = PS
    this.update({ settings, init: true })
  }

  update = ({ settings, init }: { settings: Settings<E>, init?: boolean }) => {
    this.PS.publish('Settings:updated:pre', {
      settings: this._settings,
      'settings:init': Boolean(init),
      'settings:new': settings 
    })
    this._update({ settings, init })
  }

  private _update = ({ settings = {}, init = false }: { settings?: Settings<E>, init?: boolean }) => {
    const _settings = hydrateSettings(settings, init)

    for (const [key, value] of Object.entries(_settings) as [keyof Settings<E>, DSSettings<E>[keyof Settings<E>]][]) {
      (<K extends keyof Settings<E>>(key: K, value: DSSettings<E>[K]) => {
        if (!(key in this._settings)) {
          Object.defineProperty(this.s, key, {
            get: () => this._settings[key],
            set: (newValue) => this.update({ settings: { [key]: newValue } }),
          })
        }

        this._settings[`${key}:pre` as K] = this._settings[key] // need to cast as K, see https://stackoverflow.com/a/76070928/3712591
        this._settings[key] = value

        const update = { 
          settings: this._settings,
          'settings:init': init,
          'settings:new': settings
        }
        this.PS.publish('Settings:updated', update)
        this.PS.publish(`Settings:updated:${key}`, update)
      })(key, value); // method used for typecasting, see https://stackoverflow.com/q/76036535/3712591
    }
  }
}
