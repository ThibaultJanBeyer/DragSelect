import { moveSelectTo } from '../helpers/manipulations'

const baseUrl = `file://${process.cwd()}/__tests__/functional`

const getScroll = () =>
  page.evaluate(() => ({
    scrollY: window.scrollY,
    max: document.documentElement.scrollHeight - window.innerHeight,
  }))

describe('Document Scroll (standards mode)', () => {
  beforeEach(async () => {
    await page.setViewport({ width: 205, height: 205 })
    await page.goto(`${baseUrl}/doc-scroll-standards.html`)
  })

  it('should auto-scroll down', async () => {
    await moveSelectTo(page, 60, 100, 60, 200, 10, true)
    const { scrollY } = await getScroll()
    expect(scrollY).toBeGreaterThan(0)
  })

  it('should auto-scroll up when the document is scrolled to the very bottom', async () => {
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight)
    )
    const before = await getScroll()
    expect(before.scrollY).toBe(before.max)

    await moveSelectTo(page, 60, 100, 60, 5, 10, true)

    const after = await getScroll()
    expect(after.scrollY).toBeLessThan(before.max)
  })
})
