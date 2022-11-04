import { test, expect } from '@playwright/test';
import { baseUrl, wait, goToOptimized, getStepFactorByBrowser } from './shared';

const select = async (mouse, x, y) => {
  await mouse.move(x, y)
  await mouse.down()
  await mouse.up()
  await wait(100)
}

const selectItems = async (page, x, y) => {
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(5, 5)
  await page.mouse.up()
  await wait(100)
  const retr = await page.evaluate(() => window.callback)
  return retr
}

const moveItem = async (mouse, x, y, testInfo) => {
  await mouse.move(x, y)
  await mouse.down()
  await mouse.move(x + 200, y + 200, { steps: 100 * getStepFactorByBrowser(testInfo.project.name) })
  await mouse.up()
  await wait(100)
}

const moveItemKey = async (mouse, keyboard, x, y, key) => {
  await mouse.move(x, y)
  await mouse.down()
  await mouse.up()
  await wait(100)
  await keyboard.press(key)
  await keyboard.press(key)
}

test.describe('Settings', () => {
  test('area swapping should work', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)
    let cb

    // can select elements in the container 1
    cb = await selectItems(page, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await select(page.mouse, 180, 120)

    // can NOT select elements in the container 2
    cb = await selectItems(page, 180, 480)
    expect(cb).toMatchObject([])

    // swap swop
    await page.evaluate(() => ds.setSettings({
      area: document.getElementsByClassName('container')[1],
      selectables: document.getElementsByClassName('four'),
    }))

    // can NOT select elements in the container 1
    cb = await selectItems(page, 180, 120)
    expect(cb).toMatchObject([])

    // can select elements in the container 2
    cb = await selectItems(page, 180, 480)
    expect(cb).toMatchObject(["four"])
    await select(page.mouse, 180, 120)
  })

  test('classes swapping should work', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)

    await page.evaluate(() => ds.setSettings({
      hoverClass: 'class-a',
      selectableClass: 'class-b',
      selectedClass: 'class-c',
      selectorClass: 'class-d',
      selectorAreaClass: 'class-e',
    }))

    expect(await page.evaluate(() =>
      document.querySelector('.class-b')
      && document.querySelector('.class-d')
      && document.querySelector('.class-e'))).toBeTruthy()
      
      await selectItems(page, 180, 120)
    
    expect(await page.evaluate(() =>
      document.querySelector('.class-c')
      && document.querySelector('.class-a'))).toBeTruthy()
  })

  test('zoom swapping should work', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)
    await page.evaluate(() => ds.setSettings({ zoom: 5 }))
    expect(await page.evaluate(() => ds.stores.SettingsStore.s.zoom)).toEqual(5)
  })

  test('custom styles swapping should work', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)
    expect(await page.evaluate(() => document.querySelector('.selectorrr').style.background)).toEqual('rgba(0, 0, 255, 0.1)')
    await page.evaluate(() => ds.setSettings({ customStyles: true, selector: null }))
    expect(await page.evaluate(() => document.querySelector('.selectorrr').style.background)).toEqual('')
  })

  test('draggability swapping should work', async ({ page }, testInfo) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)
    let cb
    cb = await selectItems(page, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await page.evaluate(() => ds.setSettings({ draggability: false }))
    // move with draggability OFF
    await moveItem(page.mouse, 140, 85, testInfo)
    cb = await selectItems(page, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    // move with draggability ON
    await page.evaluate(() => ds.setSettings({ draggability: true }))
    await moveItem(page.mouse, 140, 85, testInfo)
    cb = await selectItems(page, 180, 120)
    expect(cb?.sort()).toMatchObject([])
  })

  test('immediatedrag swapping should work', async ({ page }, testInfo) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)
    let cb
    await page.evaluate(() => ds.setSettings({ draggability: true }))
    await moveItem(page.mouse, 140, 85, testInfo)
    await select(page.mouse, 180, 120)
    cb = await selectItems(page, 140, 85)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await select(page.mouse, 180, 120)
    await page.evaluate(() => ds.setSettings({ immediateDrag: true }))
    await moveItem(page.mouse, 140, 85, testInfo)
    await select(page.mouse, 180, 85)
    cb = await selectItems(page, 140, 85)
    expect(cb).toMatchObject(["one"])
  })

  test('scroll swapping should work', async ({ page }, testInfo) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)
    await page.evaluate(() =>
      ds.setSettings({
        draggability: true,
        immediateDrag: true,
        autoScrollSpeed: 1000,
        overflowTolerance: { x: 200, y: 200 }
      }))
    await moveItem(page.mouse, 140, 85, testInfo)
    expect(await page.evaluate(() =>
      ds.Area.HTMLNode.scrollTop)).not.toBe(0)
  })

  test('keyboard swapping should work', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)
    await page.evaluate(() =>
      ds.setSettings({
        draggability: true,
        keyboardDrag: true,
        dragKeys: {
            down: ['s'],
        },
        keyboardDragSpeed: 100,
      }))
    
    let cb = []
    cb = await selectItems(page, 140, 85)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await select(page.mouse, 180, 120)
    await moveItemKey(page.mouse, page.keyboard, 140, 85, 's')
    expect(await page.evaluate(() =>
      ds.Area.HTMLNode.scrollTop)).not.toBe(0)
    await page.evaluate(() =>
      ds.Area.HTMLNode.scrollTop = 0)
    await select(page.mouse, 180, 120)
    cb = await selectItems(page, 140, 85)
    expect(cb).toMatchObject(["one"])
  })

  test('useTransform swapping should work', async ({ page }, testInfo) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)
    await page.evaluate(() =>
      ds.setSettings({
        draggability: true,
        immediateDrag: true,
        useTransform: false,
      }))
    await moveItem(page.mouse, 140, 85, testInfo)
    expect(await page.evaluate(() =>
      document.querySelector("#two").style.top)).not.toBe(0)
    expect(await page.evaluate(() =>
      document.querySelector("#two").style.transform)).toBe('')
  })

  test('multiSelectKeys swapping should work', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)
    await page.evaluate(() =>
      ds.setSettings({
        multiSelectKeys: ['q'],
      }))
    await select(page.mouse, 140, 85)
    await page.keyboard.down('Shift')
    await select(page.mouse, 85, 85)
    await page.keyboard.up('Shift')
    expect(await page.evaluate(() =>
      document.querySelectorAll(".ds-selected").length)).toBe(1)
    await page.keyboard.down('q')
    await select(page.mouse, 140, 85)
    expect(await page.evaluate(() =>
      document.querySelectorAll(".ds-selected").length)).toBe(2)
    await page.keyboard.up('q')
  })

  test('multiSelectMode swapping should work', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)

    await select(page.mouse, 140, 85)
    await select(page.mouse, 85, 85)
    expect(await page.evaluate(() =>
      document.querySelectorAll(".ds-selected").length)).toBe(1)

    await page.evaluate(() =>
      ds.setSettings({
        multiSelectMode: true
      }))
    await select(page.mouse, 140, 85)
    expect(await page.evaluate(() =>
      document.querySelectorAll(".ds-selected").length)).toBe(2)
  })

  test('multiSelectToggling swapping should work', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/settings.html`)
    let cb = []
    cb = await selectItems(page, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await page.keyboard.down("Shift")
    cb = await selectItems(page, 180, 120)
    expect(cb?.sort()).toMatchObject([])

    await page.evaluate(() =>
      ds.setSettings({
        multiSelectToggling: false
      }))
    
    cb = await selectItems(page, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await page.keyboard.down("Shift")
    cb = await selectItems(page, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
  })
})
