import { moveSelectTo } from '../helpers/manipulations'

const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Document Scroll', () => {
  it('the document should be scroll-able', async () => {
    await page.setViewport({ width: 205, height: 205 })
    await page.goto(`${baseUrl}/doc-scroll.html`)
    const { docHeight } = await page.evaluate(() => ({
      docHeight: window.innerHeight,
    }))

    await moveSelectTo(page, 60, docHeight - 80, 60, docHeight + 50, 50, true)

    const { selected } = await page.evaluate(() => ({
      selected: window.selected,
    }))

    const expected = [
      'item-9',
      'item-13',
      'item-17',
      'item-21',
      'item-25',
      'item-29',
      'item-33',
      'item-37',
      'item-41',
      'item-45',
      'item-49',
      'item-53',
      'item-57',
      'item-61',
      'item-65',
      'item-69',
      'item-73',
      'item-77',
      'item-81',
      'item-85',
      'item-89',
      'item-93',
      'item-97',
      'item-101',
      'item-105',
      'item-109',
      'item-113',
      'item-117',
      'item-121',
      'item-125',
      'item-129',
      'item-133',
      'item-137',
      'item-141',
      'item-145',
      'item-149',
    ]

    expect(selected.sort((a, b) => a - b)).toEqual(
      expected.sort((a, b) => a - b)
    )
    expect(selected.length).toBe(36)
  })
})
