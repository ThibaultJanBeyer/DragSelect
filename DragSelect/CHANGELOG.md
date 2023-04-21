# 2.7.3

- Fix typing issues [#175](https://github.com/ThibaultJanBeyer/DragSelect/issues/175) thanks [@Ruslan207](https://github.com/Ruslan207)

# 2.7.2

- Add readme to npmjs
- Fix bug [#170](https://github.com/ThibaultJanBeyer/DragSelect/issues/170) where area position was not updated after a start when the area was the document itself and there was a timeout.

# 2.7.0

- Introduce blog-drag as alpha. It is supposed to fix dragging of multiple elements: dragging them as one block keeping aspect ratio positions on drag-scroll. Instead of moving elements individually. This was considered a bug. However as it is not fully tested it comes under a flag, please turn it on by setting `dragAsBlock: true`  and [report any issue you find here](https://github.com/ThibaultJanBeyer/DragSelect/issues). Thanks to [@rendertom](https://github.com/rendertom) for the addition [#162](https://github.com/ThibaultJanBeyer/DragSelect/pull/162).

*Note: this feature will be turned on by default in a future release once proper testing and all bugs are fixed*

# 2.6.1

- Fix bug calling dropZones [ #168](https://github.com/ThibaultJanBeyer/DragSelect/pull/168) by [@fredrikvin](https://github.com/fredrikvin)

# 2.6.0

- Introducing Overrides as a new concept to help advanced modification use-cases like [#150](https://github.com/ThibaultJanBeyer/DragSelect/issues/150) in collaboration with [@HollowMan6](https://github.com/HollowMan6)
- - See [Example use-case](https://dragselect.com/docs/guided-examples/Custom-Selection-Filter-Override) & [API for overrides](https://dragselect.com/docs/API/Overrides)
- Expose `filterSelected` in  `Selection` module
- Expose `isCollision` helper method

# 2.5.6

- Test refactor to monorepo and yarn for npm compatibility

# 2.5.5

- Fix bug where setting a new area via `.setSettings({ area: '...' })` would not remove the old event listeners. Which causes the mobile touch scroll from being blocked when switching between the Document to an areas.

# 2.5.4

- Fix a bug where `setSettings` would not work with `customStyles`.
- Beautify the default selector using rgb(0,175,255) as base blue color

# 2.5.3

- Fix a bug where `setSettings` would not work with dropZones.

# 2.5.2

- Make `droppables` within `dropZones` optional and use all selectables as default value if no droppables are provided.

# 2.5.1

- Fix: when an item had multiple dropzones, the `${droppedInsideClass}` was removed even tho’ the item was dropped inside a zone

# 2.5.0

- Add dropZones! Solves #115
- Add a `selectionThreshold` settings, solves #130
- Add a `refreshMemoryRate` settings, to increase/decrease performance as necessary

# 2.4.4

- Add support for `pointerEvents` (from @HollowMan6) [#143](https://github.com/ThibaultJanBeyer/DragSelect/pull/143) & [#128](https://github.com/ThibaultJanBeyer/DragSelect/pull/128)

# 2.4.3

- add `triggerCallback` option to `removeSelectables` and `addSelectables`

# 2.4.2

- Add Selecrables events/topics for add/delete: `Selectable:added` & `Selectable:added:pre` & `Selectable:removed` & `Selectable:removed:pre`

# 2.4.0-1

- Change all Properties dynamically *anytime*. Solves #111 and #95. Very helpful for async libraries like react. You can do so using the `setSettings` method, you can pass any settings in the object and they will be updated. Example: update the drag area at any time by running: `ds.setSettings({ area: document.getElementById("new-area") })`.
- Remove deprecated keys `ctrlKey`, `shiftKey` and `metaKey`. Use `Control`, `Shift` and `Meta` respectively instead.
- Remove deprecated method `getCursorPositionDifference`. Calculate the difference on your own instead.
- Remove deprecated setting property callbacks. Use `DragSelect.subscribe("callback", (callbackObject) => {})` instead.

# 2.3.1

- Fix bug [#109](https://github.com/ThibaultJanBeyer/DragSelect/issues/109) where inner elements are ignored from normal drag behavior

# 2.3.0

- Fix bug with break not working. (still handling change)
- Fix bug with `pre` events not working properly.
- **Caution**:
- - This upgrade changes the order in which the callbacks are fired. The normal callbacks are fired in a FIFO order, first in, first out. The `pre` callbacks are fired in a LIFO order, last in first out.
- - Pre Events are now really triggered *before* the whole action.
- Fixes issue [#110](https://github.com/ThibaultJanBeyer/DragSelect/issues/110) where teardown did not work properly

# 2.2.2

- Add a check whether the initial click was issued within the area
- Fixes [#105](https://github.com/ThibaultJanBeyer/DragSelect/issues/105)

# 2.2.1

- removes dom-nodes when using .stop
- fixes [#94](https://github.com/ThibaultJanBeyer/DragSelect/issues/94)

# 2.2.0

- Add new possible callback value: `isDraggingKeyboard`
- Add new settings prop `keyboardDrag: false`
- Add `pre` events for all events. i.e. `predragstart`, `predragmove`, etc.
- Add information on 3rd party integration to the README.
- Re-add `break` functionality to give maximum flexibility on 3rd party integration

All these changes solve [#80](https://github.com/ThibaultJanBeyer/DragSelect/issues/80)

# 2.1.2

- Fixes build error bug introduced by typings. Solves [#100](https://github.com/ThibaultJanBeyer/DragSelect/issues/100)
Issue: the JS-Docs files types.js was not included in d.ts files. Now rollup builds are force-including it.

# 2.1.0-1

- Fixes bug #83: keyboard dragging is not disabled when draggability is disabled
- Adds **typescript support** by adding types files to dist as specified in issue #93
- Un-track dist file

# 2.0.3

- Correct the behavior of modules/SelectableSet.removeSelectables method, solves #90 thanks to @lchtao26 for the contribution!

# 2.0.2

- Fix element position when `useTransform: false` issue

# 2.0.1

- Fix import issue caused by ignoring dist files

# 2.0.0

## Added Draggability! (solves #24) (Breaking Change)

- You can now also drag and drop selectable elements
- Set `immediateDrag` to `false` if you want drag-ability only after a selection was made
- You can turn off that functionality by setting `draggability` to `false`
- You can drag elements also solely using your keyboard. Which makes it accessible. You can set the keys that can be used for dragging via `dragKeys`.

## Improved Selector (Potential Breaking Change)

The selector element is now not rendered inside of the area instead we generate a div overlaying the actual area and render the element inside that div. Which has a lot of benefits:

- selector is not inside of the area itself (solves #63)
- selector is now in a fresh selection area overlay (solves #26)
- the overlay adapts size to always match the real area
- most css modifications will work as the area is not affected
- the overlay has no pointer-events and acts as a clip box
- selection can be drawn outside of the area which makes auto-scrolling and selection easier
- you can still target that area overlay if you want use the class `ds-selector-area`
- Area can now be scrolled in each direction simultaneously
- You can now set the tolerance for the scroll via `overflowTolerance` property

## Improved inside area checker (Potential Breaking Change)

There were various bugs before 2.0 which would bypass the area restrictions and user would still be able to select elements outside of the area.
We now check whether the elements are inside of the area to know whether they are selectable or not.

- Fixes bug where elements outside of area could still be selected with keyboard
- Fixes bug where elements outside of area could still be selected with negative scroll

## Improved callbacks (Breaking Change)

Changed the callbacks to follow a pub/sub pattern. They're not events you can subscribe to and they will pass back an object always following the same pattern holding extra information. Currently DragSelect still supports setting callbacks in the constructor method to make it easier for you to transition. However, in future, only subscribers will work.

- Adds 3 public methods: `subscribe` (listen to an event), `unsubscribe` (remove listener) and `publish` (publish an event yourself!)
- Allows adding/removing events whenever and wherever you want
- Makes it more flexible to add new events
- Follows the pub/sub pattern from dom events (i.e. `addEventListener` is `subscribe`)

Here is an example on what you'll have to change:

### Before
```javascript
const ds = new DragSelect({
  callback: (items, event) => console.log("my callback", items, event),
  onDragMove: (event) => console.log("my callback", event),
  onDragStartBegin: (event) => console.log("my callback", event),
  onDragStart: (event) => console.log("my callback", event),
  onElementSelect: (item) => console.log("my callback", item),
  onElementUnselect:  (item) => console.log("my callback", item),
})
```

### Now
```javascript
const ds = new DragSelect({})
ds.subscribe('callback', ({ items, item, event }) => console.log("my callback", items, event))
ds.subscribe('dragmove', ({ items, item, event }) => console.log("my callback", event))
// dragstartbegin was removed use dragstart instead
ds.subscribe('dragstart', ({ items, item, event }) => console.log("my callback", event))
ds.subscribe('elementselect', ({ items, item, event }) => console.log("my callback", item))
ds.subscribe('elementunselect', ({ items, item, event }) => console.log("my callback", item))
```

## Removed private and public methods (Breaking Change)

Based on the changes, some methods did not make sense anymore. So we cleaned them up. Generally we want to move away from providing utility methods (like i.e. cursor position retrieval) instead we want to focus on the tool itself only. In case you still want any of the public method or a new one, feel free to open an issue.

Public methods that were removed:

- `.break` (use `.stop` and `.start` instead) (back in v2.2.0)
- `.getCursorPos`
- `.getScroll`
- `.getAreaRect`
- `.toArray`
- `.isCursorNearEdge`
- `.toggle` (use `.toggleSelection` instead)
- `.select` (use `.setSelection` or `.addSelection` instead)
- `.getCursorPositionDifference` (is deprecated, calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`)

## Fixing Multi-Select-Keys issue & adding more available keys (Breaking Change)

- Fixes the issue with multi-selection via Keyboard not working on Firefox.
- You can now use **any** key to trigger multi-selection mode that is available under `event.key` on Keyboard Events ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key))

However, that means that the key names have changes. Following keys should be replaced:

- Instead of `"ctrlKey"` use `"Control"` now
- Instead of `"shiftKey"` use `"Shift"` now
- Instead of `"metaKey"` use `"Meta"` now

## Dropped IE Support

- Internet explorer is no longer supported. Following other big libraries. Dropping IE Support drastically reduces bundle size and improves maintainability of the project. Also following Microsoft itself, which [stopped support for IE all together](https://www.independent.co.uk/life-style/gadgets-and-tech/news/microsoft-internet-explorer-out-use-11-edge-a9676176.html). If you need IE support, please use a build tool that gives you IE Support with necessary polyfills for now and write support request stating your use-case. You can also consider using any versions prior 2.
We do support Edge and all other major browsers.

## Impressive performance improvements

This version is an (almost) complete rewrite of DragSelect. Of course the main reason is to improve the ease to add new features and maintain existing ones but that also gave the opportunity to add some performance improvements.

The setup used to measure this is the performance test which runs DragSelect over 25.000 selectable Nodes.
We compared the accumulated average execution times before and after the changes. Before the changes that was an average of 3s/run. Now we lows of 1.5s.

- 4.09% faster by caching calculations
- 11.36% faster by using an interaction pub/sub mechanism
- 15.86% faster by caching element positions (each update) & using more performant css class manipulations
- 28.36% faster by caching by bundling reflows and repaints
---
= 59,67% performance increase

# 1.15.1

- This is a preparation to some code-refactoring and bigger changes aimed for v2
- Preparation to deprecate `getScroll` and `getAreaRect`. They will both become internal methods. Unless you've valid reasons to keep exposing them.
- We will soon also prevent you from using most internal methods (those marked with `_` at the start). You'll not be able to extend them, nor override, nor use directly. Also here, unless you've valid reasons to keep them exposed. 

# 1.15.0

- Use rollup to build the package: this simplifies the portability of the module and will allow to split the code going forward.
- Added tests for various import types (default, amd & esm)

# 1.14.0

- Enhanced auto-scrolling. See PR [59](https://github.com/ThibaultJanBeyer/DragSelect/pull/59). Big thanks to [@slinhart](https://github.com/slinhart) for this addition <3

# 1.13.3-5

- Update & upgrade dev-deps
- Use puppeteer-jest for faster & cleaner tests
- Fix typing issues (unused properties should be used last)
- Deprecating `isCursorNearEdge(event, area)` in favor of `isCursorNearEdge(area, event)`
- Using [uglify-js](https://www.npmjs.com/package/uglify-js) as new uglifier

# 1.13.2

- Update dev deps
- Extract some build functionality from package.json to `/bin`
- Fix typos in functional tests
- Update raw DragSelect to meet new standards from prettier

# 1.13.1

- Quick-Fix for `zoom` issue. See PR [#42](https://github.com/ThibaultJanBeyer/DragSelect/pull/42)

# 1.13.0

- Add `zoom` value for use-cases with CSS scale transformations. Implemented in PR [#40](https://github.com/ThibaultJanBeyer/DragSelect/pull/40). Thanks to [@staradayev](https://github.com/staradayev) for your contribution!

# 1.12.2

- Keep selection when clicking on scrollbars. Fixes [#36](https://github.com/ThibaultJanBeyer/DragSelect/issues/36)

# 1.12.1

- Improve private event callbacks

# 1.12.0

- Fix bugs related to the `stop()` functionality [#37](https://github.com/ThibaultJanBeyer/DragSelect/issues/37) and [#38](https://github.com/ThibaultJanBeyer/DragSelect/issues/38). Big thanks to [@Martin-Eckleben](https://github.com/Martin-Eckleben) for the contribution!
- - Note that `reset()` now only resets the tool while `resetWithCallback()` also triggers the callback.
- Improve automatic tests
- Add typechecking to tests

# 1.11.3

- Keep the `dist/` folder holding only the relevant files. In order to not introduce breaking changed to standarts introduced earlier.
- Automated all manual tests (functional) and added a CI process to improve project stability and maintainability.

# 1.11.2

- Use `DragSelect.js` as `"main"` in `package.json` in order to get intellisense

# 1.11.1

- Add em6 moduled files that have native `module export DragSelect` that can be used in for example:
```html
<script type="module">
  import DragSelect from "path/to/DragSelect.es6m.js"
  new DragSelect({...});
</script>
```

# 1.11.0

- Moved the files from the `dist` folder to the `docs` folder to adhere to github pages standart
- Improve code stability by enforcing typechecks via JS-Docs, inspired by [truckjs](https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76)  
- Partial rewrite using native ES6 classes transpiling down to ES5 using babel.  
  *Note: first I refactored the code to TypeScript but then rolled back because it might limit the ability of external people to contribute due to the new language*
- Improve documentation by autogenerating it with JS-Docs

# 1.10.0

- Add touch device support (i.e. Mobile Phones)
- Preparations for modern code. I.e. ES6:  
Usind Babel to transpile downwards to ES5. This should not result in any changes on your side.

# 1.9.1

- Dropped IE9 support. Oldest browser is now IE10 (should still work on IE9. Just stopped testing that browser)
- Fix IE `document.documentElement` scrolling bug

# 1.9.0

- Fix non scrollable document element issue. See [#35](https://github.com/ThibaultJanBeyer/DragSelect/issues/35)
- Added `onDragStartBegin` callback. Helpful for my friends at issue [#24](https://github.com/ThibaultJanBeyer/DragSelect/issues/24)
- Increase performance by calculating the selection rectangle outside of the `_isElementTouching` function. Tested on 30.000 Nodes. The selection is still usable although a bit laggy on 30k nodes.
- Rename `isElementTouching` to private `_isElementTouching`. You also have to pass a `selectionRect` as second argument now instead of just passing the container node. This is not considered a breaking change because that function was not exposed before.
- Add prettier & eslint + prettify code

# 1.8.1

- add `setSelectables()` method. Based on request from @n1crack. See issue [#30](https://github.com/ThibaultJanBeyer/DragSelect/issues/30)
- [local tests] replace manual `test3` with an automated test for constrained selection

# 1.8.0

- CSS Classes naming is now customizable. See PR [#27](https://github.com/ThibaultJanBeyer/DragSelect/pull/27). Thanks to [@ant1ucem](https://github.com/ant1ucem) for the contribution!

# 1.7.24

- add `multiSelectMode` to set the multi-selection as default behavior. See [#19](https://github.com/ThibaultJanBeyer/DragSelect/issues/19). Thanks to [@riless](https://github.com/riless) for the contribution!

# 1.7.21-23

- fix issue with getCursorPositionDifference for single clicks. See [#13](https://github.com/ThibaultJanBeyer/DragSelect/issues/13). Big thanks to [@RealTJ](https://github.com/RealTJ) for the help
- ! getCursorPositionDifference now returns negative values when moving to the left and positive values when moving to the right (exact oposite as before). This is more consistent with the default behaviour on a X/Y axis.

# 1.7.20

- Add new `.toggleSelection` public method

# 1.7.19

- Solve issue [#10](https://github.com/ThibaultJanBeyer/DragSelect/issues/10)
- Improve public .getCursorPos() method and made initial one private
- Add more local tests representing different scenarios for proper manual testing

# 1.7.18

- Prevent rightclick from triggering a selection.
- Add release event to the document not the area. (makes more sense, as a user, when I release the mouse click I want to release selection as well)

# 1.7.16 + 1.7.17

- Fix selection algorithm issue reported in issue [#9](https://github.com/ThibaultJanBeyer/DragSelect/issues/9)
- Improve `.addSelection`, `.removeSelection` and `.setSelection` by adding a third option (see docs).

# 1.7.15

- Add several new methods, helpful for user: `.addSelection`, `.removeSelection`, `.setSelection`, `.clearSelection`.

# 1.7.14

- Enhanced SVG support for legacy browsers

# 1.7.13

- Add AMD Modules support

# 1.7.12

- Add SVG Support
- Add `break` functionality to break out of execution from within callbacks
- Add 2 more callbacks: `onDragStart` and `onDragMove`
- Pass the event object to `callback`
