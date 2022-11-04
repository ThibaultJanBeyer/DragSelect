import http from 'http'
import fs from 'fs'
import { test, expect } from '@playwright/test';
import { baseUrl } from './shared';

const goToPage = async (page, uri = `${baseUrl}/imports.html`) => {
  await page.goto(uri)
  await page.reload({ waitUntil: 'networkidle' })
}

const _test = async (page) => {
  await page.waitForFunction(() => 'ds' in window)
  await page.waitForFunction(() => !!document.querySelector('.ds-selector'))
  const dragNode = await page.$('.ds-selector')
  await page.waitForSelector('.ds-selector-area')
  const dragNodeArea = await page.$('.ds-selector-area')
  expect(dragNode).not.toBeNull()
  expect(dragNodeArea).not.toBeNull()
}

const teardown = async (page) => {
  await page.evaluate(() => {
    // @ts-ignore
    window.importScripts.forEach((iScript) =>
      document.body.removeChild(iScript)
    )
    // @ts-ignore
    window.ds = null
    // @ts-ignore
    window.callback = []
    // @ts-ignore
    window.importScripts = []
  })
  const { ds } = await page.evaluate(() => ({ ds }))
  expect(ds).toBeNull()
  const callback = await page.evaluate(() => callback)
  expect(callback.length).toBe(0)
}

test.describe('Imports', () => {
  let server
  const port = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)

  test.beforeAll(
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
          server.listen(port, () => resolve("ok"))
        } catch (err) {
          rejects(err)
        }
      })
  )
  test.afterAll(() => {
    server.close()
  })

  test.describe('Static Window Import', () => {

    const setup = async (page) => {
      await page.waitForFunction(() => 'DragSelect' in window)
      await page.evaluate(() => {
        // @ts-ignore
        window.ds = new DragSelect({
          selectables: document.querySelectorAll('.item'),
        })
        // @ts-ignore
        window.ds.subscribe(
          'callback',
          // @ts-ignore
          ({ items }) => (window.callback = items.map((item) => item.id))
        )
      })
    }

    test('when importing the script, it should be bound to the window', async ({ page }) => {
      await goToPage(page)
      await page.evaluate(() => {
        // @ts-ignore
        window.dsScript = document.createElement('script')
        // @ts-ignore
        window.dsScript.setAttribute('src', `../../dist/DragSelect.js`)
        // @ts-ignore
        document.body.appendChild(window.dsScript)
        // @ts-ignore
        window.importScripts.push(window.dsScript)
      })
      await setup(page)
      await _test(page)
      await teardown(page)
    })

    test('when importing the minified script, it should be bound to the window', async ({ page }) => {
      await goToPage(page)
      await page.evaluate(() => {
        // @ts-ignore
        window.dsScript = document.createElement('script')
        // @ts-ignore
        window.dsScript.setAttribute('src', `../../dist/ds.min.js`)
        // @ts-ignore
        document.body.appendChild(window.dsScript)
        // @ts-ignore
        window.importScripts.push(window.dsScript)
      })
      await setup(page)
      await _test(page)
      await teardown(page)
    })
  })

  test.describe('AMD Module', () => {
    const setup = async (page, uri = '../../dist/DragSelect') => {
      await page.evaluate(() => {
        // @ts-ignore
        window.dsScript = document.createElement('script')
        // @ts-ignore
        window.dsScript.setAttribute(
          'src',
          `http://requirejs.org/docs/release/2.3.6/comments/require.js`
        )
        // @ts-ignore
        document.body.appendChild(window.dsScript)
        // @ts-ignore
        window.importScripts.push(window.dsScript)
      })
      await page.waitForFunction(() => 'require' in window)
      await page.evaluate((uri) => {
        // @ts-ignore
        window.dsScript = document.createElement('script')
        // @ts-ignore
        window.dsScript.innerHTML = /*javascript*/ `
          require.config({
            paths: {
              'DragSelect': '${uri}'
            },
            waitSeconds: 40
          });
          require(['DragSelect'], function (DragSelect) {
            window.ds = new DragSelect({ selectables: document.querySelectorAll('.item') });
            window.ds.subscribe('callback', ({ items }) => (window.callback = items.map((item) => item.id)))
          });
        `
        // @ts-ignore
        document.body.appendChild(window.dsScript)
        // @ts-ignore
        window.importScripts.push(window.dsScript)
      }, uri)
    }

    test('Should be able to load DS as an AMD Module', async ({ page }) => {
      await goToPage(page)
      await setup(page)
      await _test(page)
      await teardown(page)
    })

    test('Should be able to load minified DS as an AMD Module', async ({ page }) => {
      await goToPage(page)
      await setup(page, '../../dist/ds.min')
      await _test(page)
      await teardown(page)
    })
  })

  test.describe('ESM Module', () => {
    const setup = async (page, uri = '../../dist/DragSelect.es6m.js') => {
      await page.evaluate((uri) => {
        // @ts-ignore
        window.dsScript = document.createElement('script')
        // @ts-ignore
        window.dsScript.setAttribute('type', 'module')
        // @ts-ignore
        window.dsScript.innerHTML = /*javascript*/ `
          import DragSelect from "${uri}";
          window.ds = new DragSelect({ selectables: document.querySelectorAll('.item') });
          window.ds.subscribe('callback', ({ items }) => (window.callback = items.map((item) => item.id)))
          `
        // @ts-ignore
        document.body.appendChild(window.dsScript)
        setTimeout(() => {
          // @ts-ignore
          if (!window.importScripts) window.importScripts = []
          // @ts-ignore
          window.importScripts.push(window.dsScript)
        }, 500)
      }, uri)
    }

    test('when importing the script as module, it should be available', async ({ page }) => {
      await goToPage(page,
        `http://localhost:${port}/__tests__/functional/imports.html`
      )
      await setup(page)
      await _test(page)
      await teardown(page)
    })

    test('when importing the minified script as module, it should be available', async ({ page }) => {
      await goToPage(page,
        `http://localhost:${port}/__tests__/functional/imports.html`
      )
      await setup(page, '../../dist/ds.es6m.min.js')
      await _test(page)
      await teardown(page)
    })
  })
})
