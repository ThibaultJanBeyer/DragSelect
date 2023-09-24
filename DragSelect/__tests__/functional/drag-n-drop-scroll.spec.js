import { moveSelectTo } from '../helpers/manipulations'
const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Drag N Drop - Scroll', () => {
  it('The drag should also scroll', async () => {
    await page.goto(`${baseUrl}/drag-n-drop-scroll.html`)
    const { v1, v4 } = await page.evaluate(() => ({
      v1: window.getItemVect(1),
      v4: window.getItemVect(4),
    }))

    await moveSelectTo(page, v1.x + 5, v1.y + 5, v1.x + 5, 1000, 100)

    const { v12, v22, v42, areaScrollTop } = await page.evaluate(() => ({
      v12: window.getItemVect(1),
      v22: window.getItemVect(2),
      v42: window.getItemVect(4),
      areaScrollTop: document.querySelector('#area').scrollTop,
    }))

    expect(v12.y).toEqual(v42.y)
    expect(v22.y).toBeLessThan(0)
    expect(v12.y).toBeGreaterThan(v22.y)
    expect(areaScrollTop).toBeGreaterThan(0)
  })

  it('The drag should also work when scrolled', async () => {
    await page.goto(`${baseUrl}/drag-n-drop-scroll.html`)
    await page.evaluate(() => {
      document.querySelector('#area').scrollTop =
        document.querySelector('#area').scrollHeight
    })

    const { v4 } = await page.evaluate(() => ({
      v4: window.getItemVect(4),
    }))

    await moveSelectTo(page, v4.x + 5, v4.y + 5, v4.x + 10, v4.y - 15, 10)

    const { v42 } = await page.evaluate(() => ({
      v42: window.getItemVect(4),
    }))

    // should be -5 but puppeteer is not that precise so we gonna loosely check
    expect(v4.x - v42.x).toBeLessThan(0)
    expect(v4.x - v42.x).toBeGreaterThan(-10)
    // should be 20 but puppeteer is not that precise so we gonna loosely check
    expect(v4.y - v42.y).toBeLessThan(30)
    expect(v4.y - v42.y).toBeGreaterThan(10)
  })
})
