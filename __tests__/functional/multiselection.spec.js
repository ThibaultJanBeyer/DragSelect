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

describe('Multiselection', () => {
  it('should multiselect', async () => {
    await page.goto(`${baseUrl}/multiselection.html`);

    const mouse = page.mouse;
    await mouse.move(1, 1);
    await mouse.down();
    await mouse.move(100, 10, { steps: 10 });
    await mouse.up();

    const keyboard = page.keyboard;
    await keyboard.down('Shift');
    await mouse.move(60, 10, { steps: 10 });
    await mouse.down();
    await mouse.move(200, 20, { steps: 10 });
    await mouse.up();

    await mouse.move(250, 20);
    await mouse.down();
    await mouse.up();

    const { selected } = await page.evaluate(() => ({ selected }));

    expect(selected[0]).toBe('one');
    expect(selected[1]).toBe('three');
    expect(selected[2]).toBe('four');
    expect(selected[3]).toBe('five');
  });

  it('multiselectmode should work', async () => {
    await page.goto(`${baseUrl}/multiselection.html`);

    const mouse = page.mouse;
    await mouse.move(1, 1);
    await mouse.down();
    await mouse.move(100, 10, { steps: 10 });
    await mouse.up();

    await mouse.move(60, 10, { steps: 10 });
    await mouse.down();
    await mouse.move(200, 20, { steps: 10 });
    await mouse.up();

    await mouse.move(250, 20);
    await mouse.down();
    await mouse.up();

    const { selected } = await page.evaluate(() => ({ selected }));

    expect(selected[0]).toBe('one');
    expect(selected[1]).toBe('three');
    expect(selected[2]).toBe('four');
    expect(selected[3]).toBe('five');
  });
});
