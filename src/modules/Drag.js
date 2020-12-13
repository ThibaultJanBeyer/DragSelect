// @ts-check
import '../types'
import DragSelect from '../DragSelect'

import { getStylePosition, setStylePosition, vect2 } from '../methods'

export default class Drag {
  /**
   * @type {boolean}
   * @private
   */
  _useTransform
  /**
   * @type {Vect2}
   * @private
   */
  _prevCursorPos
  /**
   * @type {Vect2}
   * @private
   */
  _prevScrollPos

  /**
   * @param {Object} p
   * @param {DragSelect} p.DS
   * @param {boolean} p.useTransform
   */
  constructor({ DS, useTransform }) {
    this.DS = DS
    this._useTransform = useTransform
    this.DS.subscribe('Interaction:start', this.start)
    this.DS.subscribe('Interaction:update', this.update)
  }

  start = () => {
    this._prevCursorPos = null
    this._prevScrollPos = null
  }

  update = ({ isDragging }) => {
    if (!isDragging) return

    const posDiff = this._getPositionDifference(
      this.DS.stores.PointerStore.currentVal,
      this.DS.stores.ScrollStore.currentVal
    )

    const selected = this.DS.getSelection()
    selected.forEach((element) => {
      const elementPos = getStylePosition(element, this._useTransform)
      const newPos = vect2.calc(elementPos, '+', posDiff)
      setStylePosition(element, newPos, this._useTransform)
    })
  }

  /**
   * Difference value between two point of the cursor or scroll
   * @param {Vect2} currentPointerVal
   * @param {Vect2} currentScrollVal
   * @private
   */
  _getPositionDifference(currentPointerVal, currentScrollVal) {
    const cursorDiff = this._prevCursorPos
      ? vect2.calc(currentPointerVal, '-', this._prevCursorPos)
      : { x: 0, y: 0 }
    this._prevCursorPos = currentPointerVal

    const scrollDiff = this._prevScrollPos
      ? vect2.calc(currentScrollVal, '-', this._prevScrollPos)
      : { x: 0, y: 0 }
    this._prevScrollPos = currentScrollVal

    return vect2.calc(cursorDiff, '+', scrollDiff)
  }
}
