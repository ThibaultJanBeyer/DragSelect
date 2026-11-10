# @dragselect/react

React hooks for [DragSelect](https://DragSelect.com): drag-to-select and drag-and-drop for your components. No refs to juggle, no manual subscribe/unsubscribe.

```bash
npm i dragselect @dragselect/react
```

## Quick start

```tsx
import {
  DragSelectProvider,
  useSelectable,
  useSelection,
} from '@dragselect/react'

function Gallery({ photos }) {
  return (
    <DragSelectProvider>
      {photos.map((photo) => (
        <Photo key={photo.id} photo={photo} />
      ))}
      <Toolbar />
    </DragSelectProvider>
  )
}

function Photo({ photo }) {
  const ref = useSelectable()
  return <img ref={ref} src={photo.url} data-id={photo.id} /> // selected ones get the .ds-selected class
}

function Toolbar() {
  const selected = useSelection<HTMLImageElement>()
  const selectedIds = selected.map((el) => el.dataset.id)
  return <span>{selectedIds.length} selected</span>
}
```

## API

### `<DragSelectProvider settings?>`

Creates one DragSelect instance for everything inside it and stops it on unmount. Accepts any [DragSelect setting](https://dragselect.com/docs/API/Settings). Settings are read once; change them later with `useDragSelect()?.setSettings({...})`.

```tsx
<DragSelectProvider settings={{ selectedClass: 'is-selected', draggability: false }}>
  <FileList />
</DragSelectProvider>
```

### `useSelectable()` → `ref`

Makes the element selectable while the component is mounted. Selecting does not re-render the item: style it with the `ds-selected` class (or your `selectedClass`).

```tsx
function File({ file }) {
  const ref = useSelectable()
  return <li ref={ref} data-id={file.id}>{file.name}</li>
}
```

### `useSelection<E>()` → `E[]`

The selected elements, as DragSelect holds them. Only the component calling it re-renders when the selection changes. To get your ids back, put them on the element (`data-id={id}`) and read `el.dataset.id`.

```tsx
function DeleteButton({ onDelete }) {
  const selected = useSelection<HTMLLIElement>()
  return (
    <button disabled={!selected.length} onClick={() => onDelete(selected.map((el) => el.dataset.id))}>
      Delete {selected.length}
    </button>
  )
}
```

### `useDragSelectEvent(eventName, callback)`

Subscribes to any [DragSelect event](https://dragselect.com/docs/API/Events) for the component's lifetime. The latest callback is always called, so you don't need `useCallback`.

```tsx
useDragSelectEvent('DS:start', ({ items }) => {
  console.log('started with', items.length, 'selected')
})
```

### `useDragSelectArea()` → `ref`

Restricts selecting and dragging to this element. Without it, the whole document is the area.

```tsx
function FileList({ files }) {
  const ref = useDragSelectArea()
  return (
    <ul ref={ref}>
      {files.map((file) => <File key={file.id} file={file} />)}
    </ul>
  )
}
```

### `useDropZone(id)` → `ref`

Registers the element as a drop zone. The `id` is DragSelect's name for the zone: it comes back as `dropTarget.id` in events, works with `ds.getItemsDroppedByZoneId(id)`, and suffixes the classes items get (e.g. `ds-dropped-target-archive`).

```tsx
function Folder({ id, name, onMove }) {
  const ref = useDropZone(id)

  // `items` is everything that was dragged: one element or the whole selection
  useDragSelectEvent('DS:end', ({ items, isDragging, dropTarget }) => {
    if (!isDragging || dropTarget?.id !== id) return
    onMove(items.map((el) => el.dataset.id))
  })

  return <div ref={ref}>📁 {name}</div>
}

// used as:
<Folder id="archive" name="Archive" onMove={(ids) => archive(ids)} />
```

```css
/* the zone while a drag is in progress */
.ds-dropzone-ready { outline: 2px dashed }
/* items that were dropped into the "archive" zone */
.ds-dropped-target-archive { opacity: 0.5 }
```

### `useDragSelect()` → `DragSelect | undefined`

The raw instance, for anything the hooks don't cover. It is `undefined` on the first render and during SSR.

```tsx
function SelectAll() {
  const ds = useDragSelect()
  return <button onClick={() => ds?.setSelection(ds.getSelectables())}>Select all</button>
}
```

## Notes

- Versions follow DragSelect: use `@dragselect/react@X.Y.Z` with `dragselect@X.Y.Z`.
- Works with React 18+, Next.js App Router (the bundle ships `'use client'`), and SSR.
- The returned refs are plain functions: you can also call them yourself, e.g. `ref(element)` once an animation is done.

## License

GPL-3.0 or [commercial license](https://dragselect.com/licenses), the same as DragSelect.
