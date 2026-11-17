import { Component, ViewChild, inject, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  DragSelectDirective,
  DragSelectDirectives,
  DragSelectSettings,
  injectDragSelectEvent,
} from '@dragselect/angular'

afterEach(() => TestBed.resetTestingModule())

const byId = (id: string) => document.querySelector<HTMLElement>(`[data-id="${id}"]`)!

/** Renders `component` and returns its fixture plus the DragSelect directive inside it. */
function setup<T extends { ds: DragSelectDirective<any> }>(component: new () => T) {
  const fixture = TestBed.createComponent(component)
  document.body.appendChild(fixture.nativeElement)
  fixture.detectChanges()
  const ds = () => fixture.componentInstance.ds
  return { fixture, ds, instance: () => ds().instance! }
}

@Component({
  imports: [DragSelectDirectives],
  template: `
    <div [dragSelect]="settings()" #ds="dragSelect">
      @for (id of ids(); track id) {
        <button dsSelectable #item="dsSelectable" [attr.data-id]="id" [class.on]="item.selected()">
          {{ id }}
        </button>
      }
      <output>{{ ids2(ds.selectedElements()) }}</output>
    </div>
  `,
})
class List {
  @ViewChild(DragSelectDirective) ds!: DragSelectDirective
  ids = signal(['a', 'b', 'c'])
  settings = signal<DragSelectSettings | ''>('')
  ids2 = (els: HTMLElement[]) => els.map((el) => el.dataset.id).join(',')
}

describe('dragSelect', () => {
  it('creates one running instance and stops it on destroy', () => {
    const { fixture, instance } = setup(List)
    const ds = instance()
    expect(ds.stopped).toBe(false)
    fixture.destroy()
    expect(ds.stopped).toBe(true)
  })

  it('passes initial settings to the constructor', () => {
    const fixture = TestBed.createComponent(List)
    fixture.componentInstance.settings.set({ selectedClass: 'picked' })
    fixture.detectChanges()
    fixture.componentInstance.ds.instance!.addSelection(byId('a'))
    expect(byId('a').classList.contains('picked')).toBe(true)
  })

  it('applies later settings changes', () => {
    const { fixture, instance } = setup(List)
    const spy = vi.spyOn(instance(), 'setSettings')
    fixture.componentInstance.settings.set({ selectedClass: 'picked' })
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledTimes(1)
    instance().addSelection(byId('a'))
    expect(byId('a').classList.contains('picked')).toBe(true)

    fixture.detectChanges()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('works on <ng-container>', () => {
    @Component({
      imports: [DragSelectDirectives],
      template: `<ng-container dragSelect><i dsSelectable data-id="x"></i></ng-container>`,
    })
    class Container {
      @ViewChild(DragSelectDirective) ds!: DragSelectDirective
    }
    const { instance } = setup(Container)
    expect(instance().getSelectables()).toEqual([byId('x')])
  })
})

describe('dsSelectable / selection', () => {
  it('registers and unregisters selectables with the element lifecycle', () => {
    const { fixture, instance } = setup(List)
    expect(instance().getSelectables()).toHaveLength(3)
    fixture.componentInstance.ids.set(['a'])
    fixture.detectChanges()
    expect(instance().getSelectables()).toEqual([byId('a')])
  })

  it('exposes the selected elements as a signal', () => {
    const { fixture, instance } = setup(List)
    const output = () => fixture.nativeElement.querySelector('output').textContent

    instance().setSelection([byId('a'), byId('c')])
    fixture.detectChanges()
    expect(output()).toBe('a,c')

    instance().clearSelection()
    fixture.detectChanges()
    expect(output()).toBe('')
  })

  it('exposes per-item selected state', () => {
    const { fixture, instance } = setup(List)
    instance().addSelection(byId('b'))
    fixture.detectChanges()
    expect(byId('a').classList.contains('on')).toBe(false)
    expect(byId('b').classList.contains('on')).toBe(true)
  })

  it('drops removed items from the selection', () => {
    const { fixture, instance, ds } = setup(List)
    instance().setSelection([byId('a'), byId('b')])
    fixture.componentInstance.ids.set(['a'])
    fixture.detectChanges()
    expect(ds().selectedElements()).toEqual([byId('a')])
  })

  it('sets aria-selected only on roles that support it', () => {
    @Component({
      imports: [DragSelectDirectives],
      template: `
        <div dragSelect role="listbox">
          <div dsSelectable role="option" data-id="opt"></div>
          <img dsSelectable data-id="img" />
        </div>
      `,
    })
    class Aria {
      @ViewChild(DragSelectDirective) ds!: DragSelectDirective
    }
    const { fixture, instance } = setup(Aria)
    expect(byId('opt').getAttribute('aria-selected')).toBe('false')
    instance().addSelection([byId('opt'), byId('img')])
    fixture.detectChanges()
    expect(byId('opt').getAttribute('aria-selected')).toBe('true')
    expect(byId('img').hasAttribute('aria-selected')).toBe(false)
  })

  it('throws a readable error outside dragSelect', () => {
    @Component({ imports: [DragSelectDirectives], template: `<i dsSelectable></i>` })
    class Orphan {}
    expect(() => TestBed.createComponent(Orphan)).toThrow(
      'dsSelectable must be used inside an element with the dragSelect directive.'
    )
  })
})

describe('values / programmatic selection', () => {
  type Photo = { id: string }
  const photos: Photo[] = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]

  @Component({
    imports: [DragSelectDirectives],
    template: `
      <div dragSelect>
        @for (photo of photos(); track photo.id) {
          <i [dsSelectable]="photo" [attr.data-id]="photo.id"></i>
        }
        <i dsSelectable data-id="plain"></i>
      </div>
    `,
  })
  class Photos {
    @ViewChild(DragSelectDirective) ds!: DragSelectDirective
    photos = signal(photos)
  }

  it('returns the values of selected items, elements for items without one', () => {
    const { ds, instance } = setup(Photos)
    instance().setSelection([byId('c'), byId('plain'), byId('a')])
    expect(ds().selection()).toEqual([photos[2], byId('plain'), photos[0]])
    expect(ds().dataOf([byId('b')])).toEqual([photos[1]])
  })

  it('selects by value or element, ignoring unknown values', () => {
    const { ds } = setup(Photos)
    ds().setSelection([photos[1], byId('plain'), { id: 'b' }])
    expect(ds().selectedElements()).toEqual([byId('b'), byId('plain')])

    ds().select([photos[0]])
    expect(ds().selection()).toEqual([photos[1], byId('plain'), photos[0]])

    ds().deselect([photos[1], byId('plain')])
    expect(ds().selection()).toEqual([photos[0]])

    ds().selectAll()
    expect(ds().selectedElements()).toHaveLength(4)

    ds().clearSelection()
    expect(ds().selectedElements()).toEqual([])
  })

  it('two-way binds the selection', () => {
    @Component({
      imports: [DragSelectDirectives],
      template: `
        <div dragSelect [(dsSelection)]="selected">
          @for (photo of photos(); track photo.id) {
            <i [dsSelectable]="photo" [attr.data-id]="photo.id"></i>
          }
        </div>
      `,
    })
    class TwoWay {
      @ViewChild(DragSelectDirective) ds!: DragSelectDirective<Photo>
      photos = signal<Photo[]>([])
      selected = signal<Photo[]>([photos[1]])
    }
    const { fixture, ds, instance } = setup(TwoWay)
    const host = fixture.componentInstance

    // set before the items exist: applied once they render
    expect(instance().getSelection()).toEqual([])
    host.photos.set(photos)
    fixture.detectChanges()
    expect(ds().selectedElements()).toEqual([byId('b')])
    expect(host.selected()).toEqual([photos[1]])

    // DragSelect -> parent
    instance().addSelection(byId('c'))
    expect(host.selected()).toEqual([photos[1], photos[2]])

    // parent -> DragSelect, without echoing a change back
    const changes = vi.fn()
    ds().selection.subscribe(changes)
    host.selected.set([photos[0]])
    fixture.detectChanges()
    expect(ds().selectedElements()).toEqual([byId('a')])
    expect(host.selected()).toEqual([photos[0]])
    expect(changes).not.toHaveBeenCalled() // the parent's value is not echoed back

    ds().clearSelection()
    expect(host.selected()).toEqual([])
  })

  it('follows value changes and drops removed items', () => {
    const { fixture, ds } = setup(Photos)
    ds().selectAll()
    const renamed = { id: 'a' }
    fixture.componentInstance.photos.set([renamed])
    fixture.detectChanges()
    // static items init before @for items, so don't rely on the order
    expect(new Set(ds().selection())).toEqual(new Set([renamed, byId('plain')]))
  })
})

describe('events', () => {
  it('emits outputs', () => {
    const ends: boolean[] = []
    const selected: string[] = []
    @Component({
      imports: [DragSelectDirectives],
      template: `
        <div dragSelect (dsEnd)="ends.push($event.isDragging)" (dsSelect)="selected.push($any($event.item).dataset.id)">
          <i dsSelectable data-id="x"></i>
        </div>
      `,
    })
    class Outputs {
      @ViewChild(DragSelectDirective) ds!: DragSelectDirective
      ends = ends
      selected = selected
    }
    const { instance } = setup(Outputs)
    instance().addSelection(byId('x'))
    instance().clearSelection(true)
    expect(selected).toEqual(['x'])
    expect(ends).toEqual([false])
  })

  it('injectDragSelectEvent subscribes for the lifetime of the caller only', () => {
    const calls: string[] = []

    @Component({ selector: 'listener', template: '' })
    class Listener {
      constructor() {
        // runs before the instance exists: must attach once it does
        injectDragSelectEvent('DS:end', () => calls.push('listener'))
      }
    }

    @Component({ selector: 'other', template: '' })
    class Other {
      constructor() {
        injectDragSelectEvent('DS:end', () => calls.push('other'))
      }
    }

    @Component({
      imports: [DragSelectDirectives, Listener, Other],
      template: `<div dragSelect>@if (show()) {<listener />}<other /></div>`,
    })
    class Host {
      @ViewChild(DragSelectDirective) ds!: DragSelectDirective
      show = signal(true)
    }

    const { fixture, instance } = setup(Host)
    instance().clearSelection(true)
    expect(calls.sort()).toEqual(['listener', 'other'])

    calls.length = 0
    fixture.componentInstance.show.set(false)
    fixture.detectChanges()
    instance().clearSelection(true)
    expect(calls).toEqual(['other'])
  })

  it('works on a component tag, with projected selectables', () => {
    @Component({ selector: 'list', template: '<ul><ng-content /></ul>' })
    class ListComp {}
    @Component({
      imports: [DragSelectDirectives, ListComp],
      template: `<list dragSelect><li dsSelectable data-id="p"></li></list>`,
    })
    class Host {
      @ViewChild(DragSelectDirective) ds!: DragSelectDirective
    }
    const { instance } = setup(Host)
    expect(instance().getSelectables()).toEqual([byId('p')])
  })

  it('child components can inject the directive', () => {
    let injected: DragSelectDirective | undefined
    @Component({ selector: 'child', template: '' })
    class Child {
      constructor() {
        injected = inject(DragSelectDirective)
      }
    }
    @Component({ imports: [DragSelectDirectives, Child], template: `<div dragSelect><child /></div>` })
    class Host {
      @ViewChild(DragSelectDirective) ds!: DragSelectDirective
    }
    const { ds } = setup(Host)
    expect(injected).toBe(ds())
  })
})

describe('dsArea / dsDropZone', () => {
  it('sets the area and resets it to document on destroy', () => {
    @Component({
      imports: [DragSelectDirectives],
      template: `<div dragSelect>@if (show()) {<section dsArea data-id="area"></section>}</div>`,
    })
    class Area {
      @ViewChild(DragSelectDirective) ds!: DragSelectDirective
      show = signal(true)
    }
    const { fixture, instance } = setup(Area)
    expect(instance().stores.SettingsStore.s.area).toBe(byId('area'))
    fixture.componentInstance.show.set(false)
    fixture.detectChanges()
    expect(instance().stores.SettingsStore.s.area).toBe(document)
  })

  it('works on the same element as dragSelect, whatever the attribute order', () => {
    @Component({
      imports: [DragSelectDirectives],
      template: `<section dsArea dragSelect data-id="area"></section>`,
    })
    class SameElement {
      @ViewChild(DragSelectDirective) ds!: DragSelectDirective
    }
    const { instance } = setup(SameElement)
    expect(instance().stores.SettingsStore.s.area).toBe(byId('area'))
  })

  it('registers drop zones, keeping ones passed in settings, and follows id changes', () => {
    const staticZone = document.createElement('div')
    @Component({
      imports: [DragSelectDirectives],
      template: `
        <div [dragSelect]="{ dropZones: [{ id: 'static', element: staticZone }] }">
          @for (zone of zones(); track $index) {
            <div [dsDropZone]="zone" [attr.data-id]="'zone-' + $index"></div>
          }
        </div>
      `,
    })
    class Zones {
      @ViewChild(DragSelectDirective) ds!: DragSelectDirective
      staticZone = staticZone
      zones = signal(['trash', 'archive'])
    }
    const { fixture, instance } = setup(Zones)
    const zones = () => instance().stores.SettingsStore.s.dropZones
    const ids = () => zones().map((zone) => zone.id)

    expect(ids()).toEqual(['static', 'trash', 'archive'])
    expect(zones().find((z) => z.id === 'trash')?.element).toBe(byId('zone-0'))

    fixture.componentInstance.zones.set(['bin', 'archive'])
    fixture.detectChanges()
    expect(ids()).toEqual(['static', 'archive', 'bin'])

    fixture.componentInstance.zones.set(['bin'])
    fixture.detectChanges()
    expect(ids()).toEqual(['static', 'bin'])
  })

  it('keeps registered zones and area when settings change', () => {
    @Component({
      imports: [DragSelectDirectives],
      template: `
        <div [dragSelect]="settings()" dsArea data-id="area">
          <div dsDropZone="trash"></div>
        </div>
      `,
    })
    class Live {
      @ViewChild(DragSelectDirective) ds!: DragSelectDirective
      settings = signal<DragSelectSettings>({})
    }
    const { fixture, instance } = setup(Live)
    const s = () => instance().stores.SettingsStore.s
    fixture.componentInstance.settings.set({ area: document.body, dropZones: [] })
    fixture.detectChanges()
    expect(s().area).toBe(byId('area'))
    expect(s().dropZones.map((zone) => zone.id)).toEqual(['trash'])
  })
})
