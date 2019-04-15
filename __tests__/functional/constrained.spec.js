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

describe('Constrained', () => {
  it('selection should be constrained to the area with only contains one element', async () => {
    await page.goto(`${baseUrl}/constrained.html`);

    const mouse = page.mouse;
    // move to the middle of the page
    await mouse.move(150, 150);
    await mouse.down();
    // move 300px down and to the end of the page
    // steps are how often the mouse moves
    await mouse.move(800, 450, { steps: 100 });
    await mouse.up();

    let executesFn = await page.evaluate(() => {
      var id = document.querySelector('.item.three').id;
      return {
        id,
        callbackIds: window.callbackIds
      };
    });

    expect(executesFn.callbackIds.length).toBe(1);
    expect(executesFn.callbackIds[0]).toBe(executesFn.id);
  });
});
