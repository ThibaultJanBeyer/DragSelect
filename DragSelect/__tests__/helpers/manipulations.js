import wait from './wait'

export const moveSelect = async (page, x, y, distance = 200, steps = 10) => {
  const mouse = page.mouse
  await mouse.move(x, y)
  await wait(100)
  await mouse.down()
  await wait(100)
  await mouse.move(x + distance, y + distance, { steps })
  await wait(100)
  await mouse.up()
  await wait(100)
}

export const moveSelectTo = async (page, x, y, dX, dY) => {
  await page.mouse.move(x, y)
  await wait(100)
  await page.mouse.down()
  await wait(100)
  await page.mouse.move(dX, dY, { steps: 10 })
  await wait(100)
  await page.mouse.up()
  await wait(100)
}

export const moveKey = async (page, keyboard, x, y, key) => {
  const mouse = page.mouse
  await mouse.move(x, y)
  await mouse.down()
  await mouse.up()
  await keyboard.press(key)
  await keyboard.press(key)
}

export const click = async (page, x, y) => {
  const mouse = page.mouse
  await mouse.move(x, y)
  await mouse.down()
  await mouse.up()
}
