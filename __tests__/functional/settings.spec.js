import wait from '../helpers/wait'
const baseUrl = `file://${process.cwd()}/__tests__/functional`

const select = async (mouse, x, y) => {
  await mouse.move(x, y)
  await mouse.down()
  await mouse.up()
}

const selectItems = async (mouse, x, y) => {
  await wait(100)
  await mouse.move(x, y)
  await wait(100)
  await mouse.down()
  await wait(100)
  await mouse.move(5, 5)
  await wait(100)
  await mouse.up()
  await wait(100)
  const retr = await page.evaluate(() => window.callback)
  await wait(100)
  return retr
}

const moveItem = async (mouse, x, y) => {
  await mouse.move(x, y)
  await mouse.down()
  await mouse.move(x + 200, y + 200, { steps: 10 })
  await mouse.up()
}

const moveItemKey = async (mouse, keyboard, x, y, key) => {
  await mouse.move(x, y)
  await mouse.down()
  await mouse.up()
  await keyboard.press(key)
  await keyboard.press(key)
}

describe('Settings', () => {
  it('area swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    let cb

    // can select elements in the container 1
    cb = await selectItems(page.mouse, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await select(page.mouse, 180, 120)

    // can NOT select elements in the container 2
    cb = await selectItems(page.mouse, 180, 480)
    expect(cb).toMatchObject([])

    // swap swop
    await page.evaluate(() => ds.setSettings({
      area: document.getElementsByClassName('container')[1],
      selectables: document.getElementsByClassName('four'),
    }))

    // can NOT select elements in the container 1
    cb = await selectItems(page.mouse, 180, 120)
    expect(cb).toMatchObject([])

    // can select elements in the container 2
    cb = await selectItems(page.mouse, 180, 480)
    expect(cb).toMatchObject(["four"])
    await select(page.mouse, 180, 120)
  })

  it('classes swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)

    await page.evaluate(() => ds.setSettings({
      hoverClass: 'class-a',
      selectableClass: 'class-b',
      selectedClass: 'class-c',
      selectorClass: 'class-d',
      selectorAreaClass: 'class-e',
    }))

    await wait(100)

    expect(await page.evaluate(() =>
      document.querySelector('.class-b')
      && document.querySelector('.class-d')
      && document.querySelector('.class-e'))).toBeTruthy()
      
      await selectItems(page.mouse, 180, 120)
    
    expect(await page.evaluate(() =>
      document.querySelector('.class-c')
      && document.querySelector('.class-a'))).toBeTruthy()
  })

  it('zoom swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    await page.evaluate(() => ds.setSettings({ zoom: 5 }))
    await wait(100)
    expect(await page.evaluate(() => ds.stores.SettingsStore.s.zoom)).toEqual(5)
  })

  it('custom styles swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    expect(await page.evaluate(() => document.querySelector('.selectorrr').style.background)).toEqual('rgba(0, 0, 255, 0.1)')
    await page.evaluate(() => ds.setSettings({ customStyles: true, selector: null }))
    await wait(100)
    expect(await page.evaluate(() => document.querySelector('.selectorrr').style.background)).toEqual('')
  })

  it('draggability swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    let cb
    cb = await selectItems(page.mouse, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await page.evaluate(() => ds.setSettings({ draggability: false }))
    // move with draggability OFF
    await moveItem(page.mouse, 140, 85)
    cb = await selectItems(page.mouse, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    // move with draggability ON
    await page.evaluate(() => ds.setSettings({ draggability: true }))
    await moveItem(page.mouse, 140, 85)
    cb = await selectItems(page.mouse, 180, 120)
    expect(cb?.sort()).toMatchObject([])
  })

  it('immediatedrag swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    let cb
    await page.evaluate(() => ds.setSettings({ draggability: true }))
    await moveItem(page.mouse, 140, 85)
    await select(page.mouse, 180, 120)
    cb = await selectItems(page.mouse, 140, 85)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await select(page.mouse, 180, 120)
    
    await page.evaluate(() => ds.setSettings({ immediateDrag: true }))
    await moveItem(page.mouse, 140, 85)
    await select(page.mouse, 180, 85)
    cb = await selectItems(page.mouse, 140, 85)
    expect(cb).toMatchObject(["one"])
  })

  it('scroll swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    await page.evaluate(() =>
      ds.setSettings({
        draggability: true,
        immediateDrag: true,
        autoScrollSpeed: 1000,
        overflowTolerance: { x: 200, y: 200 }
      }))
    await moveItem(page.mouse, 140, 85)
    expect(await page.evaluate(() =>
      ds.Area.HTMLNode.scrollTop)).not.toBe(0)
  })

  it('keyboard swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
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
    cb = await selectItems(page.mouse, 140, 85)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await select(page.mouse, 180, 120)
    await moveItemKey(page.mouse, page.keyboard, 140, 85, 's')
    expect(await page.evaluate(() =>
      ds.Area.HTMLNode.scrollTop)).not.toBe(0)
    await page.evaluate(() =>
      ds.Area.HTMLNode.scrollTop = 0)
    await select(page.mouse, 180, 120)
    cb = await selectItems(page.mouse, 140, 85)
    expect(cb).toMatchObject(["one"])
  })

  it('useTransform swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    await page.evaluate(() =>
      ds.setSettings({
        draggability: true,
        immediateDrag: true,
        useTransform: false,
      }))
    await moveItem(page.mouse, 140, 85)
    expect(await page.evaluate(() =>
      document.querySelector("#two").style.top)).not.toBe(0)
    expect(await page.evaluate(() =>
      document.querySelector("#two").style.transform)).toBe('')
  })

  it('multiSelectKeys swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
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

  it('multiSelectMode swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)

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

  it('multiSelectToggling swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    let cb = []
    cb = await selectItems(page.mouse, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await page.keyboard.down("Shift")
    cb = await selectItems(page.mouse, 180, 120)
    expect(cb?.sort()).toMatchObject([])

    await page.evaluate(() =>
      ds.setSettings({
        multiSelectToggling: false
      }))
    
    cb = await selectItems(page.mouse, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
    await page.keyboard.down("Shift")
    cb = await selectItems(page.mouse, 180, 120)
    expect(cb?.sort()).toMatchObject(["one", "two"])
  })
})
