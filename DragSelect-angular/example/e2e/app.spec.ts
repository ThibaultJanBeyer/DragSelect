import { expect, Locator, Page, test } from '@playwright/test';

const center = async (locator: Locator) => {
  const box = (await locator.boundingBox())!;
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
};

/** Presses at `from`, moves to `to` in small steps, releases. */
const drag = async (page: Page, from: { x: number; y: number }, to: { x: number; y: number }) => {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 15 });
  await page.mouse.up();
};

const count = (page: Page) => page.getByTestId('count');
const item = (page: Page, id: string) => page.getByTestId(id);

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // photos load after 300ms
  await expect(item(page, 'p11')).toBeVisible();
  // the board grew: DragSelect re-measures its area 60ms (debounced) after a resize
  await page.waitForTimeout(100);
});

test('restores a selection set before the items rendered', async ({ page }) => {
  await expect(count(page)).toHaveText('2 selected');
  await expect(item(page, 'p1')).toHaveAttribute('aria-selected', 'true');
  await expect(item(page, 'p2')).toHaveAttribute('aria-selected', 'true');
  await expect(item(page, 'p0')).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByTestId('first')).toHaveText('Photo 2');
});

test('selects with a rectangle and two-way binds the result', async ({ page }) => {
  const board = (await page.getByTestId('board').boundingBox())!;
  // start in the board's empty top-left corner, end in the middle of p5
  await drag(page, { x: board.x + 6, y: board.y + 42 }, await center(item(page, 'p5')));

  await expect(count(page)).toHaveText('4 selected');
  await expect(page.getByTestId('selected')).toHaveText('Photo 1, Photo 2, Photo 5, Photo 6');
  for (const id of ['p0', 'p1', 'p4', 'p5'])
    await expect(item(page, id)).toHaveAttribute('aria-selected', 'true');
  await expect(item(page, 'p2')).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByTestId('last-end')).toHaveText('select');
});

test('selects on click', async ({ page }) => {
  await item(page, 'p7').click();
  await expect(count(page)).toHaveText('1 selected');
  await expect(page.getByTestId('selected')).toHaveText('Photo 8');
});

test('changes the selection from a child component', async ({ page }) => {
  await page.getByTestId('select-all').click();
  await expect(count(page)).toHaveText('12 selected');

  await page.getByTestId('clear').click();
  await expect(count(page)).toHaveText('0 selected');
  await expect(page.getByTestId('selected')).toHaveText('');

  await page.getByTestId('select-last').click();
  await expect(count(page)).toHaveText('1 selected');
  await expect(item(page, 'p11')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('selected')).toHaveText('Photo 12');
});

test('drops the dragged selection into a drop zone and maps it to data', async ({ page }) => {
  // p1 and p2 are selected: dragging p1 moves both
  await drag(page, await center(item(page, 'p1')), await center(page.getByTestId('zone-trash')));

  await expect(page.getByTestId('last-end')).toHaveText('drag');
  await expect(page.getByTestId('trash')).toHaveText('Photo 2, Photo 3');
  await expect(item(page, 'p1')).toHaveCount(0);
  await expect(item(page, 'p2')).toHaveCount(0);
  // removed items leave the selection
  await expect(count(page)).toHaveText('0 selected');
});

test('applies settings changes live', async ({ page }) => {
  await page.getByTestId('draggable').uncheck();
  const before = (await item(page, 'p1').boundingBox())!;

  // with draggability off, pressing on an item and moving draws a selection instead
  await drag(page, await center(item(page, 'p1')), await center(item(page, 'p6')));

  await expect(page.getByTestId('last-end')).toHaveText('select');
  expect(await item(page, 'p1').boundingBox()).toEqual(before);
  await expect(count(page)).toHaveText('4 selected');
});

test.describe('keyboard', () => {
  test('selects with Enter, adds with Shift+Enter', async ({ page }) => {
    await page.getByTestId('clear').click();
    await expect(count(page)).toHaveText('0 selected');

    await item(page, 'p4').focus();
    await page.keyboard.press('Enter');
    await expect(count(page)).toHaveText('1 selected');
    await expect(item(page, 'p4')).toHaveAttribute('aria-selected', 'true');

    await item(page, 'p6').focus();
    await page.keyboard.press('Shift+Enter');
    await expect(count(page)).toHaveText('2 selected');
    await expect(page.getByTestId('selected')).toHaveText('Photo 5, Photo 7');
  });

  test('moves the selection with the arrow keys', async ({ page }) => {
    // p1 and p2 are selected
    const p1 = (await item(page, 'p1').boundingBox())!;
    const p2 = (await item(page, 'p2').boundingBox())!;
    await item(page, 'p1').focus();
    for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight');

    await expect(page.getByTestId('last-end')).toHaveText('drag');
    const p1After = (await item(page, 'p1').boundingBox())!;
    const p2After = (await item(page, 'p2').boundingBox())!;
    expect(p1After.x).toBeGreaterThan(p1.x);
    expect(p1After.y).toBe(p1.y);
    // the whole selection moves
    expect(p2After.x - p2.x).toBeCloseTo(p1After.x - p1.x);
    await expect(count(page)).toHaveText('2 selected');
  });

  test('drops into a drop zone with the arrow keys', async ({ page }) => {
    await page.getByTestId('clear').click();
    await item(page, 'p9').focus();
    await page.keyboard.press('Enter');
    await expect(count(page)).toHaveText('1 selected');

    // p9 is in the last row; the trash is right below the grid
    // hold each key like a person: DragSelect caches positions for 80ms (refreshMemoryRate), faster presses count as moving, not dropping
    for (let i = 0; i < 40 && !(await page.getByTestId('trash').textContent()); i++)
      await page.keyboard.press('ArrowDown', { delay: 100 });

    await expect(page.getByTestId('trash')).toHaveText('Photo 10');
    await expect(item(page, 'p9')).toHaveCount(0);
  });
});

test.describe('buttons inside the area', () => {
  test('a plain button sees an empty selection: DragSelect clears it on press', async ({ page }) => {
    await expect(count(page)).toHaveText('2 selected');
    await page.getByTestId('trash-selected-broken').click();
    await expect(page.getByTestId('trash')).toHaveText('');
    await expect(count(page)).toHaveText('0 selected');
  });

  test('stopping the press keeps the selection', async ({ page }) => {
    await expect(count(page)).toHaveText('2 selected');
    await page.getByTestId('trash-selected').click();
    await expect(page.getByTestId('trash')).toHaveText('Photo 2, Photo 3');
  });
});
