import { Settings } from '../types'
import DragSelect from '../DragSelect'

import { hydrateSettings } from '../methods/hydrateSettings'
import PubSub from '../modules/PubSub'

type WithPostfix<T, Postfix extends string> = {
  [K in keyof T as K | `${string & K}${Postfix}`]: T[K];
}

export type DSSettings = WithPostfix<Required<Settings>, ':pre'>

export type DSSettingsPublishEventNames = "Settings:updated:pre"|"Settings:updated"|`Settings:updated:${string}:pre`|`Settings:updated:${string}`

export type DSSettingsPublishEventData = { 
  /** whether this is the initial settings call */
  'settings:init': boolean;
  /** the settings being updates/manipulated/passed, holds all settings including the previous value. i.e. updating selectorClass will publish { settings: { ...settings, selectorClass: 'newVal', 'selectorClass:pre': 'oldVal' } } this is a deep cloned copy so manipulating it will have no effect */
  settings: DSSettings; 
  /** the new settings that are passed, not available on the initial settings call */
  'settings:new'?: Settings
};

export type DSSettingsPublish = {
  [K in DSSettingsPublishEventNames]: DSSettingsPublishEventData
}

export default class SettingsStore {
  private _settings: DSSettings = {} as DSSettings
  /**
   * Holds the settings and their previous value `:pre`
   * @example {
   *    autoScrollSpeed: 3,
   *    'autoScrollSpeed:pre': 5
   * }
   **/
  s: DSSettings = {} as DSSettings
  private DS: DragSelect
  private PS: PubSub

  /**
   * @class ScrollStore
   * @constructor ScrollStore
   * @param {{ DS:DragSelect, settings:Settings }} p
   * @ignore
   */
  constructor({
    DS,
    PS,
    settings
  }: { DS: DragSelect, PS: PubSub, settings: Settings }) {
    this.DS = DS
    this.PS = PS
    this.update({ settings, init: true })
  }

  update = ({ settings, init }: { settings: Settings, init?: boolean }) => {
    this.PS.publish('Settings:updated:pre', {
      settings: structuredClone(this._settings),
      'settings:init': Boolean(init),
      'settings:new': settings 
    })
    this._update({ settings, init })
  }

  private _update = ({ settings = {}, init = false }: { settings?: Settings, init?: boolean }) => {
    const _settings = hydrateSettings(settings, init)

    for (const [key, value] of Object.entries(_settings) as [keyof Settings, DSSettings[keyof Settings]][]) {
      (<K extends keyof Settings>(key: K, value: DSSettings[K]) => {
        if (!(key in this._settings)) {
          Object.defineProperty(this.s, key, {
            get: () => this._settings[key],
            set: (newValue) => this.update({ settings: { [key]: newValue } }),
          })
        }

        this._settings[`${key}:pre` as K] = this._settings[key] // need to cast as K, see https://stackoverflow.com/a/76070928/3712591
        this._settings[key] = value

        const update = { 
          settings: structuredClone(this._settings),
          'settings:init': init,
          'settings:new': settings
        }
        this.PS.publish('Settings:updated', update)
        this.PS.publish(`Settings:updated:${key}`, update)
      })(key, value); // method used for typecasting, see https://stackoverflow.com/q/76036535/3712591
    }
  }
}
