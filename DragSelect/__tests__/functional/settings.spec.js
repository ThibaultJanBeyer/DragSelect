import wait from '../helpers/wait'
import {
  moveSelect,
  moveSelectTo,
  moveKey,
  click,
} from '../helpers/manipulations'

const baseUrl = `file://${process.cwd()}/__tests__/functional`

const selectItems = async (x, y) => {
  await moveSelectTo(page, x, y, 5, 5, 1)
  const cb = await page.evaluate(() => window.callback)
  await wait(100)
  return cb
}

describe('Settings', () => {
  it('area swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    let cb

    // can click elements in the container 1
    cb = await selectItems(180, 120)
    expect(cb?.sort()).toMatchObject(['one', 'two'])
    await click(page, 180, 120)

    // can NOT click elements in the container 2
    cb = await selectItems(180, 480)
    expect(cb).toMatchObject([])

    // swap swop
    await page.evaluate(() =>
      ds.setSettings({
        area: document.getElementsByClassName('container')[1],
        selectables: document.getElementsByClassName('four'),
      })
    )

    // can NOT click elements in the container 1
    cb = await selectItems(180, 120)
    expect(cb).toMatchObject([])

    // can click elements in the container 2
    cb = await selectItems(180, 480)
    expect(cb).toMatchObject(['four'])
    await click(page, 180, 120)
  })

  it('classes swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)

    await page.evaluate(() =>
      ds.setSettings({
        hoverClass: 'class-a',
        selectableClass: 'class-b',
        selectedClass: 'class-c',
        selectorClass: 'class-d',
        selectorAreaClass: 'class-e',
      })
    )

    await wait(100)

    expect(
      await page.evaluate(
        () =>
          document.querySelector('.class-b') &&
          document.querySelector('.class-d') &&
          document.querySelector('.class-e')
      )
    ).toBeTruthy()

    await selectItems(180, 120)

    expect(
      await page.evaluate(
        () =>
          document.querySelector('.class-c') &&
          document.querySelector('.class-a')
      )
    ).toBeTruthy()
  })

  it('zoom swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    await page.evaluate(() => ds.setSettings({ zoom: 5 }))
    await wait(100)
    expect(await page.evaluate(() => ds.stores.SettingsStore.s.zoom)).toEqual(5)
  })

  it('custom styles swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    expect(
      await page.evaluate(
        () => document.querySelector('.selectorrr').style.background
      )
    ).toEqual('rgba(0, 175, 255, 0.2)')
    await page.evaluate(() =>
      ds.setSettings({ customStyles: true, selector: null })
    )
    await wait(100)
    expect(
      await page.evaluate(
        () => document.querySelector('.selectorrr').style.background
      )
    ).toEqual('')
  })

  it('draggability swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    let cb
    cb = await selectItems(180, 120)
    expect(cb?.sort()).toMatchObject(['one', 'two'])
    await page.evaluate(() => ds.setSettings({ draggability: false }))
    // move with draggability OFF
    await moveSelect(page, 140, 85)
    cb = await selectItems(180, 120)
    expect(cb?.sort()).toMatchObject(['one', 'two'])
    // move with draggability ON
    await page.evaluate(() => ds.setSettings({ draggability: true }))
    await moveSelect(page, 140, 85)
    cb = await selectItems(180, 120)
    expect(cb?.sort()).toMatchObject([])
  })

  it('immediatedrag swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    let cb
    await page.evaluate(() => ds.setSettings({ draggability: true }))
    await moveSelect(page, 140, 85)
    await click(page, 180, 120)
    cb = await selectItems(140, 85)
    expect(cb?.sort()).toMatchObject(['one', 'two'])
    await click(page, 180, 120)

    await page.evaluate(() => ds.setSettings({ immediateDrag: true }))
    await moveSelect(page, 140, 85)
    await click(page, 180, 85)
    cb = await selectItems(140, 85)
    expect(cb).toMatchObject(['one'])
  })

  it('scroll swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    await page.evaluate(() =>
      ds.setSettings({
        draggability: true,
        immediateDrag: true,
        autoScrollSpeed: 1000,
        overflowTolerance: { x: 200, y: 200 },
      })
    )
    await moveSelect(page, 140, 85)
    expect(await page.evaluate(() => ds.Area.HTMLNode.scrollTop)).not.toBe(0)
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
      })
    )

    let cb = []
    const prevY = await page.evaluate(
      () => document.querySelector('#two').getBoundingClientRect().y
    )
    cb = await selectItems(140, 85)
    expect(cb?.sort()).toMatchObject(['one', 'two'])
    await click(page, 180, 120)
    await moveKey(page, page.keyboard, 140, 85, 's')
    const newY = await page.evaluate(
      () => document.querySelector('#two').getBoundingClientRect().y
    )
    expect(newY).toBeGreaterThan(prevY)
    await page.evaluate(() => (ds.Area.HTMLNode.scrollTop = 0))
    await click(page, 180, 120)
    cb = await selectItems(140, 85)
    expect(cb).toMatchObject(['one'])
  })

  it('useTransform swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    await page.evaluate(() =>
      ds.setSettings({
        draggability: true,
        immediateDrag: true,
        useTransform: false,
      })
    )
    await moveSelect(page, 140, 85)
    expect(
      await page.evaluate(() => document.querySelector('#two').style.top)
    ).not.toBe(0)
    expect(
      await page.evaluate(() => document.querySelector('#two').style.transform)
    ).toBe('')
  })

  it('multiSelectKeys swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    await page.evaluate(() =>
      ds.setSettings({
        multiSelectKeys: ['q'],
      })
    )
    await click(page, 140, 85)
    await page.keyboard.down('Shift')
    await click(page, 85, 85)
    await page.keyboard.up('Shift')
    expect(
      await page.evaluate(
        () => document.querySelectorAll('.ds-selected').length
      )
    ).toBe(1)
    await page.keyboard.down('q')
    await click(page, 140, 85)
    expect(
      await page.evaluate(
        () => document.querySelectorAll('.ds-selected').length
      )
    ).toBe(2)
    await page.keyboard.up('q')
  })

  it('multiSelectMode swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)

    await click(page, 140, 85)
    await click(page, 85, 85)
    expect(
      await page.evaluate(
        () => document.querySelectorAll('.ds-selected').length
      )
    ).toBe(1)

    await page.evaluate(() =>
      ds.setSettings({
        multiSelectMode: true,
      })
    )
    await click(page, 140, 85)
    expect(
      await page.evaluate(
        () => document.querySelectorAll('.ds-selected').length
      )
    ).toBe(2)
  })

  it('multiSelectToggling swapping should work', async () => {
    await page.goto(`${baseUrl}/settings.html`)
    let cb = []
    cb = await selectItems(180, 120)
    expect(cb?.sort()).toMatchObject(['one', 'two'])
    await page.keyboard.down('Shift')
    cb = await selectItems(180, 120)
    expect(cb?.sort()).toMatchObject([])

    await page.evaluate(() =>
      ds.setSettings({
        multiSelectToggling: false,
      })
    )

    cb = await selectItems(180, 120)
    expect(cb?.sort()).toMatchObject(['one', 'two'])
    await page.keyboard.down('Shift')
    cb = await selectItems(180, 120)
    expect(cb?.sort()).toMatchObject(['one', 'two'])
  })
})
