<p align="center" style="text-align: center" >
  <a href="https://DragSelect.com/">
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="https://dragselect.com/img/dragselect-logo.png">
      <source media="(prefers-color-scheme: dark)" srcset="https://dragselect.com/img/dragselect-logo-alt.png">
      <img alt="The DragSelect logo: a selection symbol, a hand, a drop symbol and a mouse within a selection square." width="300" src="https://dragselect.com/img/dragselect-logo.png">
    </picture>
  </a>
</p>
<p align="center" style="text-align: center">
  <a href="https://dragselect.com/">Project-Page</a> |
  <a href="https://dragselect.com/docs/intro">Documentation</a> |
  <a href="https://github.com/ThibaultJanBeyer/DragSelect/">Github</a> | 
  <a href="https://www.npmjs.com/package/dragselect">NPM</a> | 
</p>
<p align="center" style="text-align: center; margin-bottom: 50px;">
<a href="https://github.com/ThibaultJanBeyer/DragSelect/actions"><img alt="Build Status" src="https://github.com/ThibaultJanBeyer/DragSelect/actions/workflows/github-actions-build.yml/badge.svg"></a>
<a href="https://dragselect.com/v2/ds.min.js"><img alt="gzip size" src="https://img.badgesize.io/https://dragselect.com/v2/ds.min.js?compression=gzip"></a>
<a href="https://www.npmjs.com/package/dragselect"><img alt="npm downloads count" src="https://img.shields.io/npm/dt/dragselect.svg"></a>
<a href="https://github.com/ThibaultJanBeyer/DragSelect/blob/master/DragSelect/package.json"><img alt="No Dependency" src="https://img.shields.io/badge/dependencies-none-informational"></a>
<a href="https://github.com/ThibaultJanBeyer/DragSelect/blob/master/CONTRIBUTING.md"><img alt="Contributors Welcome" src="https://img.shields.io/badge/contributors-welcome-blueviolet"></a>
<a href="https://github.com/sponsors/ThibaultJanBeyer"><img alt="Sponsors Welcome" src="https://img.shields.io/badge/sponsors-welcome-blueviolet"></a>
</p>

# DragSelect [![GitHub release](https://img.shields.io/github/release/ThibaultJanBeyer/DragSelect.svg)](https://GitHub.com/ThibaultJanBeyer/DragSelect/releases/)

easily add a selection algorithm to your application/website.

The documentation is being migrated to [https://dragselect.com/](https://dragselect.com/). Find the [most up to date documentation there](http://dragselect.com/docs/intro).

# TOC

- [Project Page: Demo \& Info](#project-page-demo--info)
- [Key-Features](#key-features)
- [Why?](#why)
- [Supporters](#supporters)
  - [Thanks To:](#thanks-to)
- [Installation](#installation)
  - [NPM](#npm)
  - [Yarn](#yarn)
  - [Global](#global)
  - [Bower (deprecated)](#bower-deprecated)
  - [That's it, you're ready to rock!](#thats-it-youre-ready-to-rock)
- [Usage](#usage)
  - [Simple](#simple)
  - [Within a Scroll-Able Area](#within-a-scroll-able-area)
  - [With DropZones](#with-dropzones)
  - [Extended](#extended)
  - [React](#react)
  - [Mobile/Touch usage](#mobiletouch-usage)
  - [Accessibility (a11y)](#accessibility-a11y)
  - [Use Your Own Drag \& Drop](#use-your-own-drag--drop)
- [Constructor Properties (Settings)](#constructor-properties-settings)
  - [Post-Initialization Setting-Updates](#post-initialization-setting-updates)
- [Event Callbacks](#event-callbacks)
  - [Events](#events)
    - [Callback Object Keys](#callback-object-keys)
- [Methods](#methods)
- [CSS Classes](#css-classes)
- [Have Fun!](#have-fun)

# Project Page: Demo & Info

[https://dragselect.com/](https://dragselect.com/)

# Key-Features

- **No dependencies** [![No Dependency](https://img.shields.io/badge/dependencies-none-informational)](https://github.com/ThibaultJanBeyer/DragSelect/blob/master/DragSelect/package.json)
- Hyper customizable
- Replicates operating system drag-selection in the browser
- Accessibility (a11y)
- Use modifier keys to make multiple independent selections
- Select, Drag and Drop also also via keyboard
- Supports all major browsers
- Lightweight, only ![gzip size](https://img.badgesize.io/https://dragselect.com/v2/ds.min.js?compression=gzip)
- Popular: ![npm downloads count](https://img.shields.io/npm/dt/dragselect.svg) on npm
- DragSelect was written with Performance in mind (can easily select >15.000 Elements)
- Supports SVG
- Supports mobile (touch interaction)
- Free & open source
- Easy to use

![demo-gif](https://dragselect.com/img/dragselect.gif)

# Why?

Because apparently there was nothing that does not require jquery out there.  
This is better than https://jqueryui.com/selectable/ or https://jqueryui.com/draggable/ and has no dependencies.
We use it currently in a professional rich interface application where we have a file management system. The user can select files to organize them and change their metadata, with this plugin our users are able to select multiple files and perform batch/bulk-operations (applying changes to multiple files at once). We also started using it in production for a huge, graphical cloud hosting manager with a lot of active users. Users can select multiple servers, storages, etc. on an artboard to perform multi-operations, re-organize them, move them on the UI or batch-delete. We’re running it since January 18' it’s super helpful and very stable, let’s keep it that way. I can easily think of dozens other use-cases. I’m really keen to know how you use it in your projects, please let me know.

# Supporters

Please donate to support the countless hours of hard work & support. Especially if your company makes money, then there is no excuse. Thank you :)

If you're too poor or broke you can still support us with your time instead by [contributing to the code](https://github.com/ThibaultJanBeyer/DragSelect/blob/master/CONTRIBUTING.md)!

## Thanks To:

| <a href="https://www.browserstack.com/"><img src="https://cdn.worldvectorlogo.com/logos/browserstack.svg" alt="Browserstack" width="100px" /></a>                                                             | <a href="https://www.digitalocean.com/"><img src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_vertical_blue.svg" alt="DigitalOcean" width="150px" /></a>                       | [You?](https://github.com/sponsors/ThibaultJanBeyer)                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [BrowserStack](https://www.browserstack.com/) is a service for cross-browser testing. They support this open source projects by providing us with a [free account](https://www.browserstack.com/open-source)! | [DigitalOcean](https://www.digitalocean.com/) is a cloud hosting service. They support this open source projects by providing us with [free credits](https://www.digitalocean.com/open-source/credits-for-projects)! | Thank and support us by making a [Direct Donation to DragSelect](https://www.blockchain.com/btc/address/1LdweSpjgSeJC8XxX3swrohBMBLUzg6cmC) (via Bitcoin: `1LdweSpjgSeJC8XxX3swrohBMBLUzg6cmC`). Or sponsor via [GitHub Sponsors](https://github.com/sponsors/ThibaultJanBeyer) or [Get in touch](mailto:thibault.beyer@gmail.com). |

Donations are distributed with all project contributors proportionally to their involvement. We are grateful for any amount: we have more than ![npm downloads count](https://img.shields.io/npm/dt/dragselect.svg), imagine how much we'd have if everyone would have had donated only 1$ 🤩 (unfortunately this did not happen). If you donate, we can display your logo here if you want, which will give you fame, fortune and help you recruit great talent and boosting your SEO.

# Installation

Read the [Getting Started](http://dragselect.com/docs/intro).

## NPM

```console
npm install --save dragselect
```

## Yarn

```console
yarn add dragselect
```

## pNPM

```console
pnpm i -S dragselect
```

## Global

You can [download the file](https://dragselect.com/DragSelect.js) ([minified](https://dragselect.com/ds.min.js)) and add it to your document:

```html
<script src="https://dragselect.com/ds.min.js"></script>
```

> Note: if you are using `<script type=module` you can use the `DragSelect.es6m.js` or `ds.es6m.min.js` files as they include `export default DragSelect`

> Don't use this direct linking for production. You'll not benefit from versioning. Please use a package manager like `npm`!

## That's it, you're ready to rock!

Of course you can also just include the code within your code and bundle it to save a request.

DragSelect supports `module.exports`, `AMD Modules` with `define`, `es6 modules` with `.es6m` versions and has a fallback to global namespace for maximum out of the box support.

# Usage

Now in your JavaScript you can simply pass elements to the function like so:

## Simple

Read the [Simple Usage Guide](http://dragselect.com/docs/guided-examples/Simple)

The simplest possible usage.  
Choose which elements can be selected:

```javascript
new DragSelect({
  selectables: document.getElementsByClassName("selectable-nodes"),
});
```

Find a live [example in the Guide](http://dragselect.com/docs/guided-examples/Simple)

## Within a Scroll-Able Area

Read the [Area Guide](http://dragselect.com/docs/guided-examples/Area)

Here the selection is constrained. You can only use the selection/drag inside of the area container:

```javascript
new DragSelect({
  selectables: document.getElementsByClassName("selectable-nodes"),
  area: document.getElementById("area"),
});
```

Find a live [example in the Area Guide](http://dragselect.com/docs/guided-examples/Area)

## With DropZones

Read the [DropZones Guide](http://dragselect.com/docs/guided-examples/DropZones)

Example of DropZones. DropZones are areas where you can drop the selected elements into.

```javascript
const ds = new DragSelect({
  selectables: document.querySelectorAll('.selectable-nodes'),
  area: document.querySelector('#area'),
  dropZones: [
    { element: document.querySelector('#zone-1'), id: 'zone-1' }, // all selectables can be dropped into zone 1
    { element: document.querySelector('#zone-2'), id: 'zone-2', droppables: document.querySelectorAll('#item-2,#item-4') }, // only items 2 and 4 are droppable
  ],
  dropInsideThreshold: 1, // 1 = has to be 100% inside the dropzone, 0.5 = 50% inside, 0 = just touching is fine
});

ds.subscribe('callback', ({
  dropTarget: {
      id: "zone-1",
      element: <node />,
      droppables: [ <node />, … ],
      itemsDropped: [ <node />, … ], // elements that were selected on drop
      itemsInside: [ <node />, … ] // elements that are inside the bounds of the dropzone
  }) => {
  if(dropTarget?.itemsDropped?.length) {
    // do something
    console.log('Dropped', dropTarget.itemsDropped, 'into', dropTarget.id);
  }
})
```

This will also add some respective [classes](#classes)

Find a live [example in the guide](http://dragselect.com/docs/guided-examples/DropZones)

## Extended

All options are optional. You could also just initiate the Dragselect by `new DragSelect({});` without any option.  
Find all possible properties and methods in **[the docs](https://dragselect.com/docs/category/api)**

```javascript
// if you add the function to a variable like this, you have access to all its functions
const ds = new DragSelect({
  // all settings are optional and can be added later
});

// this is how you add/update settings after initialization
ds.setSettings({
  // node/nodes that can be selected. By default will never add elements twice:
  selectables: document.querySelectorAll(".selectable-nodes"),
  // area in which you can drag. If not provided it will be the whole document & body/documentElement.
  area: document.getElementById("area"),
  // and many more, see "properties" section in the docs
});

// fired once the user releases the mouse. (items) = selected nodes:
ds.subscribe("callback", ({ items, event }) => {});
// returns all currently selected nodes:
ds.getSelection();
// Teardown/stop the whole functionality:
ds.stop();
// Reset the functionality after a teardown:
ds.start();

// and many more, see "methods" section in documentation
```

> You can also use the "shift", "ctrl" or "command" key to make multiple independent selections.

## React

Read the [React Guide](http://dragselect.com/docs/guided-examples/React)

## Mobile/Touch usage

Read the [Mobile Touch Guide](http://dragselect.com/docs/guided-examples/Mobile-Touch)

## Accessibility (a11y)

**DragSelect is accessible by default**:

> TLDR;  
> => Your `selectables` should be buttons: `<button type="button"></button>`.  
> => <kbd>ArrowKeys</kbd> are used for keyboard dragging.

Read the [Accessibility Guide](http://dragselect.com/docs/guided-examples/Accessibility)

## Use Your Own Drag & Drop

Read the [Custom Drag and Drop Guide](http://dragselect.com/docs/guided-examples/CustomDnD)

# Constructor Properties (Settings)

_DragSelect is hyper customizable_. Note, all properties are optional.

Read the [Settings API docs](http://dragselect.com/docs/API/Settings)

Moreover any setting can also be updated or added after the initialization, see [post-initialization setting updates](#post-initialization-setting-updates).

Here is the full list:

| property            | type                                                                                      | usage                                                                                                                                                                                                                                                                                                                                                                          | default                                                                              |
| ------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| area                | single DOM element (node)                                                                 | The square in which you are able to select                                                                                                                                                                                                                                                                                                                                     | `document`                                                                           |
| selectables         | DOM elements [nodes]                                                                      | The elements that can be selected                                                                                                                                                                                                                                                                                                                                              | `[]`                                                                                 |
| autoScrollSpeed     | number                                                                                    | The speed in which the area scrolls while selecting (if available). The unit is arbitrary (interval aims for 30fps). Set to `0.0001` to disable auto-scrolling.                                                                                                                                                                                                                | `5`                                                                                  |
| overflowTolerance   | { x:number, y:number }                                                                    | Tolerance for autoScroll (how close one has to be near an edges for autoScroll to start)                                                                                                                                                                                                                                                                                       | `{x:25,y:25}`                                                                        |
| zoom                | number                                                                                    | Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom.                                                                                                                                                                                                                                                           | `1`                                                                                  |
| customStyles        | boolean                                                                                   | If true, no styles will be automatically applied to the selector element (except position: absolute).                                                                                                                                                                                                                                                                          | `false`                                                                              |
| multiSelectMode     | boolean                                                                                   | Add newly selected elements to the selection instead of replacing them.                                                                                                                                                                                                                                                                                                        | `false`                                                                              |
| multiSelectToggling | boolean                                                                                   | Whether or not to toggle already active elements while multi-selecting.                                                                                                                                                                                                                                                                                                        | `true` (MacOS selection behavior)                                                    |
| multiSelectKeys     | array                                                                                     | Keys that allows switching to the multi-select mode (see the multiSelectMode option). Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). Note that the best support is given for <kbd>Control</kbd>, <kbd>Shift</kbd> and <kbd>Meta</kbd>. Provide an empty array `[]` if you want to turn off the functionality. | `['Control', 'Shift', 'Meta']`                                                       |
| selector            | single DOM element (node)                                                                 | The square that will be used to draw the selection.                                                                                                                                                                                                                                                                                                                            | Auto-created HTML Element                                                            |
| selectionThreshold  | number                                                                                    | How much % of the element has to be selected to be considered selected (0 = just touching, 1 = fully inside the selection)                                                                                                                                                                                                                                                     | `0`                                                                                  |
| draggability        | boolean                                                                                   | When a user is dragging on an already selected element, the selection is dragged.                                                                                                                                                                                                                                                                                              | `true`                                                                               |
| immediateDrag       | boolean                                                                                   | Whether a selectable element is draggable before being selected or needs to be selected first                                                                                                                                                                                                                                                                                  | `true`                                                                               |
| keyboardDrag        | boolean                                                                                   | Whether or not the user can drag with the keyboard (Accessibility).                                                                                                                                                                                                                                                                                                            | `true`                                                                               |
| dragKeys            | { up:string[], down:string[], left:string[], righ:string[] }                              | The keys available to drag element using the keyboard. Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)).                                                                                                                                                                                                         | `{ up:['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], righ: ['ArrowRight'] }` |
| keyboardDragSpeed   | number                                                                                    | The speed at which elements are dragged using the keyboard. In pixels per keyDown.                                                                                                                                                                                                                                                                                             | `10`                                                                                 |
| useTransform        | boolean                                                                                   | Whether to use the more performant hardware accelerated css transforms when dragging instead of the top/left positions.                                                                                                                                                                                                                                                        | `true`                                                                               |
| refreshMemoryRate   | number                                                                                    | Refresh rate on memoization, higher numbers mean better performance but more lag if elements are moving, lower numbers mean less lag but worse performance. If none of your DOMNodes are moving, you can set it to a very high number to increase performance. Value in milliseconds.                                                                                          | `80`                                                                                 |
| dropZones           | [{ id: 'string', element: single DOM element (node), droppables?: DOM elements [nodes] }] | zones with association of droppable items that can be dropped into them. `id`: any unique identifying string. `element`: is the dropzone itself. `droppables`: the elements that can be dropped into that zone. This is optional, by default it is all selectables                                                                                                             | `[]`                                                                                 |
| dropInsideThreshold | number                                                                                    | How much % of the item has to be inside the dropzone to be considered inside (0 = barely touching, 1 = completely inside)                                                                                                                                                                                                                                                      | `1`                                                                                  |
| dropTargetThreshold | number                                                                                    | How much % of the zone does the pointer has to be in to be considered a target (0 = anywhere in the zone, max: 0.5 = has to point at the center of the zone)                                                                                                                                                                                                                   | `0`                                                                                  |
| usePointerEvents    | boolean                                                                                   | Whether to use Pointer Events to replace traditional Mouse or Touch Events. Useful for tools like Google Blockly.                                                                                                                                                                                                                                                              | `false`                                                                              |
| selectedClass       | string                                                                                    | The class name assigned to the selected items.                                                                                                                                                                                                                                                                                                                                 | [see classes](#classes)                                                              |
| hoverClass          | string                                                                                    | The class name assigned to the mouse hovered items.                                                                                                                                                                                                                                                                                                                            | [see classes](#classes)                                                              |
| selectorClass       | string                                                                                    | The class name assigned to the square selector helper.                                                                                                                                                                                                                                                                                                                         | [see classes](#classes)                                                              |
| selectableClass     | string                                                                                    | The class name assigned to the elements that can be selected.                                                                                                                                                                                                                                                                                                                  | [see classes](#classes)                                                              |
| selectorClass       | string                                                                                    | The class assigned to the square selector helper                                                                                                                                                                                                                                                                                                                               | ds-selector                                                                          |
| selectorAreaClass   | string                                                                                    | The class assigned to the square in which the selector resides. By default it's invisible                                                                                                                                                                                                                                                                                      | ds-selector-area                                                                     |
| droppedTargetClass  | string                                                                                    | On an item corresponding the target dropzone. This is also the prefix for ds-dropped-target-${zone.id}.                                                                                                                                                                                                                                                                        | ds-dropped-target & ds-dropped-target-${zone.id}                                     |
| droppedInsideClass  | string                                                                                    | On an item that is within its dropzone bounds after a drop. This is also the prefix for ds-dropped-inside-${zone.id}                                                                                                                                                                                                                                                           | ds-dropped-inside & ds-dropped-inside-${zone.id}                                     |
| droppableClass      | string                                                                                    | On element that can be dropped into at least one container. This is also the prefix for ds-droppable-${zone.id}                                                                                                                                                                                                                                                                | ds-droppable & ds-droppable-${zone.id}                                               |
| dropZoneClass       | string                                                                                    | On each dropZone                                                                                                                                                                                                                                                                                                                                                               | ds-dropzone                                                                          |
| dropZoneReadyClass  | string                                                                                    | On corresponding dropZone when element is dragged                                                                                                                                                                                                                                                                                                                              | ds-dropzone-ready                                                                    |
| dropZoneTargetClass | string                                                                                    | On dropZone that has elements from any successful target drop                                                                                                                                                                                                                                                                                                                  | ds-dropzone-target                                                                   |
| dropZoneInsideClass | string                                                                                    | On dropZone that has elements inside after any drop                                                                                                                                                                                                                                                                                                                            | ds-dropzone-inside                                                                   |
| dragAsBlock         | boolean                                                                                   | Whether to drag multiple elements as a single block or as individual items                                                                                                                                                                                                                                                                                                     | false                                                                                |

## Post-Initialization Setting-Updates

Any setting can be updated/added after initialization by using the `setSettings` method. Here is an example updating the `area` and the `selectables`:

```JavaScript
const ds = new DragSelect({})
ds.setSettings({
  selectables: document.getElementsByClassName('selectable-nodes'),
  area: document.getElementById('area')
})
```

# Event Callbacks

Read the [Events API docs](http://dragselect.com/docs/API/Events)

Event Callbacks are used like this:

```JavaScript
ds.subscribe('<event_name>', (callback_object) => {})
```

## Events

Read the [Events API docs](http://dragselect.com/docs/API/Events)

| event_name      | callback_object                                                  | description                                                                 |
| --------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| callback        | `{ items, event, isDragging, … }`                                | Fired after the selection (i.e. on mouse-up).                               |
| dragstart       | `{ items, event, isDragging, isDraggingKeyboard, … }`            | Fired when the selection starts (i.e. on mouse-down).                       |
| dragmove        | `{ items, event, isDragging, isDraggingKeyboard, … }`            | Fired when the mouse moves while dragging (i.e. on mouse-move).             |
| autoscroll      | `{ items, isDragging, scroll_directions, scroll_multiplier, … }` | Fired when the area is auto-scrolled (i.e. cursor on a corner of the area). |
| elementselect   | `{ items, item, … }`                                             | Fired when an element is added to the selection.                            |
| elementunselect | `{ items, item, … }`                                             | Fired when an element is removed from the selection.                        |

> Note: all your callbacks subscribers will run happen after the internal code ran. If you want to run something before everything else, use the `pre` prefix. I.e. `predragstart` is an event that runs before any internal start logic.

### Callback Object Keys

Read the [Callback Object docs](http://dragselect.com/docs/API/Events#callback-object)

| callback_object_keys | type                                                                                         | description                                                                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event                | `MouseEvent\|TouchEvent\|KeyboardEvent`                                                      | The native HTML Event, depending on the situational context                                                                                                                            |
| items                | `Array.<HTMLElement\|SVGElement\|*>`                                                         | Current selected elements                                                                                                                                                              |
| isDragging           | `boolean`                                                                                    | If true, the user is dragging the selected elements, if false the user is drawing a selection                                                                                          |
| isDraggingKeyboard   | `boolean`                                                                                    | If true, the user is dragging the selected elements with the keyboard                                                                                                                  |
| scroll_directions    | `Array.<'top'\|'bottom'\|'left'\|'right'\|undefined>`                                        | The direction in which the event is happening (i.e. scroll direction)                                                                                                                  |
| scroll_multiplier    | `number`                                                                                     | Speed                                                                                                                                                                                  |
| item                 | `HTMLElement\|SVGElement\|*`                                                                 | The single element currently being interacted with if any                                                                                                                              |
| dropTarget           | `{ id: 'id', element: node, droppables: [node], itemsDropped: [node], itemsInside: [node] }` | dropZone in which the droppable elements were dropped into. `itemsDropped`: all items that were dropped on the target. `itemsInside`: all items that are within the bounds of the zone |

> Note: all object keys are optional and might not be available, depending on the event type. So make sure to check for availability first

# Methods

Read the [Methods API docs](http://dragselect.com/docs/API/Methods)

| method                        | properties                                                                      | usage                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------- |
| stop                          | /                                                                               | Will teardown/stop the whole functionality                                                                                                                                                                                                                                                                                                                                                                                   |
| start                         | /                                                                               | Reset the functionality after a teardown                                                                                                                                                                                                                                                                                                                                                                                     |
| break                         | /                                                                               | Utility to override DragSelect internal functionality. Breaks out of current flow. Read [docs](#writing-a-fully-custom-solution) for more info.                                                                                                                                                                                                                                                                              |
| setSettings                   | `settings:Settings`                                                             | Update any setting dynamically, see [Settings](#constructor-properties-settings)                                                                                                                                                                                                                                                                                                                                             |
| getSelection                  | /                                                                               | Returns all currently selected nodes                                                                                                                                                                                                                                                                                                                                                                                         |
| addSelection                  | `elements:DOM Elements, triggerCallback:boolean, dontAddToSelectables:boolean`  | adds one or multiple elements to the selection. If boolean is set to true: callback will be called afterwards. Adds them to the selectables if they're not yet in the set (can be turned off by setting the last boolean to true)                                                                                                                                                                                            |
| removeSelection               | `elements:DOM Elements, triggerCallback:boolean, removeFromSelectables:boolean` | removes one or multiple elements to the selection. If boolean is set to true: callback will be called afterwards. If last boolean is set to true, it also removes them from the possible selectable nodes if they were.                                                                                                                                                                                                      |
| toggleSelection               | `elements:DOM Elements, triggerCallback:boolean, alsoSelectables:boolean`       | toggles one or multiple elements to the selection. If element is not in selection it will be added, if it is already selected, it will be removed. If boolean is set to true: callback will be called afterward. If last boolean is set to true, it also removes selected elements from possible selectable nodes & doesn’t add them to selectables if they are not (can be turned off by setting the last boolean to true). |
| setSelection                  | `elements:DOM Elements, triggerCallback:boolean, dontAddToSelectables:boolean`  | sets the selection to one or multiple elements. If boolean is set to true: callback will be called afterwards. Adds them to the selectables if they're not yet in the set (can be turned off by setting the last boolean to true)                                                                                                                                                                                            |
| clearSelection                | DOM elements [nodes], Boolean (callback)                                        | remove all elements from the selection. If boolean is set to true: callback will be called afterwards.                                                                                                                                                                                                                                                                                                                       |
| clearSelection                | `triggerCallback:boolean`                                                       | Unselect / Deselect all current selected Nodes                                                                                                                                                                                                                                                                                                                                                                               |
| addSelectables                | `elements:DOM Elements, addToSelection:boolean`                                 | Adds elements that can be selected. Don’t worry, nodes are never added twice. If boolean is set to true: elements will also be added to current selection.                                                                                                                                                                                                                                                                   |
| removeSelectables             | `elements:DOM Elements, removeFromSelection:boolean`                            | Remove elements from the set of elements that can be selected. If boolean is set to true: elements will also be removed from current selection.                                                                                                                                                                                                                                                                              |
| getSelectables                | /                                                                               | Returns array with all nodes that can be selected.                                                                                                                                                                                                                                                                                                                                                                           |
| getInitialCursorPosition      | /                                                                               | Returns the registered x, y coordinates the cursor had when first clicked                                                                                                                                                                                                                                                                                                                                                    |
| getCurrentCursorPosition      | /                                                                               | Returns current x, y coordinates of the cursor                                                                                                                                                                                                                                                                                                                                                                               |
| getPreviousCursorPosition     | /                                                                               | Returns last registered x, y coordinates of the cursor (after last callback)                                                                                                                                                                                                                                                                                                                                                 |
| getInitialCursorPositionArea  | /                                                                               | Returns the registered x, y coordinates relative to the area the cursor had when first clicked                                                                                                                                                                                                                                                                                                                               |
| getCurrentCursorPositionArea  | /                                                                               | Returns current x, y coordinates of the cursor relative to the area                                                                                                                                                                                                                                                                                                                                                          |
| getPreviousCursorPositionArea | /                                                                               | Returns last registered x, y coordinates of the cursor relative to the area (after last callback)                                                                                                                                                                                                                                                                                                                            |
| isMultiSelect                 | `event:KeyboardEvent                                                            | MouseEvent                                                                                                                                                                                                                                                                                                                                                                                                                   | TouchEvent` (optional) | Whether the multi-select key is currently pressed |
| isDragging                    | /                                                                               | Whether the user is currently drag n dropping elements (instead of selection)                                                                                                                                                                                                                                                                                                                                                |
| getZoneByCoordinates          | Optional `{x: number, y: number}`                                               | Returns the first drop target under the current mouse position, or, if provided at coordinates x/y                                                                                                                                                                                                                                                                                                                           |
| getItemsDroppedByZoneId       | `zoneId: string`                                                                | Returns the items dropped into a specific zone (by zone.id)                                                                                                                                                                                                                                                                                                                                                                  |
| getItemsInsideByZoneId        | `zoneId: string`,`addClasses: boolean`                                          | Returns the items that are visually inside a specific zone (by zone.id)                                                                                                                                                                                                                                                                                                                                                      |

# CSS Classes

Read the [CSS Classes API docs](http://dragselect.com/docs/API/CSS-Classes)

| name                     | trigger                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| .ds-selected             | On items that are selected                                                                                                                 |
| .ds-hover                | On items that are currently hovered                                                                                                        |
| .ds-selector             | On the selector element                                                                                                                    |
| .ds-selector-area        | The overlay where the selector resides in                                                                                                  |
| .ds-selectable           | On items that can be selected                                                                                                              |
| .ds-droppable            | on item that can be dropped into at least one zone                                                                                         |
| .ds-droppable-${id}      | on item that can be dropped into a zone with specific identifier, `${id}` will be replaced by the corresponding zone.id                    |
| .ds-dropped-target       | on an item corresponding the target dropzone                                                                                               |
| .ds-dropped-target-${id} | on an item corresponding the target dropzone with specific identifier, `${id}` will be replaced by the corresponding zone.id               |
| .ds-dropped-inside       | on an item that is within its dropzone bounds after a drop                                                                                 |
| .ds-dropped-inside-${id} | on an item that is within its dropzone bounds after a drop with specific identifier, `${id}` will be replaced by the corresponding zone.id |
| .ds-dropzone             | on each dropZone                                                                                                                           |
| .ds-dropzone-ready       | on corresponding dropZone when corresponding item is being dragged                                                                         |
| .ds-dropzone-target      | on dropZone when it was target of a successful drop                                                                                        |
| .ds-dropzone-inside      | on dropZone that has elements inside after any drop                                                                                        |

_note: you can change the class names setting the respective property on the constructor, see **[the docs](http://dragselect.com/docs/API/Settings)** properties section._

# Have Fun!

Creating and maintaining useful tools is a lot of work.
So don’t forget to give this repository a star if you find it useful.
Star this repo, tell all your friends and start contributing and/or [donating 1$](https://github.com/sponsors/ThibaultJanBeyer) to keep it running. Thank you :)

[![Typewriter Gif](https://dragselect.com/img/typewriter.gif)](https://thibaultjanbeyer.com/)

[http://dragselect.com/](http://dragselect.com/) | [documentation](http://dragselect.com/docs/intro)
