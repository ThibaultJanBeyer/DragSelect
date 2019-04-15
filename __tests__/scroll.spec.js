import puppeteer from 'puppeteer';

const baseUrl = `file://${process.cwd()}/__tests__`;
let page;
let browser;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

afterAll(() => {
  browser.close();
});

describe('Scroll', () => {
  it('selection in double scrolling element should work', async () => {
    await page.goto(`${baseUrl}/scroll.html`);

    const mouse = page.mouse;
    await mouse.move(100, 300);
    await mouse.down();
    await mouse.move(50, 200);

    const selectorRect = await page.evaluate(() => {
      window.dsRect = ds.selector.getBoundingClientRect();
      return {
        top: dsRect.top,
        left: dsRect.left,
        width: dsRect.width,
        height: dsRect.height
      };
    });

    expect(selectorRect.left).toBe(50);
    expect(selectorRect.top).toBe(200);
    expect(selectorRect.width).toBe(50);
    expect(selectorRect.height).toBe(100);
  });
});
