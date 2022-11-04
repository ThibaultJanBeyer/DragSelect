import { test, expect } from '@playwright/test';
import { baseUrl, wait } from './shared';

test.describe('Drag N Drop', () => {
  const itemId = '2'

  test('The items should be immediately draggable', async ({ page }) => {
    await page.goto(`${baseUrl}/drag-n-drop.html`)
    const { itemVect } = await page.evaluate(
      (itemId) => ({
        itemVect: window.getItemVect(itemId),
      }),
      itemId
    )

    const mouse = page.mouse
    await mouse.move(itemVect.x, itemVect.y)
    await mouse.down()
    await mouse.move(itemVect.x + 100, itemVect.y + 100, {
      steps: 10,
    })
    await mouse.up()
    await wait(100)

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
    expect(itemVect).not.toMatchObject(itemVect2)
    expect(itemVect2.x - itemVect.x + itemVect2.y - itemVect.y).toBeGreaterThan(
      50
    )
  })

  test('The items should be draggable after selection', async ({ page }) => {
    await page.goto(`${baseUrl}/drag-n-drop.html`)

    const mouse = page.mouse
    await mouse.move(1, 1)
    await mouse.down()
    await mouse.move(500, 500, {
      steps: 10,
    })
    await mouse.up()
    await wait(100)

    const {
      selected0,
      itemVect1,
      itemVect2,
      itemVect3,
      itemVect4,
      dragged0,
    } = await page.evaluate(() => ({
      // @ts-ignore
      selected0: window.selected,
      // @ts-ignore
      itemVect1: window.getItemVect(1),
      // @ts-ignore
      itemVect2: window.getItemVect(2),
      // @ts-ignore
      itemVect3: window.getItemVect(3),
      // @ts-ignore
      itemVect4: window.getItemVect(4),
      // @ts-ignore
      dragged0: window.dragged,
    }))

    expect(selected0.length).toEqual(4)
    expect(dragged0.length).toEqual(0)

    await mouse.move(itemVect3.x, itemVect3.y)
    await mouse.down()
    await mouse.move(itemVect3.x + 100, itemVect3.y + 100, {
      steps: 10,
    })
    await mouse.up()
    await wait(100)

    const {
      selected02,
      itemVect12,
      itemVect22,
      itemVect32,
      itemVect42,
      dragged02,
      dragStart,
      dragMove,
    } = await page.evaluate(() => ({
      // @ts-ignore
      selected02: window.selected,
      // @ts-ignore
      itemVect12: window.getItemVect(1),
      // @ts-ignore
      itemVect22: window.getItemVect(2),
      // @ts-ignore
      itemVect32: window.getItemVect(3),
      // @ts-ignore
      itemVect42: window.getItemVect(4),
      // @ts-ignore
      dragged02: window.dragged,
      // @ts-ignore
      dragStart: window.dragStart,
      // @ts-ignore
      dragMove: window.dragMove,
    }))

    expect(selected02.length).toEqual(0)
    expect(dragged02.length).toEqual(4)
    expect(dragStart.length).toEqual(1)
    expect(dragMove.length).toBeGreaterThanOrEqual(5)

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
