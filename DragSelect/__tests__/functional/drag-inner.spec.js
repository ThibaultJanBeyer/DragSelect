const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Drag Inner', () => {
  it('it should be able to drag an element even if it has inner elements', async () => {
    await page.goto(`${baseUrl}/drag-inner.html`)

    const inner = await page.$('.inner')
    const beforePos = await inner.boundingBox()

    const mouse = page.mouse
    await mouse.move(25, 25)
    await mouse.down()
    await mouse.move(150, 150, { steps: 50 })
    await mouse.up()

    const afterPos = await inner.boundingBox()
    expect(afterPos).not.toEqual(beforePos)
  })
})
