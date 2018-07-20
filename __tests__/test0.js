const timeout = 10000;

describe(
    '/ (Basic Tests)',
    () => {
        let page;
        beforeAll(async () => {
            page = await global.__BROWSER__.newPage();
            await page.goto('http://localhost:8080/test0.html')
        }, timeout);

        afterAll(async () => {
            await page.close();
        });

        it('should load without error', async () => {
            let text = await page.evaluate(() => document.body.textContent);
            expect(text).toContain('General & Accessible.');
        });
    },
    timeout
);