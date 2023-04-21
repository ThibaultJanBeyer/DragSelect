import DragSelect from '../DragSelect'
import PubSub, { DSPublishMappings } from '../modules/PubSub'
import { DSAreaPublishEventData } from '../modules/Area'
import { DSDropZone } from '../modules/DropZone'
import { DSElement } from '../types'
import { DSInteractionPublishEventData } from '../modules/Interaction'
import { DSSelectedPublishEventData } from '../modules/SelectedSet'

type DSEventName = 'DS:scroll'|'DS:start'|'DS:select'|'DS:unselect'|'DS:update'|'DS:end'
type DSEventNamePre = 'DS:scroll:pre'|'DS:start:pre'|'DS:select:pre'|'DS:unselect:pre'|'DS:update:pre'|'DS:end:pre'

export type DSPublicPublishEventNames = DSEventNamePre|DSEventName

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

export type DSPublicPublish = {
  "DS:select": SelectionCB
  "DS:select:pre": SelectionCB
  "DS:unselect": SelectionCB
  "DS:unselect:pre": SelectionCB
  "DS:scroll": ScrollCB
  "DS:scroll:pre": ScrollCB
  "DS:start": InteractionCB
  "DS:start:pre": InteractionCB
  "DS:update": InteractionCB
  "DS:update:pre": InteractionCB
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
    { name: 'DS:select' },
  ],
  'Selected:removed': [
    { name: 'DS:unselect' }
  ],
  'Area:scroll': [
    { name: 'DS:scroll' }
  ],
  'Interaction:start': [
    { name: 'DS:start' }
  ],
  'Interaction:update': [
    { name: 'DS:update', condition: (data) => data.event ? data : null },
  ],
  'Interaction:end': [
    {
      name: 'DS:end',
      extraData: (data, DS) => {
        const target = DS.DropZones.getTarget()
        return {
          ...data,
          ...(target ? { dropTarget: target.toObject() } : {}),
        }
      },
    },
  ],
}

/** Maps internal events to external ones */
export const subscriberAliases = ({ PS, DS }: { PS: PubSub; DS: DragSelect }) => {
  for (const [sub_name, sub_pubs] of Object.entries(mapping) as [keyof UsedPublishMappings, DSMappings[keyof UsedPublishMappings]][])
    // add `pre` mapping to it
    ['pre', undefined].forEach((filler?: string) => addSubscribers({ sub_name, sub_pubs, DS, PS, filler }))
}

const addSubscribers = <K extends keyof UsedPublishMappings>(
  { sub_name, filler, DS, PS, sub_pubs }:
  { sub_name: K, filler?: string, sub_pubs: DSMappings[K], DS: DragSelect, PS: PubSub }
) => {
  const subscribeName = `${sub_name}${filler ? `:${filler}` : ''}` as K
  // Subscribe to the internal event
  PS.subscribe(subscribeName, (data) => 
    // publish to each of the mapped ones
    sub_pubs.forEach(sub_pub => publish({ sub_pub, data, filler, DS })))
}

const publish = <K extends keyof UsedPublishMappings>(
  { sub_pub, filler, data, DS }:
  { sub_pub: MappingObj<K>, filler?: string, data: DSPublishMappings[K], DS: DragSelect }
) => {
  const publishName = `${sub_pub.name}${filler ? `:${filler}` : ''}` as DSPublicPublishEventNames
  // If the events condition is met, publish the external event
  const cleanedData = !sub_pub.condition ? data : sub_pub.condition(data, DS)
  if(cleanedData) {
    const extra = sub_pub.extraData && sub_pub.extraData(data, DS) || {}
    DS.publish(publishName, {
      // add extra data as needed
      items: DS.SelectedSet.elements,
      isDragging: DS.Interaction.isDragging,
      ...cleanedData,
      ...extra,
    })
  }
}
