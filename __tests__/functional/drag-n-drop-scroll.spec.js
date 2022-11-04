import { test, expect } from '@playwright/test';
import { baseUrl, getStepFactorByBrowser, wait } from './shared';

test.describe('Drag N Drop - Scroll', () => {
  test('The drag should also scroll', async ({ page }, testInfo) => {
    await page.goto(`${baseUrl}/drag-n-drop-scroll.html`)
    const { v1, v4 } = await page.evaluate(() => ({
      // @ts-ignore
      v1: window.getItemVect(1),
      // @ts-ignore
      v4: window.getItemVect(4),
    }))

    const mouse = page.mouse
    await mouse.move(v1.x + 5, v1.y + 5)
    await mouse.down()
    await mouse.move(v1.x + 5, 1000, {
      steps: 100 * getStepFactorByBrowser(testInfo.project.name),
    })
    await mouse.up()
    await wait(100)

    const { v12, v22, v42, areaScrollTop } = await page.evaluate(() => ({
      // @ts-ignore
      v12: window.getItemVect(1),
      // @ts-ignore
      v22: window.getItemVect(2),
      // @ts-ignore
      v42: window.getItemVect(4),
      areaScrollTop: document.querySelector('#area').scrollTop,
    }))

    expect(v12.y).toEqual(v42.y)
    expect(v22.y).toBeLessThan(0)
    expect(v12.y).toBeGreaterThan(v22.y)
    expect(areaScrollTop).toBeGreaterThan(0)
  })

  test('The drag should also work when scrolled', async ({ page }, testInfo) => {
    await page.goto(`${baseUrl}/drag-n-drop-scroll.html`)
    await page.evaluate(() => {
      document.querySelector('#area').scrollTop = document.querySelector(
        '#area'
      ).scrollHeight
    })

    const { v4 } = await page.evaluate(() => ({
      // @ts-ignore
      v4: window.getItemVect(4),
    }))

    const mouse = page.mouse
    await mouse.move(v4.x + 5, v4.y + 5)
    await mouse.down()
    await mouse.move(v4.x + 10, v4.y - 15, {
      steps: 100 * getStepFactorByBrowser(testInfo.project.name),
    })
    await mouse.up()
    await wait(100)

    const { v42 } = await page.evaluate(() => ({
      // @ts-ignore
      v42: window.getItemVect(4),
    }))

    expect(v4.x).not.toEqual(v42.x)
    expect(v4.y).not.toEqual(v42.y)
    expect(v4.x - v42.x).toBeLessThan(0)
    expect(v4.y - v42.y).toBeLessThanOrEqual(20)
  })
})
