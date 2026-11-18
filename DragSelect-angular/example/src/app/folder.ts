import { Component, inject, input, output } from '@angular/core';
import {
  DragSelectDirective,
  DragSelectDirectives,
  injectDragSelectEvent,
} from '@dragselect/angular';
import { Photo } from './photo';

/** The README's drop zone example. */
@Component({
  selector: 'app-folder',
  imports: [DragSelectDirectives],
  template: `<div class="folder" [dsDropZone]="id()" [attr.data-testid]="'zone-' + id()">
    📁 {{ name() }}
  </div>`,
  styles: `
    .folder {
      margin-top: 16px;
      padding: 24px;
      border: 2px dashed #999;
      border-radius: 6px;
    }
    .folder.ds-dropzone-ready {
      border-color: #333;
    }
  `,
})
export class Folder {
  readonly id = input.required<string>();
  readonly name = input.required<string>();
  readonly moved = output<Photo[]>();
  private readonly ds = inject(DragSelectDirective);

  constructor() {
    // `items` is everything that was dragged: one element or the whole selection
    injectDragSelectEvent('DS:end', ({ items, isDragging, dropTarget }) => {
      if (!isDragging || dropTarget?.id !== this.id()) return;
      this.moved.emit(this.ds.dataOf<Photo>(items));
    });
  }
}
