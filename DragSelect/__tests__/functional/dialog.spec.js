import wait from '../helpers/wait'

const baseUrl = `file://${process.cwd()}/__tests__/functional`

const getAreaRect = () =>
  page.evaluate(() => {
    const area = document.querySelector('.container')
    const { top, left } = area.getBoundingClientRect()
    const style = getComputedStyle(area)
    return {
      top: top + parseFloat(style.borderTopWidth),
      left: left + parseFloat(style.borderLeftWidth),
    }
  })

// drags from x/y to dX/dY and inspects the selector before releasing the mouse
const dragAndInspect = async (x, y, dX, dY) => {
  const mouse = page.mouse
  await mouse.move(x, y)
  await wait(100)
  await mouse.down()
  await wait(100)
  await mouse.move(dX, dY, { steps: 10 })
  await wait(100)

  const inspected = await page.evaluate(() => {
    const selectorArea = document.querySelector('.ds-selector-area')
    const selector = document.querySelector('.ds-selector')
    const selectorAreaRect = selectorArea.getBoundingClientRect()
    const selectorRect = selector.getBoundingClientRect()

    // the selector has no pointer-events, so we enable them to hit-test whether it is painted on top
    selector.style.pointerEvents = 'auto'
    const topElement = document.elementFromPoint(
      selectorRect.left + selectorRect.width / 2,
      selectorRect.top + selectorRect.height / 2
    )
    selector.style.pointerEvents = 'none'

    return {
      isInDialog: !!selectorArea.closest('dialog'),
      selectorArea: { top: selectorAreaRect.top, left: selectorAreaRect.left },
      selector: { top: selectorRect.top, left: selectorRect.left },
      isSelectorOnTop: topElement === selector,
    }
  })

  await mouse.up()
  await wait(100)

  const callbackIds = await page.evaluate(() => window.callbackIds)
  return { ...inspected, callbackIds }
}

describe('Dialog', () => {
  it('selector should be drawn on top of a modal dialog', async () => {
    await page.goto(`${baseUrl}/dialog.html`)
    await wait(200)

    const area = await getAreaRect()
    const result = await dragAndInspect(
      area.left + 5,
      area.top + 5,
      area.left + 160,
      area.top + 160
    )

    expect(result.isInDialog).toBe(true)
    expect(result.isSelectorOnTop).toBe(true)
    expect(result.selectorArea.top).toBeCloseTo(area.top, 0)
    expect(result.selectorArea.left).toBeCloseTo(area.left, 0)
    expect(result.selector.top).toBeCloseTo(area.top + 5, 0)
    expect(result.selector.left).toBeCloseTo(area.left + 5, 0)
    expect(result.callbackIds).toEqual(['one', 'two', 'three', 'four'])
  })

  it('selector should be positioned correctly when the dialog is transformed', async () => {
    await page.goto(`${baseUrl}/dialog.html`)
    await wait(200)

    // a transform makes the dialog the containing block of the fixed selector area
    await page.evaluate(() => {
      document.getElementById('dialog').style.transform =
        'translate(100px, 50px)'
    })
    // wait for the debounced modification observers
    await wait(300)

    const area = await getAreaRect()
    const result = await dragAndInspect(
      area.left + 5,
      area.top + 5,
      area.left + 160,
      area.top + 160
    )

    expect(result.isInDialog).toBe(true)
    expect(result.isSelectorOnTop).toBe(true)
    expect(result.selectorArea.top).toBeCloseTo(area.top, 0)
    expect(result.selectorArea.left).toBeCloseTo(area.left, 0)
    expect(result.selector.top).toBeCloseTo(area.top + 5, 0)
    expect(result.selector.left).toBeCloseTo(area.left + 5, 0)
    expect(result.callbackIds).toEqual(['one', 'two', 'three', 'four'])
  })
})
