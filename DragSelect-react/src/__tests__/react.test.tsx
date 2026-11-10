import React, { StrictMode, useState } from 'react'
import { act, render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  DragSelectInstance,
  DragSelectProvider,
  DragSelectSettings,
  useDragSelect,
  useDragSelectArea,
  useDragSelectEvent,
  useDropZone,
  useSelectable,
  useSelection,
} from '../index'

afterEach(cleanup)

// Lets tests reach the instance the provider created
let ds: DragSelectInstance | undefined
const Grab = () => {
  ds = useDragSelect()
  return null
}

const Item = ({ id }: { id: string }) => {
  const ref = useSelectable()
  return (
    <button ref={ref} data-testid={id} data-id={id}>
      {id}
    </button>
  )
}

const SelectionCount = () => {
  const ids = useSelection<HTMLElement>().map((el) => el.dataset.id)
  return <output data-testid="selection">{ids.join(',')}</output>
}

const List = ({
  ids,
  settings,
  strict = false,
}: {
  ids: string[]
  settings?: DragSelectSettings
  strict?: boolean
}) => {
  const tree = (
    <DragSelectProvider settings={settings}>
      <Grab />
      {ids.map((id) => (
        <Item key={id} id={id} />
      ))}
      <SelectionCount />
    </DragSelectProvider>
  )
  return strict ? <StrictMode>{tree}</StrictMode> : tree
}

describe('DragSelectProvider', () => {
  it('creates one running instance and stops it on unmount', () => {
    const { unmount } = render(<List ids={['a']} />)
    const instance = ds!
    expect(instance).toBeDefined()
    expect(instance.stopped).toBe(false)
    unmount()
    expect(instance.stopped).toBe(true)
  })

  it('works under StrictMode (no leaked instance, selectables on the live one)', () => {
    render(<List ids={['a', 'b']} strict />)
    expect(ds!.stopped).toBe(false)
    expect(ds!.getSelectables()).toHaveLength(2)
  })

  it('passes initial settings to the constructor', () => {
    render(<List ids={['a']} settings={{ selectedClass: 'picked' }} />)
    act(() => {
      ds!.addSelection(screen.getByTestId('a'))
    })
    expect(screen.getByTestId('a').classList.contains('picked')).toBe(true)
  })

  it('reads settings once, re-renders do not call setSettings', () => {
    const { rerender } = render(<List ids={['a']} settings={{ multiSelectKeys: ['Shift'] }} />)
    const spy = vi.spyOn(ds!, 'setSettings')
    rerender(<List ids={['a']} settings={{ multiSelectKeys: ['Alt'] }} />)
    expect(spy).not.toHaveBeenCalled()
  })
})

describe('useSelectable / useSelection', () => {
  it('registers and unregisters selectables with the component lifecycle', () => {
    const { rerender } = render(<List ids={['a', 'b', 'c']} />)
    expect(ds!.getSelectables()).toHaveLength(3)
    rerender(<List ids={['a']} />)
    expect(ds!.getSelectables()).toEqual([screen.getByTestId('a')])
  })

  it('exposes the selected elements', async () => {
    render(<List ids={['a', 'b', 'c']} />)
    await act(async () => {
      ds!.setSelection([screen.getByTestId('a'), screen.getByTestId('c')])
    })
    expect(screen.getByTestId('selection').textContent).toBe('a,c')

    await act(async () => {
      ds!.clearSelection()
    })
    expect(screen.getByTestId('selection').textContent).toBe('')
  })

  it('drops unmounted items from the selection', async () => {
    const { rerender } = render(<List ids={['a', 'b']} />)
    await act(async () => {
      ds!.setSelection([screen.getByTestId('a'), screen.getByTestId('b')])
    })
    await act(async () => {
      rerender(<List ids={['a']} />)
    })
    expect(screen.getByTestId('selection').textContent).toBe('a')
  })

  it('coalesces many selection events into one render', async () => {
    const ids = Array.from({ length: 50 }, (_, i) => `i${i}`)
    let renders = 0
    const Counter = () => {
      useSelection()
      renders++
      return null
    }
    render(
      <DragSelectProvider>
        <Grab />
        {ids.map((id) => (
          <Item key={id} id={id} />
        ))}
        <Counter />
      </DragSelectProvider>
    )
    const before = renders
    await act(async () => {
      ds!.setSelection(ids.map((id) => screen.getByTestId(id)))
    })
    expect(renders - before).toBe(1)
  })

  it('does not re-render items when the selection changes', async () => {
    let renders = 0
    const Counted = () => {
      const ref = useSelectable()
      renders++
      return <div ref={ref} data-testid="x" />
    }
    render(
      <DragSelectProvider>
        <Grab />
        <Counted />
      </DragSelectProvider>
    )
    const before = renders
    await act(async () => {
      ds!.setSelection(screen.getByTestId('x'))
    })
    expect(renders).toBe(before)
    expect(screen.getByTestId('x').classList.contains('ds-selected')).toBe(true)
  })
})

describe('useDragSelectEvent', () => {
  it('calls the latest callback and unsubscribes on unmount', async () => {
    const calls: string[] = []
    const Listener = ({ label }: { label: string }) => {
      useDragSelectEvent('DS:end', () => calls.push(label))
      return null
    }
    const ui = (label: string, show = true) => (
      <DragSelectProvider>
        <Grab />
        {show && <Listener label={label} />}
      </DragSelectProvider>
    )
    const { rerender } = render(ui('first'))
    act(() => ds!.clearSelection(true))
    rerender(ui('second'))
    act(() => ds!.clearSelection(true))
    rerender(ui('second', false))
    act(() => ds!.clearSelection(true))
    expect(calls).toEqual(['first', 'second'])
  })

  it('does not remove other subscribers when unsubscribing', () => {
    const calls: string[] = []
    const A = () => {
      useDragSelectEvent('DS:end', () => calls.push('a'))
      return null
    }
    const B = () => {
      useDragSelectEvent('DS:end', () => calls.push('b'))
      return null
    }
    const ui = (showA: boolean) => (
      <DragSelectProvider>
        <Grab />
        {showA && <A />}
        <B />
      </DragSelectProvider>
    )
    const { rerender } = render(ui(true))
    rerender(ui(false))
    act(() => ds!.clearSelection(true))
    expect(calls).toEqual(['b'])
  })
})

describe('useDragSelectArea / useDropZone', () => {
  it('sets the area and resets it to document on unmount', () => {
    const Area = () => {
      const ref = useDragSelectArea()
      return <div ref={ref} data-testid="area" />
    }
    const ui = (show: boolean) => (
      <DragSelectProvider>
        <Grab />
        {show && <Area />}
      </DragSelectProvider>
    )
    const { rerender } = render(ui(true))
    expect(ds!.stores.SettingsStore.s.area).toBe(screen.getByTestId('area'))
    rerender(ui(false))
    expect(ds!.stores.SettingsStore.s.area).toBe(document)
  })

  it('registers drop zones, keeping ones passed in settings', () => {
    const Zone = ({ id }: { id: string }) => {
      const ref = useDropZone(id)
      return <div ref={ref} data-testid={id} />
    }
    const staticZone = document.createElement('div')
    const ui = (zones: string[]) => (
      <DragSelectProvider
        settings={{ dropZones: [{ id: 'static', element: staticZone }] }}
      >
        <Grab />
        {zones.map((id) => (
          <Zone key={id} id={id} />
        ))}
      </DragSelectProvider>
    )
    const ids = () =>
      ds!.stores.SettingsStore.s.dropZones.map((zone) => zone.id)

    const { rerender } = render(ui(['trash', 'archive']))
    expect(ids()).toEqual(['static', 'trash', 'archive'])
    expect(
      ds!.stores.SettingsStore.s.dropZones.find((z) => z.id === 'trash')
        ?.element
    ).toBe(screen.getByTestId('trash'))
    rerender(ui(['archive']))
    expect(ids()).toEqual(['static', 'archive'])
  })
})
