# @dragselect/angular

[DragSelect](https://DragSelect.com) for Angular. Select things by dragging a box around them, like on your desktop, then you can even drag and drop them.

```bash
npm i dragselect @dragselect/angular
```

## Quick start

```ts
import { Component, input, signal } from '@angular/core'
import { DragSelectDirectives } from '@dragselect/angular'

type Photo = { id: string; url: string }

@Component({
  selector: 'app-gallery',
  imports: [DragSelectDirectives],
  template: `
    <div dragSelect [(dsSelection)]="selected" #ds="dragSelect">
      @for (photo of photos(); track photo.id) {
        <img [dsSelectable]="photo" [src]="photo.url" />
      }
      <p>{{ selected().length }} selected</p>
      <button (click)="ds.selectAll()">Select all</button>
      <button (click)="ds.clearSelection()">Clear</button>
    </div>
  `,
})
export class Gallery {
  photos = input.required<Photo[]>()
  selected = signal<Photo[]>([])
}
```

That's it. Drag over the photos and `selected` fills up with your `Photo` objects.

## How it works

### 1. `dragSelect` goes on the wrapper

Everything inside it shares one DragSelect. You can pass any of the [settings](https://dragselect.com/docs/API/Settings):

```html
<ul [dragSelect]="{ selectedClass: 'is-selected', draggability: false }">…</ul>
```

If the settings change, DragSelect gets the new ones. If you don't want an extra element, use `<ng-container dragSelect>`.

### 2. `dsSelectable` goes on each item

Give it the thing you want back when it's selected. That can be the whole object or just an id:

```html
<li [dsSelectable]="file">{{ file.name }}</li>
<li [dsSelectable]="file.id">{{ file.name }}</li>
```

Items are compared with `===`. So if you reload your list and get new objects, use the id.

Selected items get the `ds-selected` class, so most of the time CSS is enough. If you need the state in the template, use `selected()`:

```html
<li [dsSelectable]="file" #item="dsSelectable" [class.active]="item.selected()">…</li>
```

### 3. The selection

`[(dsSelection)]` works like any two-way binding. DragSelect writes to it when the user selects something, and you can write to it to change the selection:

```ts
selected = signal<Photo[]>(savedSelection)
```

You can even set it before your data has loaded. The items get selected as soon as they show up.

From a component inside the wrapper, inject the directive:

```ts
@Component({
  selector: 'app-delete-button',
  template: `
    <button (mousedown)="$event.stopPropagation()" (touchstart)="$event.stopPropagation()" (click)="delete()">
      Delete {{ ds.selection().length }}
    </button>
  `,
})
export class DeleteButton {
  ds = inject<DragSelectDirective<FileItem>>(DragSelectDirective)

  delete() {
    console.log('deleting', this.ds.selection())
    this.ds.clearSelection()
  }
}
```

The directive has a few helpers for this:

| | |
| --- | --- |
| `selection()` | Your selected values |
| `selectedElements()` | The selected DOM elements |
| `select(values)` / `deselect(values)` | Add or remove items |
| `setSelection(values)` | Replace the selection |
| `selectAll()` / `clearSelection()` | Everything or nothing |
| `dataOf(elements)` | Turns elements (like an event's `items`) into your values |
| `instance` | The DragSelect instance itself, for anything else. It's `undefined` on the server and before init |

### 4. Events

On the wrapper, you get `(dsStart)`, `(dsEnd)`, `(dsSelect)` and `(dsUnselect)`:

```html
<div dragSelect (dsEnd)="onEnd($event)">…</div>
```

In a component inside, `injectDragSelectEvent` listens to any [DragSelect event](https://dragselect.com/docs/API/Events). It stops listening when the component is destroyed:

```ts
export class Logger {
  constructor() {
    injectDragSelectEvent('DS:start', ({ items }) => console.log('started with', items.length))
  }
}
```

The type of an event is `DragSelectEvent<'DS:end'>`.

### 5. Area and drop zones

By default you can start a selection anywhere on the page. `dsArea` limits it to one element:

```html
<ul dragSelect dsArea>…</ul>
```

`dsDropZone` turns an element into a place you can drop things on. Here is a folder that tells you which files were dropped on it:

```ts
@Component({
  selector: 'app-folder',
  imports: [DragSelectDirectives],
  template: `<div [dsDropZone]="id()">📁 {{ name() }}</div>`,
})
export class Folder {
  id = input.required<string>()
  name = input.required<string>()
  dropped = output<FileItem[]>()
  ds = inject(DragSelectDirective)

  constructor() {
    injectDragSelectEvent('DS:end', ({ items, isDragging, dropTarget }) => {
      if (isDragging && dropTarget?.id === this.id()) this.dropped.emit(this.ds.dataOf<FileItem>(items))
    })
  }
}
```

The id also ends up in CSS classes, so you can style things:

```css
/* zones while something is being dragged */
.ds-dropzone-ready { outline: 2px dashed }
/* items dropped on the "archive" zone */
.ds-dropped-target-archive { opacity: 0.5 }
```

### 6. Accessibility

Use `role="listbox"` on the wrapper and `role="option"` on the items, and `dsSelectable` keeps `aria-selected` up to date for screen readers. It only does that for roles where `aria-selected` is allowed (`option`, `gridcell`, `row`, `tab`, `treeitem`, `columnheader`, `rowheader`).

If your items are `<button>`s, people can select them with Enter or Space and move them with the arrow keys.

## Good to know

- The version matches DragSelect. Use `@dragselect/angular@X.Y.Z` with `dragselect@X.Y.Z`.
- Needs Angular 19 or newer.
- Works with and without zone.js. Moving the mouse doesn't trigger change detection.
- Works with SSR. Nothing runs on the server.
- If you remove a setting, it keeps its last value. To reset it, pass the default (e.g. `draggability: true`).
- More than one `dragSelect` on a page? Give each one a `dsArea`. Otherwise they all listen to the whole page and mess up each other's selection.
- Content passed in with `<ng-content>` can't see a `dragSelect` from inside your component. Put `dragSelect` on the component's tag instead: `<app-list dragSelect>…</app-list>`.

## License

GPL-3.0 or a [commercial license](https://dragselect.com/licenses), same as DragSelect.
