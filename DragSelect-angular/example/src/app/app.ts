import { Component, computed, signal } from '@angular/core';
import { DragSelectDirectives, DragSelectEvent } from '@dragselect/angular';
import { Folder } from './folder';
import { Photo } from './photo';
import { Toolbar } from './toolbar';

const ALL_PHOTOS: Photo[] = Array.from({ length: 12 }, (_, i) => ({
  id: `p${i}`,
  name: `Photo ${i + 1}`,
  hue: i * 30,
}));

@Component({
  selector: 'app-root',
  imports: [DragSelectDirectives, Folder, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly photos = signal<Photo[]>([]);
  // a saved selection, restored before the photos are loaded
  readonly selected = signal<Photo[]>([ALL_PHOTOS[1], ALL_PHOTOS[2]]);
  readonly trash = signal<Photo[]>([]);
  readonly draggable = signal(true);
  readonly settings = computed(() => ({ draggability: this.draggable() }));
  readonly lastEnd = signal('');

  readonly selectedNames = computed(() =>
    this.selected()
      .map((photo) => photo.name)
      .join(', '),
  );
  readonly trashNames = computed(() =>
    this.trash()
      .map((photo) => photo.name)
      .join(', '),
  );

  constructor() {
    // pretend the photos come from an API
    setTimeout(() => this.photos.set(ALL_PHOTOS), 300);
  }

  onEnd({ isDragging }: DragSelectEvent<'DS:end'>) {
    this.lastEnd.set(isDragging ? 'drag' : 'select');
  }

  moveToTrash(dropped: Photo[]) {
    // only photos still in the list: the e2e tests press keys faster than Angular re-renders (zoneless: ~10ms)
    const photos = dropped.filter((photo) => this.photos().includes(photo));
    this.trash.update((trash) => [...trash, ...photos]);
    this.photos.update((all) => all.filter((photo) => !photos.includes(photo)));
  }
}
