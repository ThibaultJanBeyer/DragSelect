import wait from '../helpers/wait'

const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Zoom', () => {
  it('selection should remain when zoomed', async () => {
    await page.goto(`${baseUrl}/zoom.html`)
    let { selection, containerScrollbarPos } = await page.evaluate(() => {
      window.scroll({ top: 0 })

      document.querySelector('#container').scroll({ top: 0 })

      return {
        selection: ds.getSelection(),
        containerScrollbarPos: {
          top: ds.Area.HTMLNode.offsetTop,
          x: (ds.Area.HTMLNode.offsetWidth + ds.Area.HTMLNode.clientWidth) / 2,
          y:
            (ds.Area.HTMLNode.offsetHeight + ds.Area.HTMLNode.clientHeight) / 2,
        },
      }
    })

    const mouse = page.mouse
    await mouse.move(10, containerScrollbarPos.top + 20)
    await mouse.down()
    await mouse.up()

    selection = await page.evaluate(() => ds.getSelection())
    expect(selection.length).toBe(0)

    await mouse.move(75, 75)
    await mouse.down()
    await mouse.move(99, 99)
    await mouse.up()
    // we have finished mouse move select at 99px:99px
    // Initially zoom example starts with 150%
    // The container starts at 100px:100px
    // The first block in container at top: 4%; and left: 6%;
    selection = await page.evaluate(() => ds.getSelection())
    expect(selection.length).toBe(1)
    // We expect to see the selection in 75:75 - 99:99 because of zoom
    await page.evaluate(() => scroll({ top: 1000 }))
    await mouse.move(20, containerScrollbarPos.y)
    await mouse.down()
    await mouse.move(120, containerScrollbarPos.y)
    await mouse.up()

    selection = await page.evaluate(() => ds.getSelection())
    expect(selection.length).toBe(1)
  })

  it('selection should remain when zoomed and scrolled', async () => {
    await page.goto(`${baseUrl}/zoom.html`)
    let { selection } = await page.evaluate(() => {
      window.scroll({ top: 0 })

      document.querySelector('#container').scroll({
        top: 500,
        left: 500,
      })

      return {
        selection: ds.getSelection(),
      }
    })

    const mouse = page.mouse

    selection = await page.evaluate(() => ds.getSelection())
    expect(selection.length).toBe(0)

    await mouse.move(430, 430)
    await mouse.down()
    await mouse.move(30, 430)
    await wait(100)
    await mouse.up()

    selection = await page.evaluate(() => ds.getSelection())
    // Expect to see the last (6-th) button. It placed at the
    // bottom right corner of the #container.
    expect(selection.length).toBe(1)
  })
})
