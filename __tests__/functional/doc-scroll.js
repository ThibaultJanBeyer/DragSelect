const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Document Scroll', () => {
  it('the document should be scroll-able', async () => {
    await page.goto(`${baseUrl}/doc-scroll.html`)
    const { docHeight } = await page.evaluate(() => ({
      docHeight: window.innerHeight,
    }))

    const mouse = page.mouse
    await mouse.move(50, docHeight - 100)
    await mouse.down()
    await mouse.move(50, docHeight + 100, { steps: 50 })
    await mouse.up()

    const { selected } = await page.evaluate(() => ({
      selected: window.selected,
    }))

    const expected = [
      'item-193',
      'item-209',
      'item-225',
      'item-241',
      'item-257',
      'item-273',
      'item-289',
      'item-305',
      'item-321',
      'item-337',
      'item-353',
      'item-369',
      'item-177',
      'item-385',
      'item-401',
      'item-417',
      'item-433',
      'item-449',
      'item-465',
      'item-481',
      'item-497',
      'item-161',
    ]

    expect(selected.sort()).toEqual(expected.sort())
  })
})
