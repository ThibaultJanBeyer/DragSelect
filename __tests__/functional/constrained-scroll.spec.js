import puppeteer from 'puppeteer';

const baseUrl = `file://${process.cwd()}/__tests__/functional`;
let page;
let browser;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

afterAll(() => {
  browser.close();
});

describe('Constrained Scroll', () => {
  it('selection should be able to scroll in the constrained container while dragging', async () => {
    await page.goto(`${baseUrl}/constrained-scroll.html`);

    const mouse = page.mouse;
    await mouse.move(110, 110);
    await mouse.down();
    await mouse.move(320, 200, { steps: 20 });
    await mouse.move(350, 350, { steps: 20 });
    await mouse.up();

    let executesFn = await page.evaluate(() => {
      return {
        ids: window.itemIds,
        callbackIds: window.callbackIds
      };
    });

    expect(executesFn.callbackIds.length).toBe(executesFn.ids.length);
    expect(executesFn.callbackIds.join()).toBe(executesFn.ids.join());
  });
});
