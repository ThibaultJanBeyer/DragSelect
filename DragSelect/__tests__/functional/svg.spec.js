import wait from '../helpers/wait'
const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('SVG', () => {
  it('The items should be selectable and draggable', async () => {
    await page.goto(`${baseUrl}/svg.html`)

    const mouse = page.mouse
    await mouse.move(50, 50, { steps: 10 })
    await mouse.down()
    await wait(100)
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
      selected0: window.selected,
      itemVect1: window.getItemVect(1),
      itemVect2: window.getItemVect(2),
      itemVect3: window.getItemVect(3),
      itemVect4: window.getItemVect(4),
      dragged0: window.dragged,
    }))

    expect(selected0.length).toEqual(4)
    expect(dragged0.length).toEqual(0)

    await mouse.move(itemVect3.x, itemVect3.y, { steps: 10 })
    await mouse.down()
    await wait(100)
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
    } = await page.evaluate(() => ({
      selected02: window.selected,
      itemVect12: window.getItemVect(1),
      itemVect22: window.getItemVect(2),
      itemVect32: window.getItemVect(3),
      itemVect42: window.getItemVect(4),
      dragged02: window.dragged,
    }))

    expect(selected02.length).toEqual(0)
    expect(dragged02.length).toEqual(4)

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
