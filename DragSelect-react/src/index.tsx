import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import DragSelect from 'dragselect'
import type { DSInputElement, DSPubCallback, Settings } from 'dragselect'

export type { DSInputElement, DSPubCallback } from 'dragselect'
export type DragSelectInstance = DragSelect<DSInputElement>
export type DragSelectSettings = Settings<DSInputElement>
/** Any public DragSelect event name, e.g. `'DS:end'`. */
export type DragSelectEventName = Parameters<DragSelectInstance['subscribe']>[0]

const Context = createContext<DragSelectInstance | undefined>(undefined)

/**
 * Creates one DragSelect instance for everything inside it and stops it on unmount.
 * `settings` are read once. To change them later: `useDragSelect()?.setSettings({...})`.
 */
export function DragSelectProvider({
  settings,
  children,
}: {
  settings?: DragSelectSettings
  children?: React.ReactNode
}) {
  const [ds, setDs] = useState<DragSelectInstance>()

  useEffect(() => {
    const instance = new DragSelect<DSInputElement>({ ...settings })
    setDs(instance)
    return () => instance.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Context.Provider value={ds}>{children}</Context.Provider>
}

/** The DragSelect instance. `undefined` on the first render and on the server. */
export const useDragSelect = () => useContext(Context)

/** Makes an element selectable while the component is mounted. Returns a ref. */
export function useSelectable() {
  const ds = useDragSelect()
  const [element, ref] = useState<DSInputElement | null>(null)

  useEffect(() => {
    if (!ds || !element) return
    ds.addSelectables(element)
    // the provider may already have stopped the instance on unmount
    return () => void (!ds.stopped && ds.removeSelectables(element, true))
  }, [ds, element])

  return ref
}

/**
 * The selected elements, straight from DragSelect. Re-renders on change.
 * Put your ids on the element (`data-id`) and read them back with `el.dataset.id`.
 */
export function useSelection<E extends DSInputElement = DSInputElement>(): E[] {
  const ds = useDragSelect()
  const [selection, setSelection] = useState<E[]>([])

  useEffect(() => {
    if (!ds) return
    const update = () => setSelection(ds.getSelection() as E[])
    update()
    ds.subscribe('DS:select', update)
    ds.subscribe('DS:unselect', update)
    return () => {
      ds.unsubscribe('DS:select', update)
      ds.unsubscribe('DS:unselect', update)
    }
  }, [ds])

  return selection
}

/** Subscribes to a DragSelect event while mounted. Always calls the latest callback. */
export function useDragSelectEvent<K extends DragSelectEventName>(
  eventName: K,
  callback: DSPubCallback<K>
) {
  const ds = useDragSelect()
  const latest = useRef(callback)
  latest.current = callback

  useEffect(() => {
    if (!ds) return
    const handler: DSPubCallback<K> = (event) => latest.current(event)
    ds.subscribe(eventName, handler)
    return () => ds.unsubscribe(eventName, handler)
  }, [ds, eventName])
}

/** Restricts selecting to this element (the `area` setting). Returns a ref. */
export function useDragSelectArea() {
  const ds = useDragSelect()
  const [element, ref] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!ds || !element) return
    ds.setSettings({ area: element })
    return () => void (!ds.stopped && ds.setSettings({ area: document }))
  }, [ds, element])

  return ref
}

/** Registers a drop zone with this id. Returns a ref. */
export function useDropZone(id: string) {
  const ds = useDragSelect()
  const [element, ref] = useState<DSInputElement | null>(null)

  useEffect(() => {
    if (!ds || !element) return
    const zones = () => ds.stores.SettingsStore.s.dropZones ?? []
    ds.setSettings({ dropZones: [...zones(), { id, element }] })
    return () =>
      void (
        !ds.stopped &&
        ds.setSettings({ dropZones: zones().filter((z) => z.element !== element) })
      )
  }, [ds, element, id])

  return ref
}
