import { moveSelect } from '../helpers/manipulations'
const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Drag N Drop', () => {
  const itemId = '2'
  const steps = 10

  it('The items should be immediately draggable', async () => {
    await page.goto(`${baseUrl}/drag-n-drop.html`)
    const { itemVect } = await page.evaluate(
      (itemId) => ({
        itemVect: window.getItemVect(itemId),
      }),
      itemId
    )

    await moveSelect(page, itemVect.x, itemVect.y, 100, steps)

    const { dragged, itemVect2, dragStart, dragMove } = await page.evaluate(
      (itemId) => ({
        itemVect2: window.getItemVect(itemId),
        dragged: window.dragged,
        dragStart: window.dragStart,
        dragMove: window.dragMove,
      }),
      itemId
    )

    expect(dragged).toEqual([`item-${itemId}`])
    expect(dragStart).toEqual([[`item-${itemId}`]])
    expect(dragMove.length).toEqual(10)
    // check if object was moved
    expect(itemVect).not.toMatchObject(itemVect2)
    expect(itemVect2.x - itemVect.x).toBeGreaterThan(50)
    expect(itemVect2.y - itemVect.y).toBeGreaterThan(50)
  })

  it('The items should be draggable after selection', async () => {
    await page.goto(`${baseUrl}/drag-n-drop.html`)

    await moveSelect(page, 1, 1, 500, steps)

    const {
      selected0,
      itemVect1,
      itemVect2,
      itemVect3,
      itemVect4,
      dragged0,
      selectMove,
    } = await page.evaluate(() => ({
      selected0: window.selected,
      itemVect1: window.getItemVect(1),
      itemVect2: window.getItemVect(2),
      itemVect3: window.getItemVect(3),
      itemVect4: window.getItemVect(4),
      dragged0: window.dragged,
      selectMove: window.selectMove,
    }))

    expect(selected0.length).toEqual(4)
    expect(dragged0.length).toEqual(0)
    expect(selectMove.length).toEqual(steps)

    await moveSelect(page, itemVect3.x, itemVect3.y, 100, steps)

    const {
      selected02,
      itemVect12,
      itemVect22,
      itemVect32,
      itemVect42,
      dragged02,
      dragStart,
      dragMove,
      selectMove2,
    } = await page.evaluate(() => ({
      selected02: window.selected,
      itemVect12: window.getItemVect(1),
      itemVect22: window.getItemVect(2),
      itemVect32: window.getItemVect(3),
      itemVect42: window.getItemVect(4),
      dragged02: window.dragged,
      dragStart: window.dragStart,
      dragMove: window.dragMove,
      selectMove2: window.selectMove,
    }))

    expect(selected02.length).toEqual(0)
    expect(dragged02.length).toEqual(4)
    expect(dragStart.length).toEqual(1)
    expect(selectMove2.length).toEqual(steps)
    expect(dragMove.length).toEqual(steps)

    expect(itemVect12).not.toMatchObject(itemVect1)
    expect(itemVect22).not.toMatchObject(itemVect2)
    expect(itemVect32).not.toMatchObject(itemVect3)
    expect(itemVect42).not.toMatchObject(itemVect4)
    expect(
      itemVect12.x - itemVect1.x + itemVect12.y - itemVect1.y
    ).toBeGreaterThan(50)
    expect(
      itemVect22.x - itemVect2.x + itemVect22.y - itemVect2.y
    ).toBeGreaterThan(50)
    expect(
      itemVect32.x - itemVect3.x + itemVect32.y - itemVect3.y
    ).toBeGreaterThan(50)
    expect(
      itemVect42.x - itemVect4.x + itemVect42.y - itemVect4.y
    ).toBeGreaterThan(50)
  })
})
