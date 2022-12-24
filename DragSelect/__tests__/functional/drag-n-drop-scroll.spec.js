import wait from '../helpers/wait'
const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Drag N Drop - Scroll', () => {
  it('The drag should also scroll', async () => {
    await page.goto(`${baseUrl}/drag-n-drop-scroll.html`)
    const { v1, v4 } = await page.evaluate(() => ({
      v1: window.getItemVect(1),
      v4: window.getItemVect(4),
    }))

    const mouse = page.mouse
    await mouse.move(v1.x + 5, v1.y + 5)
    await mouse.down()
    await mouse.move(v1.x + 5, 1000, {
      steps: 100,
    })
    await mouse.up()

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
      document.querySelector('#area').scrollTop = document.querySelector(
        '#area'
      ).scrollHeight
    })

    const { v4 } = await page.evaluate(() => ({
      v4: window.getItemVect(4),
    }))

    const mouse = page.mouse
    await mouse.move(v4.x + 5, v4.y + 5)
    await mouse.down()
    await mouse.move(v4.x + 10, v4.y - 15, {
      steps: 10,
    })
    await mouse.up()

    const { v42 } = await page.evaluate(() => ({
      v42: window.getItemVect(4),
    }))

    expect(v4.x - v42.x).toEqual(-5)
    expect(v4.y - v42.y).toEqual(18)
  })
})
