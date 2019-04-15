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
  it('selection in double scrolling element should work', async () => {
    await page.goto(`${baseUrl}/scroll.html`);
    await page.evaluate(() => {
      scroll({
        top: 500
      });

      document.querySelector('#lel').scroll({
        top: 150
      });
    });

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

    await mouse.up();
  });

  it('selection should remain when scrolling', async () => {
    await page.goto(`${baseUrl}/scroll.html`);
    let { selection, containerScrollbarPos } = await page.evaluate(() => {
      scroll({
        top: 0
      });

      document.querySelector('#lel').scroll({
        top: 0
      });

      return {
        selection: ds.getSelection(),
        containerScrollbarPos: {
          top: ds.area.offsetTop,
          x: (ds.area.offsetWidth + ds.area.clientWidth) / 2,
          y: (ds.area.offsetHeight + ds.area.clientHeight) / 2
        }
      };
    });

    const mouse = page.mouse;
    await mouse.move(10, containerScrollbarPos.top + 20);
    await mouse.down();
    await mouse.up();

    selection = await page.evaluate(() => ds.getSelection());
    expect(selection.length).toBe(1);

    await mouse.move(containerScrollbarPos.x, containerScrollbarPos.top + 20);
    await mouse.down();
    await mouse.move(containerScrollbarPos.y, containerScrollbarPos.top + 40);
    await mouse.up();

    selection = await page.evaluate(() => ds.getSelection());
    expect(selection.length).toBe(1);
    await page.evaluate(() => scroll({ top: 1000 }));

    await mouse.move(20, containerScrollbarPos.y);
    await mouse.down();
    await mouse.move(120, containerScrollbarPos.y);
    await mouse.up();

    selection = await page.evaluate(() => ds.getSelection());
    expect(selection.length).toBe(1);
  });
});
