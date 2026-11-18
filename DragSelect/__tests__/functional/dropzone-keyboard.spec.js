import wait from '../helpers/wait'

// like a person: DragSelect caches positions for 80ms (refreshMemoryRate), faster key presses count as moving, not dropping
const tap = async (key) => {
  await page.keyboard.down(key)
  await wait(100)
  await page.keyboard.up(key)
  await wait(100)
}

const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('DropZone with the keyboard', () => {
  it('drops the focused item on the zone it is moved onto', async () => {
    await page.goto(`${baseUrl}/dropzone-keyboard.html`)
    const { keyboard } = page
    await keyboard.press('Tab')
    await keyboard.press('Enter')
    await page.evaluate(() => (window.ends = []))
    for (let i = 0; i < 7; i++) await tap('ArrowDown')

    const ends = await page.evaluate(() => window.ends)
    // one DS:end per key press, all of them drags
    expect(ends).toHaveLength(7)
    expect(ends.every((end) => end.isDragging)).toBe(true)
    expect(ends.at(-1)).toEqual({ isDragging: true, items: ['item-1'], dropTarget: 'zone' })
    expect(ends[0].dropTarget).toBe(null)
  })

  it('drops when the selection was made with the mouse (focus is not on the item)', async () => {
    await page.goto(`${baseUrl}/dropzone-keyboard.html`)
    const { keyboard } = page
    const item = await page.$('#item-3')
    await item.click()
    await page.evaluate(() => (window.ends = []))
    for (let i = 0; i < 7; i++) await tap('ArrowDown')

    const ends = await page.evaluate(() => window.ends)
    expect(ends).toHaveLength(7)
    expect(ends.at(-1)).toEqual({ isDragging: true, items: ['item-3'], dropTarget: 'zone' })
    expect(ends[0].dropTarget).toBe(null)
  })

  it('drops when any dragged item is on the zone, not only the first one', async () => {
    await page.goto(`${baseUrl}/dropzone-keyboard.html`)
    const { keyboard } = page
    // item 1 (top) is selected first, item 3 is below it and reaches the zone first
    await (await page.$('#item-1')).click()
    await keyboard.down('Shift')
    await (await page.$('#item-3')).click()
    await keyboard.up('Shift')
    await page.evaluate(() => (window.ends = []))
    for (let i = 0; i < 5; i++) await tap('ArrowDown')

    const ends = await page.evaluate(() => window.ends)
    expect(ends.at(-1).dropTarget).toBe('zone')
    expect(ends.at(-1).items.sort()).toEqual(['item-1', 'item-3'])
  })

})
