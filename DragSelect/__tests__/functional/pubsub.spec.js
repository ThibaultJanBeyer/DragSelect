const baseUrl = `file://${process.cwd()}/__tests__/functional`

const publish = () =>
  page.evaluate(() => {
    window.calls = []
    ds.publish('DS:end', {})
    return window.calls
  })

describe('PubSub', () => {
  beforeEach(async () => {
    await page.goto(`${baseUrl}/pubsub.html`)
  })

  it('unsubscribes by id after earlier subscriptions were removed', async () => {
    await page.evaluate(() => {
      window.ids = ['a', 'b', 'c'].map((n) => ds.subscribe('DS:end', listener(n)))
      ds.unsubscribe('DS:end', null, ids[0])
    })
    expect(await publish()).toEqual(['b', 'c'])
    await page.evaluate(() => ds.unsubscribe('DS:end', null, ids[1]))
    expect(await publish()).toEqual(['c'])
    await page.evaluate(() => ds.unsubscribe('DS:end', null, ids[2]))
    expect(await publish()).toEqual([])
  })

  it('returns unique ids across events', async () => {
    const ids = await page.evaluate(() => [
      ds.subscribe('DS:start', () => {}),
      ds.subscribe('DS:end', () => {}),
      ds.subscribe('DS:end', () => {}),
    ])
    expect(new Set(ids).size).toBe(3)
  })

  it('does nothing when the callback or id is unknown', async () => {
    await page.evaluate(() => {
      ds.subscribe('DS:end', listener('a'))
      ds.subscribe('DS:end', listener('b'))
      ds.unsubscribe('DS:end', () => {})
      ds.unsubscribe('DS:end', null, 999)
      ds.unsubscribe('DS:end')
    })
    expect(await publish()).toEqual(['a', 'b'])
  })

  it('removes only one subscription when unsubscribing twice', async () => {
    await page.evaluate(() => {
      window.a = listener('a')
      ds.subscribe('DS:end', a)
      ds.subscribe('DS:end', listener('b'))
      ds.unsubscribe('DS:end', a)
      ds.unsubscribe('DS:end', a)
    })
    expect(await publish()).toEqual(['b'])
  })

  it('does not skip the next subscriber when one unsubscribes while called', async () => {
    await page.evaluate(() => {
      const once = () => {
        calls.push('once')
        ds.unsubscribe('DS:end', once)
      }
      ds.subscribe('DS:end', once)
      ds.subscribe('DS:end', listener('b'))
    })
    expect(await publish()).toEqual(['once', 'b'])
    expect(await publish()).toEqual(['b'])
  })
})
