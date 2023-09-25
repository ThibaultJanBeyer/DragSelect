const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Stop', () => {
  it('should stop the functionality', async () => {
    await page.goto(`${baseUrl}/stop.html`)
    await page.evaluate(() => {
      window.ds = new DragSelect({
        selectables: document.querySelectorAll('.item'),
      })
      window.ds.subscribe('DS:end', ({ items }) => window.callback = items)
    })

    const mouse = page.mouse

    await mouse.move(10, 10)
    await mouse.down()
    await mouse.move(50, 50)
    await mouse.up()

    let callback = await page.evaluate(() => callback)
    expect(callback.length).toBe(1)
    callback = await page.evaluate(() => (callback = []))

    await page.evaluate(() => ds.stop())
    await mouse.move(10, 10)
    await mouse.down()
    await mouse.move(50, 50)
    await mouse.up()

    callback = await page.evaluate(() => callback)
    expect(callback.length).toBe(0)
    const dragNode = await page.$('.ds-selector')
    expect(dragNode).toBeNull()
    const areaNode = await page.$('.ds-selector-area')
    expect(areaNode).toBeNull()
  })

  it('should stop the functionality in a DS:end', async () => {
    await page.goto(`${baseUrl}/stop.html`)
    await page.evaluate(() => {
      window.ds = new DragSelect({
        selectables: document.querySelectorAll('.item'),
      })
      window.ds.subscribe('DS:end', ({ items }) => {
        window.callback = items
        ds.stop()
      })
    })

    const mouse = page.mouse

    await mouse.move(10, 10)
    await mouse.down()
    await mouse.move(50, 50)
    await mouse.up()

    var callback = await page.evaluate(() => callback)
    expect(callback.length).toBe(1)
    var callback = await page.evaluate(() => (callback = []))

    await mouse.move(10, 10)
    await mouse.down()
    await mouse.move(50, 50)
    await mouse.up()

    var callback = await page.evaluate(() => callback)
    expect(callback.length).toBe(0)
    await page.evaluate(() => ds.start())

    await mouse.move(10, 10)
    await mouse.down()
    await mouse.move(50, 50)
    await mouse.up()

    var callback = await page.evaluate(() => callback)
    expect(callback.length).toBe(1)
  })

  it('should restart the functionality after a stop', async () => {
    await page.goto(`${baseUrl}/stop.html`)
    await page.evaluate(() => {
      window.ds = new DragSelect({
        selectables: document.querySelectorAll('.item'),
      })
      window.ds.subscribe('DS:end', ({ items }) => (window.callback = items))
    })

    const mouse = page.mouse

    await mouse.move(10, 10)
    await mouse.down()
    await mouse.move(50, 50)
    await mouse.up()

    var callback = await page.evaluate(() => callback)
    expect(callback.length).toBe(1)
    await page.evaluate(() => {
      callback = []
      ds.stop()
    })

    await mouse.move(10, 10)
    await mouse.down()
    await mouse.move(50, 50)
    await mouse.up()

    var callback = await page.evaluate(() => callback)
    expect(callback.length).toBe(0)
    await page.evaluate(() => ds.start())

    await mouse.move(10, 10)
    await mouse.down()
    await mouse.move(50, 50)
    await mouse.up()

    var callback = await page.evaluate(() => callback)
    expect(callback.length).toBe(1)
  })
})
