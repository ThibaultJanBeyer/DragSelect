import wait from '../helpers/wait'
import http from 'http'
import fs from 'fs'

const baseUrl = `file://${process.cwd()}/__tests__/functional`

const goToPage = async (uri = `${baseUrl}/imports.html`) => {
  await page.goto(uri)
  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
  await page.evaluate(() => location.reload(true))
  await page.waitForSelector('#loaded')
}

const test = async () => {
  await page.waitForFunction(() => 'ds' in window)
  await page.waitForSelector('.ds-selector')
  const dragNode = await page.$('.ds-selector')
  await page.waitForSelector('.ds-selector-area')
  const dragNodeArea = await page.$('.ds-selector-area')
  expect(dragNode !== null).toBe(true)
  expect(dragNodeArea !== null).toBe(true)
}

const teardown = async () => {
  await page.evaluate(() => {
    window.importScripts.forEach((iScript) =>
      document.body.removeChild(iScript)
    )
    window.ds = null
    window.callback = []
    window.importScripts = []
  })
  const { ds } = await page.evaluate(() => ({ ds }))
  expect(ds).toBeNull()
  const callback = await page.evaluate(() => callback)
  expect(callback.length).toBe(0)
}
describe('Imports', () => {
  let server
  const port = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)

  beforeAll(
    async () =>
      new Promise((resolve, rejects) => {
        try {
          server = http.createServer((req, res) => {
            fs.readFile(`${process.cwd()}/${req.url}`, (err, data) => {
              if (err) {
                res.writeHead(404)
                res.end(JSON.stringify(err))
                return
              }
              const type = req.url.includes('js')
                ? 'application/javascript'
                : 'text/html'
              res.writeHead(200, { 'content-type': type })
              res.end(data)
            })
          })
          server.listen(port, resolve)
        } catch (err) {
          rejects(err)
        }
      })
  )
  afterAll(() => {
    server.close()
  })

  describe('Static Window Import', () => {
    const setup = async () => {
      await page.waitForFunction(() => 'DragSelect' in window)
      await page.evaluate(() => {
        window.ds = new DragSelect({
          selectables: document.querySelectorAll('.item'),
        })
        window.ds.subscribe(
          'DS:end',
          ({ items }) => (window.callback = items.map((item) => item.id))
        )
      })
    }

    it('when importing the script, it should be bound to the window', async () => {
      await goToPage()
      await page.evaluate(() => {
        window.dsScript = document.createElement('script')
        window.dsScript.setAttribute('src', `../../dist/DragSelect.js`)
        document.body.appendChild(window.dsScript)
        window.importScripts.push(window.dsScript)
      })
      await setup()
      await test()
      await teardown()
    })

    it('when importing the minified script, it should be bound to the window', async () => {
      await goToPage()
      await page.evaluate(() => {
        window.dsScript = document.createElement('script')
        window.dsScript.setAttribute('src', `../../dist/ds.min.js`)
        document.body.appendChild(window.dsScript)
        window.importScripts.push(window.dsScript)
      })
      await setup()
      await test()
      await teardown()
    })
  })

  describe('AMD Module', () => {
    const setup = async (uri = '../../dist/DragSelect') => {
      await page.evaluate(() => {
        window.dsScript = document.createElement('script')
        window.dsScript.setAttribute(
          'src',
          `http://requirejs.org/docs/release/2.3.6/comments/require.js`
        )
        document.body.appendChild(window.dsScript)
        window.importScripts.push(window.dsScript)
      })
      await page.waitForFunction(() => 'require' in window)
      await page.evaluate((uri) => {
        window.dsScript = document.createElement('script')
        window.dsScript.innerHTML = /*javascript*/ `
          require.config({
            paths: {
              'DragSelect': '${uri}'
            },
            waitSeconds: 40
          });
          require(['DragSelect'], function (DragSelect) {
            window.ds = new DragSelect({ selectables: document.querySelectorAll('.item') });
            window.ds.subscribe('DS:end', ({ items }) => (window.callback = items.map((item) => item.id)))
          });
        `
        document.body.appendChild(window.dsScript)
        window.importScripts.push(window.dsScript)
      }, uri)
    }

    it('Should be able to load DS as an AMD Module', async () => {
      await goToPage()
      await setup()
      await test()
      await teardown()
    })

    it('Should be able to load minified DS as an AMD Module', async () => {
      await goToPage()
      await setup('../../dist/ds.min')
      await test()
      await teardown()
    })
  })

  describe('ESM Module', () => {
    const setup = async (uri = '../../dist/DragSelect.esm.js') => {
      await wait(500)
      await page.evaluate((uri) => {
        window.dsScript = document.createElement('script')
        window.dsScript.setAttribute('type', 'module')
        window.dsScript.innerHTML = /*javascript*/ `
          import DragSelect from "${uri}";
          window.ds = new DragSelect({ selectables: document.querySelectorAll('.item') });
          window.ds.subscribe('DS:end', ({ items }) => (window.callback = items.map((item) => item.id)))
          `
        document.body.appendChild(window.dsScript)
        setTimeout(() => {
          if (!window.importScripts) window.importScripts = []
          window.importScripts.push(window.dsScript)
        }, 500)
      }, uri)
      await wait(500)
    }

    it('when importing the script as module, it should be available', async () => {
      await goToPage(
        `http://localhost:${port}/__tests__/functional/imports.html`
      )
      await setup()
      await test()
      await teardown()
    })

    it('when importing the minified script as module, it should be available', async () => {
      await goToPage(
        `http://localhost:${port}/__tests__/functional/imports.html`
      )
      await setup('../../dist/ds.esm.min.js')
      await test()
      await teardown()
    })
  })
})
