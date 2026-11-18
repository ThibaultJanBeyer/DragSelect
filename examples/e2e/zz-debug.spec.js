import { test, expect } from '@playwright/test'
import { drag, item, lassoSelect } from './helpers.js'
for (const wait of [0, 150]) {
  test(`drag after lasso wait=${wait}`, async ({ page }) => {
    await page.goto('/')
    await lassoSelect(page, item(page, 1), item(page, 2))
    if (wait) await page.waitForTimeout(wait)
    const a1 = await item(page, 1).boundingBox()
    await drag(page, { x: a1.x + 32, y: a1.y + 32 }, { x: a1.x + 32, y: a1.y + 200 })
    const a2 = await item(page, 1).boundingBox()
    const area = await page.locator('#area').boundingBox()
    console.log(wait, 'moved', a2.y - a1.y, 'item bottom', a2.y + a2.height, 'area bottom', area.y + area.height)
  })
}
