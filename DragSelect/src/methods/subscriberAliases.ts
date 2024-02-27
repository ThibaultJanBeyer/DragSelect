import DragSelect from '../DragSelect'
import PubSub, { DSPublishMappings } from '../modules/PubSub'
import { DSAreaPublishEventData } from '../modules/Area'
import { DSDropZone } from '../modules/DropZone'
import { DSInteractionPublishEventData } from '../modules/Interaction'
import { DSSelectedPublishEventData } from '../modules/SelectedSet'
import { DSInputElement } from '../types'

export type DSPublicPublishAdditionalEventData<E extends DSInputElement> = {
  /** The dropZone element that the element was dropped into (or the mouse is currently hovering over) */
  dropTarget?: DSDropZone<E>
  /** Selected Elements */
  items: E[]
  /** Whether the user is dragging or selecting */
  isDragging: boolean
}

type SelectionCB<E extends DSInputElement> = DSSelectedPublishEventData<E> & {
  /** Whether the user is dragging or selecting */
  isDragging: boolean
}

type ScrollCB<E extends DSInputElement> = Pick<
  DSAreaPublishEventData<E>,
  'scroll_directions' | 'scroll_multiplier'
> & {
  /** Selected Elements */
  items: E[]
  /** Whether the user is dragging or selecting */
  isDragging: boolean
}

type InteractionCB = DSInteractionPublishEventData
type InteractionEndCB<E extends DSInputElement> =
  Partial<DSInteractionPublishEventData> & DSPublicPublishAdditionalEventData<E>

export const deprecatedNamesMap = {
  elementselect: 'DS:select',
  elementunselect: 'DS:unselect',
  autoscroll: 'DS:scroll',
  dragstart: 'DS:start',
  dragmove: 'DS:update',
  callback: 'DS:end',
  preelementselect: 'DS:select:pre',
  preelementunselect: 'DS:unselect:pre',
  preautoscroll: 'DS:scroll:pre',
  predragstart: 'DS:start:pre',
  predragmove: 'DS:update:pre',
  precallback: 'DS:end:pre',
}

export type DSPublicPublish<E extends DSInputElement> = {
  // Selection Events
  preelementselect: SelectionCB<E>
  elementselect: SelectionCB<E>
  'DS:select:pre': SelectionCB<E>
  'DS:select': SelectionCB<E>
  preelementunselect: SelectionCB<E>
  elementunselect: SelectionCB<E>
  'DS:unselect:pre': SelectionCB<E>
  'DS:unselect': SelectionCB<E>
  // Selectables Events
  'DS:added:pre': SelectionCB<E>
  'DS:added': SelectionCB<E>
  'DS:removed:pre': SelectionCB<E>
  'DS:removed': SelectionCB<E>
  // Scroll Events
  preautoscroll: ScrollCB<E>
  autoscroll: ScrollCB<E>
  'DS:scroll': ScrollCB<E>
  'DS:scroll:pre': ScrollCB<E>
  // Interaction Start Events
  predragstart: InteractionCB
  dragstart: InteractionCB
  'DS:start': InteractionCB
  'DS:start:pre': InteractionCB
  // Interaction Update Events
  predragmove: InteractionCB
  dragmove: InteractionCB
  'DS:update': InteractionCB
  'DS:update:pre': InteractionCB
  // Interaction End Events
  precallback: InteractionEndCB<E>
  callback: InteractionEndCB<E>
  'DS:end': InteractionEndCB<E>
  'DS:end:pre': InteractionEndCB<E>
}

type UsedPublishNames =
  | 'Selected:added'
  | 'Selected:removed'
  | 'Selectable:added'
  | 'Selectable:removed'
  | 'Area:scroll'
  | 'Interaction:start'
  | 'Interaction:update'
  | 'Interaction:end'

type UsedPublishMappings<E extends DSInputElement> = Pick<
  DSPublishMappings<E>,
  UsedPublishNames
>

type Condition<T, E extends DSInputElement> = (
  data: T,
  DS: DragSelect<E>
) => T | null

type MappingObj<
  E extends DSInputElement,
  K extends keyof UsedPublishMappings<E>,
> = {
  name: keyof DSPublicPublish<E>
  condition?: Condition<UsedPublishMappings<E>[K], E>
  extraData?: Condition<UsedPublishMappings<E>[K], E>
}

type DSMappings<E extends DSInputElement> = {
  [K in keyof UsedPublishMappings<E>]: MappingObj<E, K>[]
}

const endExtraData = <E extends DSInputElement>(
  data: UsedPublishMappings<E>['Interaction:end'],
  DS: DragSelect<E>
) => {
  const target = DS.DropZones.getTarget(data)
  return {
    ...data,
    ...(target ? { dropTarget: target.toObject() } : {}),
  }
}

/** Maps internal events to external ones */
export const subscriberAliases = <E extends DSInputElement>({
  PS,
  DS,
}: {
  PS: PubSub<E>
  DS: DragSelect<E>
}) => {
  const mapping: DSMappings<E> = {
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
    'Selectable:added': [{ name: 'DS:added:pre' }, { name: 'DS:added' }],
    'Selectable:removed': [{ name: 'DS:removed:pre' }, { name: 'DS:removed' }],
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
      { name: 'predragmove', condition: (data) => (data.event ? data : null) },
      { name: 'dragmove', condition: (data) => (data.event ? data : null) },
      {
        name: 'DS:update:pre',
        condition: (data) => (data.event ? data : null),
      },
      { name: 'DS:update', condition: (data) => (data.event ? data : null) },
    ],
    'Interaction:end': [
      { name: 'precallback', extraData: (data, DS) => endExtraData(data, DS) },
      { name: 'callback', extraData: (data, DS) => endExtraData(data, DS) },
      { name: 'DS:end:pre', extraData: (data, DS) => endExtraData(data, DS) },
      { name: 'DS:end', extraData: (data, DS) => endExtraData(data, DS) },
    ],
  }

  for (const [sub_name, sub_pubs] of Object.entries(mapping) as [
    keyof UsedPublishMappings<E>,
    DSMappings<E>[keyof UsedPublishMappings<E>],
  ][])
    addSubscribers({ sub_name, sub_pubs, DS, PS })
}

const addSubscribers = <
  E extends DSInputElement,
  K extends keyof UsedPublishMappings<E>,
>({
  sub_name,
  DS,
  PS,
  sub_pubs,
}: {
  sub_name: K
  sub_pubs: DSMappings<E>[K]
  DS: DragSelect<E>
  PS: PubSub<E>
}) => {
  // Subscribe to the internal event
  PS.subscribe(sub_name, (data) =>
    // publish to each of the mapped ones
    sub_pubs.forEach((sub_pub) => publish({ sub_pub, data, DS }))
  )
}

const publish = <
  E extends DSInputElement,
  K extends keyof UsedPublishMappings<E>,
>({
  sub_pub,
  data,
  DS,
}: {
  sub_pub: MappingObj<E, K>
  data: DSPublishMappings<E>[K]
  DS: DragSelect<E>
}) => {
  // If the events condition is met, publish the external event
  const cleanedData = !sub_pub.condition ? data : sub_pub.condition(data, DS)
  if (cleanedData) {
    const extra = (sub_pub.extraData && sub_pub.extraData(data, DS)) || {}
    DS.publish(sub_pub.name, {
      // add extra data as needed
      items: DS.SelectedSet.elements,
      isDragging: DS.Interaction.isDragging,
      ...cleanedData,
      ...extra,
    })
  }
}
