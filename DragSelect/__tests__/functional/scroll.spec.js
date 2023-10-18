const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Scroll', () => {
  it('selection in double scrolling element should work', async () => {
    await page.goto(`${baseUrl}/scroll.html`)
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
    await mouse.move(50, 200)

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
    expect(selectorRect.top).toBe(200)
    expect(selectorRect.width).toBe(50)
    expect(selectorRect.height).toBe(100)

    await mouse.up()
  })

  it('selection should remain when scrolling', async () => {
    await page.goto(`${baseUrl}/scroll.html`)
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

    selection = await page.evaluate(() => ds.getSelection())
    expect(selection.length).toBe(1)

    await mouse.move(containerScrollbarPos.x, containerScrollbarPos.top + 20)
    await mouse.down()
    await mouse.move(containerScrollbarPos.y, containerScrollbarPos.top + 40)
    await mouse.up()

    selection = await page.evaluate(() => ds.getSelection())
    expect(selection.length).toBe(1)
    await page.evaluate(() => scroll({ top: 1000 }))

    await mouse.move(20, containerScrollbarPos.y)
    await mouse.down()
    await mouse.move(120, containerScrollbarPos.y)
    await mouse.up()

    selection = await page.evaluate(() => ds.getSelection())
    expect(selection.length).toBe(1)
  })

  it('clicking in scrollable area should not cause scroll to occur', async () => {
    await page.goto(`${baseUrl}/scroll.html`)

    const areaHandle = await page.$('#lel')

    const { areaTop, areaLeft, areaWidth, areaHeight, areaScrollTop } = await page.evaluate(area => {
      return {
        areaTop: area.offsetTop,
        areaLeft: area.offsetLeft,
        areaWidth: area.offsetWidth,
        areaHeight: area.offsetHeight,
        areaScrollTop: area.scrollTop
      }
    }, areaHandle)

    expect(areaScrollTop).toBe(0)

    // Calculate middle of scrollable area and click
    const areaMidX = (areaWidth / 2) + areaLeft
    const areaMidY = (areaHeight / 2) + areaTop

    const mouse = page.mouse
    await mouse.move(areaMidX, areaMidY)
    await mouse.down()
    await mouse.up()

    const updatedAreaScrollTop = await page.evaluate(area => area.scrollTop, areaHandle)

    expect(updatedAreaScrollTop).toBe(0)

    await areaHandle.dispose()
  })
})
