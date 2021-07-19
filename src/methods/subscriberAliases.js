// @ts-check
import '../types'
import { Interaction, SelectedSet } from '../modules'

/**
 * @typedef {function} DSSubscribe
 * @param {DSCallbackNames} eventName
 * @param {DSCallback} callback
 * @returns {number} event id, can be used to unsubscribe more efficiently
 */
/**
 * @typedef {function} DSPublish
 * @param {DSCallbackNames} eventName
 * @param {CallbackObject} data passed to the subscription method
 */

/**
 * Maps internal events to external ones
 *
 * @param {Object} p
 * @param {DSSubscribe} p.subscribe
 * @param {DSPublish} p.publish
 * @param {Interaction} p.Interaction
 * @param {SelectedSet} p.SelectedSet
 */
export default ({ subscribe, publish, Interaction, SelectedSet }) => {
  const mapping = {
    'Selected:added': [{ name: 'elementselect' }],
    'Selected:removed': [{ name: 'elementunselect' }],
    'Area:scroll': [{ name: 'autoscroll' }], // scroll_directions, scroll_multiplier
    'Interaction:start': [{ name: 'dragstart' }], // event, isDraggingKeyboard
    'Interaction:update': [
      { name: 'dragmove', condition: (data) => data.event },
    ], // event, isDraggingKeyboard
    'Interaction:end': [{ name: 'callback' }], // event, isDraggingKeyboard
    'Drag:keyboardDrag': [{ name: 'dragstart' }, { name: 'dragmove' }], // event, isDraggingKeyboard
  }

  for (const [sub_name, pubs] of Object.entries(mapping))
    ['pre', false].forEach((filler) =>
      subscribe(filler ? `${sub_name}:${filler}` : sub_name, (data) =>
        pubs.forEach(
          (pub) =>
            (!pub.condition || pub.condition(data)) &&
            publish(filler ? `${filler}${pub.name}` : pub.name, {
              items: SelectedSet.elements,
              isDragging: Interaction.isDragging,
              ...data,
            })
        )
      )
    )
}
