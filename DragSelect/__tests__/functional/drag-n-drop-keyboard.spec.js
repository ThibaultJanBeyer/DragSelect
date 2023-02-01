import wait from '../helpers/wait'
const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Drag N Drop', () => {
  it('The items should be draggable via keyboard', async () => {
    await page.goto(`${baseUrl}/drag-n-drop-keyboard.html`)

    const { v2 } = await page.evaluate(() => ({
      v2: window.getItemVect(2),
    }))

    const { keyboard } = page
    await keyboard.press('Tab')
    await keyboard.press('Tab')
    await keyboard.press('Enter')
    await keyboard.press('ArrowDown')

    const { v22, dragged, dragStart, dragMove } = await page.evaluate(() => ({
      v22: window.getItemVect(2),
      dragged: window.dragged,
      dragStart: window.dragStart,
      dragMove: window.dragMove,
    }))

    expect(dragged).toEqual([`item-2`])
    expect(dragStart).toEqual([[`item-2`]])
    expect(dragMove).toEqual([[`item-2`]])
    expect(v2.x - v22.x + v2.y - v22.y).toEqual(-100)
  })
})
