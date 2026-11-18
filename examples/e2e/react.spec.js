import { test, expect } from '@playwright/test'
import { drag, dragOnto, expectSelected, item, lassoSelect } from './helpers.js'

let errors
test.beforeEach(async ({ page }) => {
  errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto('/')
  await expect(page.locator('.item')).toHaveCount(12)
})
test.afterEach(() => expect(errors, 'no errors in the browser console').toEqual([]))

const status = (page) => page.locator('.toolbar span')
const log = (page) => page.locator('.log')
const folder = (page, name) => page.locator('.zone', { hasText: name })

test('initializes once (StrictMode double-mount leaves a single instance)', async ({ page }) => {
  await expect(page.locator('.ds-selector')).toHaveCount(1)
  await expect(status(page)).toHaveText('0 selected: []')
  await expect(folder(page, 'Archive')).toContainText('Archive (0)')
  await expect(folder(page, 'Trash')).toContainText('Trash (0)')
})

test('click selects and useSelection re-renders', async ({ page }) => {
  await item(page, 3).click()
  await expectSelected(page, ['3'])
  await expect(status(page)).toHaveText('1 selected: [3]')
})

test('shift/ctrl click adds to the selection', async ({ page }) => {
  await item(page, 1).click()
  await item(page, 4).click({ modifiers: ['Shift'] })
  await item(page, 7).click({ modifiers: ['Control'] })
  await expectSelected(page, ['1', '4', '7'])
  await expect(status(page)).toContainText('3 selected')
})

test('lasso selects everything inside the rectangle', async ({ page }) => {
  await lassoSelect(page, item(page, 1), item(page, 6))
  await expectSelected(page, ['1', '2', '5', '6'])
  await expect(status(page)).toContainText('4 selected')
  await expect(log(page)).toContainText(/selected \[[1256, ]+\]/)
})

test('select all / clear via useDragSelect()', async ({ page }) => {
  await page.getByRole('button', { name: 'Select all' }).click()
  await expect(page.locator('.item.ds-selected')).toHaveCount(12)
  await expect(status(page)).toContainText('12 selected')

  await page.getByRole('button', { name: 'Clear' }).click()
  await expect(page.locator('.item.ds-selected')).toHaveCount(0)
  await expect(status(page)).toHaveText('0 selected: []')
})

test('dragging a selection moves all selected items together', async ({ page }) => {
  await lassoSelect(page, item(page, 1), item(page, 2))
  const [a1, b1, c1] = await Promise.all([1, 2, 3].map((i) => item(page, i).boundingBox()))
  await drag(page, { x: a1.x + 32, y: a1.y + 32 }, { x: a1.x + 32, y: a1.y + 200 })
  const [a2, b2, c2] = await Promise.all([1, 2, 3].map((i) => item(page, i).boundingBox()))

  expect(a2.y - a1.y).toBeGreaterThan(100)
  expect(b2.y - b1.y).toBeGreaterThan(100)
  expect(c2).toEqual(c1)
})

test('dropping on a useDropZone folder updates React state', async ({ page }) => {
  await lassoSelect(page, item(page, 1), item(page, 2))
  await dragOnto(page, item(page, 1), folder(page, 'Archive'))

  await expect(log(page)).toContainText(/dropped \[(1, 2|2, 1)\] on archive/)
  await expect(folder(page, 'Archive')).toContainText('Archive (2)')
  await expect(item(page, 1).locator('small')).toHaveText('archive')
  await expect(item(page, 2).locator('small')).toHaveText('archive')

  // a second drop zone works independently
  await item(page, 5).click()
  await dragOnto(page, item(page, 5), folder(page, 'Trash'))
  await expect(folder(page, 'Trash')).toContainText('Trash (1)')
  await expect(folder(page, 'Archive')).toContainText('Archive (2)')
})
