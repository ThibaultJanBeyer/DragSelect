import { test, expect } from '@playwright/test'
import { item } from './helpers.js'
test('keyboard drop', async ({ page }) => {
  page.on('console', (m) => console.log('console:', m.text()))
  await page.goto('/')
  await item(page, 4).click()
  const active = await page.evaluate(() => document.activeElement?.className + ' tabindex=' + document.activeElement?.getAttribute('tabindex'))
  console.log('active after click:', active)
  const zone = await page.locator('.zone', { hasText: 'Archive' }).boundingBox()
  console.log('zone', zone, 'item', await item(page, 4).boundingBox())
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('ArrowRight')
    const b = await item(page, 4).boundingBox()
    if (b.x + b.width / 2 > zone.x + 20) break
  }
  console.log('item now', await item(page, 4).boundingBox())
  console.log('log:', await page.locator('.log').innerText())
  console.log('archive:', await page.locator('.zone', { hasText: 'Archive' }).innerText())
})
