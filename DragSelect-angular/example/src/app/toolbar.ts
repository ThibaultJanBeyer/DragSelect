import { Component, inject } from '@angular/core';
import { DragSelectDirective } from '@dragselect/angular';
import { Photo } from './photo';

/** Reads and changes the selection from a child component. */
@Component({
  selector: 'app-toolbar',
  template: `
    <button data-testid="select-all" (click)="ds.selectAll()">Select all</button>
    <button data-testid="clear" (click)="ds.clearSelection()">Clear</button>
    <button data-testid="select-last" (click)="selectLast()">Select last</button>
    <span data-testid="count">{{ ds.selection().length }} selected</span>
  `,
  styles: `
    :host {
      position: absolute;
      top: 12px;
      left: 16px;
      display: flex;
      gap: 8px;
      align-items: center;
    }
  `,
})
export class Toolbar {
  protected readonly ds = inject<DragSelectDirective<Photo>>(DragSelectDirective);

  selectLast() {
    const photos = this.ds.dataOf<Photo>(this.ds.instance?.getSelectables() ?? []);
    this.ds.setSelection(photos.slice(-1));
  }
}
