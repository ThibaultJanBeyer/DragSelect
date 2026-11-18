# React

> The official React hooks: @dragselect/react.

DragSelect has official React bindings: [`@dragselect/react`](https://www.npmjs.com/package/@dragselect/react). Select things by dragging a box around them, like on your desktop, then you can even drag and drop them.

```bash
npm i dragselect @dragselect/react
```

## Quick start

```tsx
import { DragSelectProvider, useSelectable, useSelection } from '@dragselect/react'

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
  return <img ref={ref} src={photo.url} data-id={photo.id} />
}

function Toolbar() {
  const selected = useSelection()
  return <p>{selected.length} selected</p>
}
```

That's it. Drag over the photos and `Toolbar` shows how many are selected.

## 1. `DragSelectProvider` goes around your list

Everything inside it shares one DragSelect. You can pass any of the [settings](/docs/API/Settings):

```tsx
<DragSelectProvider settings={{ selectedClass: 'is-selected', draggability: false }}>
  <FileList />
</DragSelectProvider>
```

The settings are read once. To change them later, use `useDragSelect()?.setSettings({...})`.

## 2. `useSelectable` goes on each item

It gives you a ref. Put it on the element, and put whatever you need to find the item again on the element too, e.g. a `data-id`:

```tsx
function File({ file }) {
  const ref = useSelectable()
  return <li ref={ref} data-id={file.id}>{file.name}</li>
}
```

Selecting doesn't re-render your items. Selected items get the `ds-selected` class, so style them with CSS.

## 3. The selection

`useSelection` gives you the selected elements. Only the component that calls it re-renders when the selection changes. Read your ids back with `el.dataset.id`:

```tsx
function DeleteButton({ onDelete }) {
  const selected = useSelection<HTMLLIElement>()
  return (
    <button
      onMouseDownCapture={e => e.stopPropagation()}
      onTouchStartCapture={e => e.stopPropagation()}
      disabled={!selected.length}
      onClick={() => onDelete(selected.map((el) => el.dataset.id))}
    >
      Delete {selected.length}
    </button>
  )
}
```

To change the selection, `useDragSelect()` gives you the DragSelect instance itself. It has all the [methods](/docs/API/Methods), like `setSelection`, `addSelection` or `clearSelection`. It's `undefined` on the first render and on the server:

```tsx
function SelectAll() {
  const ds = useDragSelect()
  return <button onClick={() => ds?.setSelection(ds.getSelectables())}>Select all</button>
}
```

## 4. Events

`useDragSelectEvent` listens to any [DragSelect event](/docs/API/Events). It stops listening when the component unmounts, and it always calls your latest callback, so you don't need `useCallback`:

```tsx
useDragSelectEvent('DS:start', ({ items }) => console.log('started with', items.length))
```

## 5. Area and drop zones

By default you can start a selection anywhere on the page. `useDragSelectArea` limits it to one element:

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

`useDropZone` turns an element into a place you can drop things on. Here is a folder that tells you which files were dropped on it:

```tsx
function Folder({ id, name, onDrop }) {
  const ref = useDropZone(id)

  useDragSelectEvent('DS:end', ({ items, isDragging, dropTarget }) => {
    if (isDragging && dropTarget?.id === id) onDrop(items.map((el) => el.dataset.id))
  })

  return <div ref={ref}>📁 {name}</div>
}
```

The id also ends up in CSS classes, so you can style things. More about that in [drop zones](/docs/guided-examples/DropZones):

```css
/* zones while something is being dragged */
.ds-dropzone-ready { outline: 2px dashed }
/* items dropped on the "archive" zone */
.ds-dropped-target-archive { opacity: 0.5 }
```

## 6. Keyboard

If your items are `<button>`s, people can select them with Enter or Space and move them with the arrow keys. More in [accessibility](/docs/guided-examples/Accessibility).

## Good to know

- The version matches DragSelect. Use `@dragselect/react@X.Y.Z` with `dragselect@X.Y.Z`.
- Needs React 18 or newer.
- Works with the Next.js App Router (the package is marked `'use client'`) and with SSR.
- More than one `DragSelectProvider` on a page? Give each one a `useDragSelectArea`. Otherwise they all listen to the whole page and mess up each other's selection.
- The refs are plain functions, so you can also call them yourself, e.g. `ref(element)` once an animation is done.

You can see it in use on this site's [demo window](https://github.com/ThibaultJanBeyer/DragSelect/blob/main/www/src/components/win95/Body/Body.tsx).
