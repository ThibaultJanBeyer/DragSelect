import { test, expect } from '@playwright/test';
import { baseUrl, wait, getStepFactorByBrowser } from './shared';

test.describe('Drag N Drop - Area', () => {
  test('The items should be constrained', async ({ page }, testInfo) => {
    await goToOptimized(page, `${baseUrl}/drag-n-drop-area.html`)
    const { v1, v2, v3, v4 } = await page.evaluate(() => ({
      v1: window.getItemVect(1),
      v2: window.getItemVect(2),
      v3: window.getItemVect(3),
      v4: window.getItemVect(4),
    }))

    const mouse = page.mouse
    await mouse.move(1, 1)
    await mouse.down()
    await mouse.move(300, 300, {
      steps: 100 * getStepFactorByBrowser(testInfo.project.name),
    })
    await mouse.up()

    const { s1, d1 } = await page.evaluate((itemId) => ({
      d1: window.dragged,
      s1: window.selected,
    }))

    expect(d1.length).toEqual(0)
    expect(s1.length).toEqual(2)

    await mouse.move(v2.x, v2.y)
    await mouse.down()
    await mouse.move(300, 300, {
      steps: 100 * getStepFactorByBrowser(testInfo.project.name),
    })
    await mouse.up()
    await wait(100)

    const { s2, d2, v12, v22, v32, v42 } = await page.evaluate((itemId) => ({
      d2: window.dragged,
      s2: window.selected,
      v12: window.getItemVect(1),
      v22: window.getItemVect(2),
      v32: window.getItemVect(3),
      v42: window.getItemVect(4),
    }))

    expect(d2.length).toEqual(2)
    expect(s2.length).toEqual(0)
    expect(v12.x).not.toEqual(v1.x)
    expect(v22.y).not.toEqual(v2.y)
    expect(v12.x).toEqual(v22.x)
    expect(v12.y - v22.y).toBeLessThan(50)

    expect(v32.x).toEqual(v3.x)
    expect(v42.y).toEqual(v4.y)
  })
})
