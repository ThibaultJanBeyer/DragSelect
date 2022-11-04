import { test, expect } from '@playwright/test';
import { baseUrl, getStepFactorByBrowser } from './shared';

test.describe('Constrained Scroll', () => {
  test('selection should be able to scroll in the constrained container while dragging', async ({ page }, testInfo) => {
    await page.goto(`${baseUrl}/constrained-scroll.html`)

    const mouse = page.mouse
    const keyboard = page.keyboard
    await keyboard.down('Shift')
    await mouse.move(110, 110, { steps: 100 * getStepFactorByBrowser(testInfo.project.name) })
    await mouse.down()
    await mouse.move(500, 500, { steps: 100 * getStepFactorByBrowser(testInfo.project.name) })
    await mouse.up()

    let executesFn = await page.evaluate(() => {
      return {
        ids: window.itemIds,
        callbackIds: window.callbackIds,
      }
    })

    expect(executesFn.callbackIds.length).toBe(executesFn.ids.length)
    expect(executesFn.callbackIds).toEqual(
      expect.arrayContaining(executesFn.ids)
    )
  })
})
