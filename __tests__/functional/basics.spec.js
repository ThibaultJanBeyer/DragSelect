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

describe('Basics', () => {
  test('The tool should initialize correctly', async () => {
    await page.goto(`${baseUrl}/basics.html`);
    let dragNode = await page.$('.ds-selector');
    expect(dragNode).not.toBeNull();
  });
});
