// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { hydrateSettings } from '../methods'

export default class SettingsStore {
  /**
   * @type {Settings}
   * @private
   * */
  _settings = {}
  /**
   * Holds the settings and their previous value `:pre`
   * @example {
   *    autoScrollSpeed: 3,
   *    'autoScrollSpeed:pre': 5
   * }
   * @type {Settings}
   * */
  s = {}

  /**
   * @class ScrollStore
   * @constructor ScrollStore
   * @param {{ DS:DragSelect, settings:Settings }} p
   * @ignore
   */
  constructor({
    DS,
    settings
  }) {
    this.DS = DS
    this.DS.subscribe('Settings:updated:pre', this._update)
    this.update({ settings, init: true })
  }

  /** @param {{settings: Settings, init?: boolean}} props */
  update = ({ settings, init }) =>
    this.DS.publish('Settings:updated:pre', { settings, ...init ? { init } : {} })
  /** @param {{settings: Settings, init: boolean}} props */
  _update = ({ settings, init }) => {
    const _settings = hydrateSettings(settings, init)
    for (const [key, value] of Object.entries(_settings)) {
      if (!(key in this._settings)) {
        Object.defineProperty(this.s, key, {
          get: () => this._settings[key],
          set: (newValue) => this.update({ settings: { [key]: newValue } }),
        })
      }

      this._settings[`${key}:pre`] = this._settings[key]
      this._settings[key] = value

      const update = {
        settings: {
          [key]: this._settings[key],
          [`${key}:pre`]: this._settings[`${key}:pre`],
        },
      }
      this.DS.publish('Settings:updated', update)
      // @ts-ignore: @todo: update to typescript
      this.DS.publish(`Settings:updated:${key}`, update)
    }
  }
}
