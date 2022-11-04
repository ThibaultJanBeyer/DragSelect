import { test, expect } from '@playwright/test';
import { baseUrl, wait, goToOptimized } from './shared';

test.describe('Multiselection', () => {
  test('should multiselect', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/multiselection.html`)

    const mouse = page.mouse
    await mouse.move(1, 1, { steps: 10 })
    await mouse.down()
    await mouse.move(100, 30, { steps: 10 })
    await mouse.up()
    await wait(100)

    const keyboard = page.keyboard
    await keyboard.down('Shift')
    await mouse.move(60, 30, { steps: 10 })
    await mouse.down()
    await mouse.move(200, 40, { steps: 10 })
    await mouse.up()
    await wait(100)

    await mouse.move(250, 40, { steps: 10 })
    await mouse.down()
    await mouse.up()
    await wait(100)

    const { selected } = await page.evaluate(() => ({ selected }))
    const expected = ['one', 'three', 'four', 'five']
    expect(selected.sort()).toEqual(expected.sort())
  })

  test('multi-select-mode should work', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/multiselection.html`)

    const mouse = page.mouse
    await mouse.move(1, 80, { steps: 10 })
    await mouse.down()
    await mouse.move(100, 100, { steps: 10 })
    await mouse.up()
    await wait(100)

    await mouse.move(60, 80, { steps: 10 })
    await mouse.down()
    await mouse.move(200, 100, { steps: 10 })
    await mouse.up()
    await wait(100)

    await mouse.move(250, 100, { steps: 10 })
    await mouse.down()
    await mouse.up()
    await wait(100)

    const { multiselected } = await page.evaluate(() => ({ multiselected }))
    const expected = ['one2', 'three2', 'four2', 'five2']
    expect(multiselected.sort()).toEqual(expected.sort())
  })

  test('multiSelectToggling off should not toggle already selected elements', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/multiselection.html`)

    const mouse = page.mouse
    await mouse.move(30, 160)
    await mouse.down()
    await mouse.move(80, 160, { steps: 10 })
    await mouse.up()
    await wait(100)

    await mouse.move(180, 160, { steps: 10 })
    await mouse.down()
    await mouse.move(30, 170, { steps: 10 })
    await mouse.up()
    await wait(100)

    const { multiSelectTogglingOff } = await page.evaluate(() => ({
      multiSelectTogglingOff,
    }))

    const expected = ['one3', 'two3', 'four3', 'three3']
    expect(multiSelectTogglingOff.sort()).toEqual(expected.sort())
  })
})
