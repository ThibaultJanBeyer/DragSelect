<p align="center" style="text-align: center" >
  <a href="https://DragSelect.com/">
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="https://dragselect.com/media/dragselect-logo.png">
      <source media="(prefers-color-scheme: dark)" srcset="https://dragselect.com/media/dragselect-logo-alt.png">
      <img alt="The DragSelect logo: a selection symbol, a hand, a drop symbol and a mouse within a selection square." width="300" src="https://dragselect.com/media/dragselect-logo.png">
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
<a href="https://github.com/ThibaultJanBeyer/DragSelect/blob/master/package.json"><img alt="No Dependency" src="https://img.shields.io/badge/dependencies-none-informational"></a>
<a href="https://github.com/ThibaultJanBeyer/DragSelect/blob/master/CONTRIBUTING.md"><img alt="Contributors Welcome" src="https://img.shields.io/badge/contributors-welcome-blueviolet"></a>
<a href="https://github.com/sponsors/ThibaultJanBeyer"><img alt="Sponsors Welcome" src="https://img.shields.io/badge/sponsors-welcome-blueviolet"></a>
</p>

# DragSelect ![GitHub package.json version](https://img.shields.io/github/package-json/v/ThibaultJanBeyer/DragSelect.svg)
easily add a selection algorithm to your application/website.

# TOC

- [Project Page: Demo & Info](#project-page-demo--info)
- [Key-Features](#key-features)
- [Why?](#why)
- [Supporters](#supporters)
  - [Thanks to:](#thanks-to)
- [Installation](#installation)
  - [NPM](#npm)
  - [Yarn](#yarn)
  - [Global](#global)
  - [Bower (deprecated)](#bower-deprecated)
  - [That's it, you're ready to rock!](#thats-it-youre-ready-to-rock)
- [Usage](#usage)
  - [Simple](#simple)
  - [Within a scroll-able Area](#within-a-scroll-able-area)
  - [With DropZones](#with-dropzones)
  - [Extended](#extended)
  - [Mobile/Touch usage](#mobiletouch-usage)
  - [Accessibility (a11y)](#accessibility-a11y)
  - [Use your own Drag And Drop](#use-your-own-drag-and-drop)
    - [Using another plugin/tool (3rd party)](#using-another-plugintool-3rd-party)
      - [Example](#example)
    - [Writing a fully custom solution](#writing-a-fully-custom-solution)
      - [Example](#example-1)
- [Constructor Properties (Settings)](#constructor-properties-settings)
  - [Post-Initialization Setting-Updates](#post-initialization-setting-updates)
- [Event Callbacks](#event-callbacks)
  - [Events](#events)
    - [Callback Object Keys](#callback-object-keys)
- [Methods](#methods)
- [Classes](#classes)
- [Have Fun!](#have-fun)

# Project Page: Demo & Info

[https://dragselect.com/](https://dragselect.com/)

# Key-Features

- **No dependencies** [![No Dependency](https://img.shields.io/badge/dependencies-none-informational)](https://github.com/ThibaultJanBeyer/DragSelect/blob/master/package.json)
- Hyper customizable
- Replicates operating system drag-selection in the browser
- Accessibility (a11y)
- Add drag selection
- Use modifier keys to make multiple independent selections
- Select, Drag and Drop also via keyboard
- Choose which elements can be selected
- Supports all major browsers
- Selected elements can be dragged and dropped
- Lightweight, only ![gzip size](https://img.badgesize.io/https://dragselect.com/v2/ds.min.js?compression=gzip)
- Popular: ![npm downloads count](https://img.shields.io/npm/dt/dragselect.svg) on npm
- DragSelect was written with Performance in mind (can easily select >15.000 Elements)
- Supports SVG
- Supports mobile (touch interaction)
- Free & open source under MIT License
- Ease of use

![demo-gif](https://dragselect.com/media/dragselect.gif)

# Why?

Because apparently there was nothing that does not require jquery out there.  
This is better than https://jqueryui.com/selectable/ or https://jqueryui.com/draggable/ and has no dependencies.
We use it currently in a professional rich interface application where we have a file management system. The user can select files to organize them and change their metadata, with this plugin our users are able to select multiple files and perform batch/bulk-operations (applying changes to multiple files at once). We also started using it in production for a huge, graphical cloud hosting manager with a lot of active users. Users can select multiple servers, storages, etc. on an artboard to perform multi-operations, re-organize them, move them on the UI or batch-delete. We’re running it since January 18' it’s super helpful and very stable, let’s keep it that way. I can easily think of dozens other use-cases. I’m really keen to know how you use it in your projects, please let me know.

# Supporters

Please donate to support the countless hours of hard work & support. Especially if your company makes money, then there is no excuse. Thank you :)

If you're too poor or broke you can still support us with your time instead by [contributing to the code](https://github.com/ThibaultJanBeyer/DragSelect/blob/master/CONTRIBUTING.md)!

## Thanks to:  

| <a href="https://www.browserstack.com/"><img src="https://dragselect.com/media/browserstack.jpg" alt="Browserstack" width="150px"></a> | [You?](https://github.com/sponsors/ThibaultJanBeyer) |
|--- |--- |
|[BrowserStack](https://www.browserstack.com/) is a service for cross-browser testing. They support this open source projects by providing us with a [free account](https://www.browserstack.com/open-source)! | Thank and support us by making a [Direct Donation to DragSelect](https://www.blockchain.com/btc/address/1LdweSpjgSeJC8XxX3swrohBMBLUzg6cmC) (via Bitcoin: `1LdweSpjgSeJC8XxX3swrohBMBLUzg6cmC`). Or sponsor via [GitHub Sponsors](https://github.com/sponsors/ThibaultJanBeyer) or [Get in touch](mailto:thibault.beyer@gmail.com). 

All donations are distributed with all project contributors proportionally to their involvement. We are grateful for any amount:  
We have more than ![npm downloads count](https://img.shields.io/npm/dt/dragselect.svg), imagine how much we'd have if everyone would have had donated only 1$ 🤩 (unfortunately this did not happen)  

If you donate, we can display your logo here if you want, which will give you fame, fortune and help you recruit great talent and boosting your SEO. 

# Installation
## NPM
```console
npm install --save dragselect
```
## Yarn
```console
yarn add dragselect
```
## Global

Just [download the file](https://dragselect.com/v2/DragSelect.js) ([minified](https://dragselect.com/v2/ds.min.js)) and add it to your document:

```html
<script src="https://dragselect.com/v2/ds.min.js"></script>
```

> Note: if you are using `<script type=module` you can use the `DragSelect.es6m.js` or `ds.es6m.min.js` files as they include `export default DragSelect`

> We don't recommend the direct linking for production set-up since you'll not benefit from versioning. Please use `npm` if you can.
## Bower (deprecated)
```console
bower install --save dragselect
```

*Note: the Bower project is deprecated. Please use npm instead. If you have to use bower, you'll have to build the project after installing it via `npm run rollup`*

## That's it, you're ready to rock!  
Of course you can also just include the code within your code and bundle it to save a request.  

DragSelect supports `module.exports`, `AMD Modules` with `define`, `es6 modules` with `.es6m` versions and has a fallback to global namespace for maximum out of the box support.

# Usage
Now in your JavaScript you can simply pass elements to the function like so:

## Simple

The simplest possible usage.  
Choose which elements can be selected:

```javascript
new DragSelect({
  selectables: document.getElementsByClassName('selectable-nodes')
});
```

<p data-height="350" data-theme-id="0" data-slug-hash="prpwYG" data-default-tab="js,result" data-user="ThibaultJanBeyer" data-embed-version="2" data-pen-title="prpwYG" class="codepen">See the Pen <a href="https://codepen.io/ThibaultJanBeyer/pen/prpwYG/">prpwYG</a> on CodePen.</p>

## Within a scroll-able Area

Here the selection is constrained. You can only use the selection/drag inside of the area container:

```javascript
new DragSelect({
  selectables: document.getElementsByClassName('selectable-nodes'),
  area: document.getElementById('area')
});
```

<p data-height="350" data-theme-id="0" data-slug-hash="Nvobgq" data-default-tab="js,result" data-user="ThibaultJanBeyer" data-embed-version="2" data-pen-title="DragSelect with Scrollable AREA" class="codepen">See the Pen <a href="https://codepen.io/ThibaultJanBeyer/pen/Nvobgq/">DragSelect with Scrollable AREA</a> on CodePen.</p>

## With DropZones

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

<p data-height="350" data-theme-id="0" data-slug-hash="bGKgVxp" data-default-tab="js,result" data-user="ThibaultJanBeyer" data-embed-version="2" data-pen-title="DragSelect with DropZones" class="codepen">See the Pen <a href="https://codepen.io/ThibaultJanBeyer/pen/bGKgVxp">DragSelect with DropZones</a> on CodePen.</p>

## Extended

All options are optional. You could also just initiate the Dragselect by `new DragSelect({});` without any option.  
Find all possible properties and methods in **[the docs](https://dragselect.com/DragSelect.html)**  

```javascript
// if you add the function to a variable like this, you have access to all its functions
const ds = new DragSelect({
  // all settings are optional and can be added later
});

// this is how you add/update settings after initialization
ds.setSettings({
  // node/nodes that can be selected. By default will never add elements twice:
  selectables: document.querySelectorAll('.selectable-nodes'),
  // area in which you can drag. If not provided it will be the whole document & body/documentElement.
  area: document.getElementById('area'),
  // and many more, see "properties" section in the docs
})

// fired once the user releases the mouse. (items) = selected nodes:
ds.subscribe('callback', ({ items, event }) => {})
// returns all currently selected nodes:
ds.getSelection();
// Teardown/stop the whole functionality:
ds.stop();
// Reset the functionality after a teardown:
ds.start();

// and many more, see "methods" section in documentation
```  

> You can also use the "shift", "ctrl" or "command" key to make multiple independent selections.

## Mobile/Touch usage

Keep in mind that using DragSelect on a mobile/touch device will also turn off the default scroll behavior (on `click` + `drag` interaction).
In 99% of the use-cases, this is what you want. If DragSelect is only one part of a website, and you still want to be able to scroll the page on mobile, you can use an `area` [property](#constructor-properties). This way the default scroll behavior remains intact for the rest of the page.

## Accessibility (a11y)

**DragSelect is accessible by default**:  

> TLDR;  
> => Your `selectables` should be buttons: `<button type="button"></button>`.  
> => <kbd>ArrowKeys</kbd> are used for keyboard dragging.  

Obviously, keyboard users won’t get the full visual experience but it works similarly to the OS default behavior.  

1. Selection: You can select items using the default select keys (usually space or enter) and also multi-select when using a modifier key at the same time. There is one little thing you have to do tho’: the `selectables` have to be pressable (clickable)! To achieve this, they should be of type `<button type="button"></button>`.  

2. Drag: You can drag elements using the keyboard arrow keys, this will also scroll the area by default. You can press <kbd>Shift</kbd> in combination with an arrow i.e. <kbd>Shift</kbd>+<kbd>ArrowRight</kbd> to move the element 4x faster to the right and also not scroll the area

<p data-height="350" data-theme-id="0" data-slug-hash="prpwYG" data-default-tab="html,result" data-user="ThibaultJanBeyer" data-embed-version="2" data-pen-title="DragSelect" class="codepen">See the Pen <a href="https://codepen.io/ThibaultJanBeyer/pen/prpwYG/">DragSelect</a> on CodePen.</p>

## Use your own Drag And Drop

### Using another plugin/tool (3rd party)

DragSelect comes with a build-in dragNdrop. Before, `.break` was used for this. But with v2, using your own is now very simple: listen to any DragSelect event to `.stop` it. Then, re-`.start` it after your custom dragNdrop was performed. Check for `isDragging`, which indicates when the users drags (moving the element) and `isDraggingKeyboard` for the keyboard drag events. I.e. use `predragstart`.

#### Example

```JavaScript
const ds = new DragSelect({ 
  keyboardDragSpeed: 0, 
  // keyboardDrag: false, // if your library can not handle keyboard dragging
  /* …other settings… */
})
const myCustomDrag = new MyCustomDrag({/* …your settings… */})

ds.subscribe('predragstart', ({ isDragging, isDraggingKeyboard }) =>
  isDragging && ds.stop(false, false))
myCustomDrag.subscribe('finished', () => ds.start())
```

Disabling then re-enabling directly can also work (i.e. when your library has no callback):

```JavaScript
ds.subscribe('predragstart', ({ isDragging, isDraggingKeyboard }) => {
   if(isDragging) {
     ds.stop(false, false)
     setTimeout(ds.start)
   }
})
```

Note: it is important to debounce (i.e. with `setTimeout(ds.start)`) the start function if it's called within a single subscriber so that all the scheduled callbacks finish triggering before we start again.

### Writing a fully custom solution

In case you want to build something completely custom on top of DragSelect, we got you covered! You can use `.break` for this. You heard right, break is back baby :)  

This utility to override DragSelects internal functionality allows you to write it all yourself: You can write your own drag and drop but you can also write your own selection:  

#### Example

> /!\ only use break when you know what you're doing. Support is limited /!\

```JavaScript
ds.subscribe('predragmove', ({ isDragging, isDraggingKeyboard }) => {
  if(isDragging || isDraggingKeyboard) {
    ds.break()
    /* your custom logic for drag handling here. */
  } else {
    ds.break()
    /* your custom logic for selection handling here. */
  }
}
```

# Constructor Properties (Settings)

*DragSelect is hyper customizable*. Note, all properties are optional. See **[the docs](https://dragselect.com/DragSelect.html)** for more info.  

Moreover any setting can also be updated or added after the initialization, see [post-initialization setting updates](#post-initialization-setting-updates).

Here is the full list:  

| property | type | usage | default |
|--- |--- |--- |--- |
|area |single DOM element (node) |The square in which you are able to select |`document`
|selectables |DOM elements [nodes] |The elements that can be selected |`[]`
|autoScrollSpeed |number |The speed in which the area scrolls while selecting (if available). The unit is arbitrary (interval aims for 30fps). Set to `0.0001` to disable auto-scrolling. |`5`
|overflowTolerance |{ x:number, y:number } |Tolerance for autoScroll (how close one has to be near an edges for autoScroll to start) |`{x:25,y:25}`
|zoom |number |Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom. |`1`
|customStyles |boolean |If true, no styles will be automatically applied to the selector element (except position: absolute). |`false`
|multiSelectMode |boolean |Add newly selected elements to the selection instead of replacing them. |`false`
|multiSelectToggling |boolean |Whether or not to toggle already active elements while multi-selecting. |`true` (MacOS selection behavior)
|multiSelectKeys |array |Keys that allows switching to the multi-select mode (see the multiSelectMode option). Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). Note that the best support is given for <kbd>Control</kbd>, <kbd>Shift</kbd> and <kbd>Meta</kbd>. Provide an empty array `[]` if you want to turn off the functionality. |`['Control', 'Shift', 'Meta']`
|selector |single DOM element (node) |The square that will be used to draw the selection. | Auto-created HTML Element
|selectionThreshold |number |How much % of the element has to be selected to be considered selected (0 = just touching, 1 = fully inside the selection) |`0`
|draggability |boolean |When a user is dragging on an already selected element, the selection is dragged. |`true`
|immediateDrag |boolean |Whether a selectable element is draggable before being selected or needs to be selected first |`true`
|keyboardDrag |boolean |Whether or not the user can drag with the keyboard (Accessibility). |`true`
|dragKeys |{ up:string[], down:string[], left:string[], righ:string[] } |The keys available to drag element using the keyboard. Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). |`{ up:['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], righ: ['ArrowRight'] }`
|keyboardDragSpeed |number |The speed at which elements are dragged using the keyboard. In pixels per keyDown. |`10`
|useTransform |boolean |Whether to use the more performant hardware accelerated css transforms when dragging instead of the top/left positions. |`true`
|refreshMemoryRate |number |Refresh rate on memoization, higher numbers mean better performance but more lag if elements are moving, lower numbers mean less lag but worse performance. If none of your DOMNodes are moving, you can set it to a very high number to increase performance. Value in milliseconds. |`80`
|dropZones |[{ id: 'string', element: single DOM element (node), droppables?: DOM elements [nodes] }] |zones with association of droppable items that can be dropped into them. `id`: any unique identifying string. `element`: is the dropzone itself. `droppables`: the elements that can be dropped into that zone. This is optional, by default it is all selectables |`[]`
|dropInsideThreshold |number |How much % of the item has to be inside the dropzone to be considered inside (0 = barely touching, 1 = completely inside) |`1`
|dropTargetThreshold |number |How much % of the zone does the pointer has to be in to be considered a target (0 = anywhere in the zone, max: 0.5 = has to point at the center of the zone) |`0`
|usePointerEvents |boolean |Whether to use Pointer Events to replace traditional Mouse or Touch Events. Useful for tools like Google Blockly. |`false`
|selectedClass |string |The class name assigned to the selected items. |[see classes](#classes)
|hoverClass |string |The class name assigned to the mouse hovered items. |[see classes](#classes)
|selectorClass |string |The class name assigned to the square selector helper. |[see classes](#classes)
|selectableClass |string |The class name assigned to the elements that can be selected. |[see classes](#classes)
|selectorClass |string |The class assigned to the square selector helper |ds-selector
|selectorAreaClass |string |The class assigned to the square in which the selector resides. By default it's invisible |ds-selector-area
|droppedTargetClass |string |On an item corresponding the target dropzone. This is also the prefix for ds-dropped-target-${zone.id}. |ds-dropped-target & ds-dropped-target-${zone.id}
|droppedInsideClass |string |On an item that is within its dropzone bounds after a drop. This is also the prefix for ds-dropped-inside-${zone.id} |ds-dropped-inside & ds-dropped-inside-${zone.id}
|droppableClass |string |On element that can be dropped into at least one container. This is also the prefix for ds-droppable-${zone.id} |ds-droppable & ds-droppable-${zone.id}
|dropZoneClass |string |On each dropZone |ds-dropzone
|dropZoneReadyClass |string |On corresponding dropZone when element is dragged |ds-dropzone-ready
|dropZoneTargetClass |string |On dropZone that has elements from any successful target drop |ds-dropzone-target
|dropZoneInsideClass |string |On dropZone that has elements inside after any drop |ds-dropzone-inside

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

Event Callbacks are used like this:

```JavaScript
ds.subscribe('<event_name>', (callback_object) => {})
```

## Events

|event_name |callback_object |description |
|--- |--- |---
|callback |`{ items, event, isDragging, … }` |Fired after the selection (i.e. on mouse-up). 
|dragstart |`{ items, event, isDragging, isDraggingKeyboard, … }` |Fired when the selection starts (i.e. on mouse-down). 
|dragmove |`{ items, event, isDragging, isDraggingKeyboard, … }` |Fired when the mouse moves while dragging (i.e. on mouse-move).
|autoscroll |`{ items, isDragging, scroll_directions, scroll_multiplier, … }` |Fired when the area is auto-scrolled (i.e. cursor on a corner of the area).
|elementselect |`{ items, item, … }` |Fired when an element is added to the selection.
|elementunselect |`{ items, item, … }` |Fired when an element is removed from the selection.

> Note: all your callbacks subscribers will run happen after the internal code ran. If you want to run something before everything else, use the `pre` prefix. I.e. `predragstart` is an event that runs before any internal start logic.

### Callback Object Keys

|callback_object_keys |type |description |
|--- |--- |---
|event |`MouseEvent\|TouchEvent\|KeyboardEvent` |The native HTML Event, depending on the situational context
|items |`Array.<HTMLElement\|SVGElement\|*>` |Current selected elements
|isDragging |`boolean` |If true, the user is dragging the selected elements, if false the user is drawing a selection
|isDraggingKeyboard |`boolean` |If true, the user is dragging the selected elements with the keyboard
|scroll_directions |`Array.<'top'\|'bottom'\|'left'\|'right'\|undefined>` |The direction in which the event is happening (i.e. scroll direction)
|scroll_multiplier |`number` |Speed
|item |`HTMLElement\|SVGElement\|*` |The single element currently being interacted with if any
|dropTarget |`{ id: 'id', element: node, droppables: [node], itemsDropped: [node], itemsInside: [node] }` |dropZone in which the droppable elements were dropped into. `itemsDropped`: all items that were dropped on the target. `itemsInside`: all items that are within the bounds of the zone |

> Note: all object keys are optional and might not be available, depending on the event type. So make sure to check for availability first

# Methods
When the function is saved into a variable `var foo = new DragSelect()` you have access to all its inner functions.  
Also check **[the docs](https://dragselect.com/DragSelect.html)** for more info.

| method | properties | usage |
|--- |--- |--- |
|stop |/ |Will teardown/stop the whole functionality
|start |/ |Reset the functionality after a teardown
|break |/ |Utility to override DragSelect internal functionality. Breaks out of current flow. Read [docs](#writing-a-fully-custom-solution) for more info.
|setSettings |`settings:Settings` |Update any setting dynamically, see [Settings](#constructor-properties-settings)
|getSelection |/ |Returns all currently selected nodes 
|addSelection |`elements:DOM Elements, triggerCallback:boolean, dontAddToSelectables:boolean` |adds one or multiple elements to the selection. If boolean is set to true: callback will be called afterwards. Adds them to the selectables if they're not yet in the set (can be turned off by setting the last boolean to true) 
|removeSelection |`elements:DOM Elements, triggerCallback:boolean, removeFromSelectables:boolean`|removes one or multiple elements to the selection. If boolean is set to true: callback will be called afterwards. If last boolean is set to true, it also removes them from the possible selectable nodes if they were. 
|toggleSelection |`elements:DOM Elements, triggerCallback:boolean, alsoSelectables:boolean` |toggles one or multiple elements to the selection. If element is not in selection it will be added, if it is already selected, it will be removed. If boolean is set to true: callback will be called afterward. If last boolean is set to true, it also removes selected elements from possible selectable nodes & doesn’t add them to selectables if they are not (can be turned off by setting the last boolean to true).
|setSelection |`elements:DOM Elements, triggerCallback:boolean, dontAddToSelectables:boolean` |sets the selection to one or multiple elements. If boolean is set to true: callback will be called afterwards. Adds them to the selectables if they're not yet in the set (can be turned off by setting the last boolean to true)
|clearSelection |DOM elements [nodes], Boolean (callback) |remove all elements from the selection. If boolean is set to true: callback will be called afterwards. |
|clearSelection |`triggerCallback:boolean` |Unselect / Deselect all current selected Nodes |
|addSelectables |`elements:DOM Elements, addToSelection:boolean` |Adds elements that can be selected. Don’t worry, nodes are never added twice. If boolean is set to true: elements will also be added to current selection.
|removeSelectables |`elements:DOM Elements, removeFromSelection:boolean` |Remove elements from the set of elements that can be selected. If boolean is set to true: elements will also be removed from current selection.
|getSelectables |/ |Returns array with all nodes that can be selected.
|getInitialCursorPosition |/ |Returns the registered x, y coordinates the cursor had when first clicked 
|getCurrentCursorPosition |/ |Returns current x, y coordinates of the cursor 
|getPreviousCursorPosition |/ |Returns last registered x, y coordinates of the cursor (after last callback) 
|getInitialCursorPositionArea |/ |Returns the registered x, y coordinates relative to the area the cursor had when first clicked 
|getCurrentCursorPositionArea |/ |Returns current x, y coordinates of the cursor relative to the area
|getPreviousCursorPositionArea |/ |Returns last registered x, y coordinates of the cursor relative to the area (after last callback) 
|isMultiSelect |`event:KeyboardEvent|MouseEvent|TouchEvent` (optional) |Whether the multi-select key is currently pressed
|isDragging |/ |Whether the user is currently drag n dropping elements (instead of selection)
|getZoneByCoordinates |Optional `{x: number, y: number}` |Returns the first drop target under the current mouse position, or, if provided at coordinates x/y
|getItemsDroppedByZoneId |`zoneId: string` |Returns the items dropped into a specific zone (by zone.id)
|getItemsInsideByZoneId |`zoneId: string`,`addClasses: boolean` |Returns the items that are visually inside a specific zone (by zone.id)

# Classes
| name | trigger |
|--- |--- |
|.ds-selected |On items that are selected
|.ds-hover |On items that are currently hovered
|.ds-selector |On the selector element
|.ds-selector-area |The overlay where the selector resides in
|.ds-selectable |On items that can be selected
|.ds-droppable |on item that can be dropped into at least one zone |
|.ds-droppable-${id} |on item that can be dropped into a zone with specific identifier, `${id}` will be replaced by the corresponding zone.id|
|.ds-dropped-target |on an item corresponding the target dropzone |
|.ds-dropped-target-${id} |on an item corresponding the target dropzone with specific identifier, `${id}` will be replaced by the corresponding zone.id |
|.ds-dropped-inside |on an item that is within its dropzone bounds after a drop |
|.ds-dropped-inside-${id} |on an item that is within its dropzone bounds after a drop with specific identifier, `${id}` will be replaced by the corresponding zone.id |
|.ds-dropzone |on each dropZone |
|.ds-dropzone-ready |on corresponding dropZone when corresponding item is being dragged |
|.ds-dropzone-target |on dropZone when it was target of a successful drop |
|.ds-dropzone-inside |on dropZone that has elements inside after any drop |

*note: you can change the class names setting the respective property on the constructor, see **[the docs](https://dragselect.com/DragSelect.html)** properties section.*

# Have Fun!

Creating and maintaining useful tools is a lot of work. 
So don’t forget to give this repository a star if you find it useful.
Star this repo, tell all your friends and start contributing and/or [donating 1$](https://github.com/sponsors/ThibaultJanBeyer) to keep it running. Thank you :)

[![Typewriter Gif](https://dragselect.com/media/typewriter.gif)](https://thibaultjanbeyer.com/)


<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<br>
<br>
<br>

[documentation](https://dragselect.com/DragSelect.html)
