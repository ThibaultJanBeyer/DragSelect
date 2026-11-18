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

const count = (page) => page.locator('#count')
const log = (page) => page.locator('#log')

test('initializes', async ({ page }) => {
  await expect(page.locator('.ds-selector')).toHaveCount(1)
  await expect(count(page)).toHaveText('0 selected')
  expect(await page.evaluate(() => window.ds.getSelectables().length)).toBe(12)
})

test('click selects a single item', async ({ page }) => {
  await item(page, 3).click()
  await expectSelected(page, ['3'])
  await expect(count(page)).toHaveText('1 selected')

  await item(page, 5).click()
  await expectSelected(page, ['5'])
})

test('shift/ctrl click adds to the selection', async ({ page }) => {
  await item(page, 1).click()
  await item(page, 4).click({ modifiers: ['Shift'] })
  await item(page, 7).click({ modifiers: ['Control'] })
  await expectSelected(page, ['1', '4', '7'])
  await expect(count(page)).toHaveText('3 selected')

  // modifier-click on a selected item toggles it off
  await item(page, 4).click({ modifiers: ['Shift'] })
  await expectSelected(page, ['1', '7'])
})

test('lasso selects everything inside the rectangle', async ({ page }) => {
  // 4-column grid: 1 → 6 covers 1, 2, 5, 6
  await lassoSelect(page, item(page, 1), item(page, 6))
  await expectSelected(page, ['1', '2', '5', '6'])
  await expect(count(page)).toHaveText('4 selected')
  await expect(log(page)).toContainText(/selected \[[1256, ]+\]/)
})

test('shift + lasso extends the selection', async ({ page }) => {
  await lassoSelect(page, item(page, 1), item(page, 2))
  await page.keyboard.down('Shift')
  await lassoSelect(page, item(page, 11), item(page, 12))
  await page.keyboard.up('Shift')
  await expectSelected(page, ['1', '2', '11', '12'])
})

test('select all / clear via API', async ({ page }) => {
  await page.getByRole('button', { name: 'Select all' }).click()
  await expect(page.locator('.item.ds-selected')).toHaveCount(12)
  await expect(count(page)).toHaveText('12 selected')

  await page.getByRole('button', { name: 'Clear' }).click()
  await expect(page.locator('.item.ds-selected')).toHaveCount(0)
  await expect(count(page)).toHaveText('0 selected')
})

test('dragging moves an item', async ({ page }) => {
  const before = await item(page, 1).boundingBox()
  await drag(page, { x: before.x + 32, y: before.y + 32 }, { x: before.x + 32, y: before.y + 200 })
  const after = await item(page, 1).boundingBox()
  expect(after.y - before.y).toBeGreaterThan(100)
  await expect(log(page)).toContainText('dropped [1] on nothing')
})

test('dragging a selection moves all selected items together', async ({ page }) => {
  await lassoSelect(page, item(page, 1), item(page, 2))
  const [a1, b1, c1] = await Promise.all([1, 2, 3].map((i) => item(page, i).boundingBox()))
  await drag(page, { x: a1.x + 32, y: a1.y + 32 }, { x: a1.x + 32, y: a1.y + 200 })
  const [a2, b2, c2] = await Promise.all([1, 2, 3].map((i) => item(page, i).boundingBox()))

  expect(a2.y - a1.y).toBeGreaterThan(100)
  expect(b2.y - b1.y).toBeGreaterThan(100)
  expect(c2).toEqual(c1) // unselected item stays put
})

test('dropping on the drop zone reports the target', async ({ page }) => {
  await lassoSelect(page, item(page, 1), item(page, 2))
  await dragOnto(page, item(page, 1), page.locator('#zone'))

  await expect(log(page)).toContainText(/dropped \[(1, 2|2, 1)\] on zone/)
  await expect(item(page, 1)).toHaveClass(/ds-dropped-target-zone/)
  await expect(item(page, 2)).toHaveClass(/ds-dropped-target-zone/)
  expect(
    await page.evaluate(() => window.ds.getItemsDroppedByZoneId('zone').map((el) => el.dataset.id).sort())
  ).toEqual(['1', '2'])
})
