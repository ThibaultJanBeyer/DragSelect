import { test, expect } from '@playwright/test';
import { baseUrl } from './shared';

test.describe('Accessibility', () => {
  test('should select using keyboard only', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/accessibility.html`)

    const keyboard = page.keyboard
    await keyboard.press('Tab')
    await keyboard.press('Enter')

    const { selected: s1 } = await page.evaluate(() => ({ selected: window.selected }))

    expect(s1[0]).toBe('one')

    await keyboard.press('Tab')
    await keyboard.press('Enter')

    const { selected: s2 } = await page.evaluate(() => ({ selected: window.selected }))

    expect(s2[0]).toBe('two')
  })

  test('should multiselect using keyboard only', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/accessibility.html`)

    const keyboard = page.keyboard
    await keyboard.press('Tab') // 1
    await keyboard.press('Tab') // 2
    await keyboard.press('Enter') // 2
    await keyboard.press('Tab') // 3
    await keyboard.down('Shift')
    await keyboard.press('Enter') // 3
    await keyboard.up('Shift')
    await keyboard.press('Tab') // 4
    await keyboard.down('Shift')
    await keyboard.press('Enter') // 4
    await keyboard.up('Shift')
    await keyboard.press('Tab') // 5
    await keyboard.down('Shift')
    await keyboard.press('Enter') // 5
    await keyboard.press('Tab') // 4
    await keyboard.press('Enter') // 4
    await keyboard.up('Shift')

    const { selected } = await page.evaluate(() => ({ selected }))

    expect(selected[0]).toBe('two')
    expect(selected[1]).toBe('three')
    expect(selected[2]).toBe('five')
  })
})
