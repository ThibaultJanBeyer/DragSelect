import DragSelect from '../DragSelect'
import PubSub from '../modules/PubSub'
import { Settings } from '../types'

export type DSKeyStorePublishEventNames = "KeyStore:down:pre"|"KeyStore:down"|"KeyStore:up:pre"|"KeyStore:up"

export type DSKeyStorePublishEventData = {
  event: KeyboardEvent;
  /** Pressed key (lowercase) */
  key: string;
};

export type DSKeyStorePublish = {
  [K in DSKeyStorePublishEventNames]: DSKeyStorePublishEventData
}

export default class KeyStore {
  private _currentValues = new Set<string>()
  private _keyMapping: { [key: string]: string } = {
    control: 'ctrlKey',
    shift: 'shiftKey',
    meta: 'metaKey',
  }
  private DS: DragSelect
  private PS: PubSub
  private settings: Required<Settings>

  /**
   * @class KeyStore
   * @constructor KeyStore
   * @ignore
   */
  constructor({ DS, PS }: { DS: DragSelect, PS: PubSub }) {
    this.DS = DS
    this.PS = PS
    this.settings = this.DS.stores.SettingsStore.s
    this.PS.subscribe('Interaction:init', this.init)
  }

  private init = () => {
    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)
    window.addEventListener('blur', this.reset)
  }

  private keydown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase()
    this.PS.publish('KeyStore:down:pre', { event, key })
    this._currentValues.add(key)
    this.PS.publish('KeyStore:down', { event, key })
  }

  private keyup = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase()
    this.PS.publish('KeyStore:up:pre', { event, key })
    this._currentValues.delete(key)
    this.PS.publish('KeyStore:up', { event, key })
  }

  public stop = () => {
    document.removeEventListener('keydown', this.keydown)
    document.removeEventListener('keyup', this.reset)
    window.removeEventListener('blur', this.reset)
    this.reset()
  }

  private reset = () => this._currentValues.clear()

  public isMultiSelectKeyPressed(event?: KeyboardEvent|MouseEvent|PointerEvent|TouchEvent) {
    if(this.settings.multiSelectMode) return true

    const multiSelectKeys = this.settings.multiSelectKeys?.map(
      (key) => key.toLocaleLowerCase()
    )

    if (this.currentValues.some((key) => multiSelectKeys.includes(key)))
      return true

    if (event && multiSelectKeys.some((key) => this._keyMapping[key] in event))
      return true

    return false
  }

  public get currentValues() {
    return Array.from(this._currentValues.values())
  }
}
