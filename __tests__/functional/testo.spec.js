import { test, expect } from '@playwright/test';
import { baseUrl, goToOptimized } from './shared';

test.describe('testo', () => {
  test('testo', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/testo.html`)
    await page.mouse.move(1, 1)
    await page.mouse.down()
    await page.mouse.move(500, 500, { steps: 10 })
    await page.mouse.up()
    const { up, down, move } = await page.evaluate(() => ({ up: window.up, down: window.down, move: window.move }))
    expect(up.length).toEqual(1)
    expect(down.length).toEqual(1)
    expect(move.length).toEqual(11)
  })
})
