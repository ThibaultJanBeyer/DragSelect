// @ts-check
import '../types'
import DragSelect from '../DragSelect'

export default class KeyStore {
  /**
   * @type {Set<string>}
   * @private
   * */
  _currentValues = new Set()
  /**
   * @type {{control:string,shift:string,meta:string}}
   * @private
   * */
  _keyMapping = {
    control: 'ctrlKey',
    shift: 'shiftKey',
    meta: 'metaKey',
  }

  /**
   * @class KeyStore
   * @constructor KeyStore
   * @param {{DS:DragSelect}} p
   * @ignore
   */
  constructor({ DS }) {
    this.DS = DS
    this.DS.subscribe('Interaction:init', this.init)
  }

  init = () => {
    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)
    window.addEventListener('blur', this.reset)
  }

  /** @param {KeyboardEvent} event */
  keydown = (event) => {
    const key = event.key.toLowerCase()
    this.DS.publish('KeyStore:down:pre', { event, key })
    this._currentValues.add(key)
    this.DS.publish('KeyStore:down', { event, key })
  }

  /** @param {KeyboardEvent} event */
  keyup = (event) => {
    const key = event.key.toLowerCase()
    this.DS.publish('KeyStore:up:pre', { event, key })
    this._currentValues.delete(key)
    this.DS.publish('KeyStore:up', { event, key })
  }

  stop = () => {
    document.removeEventListener('keydown', this.keydown)
    document.removeEventListener('keyup', this.reset)
    window.removeEventListener('blur', this.reset)
    this.reset()
  }

  reset = () => this._currentValues.clear()

  /** @param {KeyboardEvent|MouseEvent|PointerEvent|TouchEvent} [event] */
  isMultiSelectKeyPressed(event) {
    if(this.DS.stores.SettingsStore.s.multiSelectMode) return true
    const multiSelectKeys = this.DS.stores.SettingsStore.s.multiSelectKeys.map(
      (key) => key.toLocaleLowerCase()
    )
    if (
      this.currentValues.some((key) =>
        multiSelectKeys.includes(key.toLocaleLowerCase())
      )
    )
      return true
    if (event && multiSelectKeys.some((key) => event[this._keyMapping[key]]))
      return true
    return false
  }

  get currentValues() {
    return Array.from(this._currentValues.values())
  }
}
