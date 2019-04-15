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

jest.setTimeout(10000);

describe('Scroll', () => {
  it('should work with 25k items', async () => {
    await page.goto(`${baseUrl}/performance.html`, {
      waitUntil: 'load'
    });

    const mouse = page.mouse;
    await mouse.move(100, 100);
    await mouse.down();
    await mouse.move(200, 200);
    await mouse.up();

    const { selected } = await page.evaluate(() => ({ selected }));

    expect(selected[0]).toBe('item-34');
    expect(selected[1]).toBe('item-35');
    expect(selected[2]).toBe('item-36');
    expect(selected[3]).toBe('item-50');
    expect(selected[4]).toBe('item-51');
    expect(selected[5]).toBe('item-52');
    expect(selected[6]).toBe('item-66');
    expect(selected[7]).toBe('item-67');
    expect(selected[8]).toBe('item-68');
  });
});
