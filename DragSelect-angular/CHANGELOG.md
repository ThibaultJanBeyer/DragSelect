# Changelog

## NEXT

First release. Versions follow `dragselect`: `@dragselect/angular@X.Y.Z` pairs with `dragselect@X.Y.Z`.

- `[dragSelect]`: one DragSelect instance per element (or `<ng-container>`). Settings changes are applied live. Two-way bindable selection of your values with `[(dsSelection)]` (also `selection()`), plus `selectedElements()`, `dataOf()`, `select()`, `deselect()`, `setSelection()`, `selectAll()`, `clearSelection()`, `instance`, `on()`, `whenReady()` and the `(dsStart)`, `(dsEnd)`, `(dsSelect)`, `(dsUnselect)` outputs.
- `[dsSelectable]="value"`: registers an element and its value while it exists. `selected()` and `data()` signals via `#item="dsSelectable"`. Keeps `aria-selected` up to date on roles that support it.
- `[dsArea]`: sets the drag area.
- `[dsDropZone]="id"`: registers a drop zone.
- `injectDragSelectEvent(name, callback)`: subscribes for the lifetime of the calling component.
- `DragSelectDirectives`: all directives, for `imports`.
- Zoneless and zone.js. SSR-safe.
