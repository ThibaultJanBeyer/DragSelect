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

describe('Scroll', () => {
  it('should stop the functionality', async () => {
    await page.goto(`${baseUrl}/stop.html`);
    await page.evaluate(() => {
      window.ds = new DragSelect({
        selectables: document.querySelectorAll('.item'),
        callback: function(elements, e) {
          console.log('highlevel callback fired');
          window.callback = elements;
        }
      });
    });

    const mouse = page.mouse;

    await mouse.move(10, 10);
    await mouse.down();
    await mouse.move(50, 50);
    await mouse.up();

    var callback = await page.evaluate(() => callback);
    expect(callback.length).toBe(1);
    var callback = await page.evaluate(() => (callback = []));

    await page.evaluate(() => ds.stop());
    await mouse.move(10, 10);
    await mouse.down();
    await mouse.move(50, 50);
    await mouse.up();

    var callback = await page.evaluate(() => callback);
    expect(callback.length).toBe(0);
  });

  it('should stop the functionality in a callback', async () => {
    await page.goto(`${baseUrl}/stop.html`);
    await page.evaluate(() => {
      window.ds = new DragSelect({
        selectables: document.querySelectorAll('.item'),
        callback: function(elements, e) {
          console.log('highlevel callback fired');
          window.callback = elements;
          this.stop();
        }
      });
    });

    const mouse = page.mouse;

    await mouse.move(10, 10);
    await mouse.down();
    await mouse.move(50, 50);
    await mouse.up();

    var callback = await page.evaluate(() => callback);
    expect(callback.length).toBe(1);
    var callback = await page.evaluate(() => (callback = []));

    await mouse.move(10, 10);
    await mouse.down();
    await mouse.move(50, 50);
    await mouse.up();

    var callback = await page.evaluate(() => callback);
    expect(callback.length).toBe(0);
    await page.evaluate(() => ds.start());

    await mouse.move(10, 10);
    await mouse.down();
    await mouse.move(50, 50);
    await mouse.up();

    var callback = await page.evaluate(() => callback);
    expect(callback.length).toBe(1);
  });

  it('should restart the functionality after a stop', async () => {
    await page.goto(`${baseUrl}/stop.html`);
    await page.evaluate(() => {
      window.ds = new DragSelect({
        selectables: document.querySelectorAll('.item'),
        callback: elements => (window.callback = elements)
      });
    });

    const mouse = page.mouse;

    await mouse.move(10, 10);
    await mouse.down();
    await mouse.move(50, 50);
    await mouse.up();

    var callback = await page.evaluate(() => callback);
    expect(callback.length).toBe(1);
    await page.evaluate(() => {
      callback = [];
      ds.stop();
    });

    await mouse.move(10, 10);
    await mouse.down();
    await mouse.move(50, 50);
    await mouse.up();

    var callback = await page.evaluate(() => callback);
    expect(callback.length).toBe(0);
    await page.evaluate(() => ds.start());

    await mouse.move(10, 10);
    await mouse.down();
    await mouse.move(50, 50);
    await mouse.up();

    var callback = await page.evaluate(() => callback);
    expect(callback.length).toBe(1);
  });
});
