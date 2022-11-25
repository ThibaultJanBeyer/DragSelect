/**
 * @jest-environment jsdom
 */

import getStylePosition from './getStylePosition'

describe('getStylePosition', () => {
  describe('top/left', () => {
    it('returns the simple styles', async () => {
      document.body.innerHTML = /*html*/ `
      <div id="test" style="top:1px; left:2px"></div>
    `
      const element = document.getElementById('test')
      const position = getStylePosition(element)

      expect(position).toMatchObject({
        x: 2,
        y: 1,
      })
    })

    it('falls back to computed styles when set but not defined', async () => {
      document.body.innerHTML = /*html*/ `
        <style>#test { top: 3px; left: 4px }</style>
        <div id="test"></div>
      `
      const element = document.getElementById('test')
      const position = getStylePosition(element)

      expect(position).toMatchObject({
        x: 4,
        y: 3,
      })
    })

    it('falls back to computed styles when not set', async () => {
      document.body.innerHTML = /*html*/ `<div id="test"></div>`
      const element = document.getElementById('test')
      const position = getStylePosition(element)
      expect(position).toMatchObject({
        x: 0,
        y: 0,
      })
    })
  })

  describe('translate/3d', () => {
    it('gets the simple styles', async () => {
      document.body.innerHTML = /*html*/ `
        <div id="test" style="transform: translate(5px, 6px) rotate(45deg)"></div>
      `
      const element = document.getElementById('test')
      const position = getStylePosition(element, true)

      expect(position).toMatchObject({
        x: 5,
        y: 6,
      })
    })

    it('gets the simple 3d styles', async () => {
      document.body.innerHTML = /*html*/ `
        <div id="test" style="transform: translate3d(7px, 8px, 0) scale(1.5)"></div>
      `
      const element = document.getElementById('test')
      const position = getStylePosition(element, true)

      expect(position).toMatchObject({
        x: 7,
        y: 8,
      })
    })

    it('falls back to computed styles', async () => {
      // computed transforms are translated to a matrix. Jest Dom does not do that conversion, so we do it manually here
      document.body.innerHTML = /*html*/ `
        <style>#test { transform: matrix(1, 0.267949, 0.267949, 1, 9, 10) }</style>
        <div id="test"></div>
      `
      const element = document.getElementById('test')
      const position = getStylePosition(element, true)

      expect(position).toMatchObject({
        x: 9,
        y: 10,
      })
    })

    it('falls back to computed 3d styles', async () => {
      // computed transforms are translated to a matrix. Jest Dom does not do that conversion, so we do it manually here
      document.body.innerHTML = /*html*/ `
        <style>#test { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11, 12, 1, 1) }</style>
        <div id="test"></div>
      `
      const element = document.getElementById('test')
      const position = getStylePosition(element, true)

      expect(position).toMatchObject({
        x: 11,
        y: 12,
      })
    })

    it('falls back to computed styles when not set', async () => {
      document.body.innerHTML = /*html*/ `<div id="test"></div>`
      const element = document.getElementById('test')
      const position = getStylePosition(element, true)
      expect(position).toMatchObject({
        x: 0,
        y: 0,
      })
    })
  })
})
