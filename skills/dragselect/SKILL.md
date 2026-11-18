---
name: dragselect
description: Build drag-to-select and drag-and-drop UIs with DragSelect (npm `dragselect`, `@dragselect/react`, `@dragselect/angular`). Use when the user mentions DragSelect, wants to select elements by dragging a box (rubber band / lasso / marquee selection) like on a desktop, select multiple items with Shift/Ctrl, drag selected items around, drop them on drop zones (folders, trash, columns), or asks about DragSelect settings, events (`DS:end`, `DS:select`…), methods, CSS classes or keyboard accessibility.
---

# DragSelect

DragSelect lets users select elements by dragging a box around them, like on a desktop, and then drag and drop them. It's plain JavaScript with no dependencies. There are official bindings:

| You use | Install | Read first |
| --- | --- | --- |
| Plain JS, Vue, Svelte, anything | `npm i dragselect` | `node_modules/dragselect/docs/README.md` |
| React 18+ | `npm i dragselect @dragselect/react` | `node_modules/@dragselect/react/README.md` |
| Angular 19+ | `npm i dragselect @dragselect/angular` | `node_modules/@dragselect/angular/README.md` |

The wrapper versions match DragSelect: `@dragselect/react@X.Y.Z` goes with `dragselect@X.Y.Z`.

## Don't trust your memory

DragSelect changed a lot between versions, and most code online (and in your training data) is for v2. Older versions took a `callback` setting, and v2 had events like `callback`, `elementselect` or `dragmove`. Since v3 there are only events, all named `DS:*`, e.g. `ds.subscribe('DS:end', ({ items, isDragging, dropTarget }) => {})`.

Check every API against the installed version before you use it:

1. `node_modules/dragselect/package.json` for the version.
2. `node_modules/dragselect/docs/`: the docs of exactly this version, as Markdown. Start with `README.md`, then `API/Settings.md`, `API/Events.md`, `API/Methods.md`.
3. `node_modules/dragselect/dist/DragSelect.d.ts` and `dist/types.d.ts` for the exact types.
4. If it isn't installed: https://dragselect.com/llms.txt lists every page. Add `.md` to any docs URL for Markdown, e.g. https://dragselect.com/docs/API/Settings.md

If you can't find something there, say so instead of guessing.

## Prefer buttons for the items

When you write new markup, prefer `<button type="button">` for the selectable items. It's not required: if the items already exist as other elements, or the user wants something else, keep them, but mention that they won't work with the keyboard. DragSelect doesn't manage focus, and a `<div>`, `<li>` or `<img>` can't be focused. With buttons:

- Tab focuses an item, Enter or Space selects it (Shift/Ctrl/Cmd + Enter adds to the selection), and the arrow keys move the selection (`keyboardDrag`, on by default). Moving onto a drop zone drops there.
- `type="button"` keeps it from submitting a surrounding form.

```html
<!-- plain JS -->
<button type="button" class="item" data-id="1">File 1</button>
```

```tsx
// React
const ref = useSelectable()
return <button type="button" ref={ref} className="item" data-id={file.id}>{file.name}</button>
```

```html
<!-- Angular -->
<button type="button" class="item" [dsSelectable]="file">{{ file.name }}</button>
```

Put images and other content inside the button (`<button type="button"><img …/></button>`), not the other way around. Reset the button look in CSS and keep a visible focus style:

```css
.item { border: 0; padding: 0; font: inherit; color: inherit; background: none; }
.item:focus-visible { outline: 2px solid; }
.item.ds-selected { /* selected look */ }
```

## Things that are easy to get wrong

- **Use the wrapper for React and Angular.** Don't call `new DragSelect()` in a `useEffect` or `ngOnInit` yourself. The wrappers handle creating it, cleaning up, re-renders, SSR and change detection.
- **Plain JS: clean up.** Call `ds.stop()` when the view goes away, or DragSelect keeps listening on the page.
- **Limit the area.** Without `area`, DragSelect listens to the whole document. Set `area` (React: `useDragSelectArea()`, Angular: `dsArea`) when the selection should only start inside a container. More than one DragSelect on a page: each one needs its own area, or they all react to every drag.
- **Buttons inside the area.** Pressing anywhere in the area starts a new selection, which clears the current one, so a "Delete selected" button inside the area would see an empty selection. Stop the press from reaching DragSelect:
  - plain JS: `button.addEventListener('mousedown', (e) => e.stopPropagation())`, and the same for `touchstart`
  - React: `onMouseDownCapture={(e) => e.stopPropagation()}` and `onTouchStartCapture`
  - Angular: `(mousedown)="$event.stopPropagation()"` and `(touchstart)`
  - with `usePointerEvents: true`, stop `pointerdown` instead
- **Drop zones.** `setSettings({ dropZones })` replaces all zones and resets what was dropped in them. To add or remove one zone, use `ds.addDropZones(...)` / `ds.removeDropZones(idOrElement)` (since 3.2.0). React: `useDropZone(id)`. Angular: `[dsDropZone]="id"`. Find out where things were dropped in `DS:end`: `if (isDragging && dropTarget?.id === 'trash')`.
- **Clicks vs drags.** `DS:end` fires after selecting and after dragging. `isDragging` tells you which one it was.
- **Styling.** DragSelect only sets classes, e.g. `ds-selected`, `ds-selector`, `ds-dropzone-ready`, `ds-dropped-target-<zoneId>`. Style those in CSS. The full list is in `docs/API/CSS-Classes.md`.
- **Keyboard.** Items that aren't buttons can't be used with the keyboard, see "Prefer buttons for the items" above.
- **Selection state in React.** `useSelection()` re-renders only the component that calls it. Selecting doesn't re-render the items, so don't put selection state into every item.

## After making changes

Run the type checker. Then test in a browser: drag a box, click, Shift+click, drag items onto a drop zone, and use the keyboard: Tab to an item, Enter to select it, arrow keys to move it onto a drop zone.
