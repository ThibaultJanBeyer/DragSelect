import {
  Directive,
  DestroyRef,
  ElementRef,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Signal,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import DragSelect from 'dragselect'
import type { DSInputElement, DSPubCallback, Settings } from 'dragselect'

export type { DSInputElement, DSPubCallback } from 'dragselect'
export type DragSelectInstance = DragSelect<DSInputElement>
export type DragSelectSettings = Settings<DSInputElement>
/** The name of a DragSelect event, like `'DS:end'`. */
export type DragSelectEventName = Parameters<DragSelectInstance['subscribe']>[0]
/** What a DragSelect event gives you, e.g. `DragSelectEvent<'DS:end'>`. */
export type DragSelectEvent<K extends DragSelectEventName> = Parameters<DSPubCallback<K>>[0]

/** A `dsSelectable` item: its element and the value you gave it. */
type Item = { readonly element: DSInputElement; readonly data: Signal<unknown> }

/** True if both lists have the same things in them, in any order. */
const sameItems = (a: readonly unknown[], b: readonly unknown[]) => {
  const set = new Set(b)
  return a.length === b.length && a.every((item) => set.has(item))
}

/**
 * Put this on a wrapper. Everything inside it shares one DragSelect.
 * Pass any DragSelect settings. If they change, DragSelect gets the new ones.
 *
 * ```html
 * <div dragSelect [(dsSelection)]="selectedPhotos" #ds="dragSelect">
 *   {{ ds.selection().length }} selected
 * </div>
 * ```
 */
@Directive({ selector: '[dragSelect]', exportAs: 'dragSelect' })
export class DragSelectDirective<T = unknown> implements OnInit, OnDestroy {
  /** DragSelect settings. A plain `dragSelect` attribute uses the defaults. */
  readonly settings = input<DragSelectSettings | '' | undefined>(undefined, { alias: 'dragSelect' })

  /**
   * What's selected: the values you gave `[dsSelectable]` (or the element, if you gave none).
   * Bind it with `[(dsSelection)]`. Set it to change the selection. Values whose item isn't on the page yet get selected as soon as it shows up.
   */
  readonly selection = model<T[]>([], { alias: 'dsSelection' })

  /** The user started selecting or dragging. */
  readonly dsStart = output<DragSelectEvent<'DS:start'>>()
  /** The user let go. `isDragging` tells you if they moved items or selected them. */
  readonly dsEnd = output<DragSelectEvent<'DS:end'>>()
  /** An element got selected. */
  readonly dsSelect = output<DragSelectEvent<'DS:select'>>()
  /** An element got unselected. */
  readonly dsUnselect = output<DragSelectEvent<'DS:unselect'>>()

  private readonly zone = inject(NgZone)
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  private ds?: DragSelectInstance
  /** Callbacks waiting for `ds` to be created. */
  private readonly waiting = new Set<(ds: DragSelectInstance) => void>()

  // Bumped on every DragSelect select/unselect. Reading the selection itself is O(n), so it's
  // done lazily and once per batch instead of once per element.
  private readonly selectionVersion = signal(0)
  private writeScheduled = false
  // A plain Map plus a counter: copying the Map on every change is too slow with thousands of items.
  private readonly itemMap = new Map<DSInputElement, Item>()
  private readonly itemsVersion = signal(0)
  /** Items destroyed in this tick, removed together in a microtask. */
  private readonly removedItems = new Set<Item>()
  /** DragSelect's selection, as values. */
  private readonly selectedValues = computed(() => this.dataOf<T>(this.selectedElements()))
  /**
   * The last `selection` that came from DragSelect. If `selection` is something else, the parent set it and we still have to select it.
   */
  private fromDragSelect?: readonly unknown[]
  /** True while we select what the parent asked for, so we don't write it back half done. */
  private applying = false

  /** The element from `dsArea`. It wins over the `area` setting. */
  private area?: HTMLElement
  private appliedSettings?: DragSelectSettings | ''

  /** The selected DOM elements. */
  readonly selectedElements: Signal<DSInputElement[]> = computed(() => {
    this.selectionVersion()
    return this.ds?.getSelection() ?? []
  })
  /** @internal For `dsSelectable`. */
  readonly _elementSet = computed(() => new Set(this.selectedElements()))

  /**
   * The DragSelect instance, for anything this directive doesn't cover.
   * It's `undefined` on the server, before `ngOnInit` and after destroy.
   */
  get instance(): DragSelectInstance | undefined {
    return this.ds
  }

  constructor() {
    // Settings changed: pass them on. (The first ones are used to create DragSelect.)
    effect(() => {
      const settings = this.settings()
      untracked(() => {
        const ds = this.ds
        if (!ds || settings === this.appliedSettings) return
        const before = this.appliedSettings || {}
        this.appliedSettings = settings
        const { dropZones, ...rest } = this.userSettings()
        this.outside(() => {
          ds.setSettings({ ...rest, ...(this.area && { area: this.area }) })
          // Only swap the zones from the settings, so the ones from `dsDropZone` stay.
          if (dropZones !== before.dropZones) {
            ds.removeDropZones((before.dropZones ?? []).map((zone) => zone.element))
            if (dropZones) ds.addDropZones(dropZones)
          }
        })
      })
    })

    // The parent set `selection`: select those items. Runs again when items come, go or change,
    // so values whose item wasn't there yet get selected when it shows up.
    effect(() => {
      const values = this.selection()
      this.items().forEach((item) => item.data()) // also when an item's value changes
      untracked(() => {
        if (values !== this.fromDragSelect) this.apply(values)
      })
    })

    // A selected item got a new value (e.g. the list was reloaded): update `selection`.
    effect(() => {
      this.selectedValues()
      untracked(() => {
        if (this.selection() === this.fromDragSelect) this.writeSelection()
      })
    })
  }

  ngOnInit() {
    if (!this.isBrowser) return
    this.appliedSettings = this.settings()
    const settings = { ...this.userSettings(), ...(this.area && { area: this.area }) }
    // Outside the zone, so moving the mouse doesn't run change detection.
    this.ds = this.zone.runOutsideAngular(() => new DragSelect<DSInputElement>(settings))

    const changed = () => {
      this.selectionVersion.update((version) => version + 1)
      if (!this.applying) this.scheduleWrite()
    }
    this.on('DS:select', changed)
    this.on('DS:unselect', changed)
    this.on('DS:start', (e) => this.dsStart.emit(e))
    this.on('DS:end', (e) => {
      // With the keyboard, DS:end comes right after the selects: write `selection` first.
      if (this.writeScheduled) this.writeSelection()
      this.dsEnd.emit(e)
    })
    this.on('DS:select', (e) => this.dsSelect.emit(e))
    this.on('DS:unselect', (e) => this.dsUnselect.emit(e))

    const waiting = [...this.waiting]
    this.waiting.clear()
    waiting.forEach((callback) => this.outside(() => callback(this.ds!)))
  }

  ngOnDestroy() {
    const ds = this.ds
    // Forget it first: stopping unselects everything, and that must not reach `selection`.
    this.ds = undefined
    ds?.stop()
    this.waiting.clear()
  }

  /**
   * Turns elements into the values you gave `[dsSelectable]`.
   * Handy for an event's `items`. Elements without a value stay elements.
   */
  dataOf<R = T>(elements: readonly DSInputElement[]): R[] {
    const items = this.items()
    return elements.map((el) => (items.get(el)?.data() ?? el) as R)
  }

  /** Adds items to the selection. Pass values (compared with `===`) or elements. */
  select(values: readonly unknown[]): void {
    this.ds?.addSelection(this.toElements(values), false, true)
    this.writeSelection()
  }

  /** Removes items from the selection. Pass values or elements. */
  deselect(values: readonly unknown[]): void {
    this.ds?.removeSelection(this.toElements(values))
    this.writeSelection()
  }

  /** Replaces the selection. Same as `selection.set(values)`. */
  setSelection(values: readonly T[]): void {
    this.selection.set([...values])
    this.apply(values)
  }

  /** Selects everything. */
  selectAll(): void {
    this.ds?.addSelection(this.ds.getSelectables(), false, true)
    this.writeSelection()
  }

  /** Selects nothing. */
  clearSelection(): void {
    this.ds?.clearSelection()
    this.writeSelection()
  }

  /**
   * Calls `callback` with the DragSelect instance once it exists, or right away if it does. Never on the server. Returns a function to cancel it.
   */
  whenReady(callback: (ds: DragSelectInstance) => void): () => void {
    const ds = this.ds
    if (ds) {
      this.outside(() => callback(ds))
      return () => {}
    }
    if (this.isBrowser) this.waiting.add(callback)
    return () => void this.waiting.delete(callback)
  }

  /**
   * Listens to any DragSelect event. Returns a function to stop listening.
   * You can call it before DragSelect exists. In components, `injectDragSelectEvent` is easier.
   */
  on<K extends DragSelectEventName>(eventName: K, callback: DSPubCallback<K>): () => void {
    let subscribedTo: DragSelectInstance | undefined
    const handler: DSPubCallback<K> = (event) => {
      // Ignore what an instance we already let go of says while it stops.
      // Run in the zone, so Angular notices what the callback changes.
      if (subscribedTo === this.ds) this.zone.run(() => callback(event))
    }
    const cancel = this.whenReady((ds) => {
      subscribedTo = ds
      ds.subscribe(eventName, handler)
    })
    return () => {
      cancel()
      subscribedTo?.unsubscribe(eventName, handler)
    }
  }

  /** @internal For `dsSelectable`. */
  _addItem(item: Item): void {
    this.itemMap.set(item.element, item)
    this.itemsVersion.update((version) => version + 1)
    this.whenReady((ds) => {
      if (this.itemMap.get(item.element) === item) ds.addSelectables(item.element)
    })
  }

  /**
   * @internal For `dsSelectable`.
   * Waits a microtask: when the whole page goes away, the items are destroyed before `dragSelect`,
   * and unselecting them one by one would empty `selection` on the way out. It also batches the
   * removal when a big list goes away.
   */
  _removeItem(item: Item): void {
    this.removedItems.add(item)
    if (this.removedItems.size === 1) queueMicrotask(() => this.flushRemovedItems())
  }

  /** @internal For `dsArea`. `undefined` goes back to the `area` setting. */
  _setArea(element: HTMLElement | undefined): void {
    this.area = element
    const ds = this.ds
    // only with an instance: there is no `document` on the server
    if (ds) this.outside(() => ds.setSettings({ area: element ?? this.userSettings().area ?? document }))
  }

  /** The items, read so that signals notice when they change. */
  private items(): ReadonlyMap<DSInputElement, Item> {
    this.itemsVersion()
    return this.itemMap
  }

  private flushRemovedItems() {
    const removed = [...this.removedItems]
    this.removedItems.clear()
    const selected = new Set(this.ds?.getSelection())
    // Values of removed items that were selected. If a new item has the same value, it's the same
    // thing re-rendered (e.g. `track` by object after an immutable update), so it stays selected.
    const keep = removed
      .filter((item) => selected.has(item.element))
      .flatMap((item) => (item.data() === undefined ? [] : [item.data()]))
    removed.forEach((item) => this.itemMap.delete(item.element))
    this.itemsVersion.update((version) => version + 1)
    // Still running, so the items were removed from a list that stays: unselect them.
    this.outside(() => {
      this.ds?.removeSelectables(removed.map((item) => item.element), true)
      if (keep.length) this.ds?.addSelection(this.toElements(keep), false, true)
    })
  }

  /**
   * DragSelect adds window and DOM listeners. Outside the zone, so with zone.js they don't
   * trigger change detection on every scroll or resize.
   */
  private outside<R>(fn: () => R): R {
    return this.zone.runOutsideAngular(fn)
  }

  /** Writes `selection` once, after DragSelect is done with a batch of selects and unselects. */
  private scheduleWrite() {
    if (this.writeScheduled) return
    this.writeScheduled = true
    queueMicrotask(() => {
      this.writeScheduled = false
      if (this.ds) this.writeSelection()
    })
  }

  /** Copies DragSelect's selection into `selection` (which tells the parent). */
  private writeSelection() {
    if (!this.ds) return
    const values = this.selectedValues()
    if (!sameItems(values, this.selection())) this.selection.set(values)
    this.fromDragSelect = this.selection()
  }

  /** Selects exactly these values in DragSelect. Only touches what changed. */
  private apply(values: readonly unknown[]) {
    if (!this.ds) return
    const wanted = new Set(this.toElements(values))
    const current = new Set(this.ds.getSelection())
    const remove = [...current].filter((el) => !wanted.has(el))
    const add = [...wanted].filter((el) => !current.has(el))
    if (!remove.length && !add.length) return
    this.applying = true
    try {
      if (remove.length) this.ds.removeSelection(remove)
      if (add.length) this.ds.addSelection(add, false, true)
    } finally {
      this.applying = false
    }
  }

  /** Finds the elements for values (or elements). Unknown values are skipped. */
  private toElements(values: readonly unknown[]): DSInputElement[] {
    const elementOf = new Map<unknown, DSInputElement>()
    this.items().forEach((item, el) => {
      elementOf.set(el, el)
      if (item.data() !== undefined) elementOf.set(item.data(), el)
    })
    return values.flatMap((value) => elementOf.get(value) ?? [])
  }

  private userSettings(): DragSelectSettings {
    return this.settings() || {}
  }
}

/** Gets the closest `dragSelect`, with a clear error if there is none. */
function injectDragSelect(name: string): DragSelectDirective {
  const ds = inject(DragSelectDirective, { optional: true })
  if (!ds) throw new Error(`${name} must be used inside an element with the dragSelect directive.`)
  return ds
}

/** The roles where `aria-selected` is allowed. */
const ARIA_SELECTED_ROLES = new Set([
  'option',
  'gridcell',
  'row',
  'tab',
  'treeitem',
  'columnheader',
  'rowheader',
])

/**
 * Makes an element selectable. Give it the value you want back in `selection()`,
 * like `[dsSelectable]="photo"` or `[dsSelectable]="photo.id"`.
 * With `role="option"` (and similar roles) it also keeps `aria-selected` up to date.
 *
 * ```html
 * <li [dsSelectable]="file" #item="dsSelectable" [class.active]="item.selected()">
 *   {{ file.name }}
 * </li>
 * ```
 */
@Directive({
  selector: '[dsSelectable]',
  exportAs: 'dsSelectable',
  host: { '[attr.aria-selected]': '_ariaSelected()' },
})
export class SelectableDirective<T = unknown> implements OnInit, OnDestroy {
  /** The item's value. A plain `dsSelectable` attribute (empty string) means no value. */
  readonly value = input<T | '' | undefined>(undefined, { alias: 'dsSelectable' })

  private readonly ds = injectDragSelect('dsSelectable')
  readonly element: DSInputElement = inject(ElementRef).nativeElement
  /** The item's value, or `undefined` if it has none. */
  readonly data = computed(() => {
    const value = this.value()
    return value === '' ? undefined : (value as T | undefined)
  })
  /** Whether the item is selected. */
  readonly selected = computed(() => this.ds._elementSet().has(this.element))
  /** @internal `null` removes the attribute, for roles that don't allow it. */
  readonly _ariaSelected = computed(() => {
    const role = this.element.getAttribute('role')
    return role && ARIA_SELECTED_ROLES.has(role) ? this.selected() : null
  })

  ngOnInit() {
    this.ds._addItem(this)
  }

  ngOnDestroy() {
    this.ds._removeItem(this)
  }
}

/**
 * Only allows selecting and dragging inside this element.
 * It can be on the same element as `dragSelect`.
 */
@Directive({ selector: '[dsArea]' })
export class DragSelectAreaDirective implements OnInit, OnDestroy {
  private readonly ds = injectDragSelect('dsArea')
  private readonly element: HTMLElement = inject(ElementRef).nativeElement

  ngOnInit() {
    this.ds._setArea(this.element)
  }

  ngOnDestroy() {
    this.ds._setArea(undefined)
  }
}

/**
 * Makes an element a drop zone. The id comes back as `dropTarget.id` in events, and in class names like `ds-dropped-target-archive`.
 *
 * ```html
 * <div dsDropZone="archive">📁 Archive</div>
 * ```
 */
@Directive({ selector: '[dsDropZone]' })
export class DropZoneDirective implements OnChanges, OnDestroy {
  readonly id = input.required<string>({ alias: 'dsDropZone' })

  private readonly ds = injectDragSelect('dsDropZone')
  private readonly element: DSInputElement = inject(ElementRef).nativeElement
  private cancel = () => {}

  ngOnChanges() {
    // A zone with the same element gets replaced, so a new id just renames it.
    this.cancel()
    this.cancel = this.ds.whenReady((ds) => ds.addDropZones({ id: this.id(), element: this.element }))
  }

  ngOnDestroy() {
    this.cancel()
    this.ds.instance?.removeDropZones(this.element)
  }
}

/**
 * Listens to a DragSelect event until the component is destroyed.
 * Call it in a constructor or a field, inside a `dragSelect`.
 *
 * ```ts
 * constructor() {
 *   injectDragSelectEvent('DS:end', ({ items, isDragging }) => console.log(items))
 * }
 * ```
 */
export function injectDragSelectEvent<K extends DragSelectEventName>(
  eventName: K,
  callback: DSPubCallback<K>
): void {
  const stop = injectDragSelect('injectDragSelectEvent').on(eventName, callback)
  inject(DestroyRef).onDestroy(stop)
}

/** All the directives, for your component's `imports`. */
export const DragSelectDirectives = [
  DragSelectDirective,
  SelectableDirective,
  DragSelectAreaDirective,
  DropZoneDirective,
] as const
