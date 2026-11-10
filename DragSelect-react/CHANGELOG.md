# Changelog

## 0.1.0

First release.

- `<DragSelectProvider settings>`: one DragSelect instance per provider. SSR-safe and StrictMode-safe. Settings are read once.
- `useSelectable()`: registers an element while mounted and returns its ref.
- `useSelection<E>()`: the selected elements, re-rendering on change.
- `useDragSelectEvent(name, callback)`: subscribes for the component's lifetime and always calls the latest callback.
- `useDragSelectArea()`: ref that sets the drag area.
- `useDropZone(id)`: ref that registers a drop zone.
- `useDragSelect()`: the raw instance.
