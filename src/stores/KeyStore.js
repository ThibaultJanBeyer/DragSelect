// @ts-check
import '../types'
import DragSelect from '../DragSelect'

export default class KeyStore {
  /**
   * @type {boolean}
   * @private
   * */
  _multiSelectMode
  /**
   * @type {DSMultiSelectKeys}
   * @private
   * */
  _multiSelectKeys
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
   * @param {{DS:DragSelect,multiSelectKeys:DSMultiSelectKeys,multiSelectMode:boolean}} p
   * @ignore
   */
  constructor({ DS, multiSelectKeys, multiSelectMode }) {
    this.DS = DS
    this._multiSelectMode = multiSelectMode

    // @TODO: remove after deprecation
    this._multiSelectKeys = multiSelectKeys.map((key) => {
      const deprecatedKeys = {
        ctrlKey: 'Control',
        shiftKey: 'Shift',
        metaKey: 'Meta',
      }
      /** @type {string} */
      const newName = deprecatedKeys[key]
      if (newName) {
        console.warn(
          `[DragSelect] ${key} is deprecated. Use "${newName}" instead. Act Now!. See docs for more info`
        )
        return newName.toLowerCase()
      }
      return key.toLowerCase()
    })

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
    this._currentValues.add(key)
    this.DS.publish('KeyStore:down', { event, key })
  }

  /** @param {KeyboardEvent} event */
  keyup = (event) => {
    const key = event.key.toLowerCase()
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

  /** @param {KeyboardEvent|MouseEvent|TouchEvent} [event] */
  isMultiSelectKeyPressed(event) {
    if (this._multiSelectMode) return true
    if (this.currentValues.some((key) => this._multiSelectKeys.includes(key)))
      return true
    if (
      event &&
      this._multiSelectKeys.some((key) => event[this._keyMapping[key]])
    )
      return true
    return false
  }

  get currentValues() {
    return Array.from(this._currentValues.values())
  }
}
