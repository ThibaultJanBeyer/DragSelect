import wait from '../helpers/wait'
const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Drag N Drop - draggability', () => {
  it('The items should NOT be draggable', async () => {
    await page.goto(`${baseUrl}/drag-n-drop-draggability.html`)
    const { v1, v2, v3, v4 } = await page.evaluate(() => ({
      v1: window.getItemVect(1),
      v2: window.getItemVect(2),
      v3: window.getItemVect(3),
      v4: window.getItemVect(4),
    }))

    const mouse = page.mouse
    await mouse.move(1, 1)
    await mouse.down()
    await mouse.move(500, 500, {
      steps: 10,
    })
    await mouse.up()

    const { s1, d1 } = await page.evaluate((itemId) => ({
      d1: window.dragged,
      s1: window.selected,
    }))

    expect(d1.length).toEqual(0)
    expect(s1.length).toEqual(4)

    await mouse.move(v2.x, v2.y)
    await mouse.down()
    await mouse.move(500, 500, {
      steps: 10,
    })
    await mouse.up()

    const {
      d2,
      v12,
      v22,
      v32,
      v42,
      dragged,
      preDragStart,
      dragStart,
      dragMove,
    } = await page.evaluate((itemId) => ({
      d2: window.dragged,
      s2: window.selected,
      v12: window.getItemVect(1),
      v22: window.getItemVect(2),
      v32: window.getItemVect(3),
      v42: window.getItemVect(4),
      dragged: window.dragged,
      preDragStart: window.preDragStart,
      dragStart: window.dragStart,
      dragMove: window.dragMove,
    }))

    expect(d2.length).toEqual(0)
    expect(v12.x).toEqual(v1.x)
    expect(v22.y).toEqual(v2.y)
    expect(v32.x).toEqual(v3.x)
    expect(v42.y).toEqual(v4.y)
    expect(dragged).toEqual([])
    expect(preDragStart).toEqual([])
    expect(dragStart).toEqual([])
    expect(dragMove).toEqual([])
  })

  it('The items should NOT be draggable via keyboard', async () => {
    await page.goto(`${baseUrl}/drag-n-drop-draggability.html`)

    const { v2 } = await page.evaluate(() => ({
      v2: window.getItemVect(2),
    }))

    const { keyboard } = page
    await keyboard.press('Tab')
    await keyboard.press('Tab')
    await keyboard.press('Enter')
    await keyboard.press('ArrowDown')

    const { v22, dragged, dragStart, dragMove } = await page.evaluate(() => ({
      v22: window.getItemVect(2),
      dragged: window.dragged,
      dragStart: window.dragStart,
      dragMove: window.dragMove,
    }))

    expect(dragged).toEqual([])
    expect(dragStart).toEqual([])
    expect(dragMove).toEqual([])
    expect(v2.x - v22.x + v2.y - v22.y).toEqual(0)
  })
})
