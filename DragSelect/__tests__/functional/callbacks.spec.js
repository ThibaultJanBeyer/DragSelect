import wait from '../helpers/wait'
const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Callbacks', () => {
  it('should trigger DS:ends with the correct elements when elements are selected', async () => {
    await page.goto(`${baseUrl}/callbacks.html`)

    const mouse = page.mouse
    // move to the beginning of the page
    await mouse.move(1, 1, { steps: 10 })
    await mouse.down()
    await wait(100)
    // move 200px down and to the end of the page
    // steps are how often the mouse moves
    await mouse.move(200, 200, { steps: 100 })
    await mouse.up()
    await wait(100)

    const executesFn = await page.evaluate(() => {
      ds.Area.scroll(['right'], 1)
      return {
        onPreDragStartCallsPS: window.pubsub.onPreDragStartCalls,
        onDragStartCallsPS: window.pubsub.onDragStartCalls,
        onDragMoveCallsPS: window.pubsub.onDragMoveCalls,
        onElementSelectCallsPS: window.pubsub.onElementSelectCalls,
        onElementUnselectCallsPS: window.pubsub.onElementUnselectCalls,
        callbackCallsPS: window.pubsub.callbackCalls,
        autoScrollCallsPS: window.pubsub.autoScrollCalls,
      }
    })

    expect(executesFn.onPreDragStartCallsPS.length).toBe(1)
    expect(executesFn.onPreDragStartCallsPS[0].isDragging).toBe(false)
    expect(executesFn.onPreDragStartCallsPS[0].items).toBeDefined()
    expect(executesFn.onPreDragStartCallsPS[0].item).not.toBeDefined()
    expect(
      executesFn.onPreDragStartCallsPS.isDraggingKeyboard
    ).not.toBeDefined()

    expect(executesFn.onDragStartCallsPS.length).toBe(1)
    expect(executesFn.onDragMoveCallsPS.length).toBe(100)
    expect(executesFn.onElementSelectCallsPS.length).toBe(2)
    expect(executesFn.onElementUnselectCallsPS.length).toBe(0)
    expect(executesFn.callbackCallsPS.length).toBe(1)
    expect(executesFn.autoScrollCallsPS.length).toBeGreaterThan(1)
  })
})
