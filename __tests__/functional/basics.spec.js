import { test, expect } from '@playwright/test';
import { baseUrl } from './shared';

test.describe('Basics', () => {
  test('The tool should initialize correctly', async ({ page }) => {
    await goToOptimized(page, `${baseUrl}/basics.html`);
    const dragNode = await page.locator('.ds-selector')
    expect(dragNode).not.toBeNull();
  });
});
