const baseUrl = `file://${process.cwd()}/__tests__/functional`;

describe('Basics', () => {
  test('The tool should initialize correctly', async () => {
    await page.goto(`${baseUrl}/basics.html`);
    let dragNode = await page.$('.ds-selector');
    expect(dragNode !== null).toBe(true);
  });
});
