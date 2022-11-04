import { test, expect } from '@playwright/test';
import { baseUrl, wait, goToOptimized, getStepFactorByBrowser } from './shared';

test.describe('Scroll', () => {
  test('selection in double scrolling element should work', async ({ page }, testInfo) => {
    await goToOptimized(page, `${baseUrl}/scroll.html`)
    await page.evaluate(() => {
      scroll({
        top: 500,
      })

      document.querySelector('#lel').scroll({
        top: 150,
      })
    })

    const mouse = page.mouse
    await mouse.move(100, 300)
    await mouse.down()
    await mouse.move(50, 200, { steps: 100 * getStepFactorByBrowser(testInfo.project.name) })
    await wait(100)

    const selectorRect = await page.evaluate(() => {
      window.dsRect = ds.Selector.HTMLNode.getBoundingClientRect()
      return {
        top: dsRect.top,
        left: dsRect.left,
        width: dsRect.width,
        height: dsRect.height,
      }
    })

    expect(selectorRect.left).toBe(50)
    expect(selectorRect.top).toBe(120)
    expect(selectorRect.width).toBe(50)
    expect(selectorRect.height).toBe(80)

    await mouse.up()
    await wait(100)
  })

  test('selection should remain when scrolling', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/scroll.html`)
    let { selection, containerScrollbarPos } = await page.evaluate(() => {
      scroll({
        top: 0,
      })

      document.querySelector('#lel').scroll({
        top: 0,
      })

      return {
        selection: ds.getSelection(),
        containerScrollbarPos: {
          top: ds.Area.HTMLNode.offsetTop,
          x:
            ds.Area.HTMLNode.clientWidth +
            (ds.Area.HTMLNode.offsetWidth - ds.Area.HTMLNode.clientWidth) / 2,
          y:
            ds.Area.HTMLNode.clientHeight +
            (ds.Area.HTMLNode.offsetHeight - ds.Area.HTMLNode.clientHeight) / 2,
        },
      }
    })

    const mouse = page.mouse
    await mouse.move(10, containerScrollbarPos.top + 20)
    await mouse.down()
    await mouse.up()
    await wait(100)

    selection = await page.evaluate(() => ds.getSelection())
    expect(selection.length).toBe(1)

    await mouse.move(containerScrollbarPos.x, containerScrollbarPos.top + 20)
    await mouse.down()
    await mouse.move(containerScrollbarPos.y, containerScrollbarPos.top + 40)
    await mouse.up()
    await wait(100)

    selection = await page.evaluate(() => ds.getSelection())
    expect(selection.length).toBe(1)
    await page.evaluate(() => scroll({ top: 1000 }))

    await mouse.move(20, containerScrollbarPos.y)
    await mouse.down()
    await mouse.move(120, containerScrollbarPos.y)
    await mouse.up()
    await wait(100)

    selection = await page.evaluate(() => ds.getSelection())
    expect(selection.length).toBe(1)
  })
})
