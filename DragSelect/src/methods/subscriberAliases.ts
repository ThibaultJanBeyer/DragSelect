import DragSelect from '../DragSelect'
import PubSub, { DSPublishMappings } from '../modules/PubSub'
import { DSAreaPublishEventData } from '../modules/Area'
import { DSDropZone } from '../modules/DropZone'
import { DSElement } from '../types'
import { DSInteractionPublishEventData } from '../modules/Interaction'
import { DSSelectedPublishEventData } from '../modules/SelectedSet'

export type DSPublicPublishEventNames = keyof DSPublicPublish

export type DSPublicPublishAdditionalEventData = {
  /** The dropZone element that the element was dropped into (or the mouse is currently hovering over) */
  dropTarget?: DSDropZone
}

type SelectionCB = DSSelectedPublishEventData & {
  /** Whether the user is dragging or selecting */
  isDragging: boolean,
}

type ScrollCB = Pick<DSAreaPublishEventData, 'scroll_directions' | 'scroll_multiplier'> & {
  /** Selected Elements */
  items: DSElement[]
  /** Whether the user is dragging or selecting */
  isDragging: boolean,
}

type InteractionCB = DSInteractionPublishEventData
type InteractionEndCB = Partial<DSInteractionPublishEventData> & DSPublicPublishAdditionalEventData

export const deprecatedNamesMap = {
  "elementselect": "DS:select",
  "elementunselect": "DS:unselect",
  "autoscroll": "DS:scroll",
  "dragstart": "DS:start",
  "dragmove": "DS:update",
  "callback": "DS:end",
  "preelementselect": "DS:select:pre",
  "preelementunselect": "DS:unselect:pre",
  "preautoscroll": "DS:scroll:pre",
  "predragstart": "DS:start:pre",
  "predragmove": "DS:update:pre",
  "precallback": "DS:end:pre",
}

export type DSPublicPublish = {
  // Select Events
  "preelementselect": SelectionCB
  "elementselect": SelectionCB
  "DS:select": SelectionCB
  "DS:select:pre": SelectionCB
  // Unselect Events
  "preelementunselect": SelectionCB
  "elementunselect": SelectionCB
  "DS:unselect": SelectionCB
  "DS:unselect:pre": SelectionCB
  // Scroll Events
  "preautoscroll": ScrollCB
  "autoscroll": ScrollCB
  "DS:scroll": ScrollCB
  "DS:scroll:pre": ScrollCB
  // Interaction Start Events
  "predragstart": InteractionCB
  "dragstart": InteractionCB
  "DS:start": InteractionCB
  "DS:start:pre": InteractionCB
  // Interaction Update Events
  "predragmove": InteractionCB
  "dragmove": InteractionCB
  "DS:update": InteractionCB
  "DS:update:pre": InteractionCB
  // Interaction End Events
  "precallback": InteractionEndCB
  "callback": InteractionEndCB
  "DS:end": InteractionEndCB
  "DS:end:pre": InteractionEndCB
}

type UsedPublishNames =
  | 'Selected:added'
  | 'Selected:removed'
  | 'Area:scroll'
  | 'Interaction:start'
  | 'Interaction:update'
  | 'Interaction:end'

type UsedPublishMappings = Pick<DSPublishMappings, UsedPublishNames>

type Condition<T> = (data: T, DS: DragSelect) => T | null

type MappingObj<K extends keyof UsedPublishMappings> = {
  name: DSPublicPublishEventNames
  condition?: Condition<UsedPublishMappings[K]>
  extraData?: Condition<UsedPublishMappings[K]>
}

type DSMappings = {
  [K in keyof UsedPublishMappings]: MappingObj<K>[]
}

const mapping: DSMappings = {
  'Selected:added': [
    { name: 'preelementselect' },
    { name: 'elementselect' },
    { name: 'DS:select:pre' },
    { name: 'DS:select' },
  ],
  'Selected:removed': [
    { name: 'preelementunselect' },
    { name: 'elementunselect' },
    { name: 'DS:unselect:pre' },
    { name: 'DS:unselect' },
  ],
  'Area:scroll': [
    { name: 'preautoscroll' },
    { name: 'autoscroll' },
    { name: 'DS:scroll:pre' },
    { name: 'DS:scroll' },
  ],
  'Interaction:start': [
    { name: 'predragstart' },
    { name: 'dragstart' },
    { name: 'DS:start:pre' },
    { name: 'DS:start' },
  ],
  'Interaction:update': [
    { name: 'predragmove', condition: (data) => data.event ? data : null },
    { name: 'dragmove', condition: (data) => data.event ? data : null },
    { name: 'DS:update:pre', condition: (data) => data.event ? data : null },
    { name: 'DS:update', condition: (data) => data.event ? data : null },
  ],
  'Interaction:end': [
    { name: 'precallback', extraData: (data, DS) => endExtraData(data, DS) },
    { name: 'callback', extraData: (data, DS) => endExtraData(data, DS) },
    { name: 'DS:end:pre', extraData: (data, DS) => endExtraData(data, DS) },
    { name: 'DS:end', extraData: (data, DS) => endExtraData(data, DS) },
  ],
}

const endExtraData = (data: UsedPublishMappings["Interaction:end"], DS: DragSelect) => {
  const target = DS.DropZones.getTarget()
  return {
    ...data,
    ...(target ? { dropTarget: target.toObject() } : {}),
  }
}

/** Maps internal events to external ones */
export const subscriberAliases = ({ PS, DS }: { PS: PubSub; DS: DragSelect }) => {
  for (const [sub_name, sub_pubs] of Object.entries(mapping) as [keyof UsedPublishMappings, DSMappings[keyof UsedPublishMappings]][])
    addSubscribers({ sub_name, sub_pubs, DS, PS })
}

const addSubscribers = <K extends keyof UsedPublishMappings>(
  { sub_name, DS, PS, sub_pubs }:
  { sub_name: K, sub_pubs: DSMappings[K], DS: DragSelect, PS: PubSub }
) => {
  // Subscribe to the internal event
  PS.subscribe(sub_name, (data) => 
    // publish to each of the mapped ones
    sub_pubs.forEach(sub_pub => publish({ sub_pub, data, DS })))
}

const publish = <K extends keyof UsedPublishMappings>(
  { sub_pub, data, DS }:
  { sub_pub: MappingObj<K>, data: DSPublishMappings[K], DS: DragSelect }
) => {
  // If the events condition is met, publish the external event
  const cleanedData = !sub_pub.condition ? data : sub_pub.condition(data, DS)
  if(cleanedData) {
    const extra = sub_pub.extraData && sub_pub.extraData(data, DS) || {}
    DS.publish(sub_pub.name, {
      // add extra data as needed
      items: DS.SelectedSet.elements,
      isDragging: DS.Interaction.isDragging,
      ...cleanedData,
      ...extra,
    })
  }
}
