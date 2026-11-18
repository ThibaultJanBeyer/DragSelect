import { Component, computed, inject, input, output, signal } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import {
  DragSelectDirective,
  DragSelectDirectives,
  injectDragSelectEvent,
  type DragSelectEvent,
} from '@dragselect/angular'

type File = { id: string; folder: string | null }

const ids = (els: Element[]) => els.map((el) => (el as HTMLElement).dataset['id']!)

@Component({
  selector: 'app-toolbar',
  template: `
    <div class="toolbar">
      <button (click)="ds.instance?.setSelection(ds.instance.getSelectables())">Select all</button>
      <button (click)="ds.instance?.clearSelection()">Clear</button>
      <span>{{ selected().length }} selected: [{{ selected().join(', ') }}]</span>
    </div>
  `,
})
class Toolbar {
  protected ds = inject(DragSelectDirective)
  protected selected = computed(() => ids(this.ds.selection()))
}

@Component({
  selector: 'app-folder',
  imports: [DragSelectDirectives],
  template: `<div class="zone" [dsDropZone]="id()">📁 {{ name() }} ({{ count() }})</div>`,
})
class Folder {
  id = input.required<string>()
  name = input.required<string>()
  files = input.required<File[]>()
  moved = output<string[]>()
  protected count = computed(() => this.files().filter((f) => f.folder === this.id()).length)

  constructor() {
    injectDragSelectEvent('DS:end', ({ items, isDragging, dropTarget }) => {
      if (!isDragging || dropTarget?.id !== this.id()) return
      this.moved.emit(ids(items))
    })
  }
}

@Component({
  selector: 'app-log',
  template: `<pre class="log">{{ lines().join('\\n') }}</pre>`,
})
class Log {
  protected lines = signal<string[]>([])

  constructor() {
    injectDragSelectEvent('DS:end', ({ items, isDragging, dropTarget }) => {
      const list = ids(items).join(', ') || 'none'
      const msg = isDragging
        ? `dropped [${list}] on ${dropTarget?.id ?? 'nothing'}`
        : `selected [${list}]`
      this.lines.update((l) => [msg, ...l].slice(0, 50))
    })
  }
}

@Component({
  selector: 'app-root',
  imports: [DragSelectDirectives, Toolbar, Folder, Log],
  template: `
    <ng-container dragSelect (dsEnd)="droppedOutside($event)">
      <h1>&#64;dragselect/angular</h1>
      <p>Drag to select. Drag selected items onto a folder. Hold Shift/Ctrl to add.</p>
      <app-toolbar />
      <div class="area" dsArea>
        <div class="grid">
          @for (f of files(); track f.id) {
            <button type="button" class="item" dsSelectable [attr.data-id]="f.id">
              {{ f.id }}
              @if (f.folder) {
                <small>{{ f.folder }}</small>
              }
            </button>
          }
        </div>
        <div class="folders">
          <app-folder id="archive" name="Archive" [files]="files()" (moved)="move($event, 'archive')" />
          <app-folder id="trash" name="Trash" [files]="files()" (moved)="move($event, 'trash')" />
        </div>
      </div>
      <app-log />
    </ng-container>
  `,
})
class App {
  protected files = signal<File[]>(
    Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1), folder: null }))
  )

  protected move(moved: string[], folder: string | null) {
    this.files.update((fs) => fs.map((f) => (moved.includes(f.id) ? { ...f, folder } : f)))
  }

  // dropped next to the folders: the items leave their folder
  protected droppedOutside({ items, isDragging, dropTarget }: DragSelectEvent<'DS:end'>) {
    if (isDragging && !dropTarget) this.move(ids(items), null)
  }
}

bootstrapApplication(App).catch(console.error)
