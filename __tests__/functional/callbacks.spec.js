const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Callbacks', () => {
  it('should trigger callbacks with the correct elements when elements are selected', async () => {
    await page.goto(`${baseUrl}/callbacks.html`)

    const mouse = page.mouse
    // move to the middle of the page
    await mouse.move(1, 1)
    await mouse.down()
    // move 300px down and to the end of the page
    // steps are how often the mouse moves
    await mouse.move(200, 200, { steps: 100 })
    await mouse.up()

    let executesFn = await page.evaluate(() => {
      return {
        onDragStartCalls: window.onDragStartCalls,
        onDragMoveCalls: window.onDragMoveCalls,
        onElementSelectCalls: window.onElementSelectCalls,
        onElementUnselectCalls: window.onElementUnselectCalls,
        callbackCalls: window.callbackCalls,
      }
    })

    expect(executesFn.onDragStartCalls.length).toBe(1)
    expect(executesFn.onDragMoveCalls.length).toBe(100)
    expect(executesFn.onElementSelectCalls.length).toBe(2)
    expect(executesFn.onElementUnselectCalls.length).toBe(0)
    expect(executesFn.callbackCalls.length).toBe(1)
    expect(executesFn.callbackCalls[0].elements.length).toBe(2)
  })
})
