import { test, expect } from '@playwright/test';
import { baseUrl } from './shared';

test.describe('Stop', () => {
  test('should stop the functionality', async ({ page }) => {
    await page.goto(`${baseUrl}/stop.html`)
    await page.evaluate(() => {
      window.ds = new DragSelect({
        selectables: document.querySelectorAll('.item'),
      })
      window.ds.subscribe('callback', ({ items }) => {
        console.log('highlevel callback fired')
        window.callback = items
      })
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

  test('should stop the functionality in a callback', async ({ page }) => {
    await page.goto(`${baseUrl}/stop.html`)
    await page.evaluate(() => {
      window.ds = new DragSelect({
        selectables: document.querySelectorAll('.item'),
      })
      window.ds.subscribe('callback', ({ items }) => {
        console.log('highlevel callback fired', items)
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

  test('should restart the functionality after a stop', async ({ page }) => {
    await page.goto(`${baseUrl}/stop.html`)
    await page.evaluate(() => {
      window.ds = new DragSelect({
        selectables: document.querySelectorAll('.item'),
      })
      window.ds.subscribe('callback', ({ items }) => (window.callback = items))
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
