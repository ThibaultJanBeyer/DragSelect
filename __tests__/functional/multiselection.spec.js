const baseUrl = `file://${process.cwd()}/__tests__/functional`

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

describe('Multiselection', () => {
  it('should multiselect', async () => {
    await page.goto(`${baseUrl}/multiselection.html`)

    const mouse = page.mouse
    await mouse.move(1, 1)
    await mouse.down()
    await mouse.move(100, 10, { steps: 10 })
    await mouse.up()

    const keyboard = page.keyboard
    await keyboard.down('Shift')
    await mouse.move(60, 10, { steps: 10 })
    await mouse.down()
    await mouse.move(200, 20, { steps: 10 })
    await mouse.up()

    await mouse.move(250, 20, { steps: 10 })
    await mouse.down()
    await mouse.up()

    const { selected } = await page.evaluate(() => ({ selected }))
    expect(selected[0]).toBe('one')
    expect(selected[1]).toBe('three')
    expect(selected[2]).toBe('four')
    expect(selected[3]).toBe('five')
  })

  it('multi-select-mode should work', async () => {
    await page.goto(`${baseUrl}/multiselection.html`)

    const mouse = page.mouse
    await mouse.move(1, 1)
    await mouse.down()
    await mouse.move(100, 10, { steps: 10 })
    await mouse.up()

    await mouse.move(60, 10, { steps: 10 })
    await mouse.down()
    await mouse.move(200, 20, { steps: 10 })
    await mouse.up()

    await mouse.move(250, 20)
    await mouse.down()
    await mouse.up()

    const { selected } = await page.evaluate(() => ({ selected }))

    expect(selected[0]).toBe('one')
    expect(selected[1]).toBe('three')
    expect(selected[2]).toBe('four')
    expect(selected[3]).toBe('five')
  })

  it('multiSelectToggling off should not toggle already selected elements', async () => {
    await page.goto(`${baseUrl}/multiselection.html`)

    const mouse = page.mouse
    await mouse.move(30, 110)
    await mouse.down()
    await mouse.move(80, 110, { steps: 10 })
    await mouse.up()

    await mouse.move(180, 110, { steps: 10 })
    await mouse.down()
    await mouse.move(30, 120, { steps: 10 })
    await mouse.up()

    const { multiSelectTogglingOff } = await page.evaluate(() => ({
      multiSelectTogglingOff,
    }))

    const expected = ['one3', 'two3', 'four3', 'three3']

    expect(multiSelectTogglingOff.sort()).toEqual(expected.sort())
  })
})
