import { moveSelectTo } from '../helpers/manipulations'
import wait from '../helpers/wait'

const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('DropZone', () => {
  let response

  it('by default all should be droppable', async () => {
    await page.goto(`${baseUrl}/dropzone.html`)
    await moveSelectTo(page, 1, 1, 300, 300)
    await moveSelectTo(page, 80, 75, 410, 515)
    response = await page.evaluate(() => ({ dropTarget }))
    expect(response.dropTarget.id).toBe('zone-4')
    expect(response.dropTarget.itemsDropped.length).toBe(4)
    expect(response.dropTarget.itemsInside.length).toBe(4)
  })

  it('dropping into a dropzone should work', async () => {
    await page.goto(`${baseUrl}/dropzone.html`)

    await moveSelectTo(page, 30, 60, 150, 270)
    response = await page.evaluate(() => ({ dropTarget }))
    expect(response.dropTarget.id).toBe('zone-1')
    expect(response.dropTarget.itemsDropped.length).toBe(1)
    expect(response.dropTarget.itemsDropped[0]).toBe('item-1')
    expect(response.dropTarget.itemsInside.length).toBe(1)
    expect(response.dropTarget.itemsInside[0]).toBe('item-1')
    expect(response.dropTarget.element).toBe('zone-1')
    expect(response.dropTarget.droppables.length).toBe(2)

    await moveSelectTo(page, 80, 60, 150, 270)
    response = await page.evaluate(() => ({ dropTarget }))
    expect(response.dropTarget.id).toBe('zone-1')
    expect(response.dropTarget.itemsDropped.length).toBe(1)
    expect(response.dropTarget.itemsInside.length).toBe(1)
    expect(response.dropTarget.itemsInside[0]).toBe('item-1')

    await moveSelectTo(page, 125, 60, 150, 550)
    response = await page.evaluate(() => ({ dropTarget }))
    expect(response.dropTarget.id).toBe('zone-3')
    expect(response.dropTarget.itemsDropped.length).toBe(1)
    expect(response.dropTarget.itemsInside.length).toBe(1)
    expect(response.dropTarget.itemsInside[0]).toBe('item-3')
  })

  it('dropping should land in the respective zone', async () => {
    await page.goto(`${baseUrl}/dropzone.html`)

    await moveSelectTo(page, 1, 1, 300, 200)
    await moveSelectTo(page, 10, 60, 255, 275)
    response = await page.evaluate(() => ({ dropTarget }))
    expect(response.dropTarget.id).toBe('zone-1')
    expect(response.dropTarget.itemsDropped.length).toBe(2)
    expect(response.dropTarget.itemsDropped[0]).toBe('item-1')
    expect(response.dropTarget.itemsDropped[1]).toBe('item-4')
    expect(response.dropTarget.itemsInside.length).toBe(0)

    response = await page.evaluate(() => ({
      inside: ds.getItemsInsideByZoneId('zone-2').map((item) => item.id),
      dropped: ds.getItemsDroppedByZoneId('zone-2').map((item) => item.id),
    }))
    expect(response.inside.length).toBe(2)
    expect(response.inside[0]).toBe('item-2')
    expect(response.inside[1]).toBe('item-4')
    expect(response.dropped.length).toBe(0)
  })

  it('drop inside threshold should be changeable', async () => {
    await page.goto(`${baseUrl}/dropzone.html`)

    response = await page.evaluate(() => {
      ds.setSettings({ dropInsideThreshold: 0 })
    })
    await moveSelectTo(page, 10, 60, 255, 275)
    response = await page.evaluate(() => ({ dropTarget }))
    expect(response.dropTarget.itemsDropped.length).toBe(1)
    expect(response.dropTarget.itemsInside.length).toBe(1)
  })

  it('drop target threshold should be changeable', async () => {
    await page.goto(`${baseUrl}/dropzone.html`)

    response = await page.evaluate(() => {
      ds.setSettings({ dropTargetThreshold: 0.5 })
    })
    await moveSelectTo(page, 10, 60, 200, 250)
    response = await page.evaluate(() => ({
      dropTarget,
      inside: ds.getItemsInsideByZoneId('zone-1').map((item) => item.id),
      dropped: ds.getItemsDroppedByZoneId('zone-1').map((item) => item.id),
    }))
    expect(response.dropTarget).toMatchObject({})
    expect(response.inside.length).toBe(1)
    expect(response.dropped.length).toBe(0)
  })

  it('classes should be applied', async () => {
    await page.goto(`${baseUrl}/dropzone.html`)

    await page.evaluate(() => {
      ds.setSettings({
        dropZoneClass: 'dropZoneClass',

        droppableClass: 'droppableClass',
        dropZoneReadyClass: 'dropZoneReadyClass',

        droppedTargetClass: 'droppedTargetClass',
        droppedInsideClass: 'droppedInsideClass',
        dropZoneTargetClass: 'dropZoneTargetClass',
        dropZoneInsideClass: 'dropZoneInsideClass',
      })
    })
    await wait(500)

    const getClasses = async () =>
      page.evaluate(() => ({
        dropZoneClass: document.querySelectorAll('.dropZoneClass').length,

        droppableClass: document.querySelectorAll('.droppableClass').length,
        droppableClassId2: document.querySelectorAll('.droppableClass-zone-2')
          .length,
        dropZoneReadyClass: document.querySelectorAll('.dropZoneReadyClass')
          .length,

        droppedTargetClass: document.querySelectorAll('.droppedTargetClass')
          .length,
        droppedTargetClassId2: document.querySelectorAll(
          '.droppedTargetClass-zone-2'
        ).length,
        droppedInsideClass: document.querySelectorAll('.droppedInsideClass')
          .length,
        droppedInsideClassId2: document.querySelectorAll(
          '.droppedInsideClass-zone-2'
        ).length,
        dropZoneTargetClass: document.querySelectorAll('.dropZoneTargetClass')
          .length,
        dropZoneInsideClass: document.querySelectorAll('.dropZoneInsideClass')
          .length,
      }))

    // idle
    response = await getClasses()
    expect(response.dropZoneClass).toBe(4)
    expect(response.droppedTargetClass).toBe(0)
    expect(response.dropZoneTargetClass).toBe(0)

    // move
    await page.mouse.move(80, 60)
    await wait(100)
    await page.mouse.down()
    await wait(100)
    await page.mouse.move(400, 300, { steps: 10 })
    await wait(100)

    response = await getClasses()
    expect(response.droppableClass).toBe(1)
    expect(response.droppableClassId2).toBe(1)
    expect(response.dropZoneReadyClass).toBe(2)

    // drop
    await page.mouse.up()
    await wait(100)

    response = await getClasses()
    expect(response.droppedTargetClass).toBe(1)
    expect(response.droppedTargetClassId2).toBe(1)
    expect(response.droppedInsideClass).toBe(1)
    expect(response.droppedInsideClassId2).toBe(1)
    expect(response.dropZoneTargetClass).toBe(1)
    expect(response.dropZoneInsideClass).toBe(1)
  })
})
