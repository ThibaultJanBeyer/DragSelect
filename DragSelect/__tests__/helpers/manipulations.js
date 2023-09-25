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

export const moveSelectTo = async (
  page,
  x,
  y,
  dX,
  dY,
  steps = 10,
  organicSteps = false
) => {
  await page.mouse.move(x, y)
  await wait(100)
  await page.mouse.down()
  await wait(100)
  if (organicSteps) {
    const diffX = dX - x
    const diffY = dY - y
    const jumpsX = diffX / steps
    const jumpsY = diffY / steps
    for (let i = 1; i < steps; i++) {
      await page.mouse.move(x + jumpsX * i, y + jumpsY * i)
      await wait(100)
    }
    await page.mouse.move(dX, dY)
  } else await page.mouse.move(dX, dY, { steps })
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
  await wait(100)
  await mouse.down()
  await wait(100)
  await mouse.up()
  await wait(100)
}
