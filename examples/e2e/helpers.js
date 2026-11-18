import { expect } from '@playwright/test'

const center = async (locator) => {
  const box = await locator.boundingBox()
  if (!box) throw new Error(`No bounding box for ${locator}`)
  return { x: box.x + box.width / 2, y: box.y + box.height / 2, box }
}

/**
 * Press the mouse at `from`, move to `to` in several steps (DragSelect needs real pointer moves), release.
 * Starts with a short, human-like pause: DragSelect caches element rects for `refreshMemoryRate` (80ms),
 * and a drag fired within that window of the previous gesture uses stale rects and gets clamped early.
 */
export async function drag(page, from, to, steps = 15) {
  await page.waitForTimeout(120)
  await page.mouse.move(from.x, from.y)
  await page.mouse.down()
  await page.mouse.move(to.x, to.y, { steps })
  await page.mouse.up()
}

/** Rubber-band select: drag from just outside the top-left of `first` to just past the bottom-right of `last`. */
export async function lassoSelect(page, first, last) {
  const a = (await center(first)).box
  const b = (await center(last)).box
  await drag(page, { x: a.x - 6, y: a.y - 6 }, { x: b.x + b.width + 4, y: b.y + b.height + 4 })
}

/** Grab `item` and drop it on the centre of `target`. */
export async function dragOnto(page, item, target) {
  await drag(page, await center(item), await center(target))
}

export const item = (page, id) => page.locator(`.item[data-id="${id}"]`)

export async function expectSelected(page, ids) {
  await expect(page.locator('.item.ds-selected')).toHaveCount(ids.length)
  for (const id of ids) await expect(item(page, id)).toHaveClass(/ds-selected/)
}
