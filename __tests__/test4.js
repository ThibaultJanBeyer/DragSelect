const timeout = 15000;

jest.setTimeout(timeout);

describe(
    '/ (Basic Tests)',
    () => {
        let page;
        beforeAll(async () => {
            page = await global.__BROWSER__.newPage();
            await page.goto('http://localhost:8080/test4.html')
        }, timeout);

        afterAll(async () => {
            await page.close();
        });

        it('should trigger callbacks with the correct elements when elements are selected', async () => {

            const innerWidth = await page.evaluate(_ => {return window.innerWidth})
            const innerHeight = await page.evaluate(_ => {return window.innerHeight})

            const mouse = page.mouse
            // move to the middle of the page
            await mouse.move(innerWidth/2, 0)
            await mouse.down()
            // move 300px down and to the end of the page
            // steps are how often the mouse moves
            await mouse.move(innerWidth, 300, {steps: 100})
            await mouse.up()

            let executesFn = await page.evaluate(() => {
                return {
                    onDragStartCalls: window.onDragStartCalls,
                    onDragMoveCalls: window.onDragMoveCalls,
                    onElementSelectCalls: window.onElementSelectCalls,
                    onElementUnselectCalls: window.onElementUnselectCalls,
                    callbackCalls: window.callbackCalls

            }});

            expect(executesFn.onDragStartCalls.length).toBe(1);
            expect(executesFn.onDragMoveCalls.length).toBe(100);
            expect(executesFn.onElementSelectCalls.length).toBe(2);
            expect(executesFn.onElementUnselectCalls.length).toBe(0);
            expect(executesFn.callbackCalls.length).toBe(1);
            expect(executesFn.callbackCalls[0].elements.length).toBe(2);
        });
    },
    timeout
);