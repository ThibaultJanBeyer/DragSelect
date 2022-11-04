import { performance } from 'perf_hooks'
import { test, expect } from '@playwright/test';
import { baseUrl, wait, getStepFactorByBrowser } from './shared';

test.describe('Scroll', () => {
  test('should work and be fast even with 25k items', async ({ page }, testInfo) => {
    const start = performance.now()

    await page.goto(`${baseUrl}/performance.html`, {
      waitUntil: 'load',
    })

    const mouse = page.mouse
    await mouse.move(100, 100)
    await wait(100)
    await mouse.down()
    await wait(100)
    await mouse.move(200, 200)
    await wait(100)
    await mouse.up()
    await wait(100)

    const { selected } = await page.evaluate(() => ({ selected }))

    expect(selected[0]).toBe('item-52')
    expect(selected[1]).toBe('item-53')
    expect(selected[2]).toBe('item-54')
    expect(selected[3]).toBe('item-77')
    expect(selected[4]).toBe('item-78')
    expect(selected[5]).toBe('item-79')
    expect(selected[6]).toBe('item-102')
    expect(selected[7]).toBe('item-103')
    expect(selected[8]).toBe('item-104')

    const duration = performance.now() - start
    console.info(`[${testInfo.project.name}] Duration: ${duration}ms (${process.env.CI})`)
    expect(duration).toBeLessThan(2222 * getStepFactorByBrowser(testInfo.project.name))
  })
})
