# Changelog

## 3.2.2

- no changes, version bump, see core release notes

## 3.2.1

- Version bump to match `dragselect`. README links to the drop zones and accessibility guides.

## 3.2.0

- Fix: an area from `useDragSelectArea` that grows (e.g. after your data loads) now works everywhere in it. Before, clicks in the new part were ignored.
- `useDropZone` adds and removes only its own zone now, so other zones keep what was dropped in them.
- Requires the matching `dragselect` version, which has the area fix and the new `addDropZones`/`removeDropZones`.

## 3.1.6

- No API changes. Requires `dragselect@^3.1.6` (scroll detection fixes, see the DragSelect changelog).

## 3.1.5

First release. Versions follow `dragselect`: `@dragselect/react@X.Y.Z` pairs with `dragselect@X.Y.Z`.

- `<DragSelectProvider settings>`: one DragSelect instance per provider. SSR-safe and StrictMode-safe. Settings are read once.
- `useSelectable()`: registers an element while mounted and returns its ref.
- `useSelection<E>()`: the selected elements, re-rendering on change.
- `useDragSelectEvent(name, callback)`: subscribes for the component's lifetime and always calls the latest callback.
- `useDragSelectArea()`: ref that sets the drag area.
- `useDropZone(id)`: ref that registers a drop zone.
- `useDragSelect()`: the raw instance.
