const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

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
