import { click } from '../helpers/manipulations'

const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('removeSelectables', () => {
  test('The tool should be able to remove selectables correctly', async () => {
    await page.goto(`${baseUrl}/remove-selectables.html`)

    await click(page, 10, 10)
    let selected = await page.evaluate(() => window.selected)
    expect(selected.length).toBe(1)

    await click(page, 10, 10)
    selected = await page.evaluate(() => window.selected)
    expect(selected.length).toBe(0)

    await click(page, 80, 80)
    selected = await page.evaluate(() => window.selected)
    expect(selected.length).toBe(0)

    await click(page, 10, 10)
    selected = await page.evaluate(() => window.selected)
    expect(selected.length).toBe(0)
  })
})
