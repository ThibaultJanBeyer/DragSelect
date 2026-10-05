// puppeteer.KnownDevices['iPhone 6'], inlined since puppeteer is ESM only and can't be required here
const iPhone = {
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
  viewport: {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    isLandscape: false,
  },
}

const baseUrl = `file://${process.cwd()}/__tests__/functional`

// unfortunately the touch capabilities for puppeteer are still very limited
describe('TOUCH', () => {
  it('The items should be selectable and draggable', async () => {
    await page.emulate(iPhone)
    await page.goto(`${baseUrl}/touch.html`)
    await page.tap('#item-2')

    const { selected0, dragged0 } = await page.evaluate(() => ({
      selected0: window.selected,
      dragged0: window.dragged,
    }))

    expect(dragged0).toEqual(['item-2'])
    expect(selected0.length).toEqual(0)
  })
})
