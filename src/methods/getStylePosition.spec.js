import { test, expect } from '@playwright/test';
import getStylePosition from './getStylePosition'
import { JSDOM } from 'jsdom';

const setupElement = (html) => {
  const dom = new JSDOM(html)
  // @ts-ignore
  global.window = dom.window
  return window.document.getElementById('test')
}

test.describe('getStylePosition', () => {
  test.describe('top/left', () => {
    test('returns the simple styles', async () => {
      const element = setupElement(/*html*/ `
        <div id="test" style="top:1px; left:2px"></div>
      `);
      const position = getStylePosition(element)

      expect(position).toMatchObject({
        x: 2,
        y: 1,
      })
    })

    test('falls back to computed styles when set but not defined', async () => {
      const element = setupElement(/*html*/ `
        <style>#test { top: 3px; left: 4px }</style>
        <div id="test"></div>
      `);
      const position = getStylePosition(element)

      expect(position).toMatchObject({
        x: 4,
        y: 3,
      })
    })

    test('falls back to computed styles when not set', async () => {
      const element = setupElement(/*html*/ `<div id="test"></div>`);
      const position = getStylePosition(element)
      expect(position).toMatchObject({
        x: 0,
        y: 0,
      })
    })
  })

  test.describe('translate/3d', () => {
    test('gets the simple styles', async () => {
      const element = setupElement(/*html*/ `
        <div id="test" style="transform: translate(5px, 6px) rotate(45deg)"></div>
      `);
      const position = getStylePosition(element, true)
      expect(position).toMatchObject({
        x: 5,
        y: 6,
      })
    })

    test('gets the simple 3d styles', async () => {
      const element = setupElement(/*html*/ `
        <div id="test" style="transform: translate3d(7px, 8px, 0) scale(1.5)"></div>
      `);
      const position = getStylePosition(element, true)

      expect(position).toMatchObject({
        x: 7,
        y: 8,
      })
    })

    test('falls back to computed styles', async () => {
      // computed transforms are translated to a matrix. Jest Dom does not do that conversion, so we do it manually here
      const element = setupElement(/*html*/ `
        <style>#test { transform: matrix(1, 0.267949, 0.267949, 1, 9, 10) }</style>
        <div id="test"></div>
      `);
      const position = getStylePosition(element, true)

      expect(position).toMatchObject({
        x: 9,
        y: 10,
      })
    })

    test('falls back to computed 3d styles', async () => {
      // computed transforms are translated to a matrix. Jest Dom does not do that conversion, so we do it manually here
      const element = setupElement(/*html*/ `
        <style>#test { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11, 12, 1, 1) }</style>
        <div id="test"></div>
      `);
      const position = getStylePosition(element, true)

      expect(position).toMatchObject({
        x: 11,
        y: 12,
      })
    })

    test('falls back to computed styles when not set', async () => {
      const element = setupElement(/*html*/ `<div id="test"></div>`);
      const position = getStylePosition(element, true)
      expect(position).toMatchObject({
        x: 0,
        y: 0,
      })
    })
  })
})
