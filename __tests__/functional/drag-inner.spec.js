import { test, expect } from '@playwright/test';
import { baseUrl, wait } from './shared';

test.describe('Drag Inner', () => {
  test('it should be able to drag an element even if it has inner elements', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/drag-inner.html`)

    const inner = await page.$('.inner')
    const beforePos = await inner.boundingBox()

    const mouse = page.mouse
    await mouse.move(25, 25)
    await mouse.down()
    await mouse.move(150, 150, { steps: 50 })
    await mouse.up()
    await wait(100)

    const afterPos = await inner.boundingBox()
    expect(afterPos).not.toEqual(beforePos)
  })
})
