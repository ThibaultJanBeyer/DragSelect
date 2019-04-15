// Check if onStart ::: getCursorPositionDifference(true) and onMove ::: getCursorPositionDifference() return the correct values
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

const startPos = 10;
const steps = 10;

async function moveMouse(page, dpi = steps + 1) {
  const mouse = page.mouse;
  await mouse.move(startPos, startPos);
  await mouse.down();
  await mouse.move(startPos + steps, startPos + steps, { steps: dpi });
  await mouse.up();

  return await page.evaluate(() => ({
    cursorMoveDiff,
    cursorStartDiff,
    cursorPosMove,
    cursorPosStart
  }));
}

describe('Position Difference Calculations', () => {
  it('should have correct first value on move', async () => {
    await page.goto(`${baseUrl}/cursor-position-difference.html`);
    const { cursorMoveDiff } = await moveMouse(page);

    // 1 Move: 0, 0
    expect(cursorMoveDiff[0].x).toBe(0);
    expect(cursorMoveDiff[0].y).toBe(0);
  });

  // Next Drag: difference between startPos and current mouse position.
  it('should have correct subsequent values on move', async () => {
    await page.goto(`${baseUrl}/cursor-position-difference.html`);
    const { cursorMoveDiff, cursorPosMove } = await moveMouse(page);

    expect(cursorMoveDiff[5].x).toBe(cursorPosMove[5].x - startPos);
    expect(cursorMoveDiff[5].y).toBe(cursorPosMove[5].y - startPos);

    expect(cursorMoveDiff[8].x).toBe(cursorPosMove[8].x - startPos);
    expect(cursorMoveDiff[8].y).toBe(cursorPosMove[8].y - startPos);
  });

  it('should have correct values on click', async () => {
    await page.goto(`${baseUrl}/cursor-position-difference.html`);

    const mouse = page.mouse;
    await mouse.move(startPos, startPos);
    await mouse.down();
    await mouse.up();

    await mouse.move(startPos + steps, startPos + steps);
    await mouse.down();
    await mouse.up();

    await mouse.move(startPos + steps * 2, startPos + steps * 2);
    await mouse.down();
    await mouse.up();

    const { cursorStartDiff, cursorPosStart } = await page.evaluate(() => ({
      cursorStartDiff,
      cursorPosStart
    }));

    // 1st click: diff between 0,0 and 1st click
    expect(cursorStartDiff[0].x).toBe(startPos);
    expect(cursorStartDiff[0].y).toBe(startPos);

    // 2nd click: the difference between 2nd click and 1st click
    expect(cursorStartDiff[1].x).toBe(
      cursorPosStart[1].x - cursorPosStart[0].x
    );
    expect(cursorStartDiff[1].y).toBe(
      cursorPosStart[1].y - cursorPosStart[0].y
    );

    // 3rd click: the difference between 3rd click and 2nd click
    expect(cursorStartDiff[2].x).toBe(
      cursorPosStart[2].x - cursorPosStart[1].x
    );
    expect(cursorStartDiff[2].y).toBe(
      cursorPosStart[2].y - cursorPosStart[1].y
    );
  });
});
