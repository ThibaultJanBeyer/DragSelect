import { moveSelect } from '../helpers/manipulations'
const baseUrl = `file://${process.cwd()}/__tests__/functional`

describe('Selection', () => {
  let response

  it('default selectionThreshold should select as soon as touched', async () => {
    await page.goto(`${baseUrl}/selection.html`)

    const mouse = page
    await moveSelect(mouse, 40, 60, 15)
    const { items } = await page.evaluate(() => ({ items }))
    expect(items.length).toBe(1)
  })

  it('0.5 selectionThreshold should select as soon as middle is reached', async () => {
    await page.goto(`${baseUrl}/selection.html`)

    await page.evaluate(() => {
      ds.setSettings({
        selectionThreshold: 0.5,
      })
    })

    await moveSelect(page, 40, 60, 15)
    response = await page.evaluate(() => ({ items }))
    expect(response.items.length).toBe(0)

    await moveSelect(page, 40, 60, 45)
    response = await page.evaluate(() => ({ items }))
    expect(response.items.length).toBe(1)
  })


  it('1 selectionThreshold should select as soon as middle is reached', async () => {
    await page.goto(`${baseUrl}/selection.html`)

    await page.evaluate(() => {
      ds.setSettings({
        selectionThreshold: 1,
      })
    })

    await moveSelect(page, 40, 60, 45)
    response = await page.evaluate(() => ({ items }))
    expect(response.items.length).toBe(0)
    
    await moveSelect(page, 40, 60, 2000, true)
    response = await page.evaluate(() => ({ items }))
    expect(response.items.length).toBe(1)
  })
})
