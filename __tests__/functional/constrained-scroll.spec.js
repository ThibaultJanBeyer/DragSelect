const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Constrained Scroll', () => {
  it('selection should be able to scroll in the constrained container while dragging', async () => {
    await page.goto(`${baseUrl}/constrained-scroll.html`)

    const mouse = page.mouse
    await mouse.move(110, 110)
    await mouse.down()
    await mouse.move(400, 400, { steps: 60 })
    await mouse.up()

    let executesFn = await page.evaluate(() => {
      return {
        ids: window.itemIds,
        callbackIds: window.callbackIds,
      }
    })

    expect(executesFn.callbackIds.length).toBe(executesFn.ids.length)
    expect(executesFn.callbackIds).toEqual(
      expect.arrayContaining(executesFn.ids)
    )
  })
})
