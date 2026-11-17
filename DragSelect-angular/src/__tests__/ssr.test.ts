// @vitest-environment node
// A real server render: plain Node (no browser DOM), Angular's platform-server.
import { Component, signal } from '@angular/core'
import { bootstrapApplication, type BootstrapContext } from '@angular/platform-browser'
import { provideServerRendering, renderApplication } from '@angular/platform-server'
import { expect, it } from 'vitest'

import { DragSelectDirectives } from '@dragselect/angular'

@Component({
  selector: 'app-root',
  imports: [DragSelectDirectives],
  template: `
    <div dragSelect dsArea [(dsSelection)]="selected" #ds="dragSelect" role="listbox">
      @for (id of ids; track id) {
        <button [dsSelectable]="id" role="option">{{ id }}</button>
      }
      <div dsDropZone="trash">trash</div>
      <p>{{ ds.selection().join(',') }} selected, instance: {{ ds.instance ? 'yes' : 'no' }}</p>
    </div>
  `,
})
class App {
  ids = ['a', 'b', 'c']
  selected = signal(['b'])
}

it('renders on the server without creating DragSelect', async () => {
  const html = await renderApplication(
    (context: BootstrapContext) =>
      bootstrapApplication(App, { providers: [provideServerRendering()] }, context),
    { document: '<html><body><app-root></app-root></body></html>', url: '/' }
  )

  expect(html).toContain('b selected, instance: no')
  // no DragSelect on the server, so nothing is selected or styled yet
  expect(html).toContain('aria-selected="false"')
  expect(html).not.toContain('aria-selected="true"')
  expect(html).not.toContain('ds-selectable')
  expect(html).not.toContain('ds-dropzone')
})
