import wait from '../helpers/wait'
const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Multiselection', () => {
  it('should multiselect', async () => {
    await page.goto(`${baseUrl}/multiselection.html`)

    const mouse = page.mouse
    await mouse.move(1, 1, { steps: 10 })
    await mouse.down()
    await mouse.move(100, 30, { steps: 10 })
    await mouse.up()
    await wait(100)

    const keyboard = page.keyboard
    await keyboard.down('Shift')
    await mouse.move(60, 30, { steps: 10 })
    await mouse.down()
    await mouse.move(200, 40, { steps: 10 })
    await mouse.up()
    await wait(100)

    await mouse.move(250, 40, { steps: 10 })
    await mouse.down()
    await mouse.up()
    await wait(100)

    const { selected } = await page.evaluate(() => ({ selected }))
    const expected = ['one', 'three', 'four', 'five']
    expect(selected.sort()).toEqual(expected.sort())
  })

  it('multi-select-mode should work', async () => {
    await page.goto(`${baseUrl}/multiselection.html`)

    const mouse = page.mouse
    await mouse.move(1, 80, { steps: 10 })
    await mouse.down()
    await mouse.move(100, 100, { steps: 10 })
    await mouse.up()
    await wait(100)

    await mouse.move(60, 80, { steps: 10 })
    await mouse.down()
    await mouse.move(200, 100, { steps: 10 })
    await mouse.up()
    await wait(100)

    await mouse.move(250, 100, { steps: 10 })
    await mouse.down()
    await mouse.up()
    await wait(100)

    const { multiselected } = await page.evaluate(() => ({ multiselected }))
    const expected = ['one2', 'three2', 'four2', 'five2']
    expect(multiselected.sort()).toEqual(expected.sort())
  })

  it('multiSelectToggling off should not toggle already selected elements', async () => {
    await page.goto(`${baseUrl}/multiselection.html`)

    const mouse = page.mouse
    await mouse.move(30, 160)
    await mouse.down()
    await mouse.move(80, 160, { steps: 10 })
    await mouse.up()
    await wait(100)

    await mouse.move(180, 160, { steps: 10 })
    await mouse.down()
    await mouse.move(30, 170, { steps: 10 })
    await mouse.up()
    await wait(100)

    const { multiSelectTogglingOff } = await page.evaluate(() => ({
      multiSelectTogglingOff,
    }))

    const expected = ['one3', 'two3', 'four3', 'three3']
    expect(multiSelectTogglingOff.sort()).toEqual(expected.sort())
  })

  it('multiSelect-ingore-parents should only select the child when intersecting with parent and the selection area is within the child', async () => {
    await page.goto(`${baseUrl}/multiselection.html`)

    const mouse = page.mouse
    const keyboard = page.keyboard
    await keyboard.down('Shift')
    await mouse.move(50, 240, { steps: 10 })
    await mouse.down()
    await mouse.move(40, 240, { steps: 10 })
    await mouse.up()
    await wait(100)

    const { multiSelectIgnoreParents } = await page.evaluate(() => ({
      multiSelectIgnoreParents,
    }))

    const expected = ['two4']
    expect(multiSelectIgnoreParents).toEqual(expected)
  })

  it('multiSelect-ingore-parents should select both when the selection area is not completely inside the child', async () => {
    await page.goto(`${baseUrl}/multiselection.html`)

    const mouse = page.mouse
    const keyboard = page.keyboard
    await keyboard.down('Shift')
    await mouse.move(50, 240, { steps: 10 })
    await mouse.down()
    await mouse.move(20, 240, { steps: 10 })
    await mouse.up()
    await wait(100)

    const { multiSelectIgnoreParents } = await page.evaluate(() => ({
      multiSelectIgnoreParents,
    }))

    const expected = ['one4', 'two4']
    expect(multiSelectIgnoreParents.sort()).toEqual(expected.sort())
  })
})
