```
    ____                   _____      __          __ 
   / __ \_________ _____ _/ ___/___  / /__  _____/ /_
  / / / / ___/ __ `/ __ `/\__ \/ _ \/ / _ \/ ___/ __/
 / /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_  
/_____/_/   \__,_/\__, //____/\___/_/\___/\___/\__/  
                 /____/                              
```

[GitHub](https://github.com/ThibaultJanBeyer/DragSelect/) | [NPM](https://www.npmjs.com/package/dragselect) | [Project-Page](https://dragselect.com/)  

[![Build Status](https://travis-ci.com/ThibaultJanBeyer/DragSelect.svg?branch=master)](https://travis-ci.com/ThibaultJanBeyer/DragSelect) ![gzip size](https://img.badgesize.io/https://dragselect.com/v2/ds.min.js?compression=gzip) ![npm downloads count](https://img.shields.io/npm/dt/dragselect.svg) [![No Dependency](https://david-dm.org/ThibaultJanBeyer/DragSelect.svg)](https://david-dm.org/ThibaultJanBeyer/DragSelect)

# DragSelect ![GitHub package.json version](https://img.shields.io/github/package-json/v/ThibaultJanBeyer/DragSelect.svg)
easily add a selection algorithm to your application/website.

# TOC

- [Project Page: Demo & Info](#project-page-demo--info)
- [Key-Features](#key-features)
- [Why?](#why)
- [Supporters](#supporters)
- [Installation](#installation)
- [Usage](#usage)
- - [Simple](#simple)
- - [Within a scroll-able Area](#within-a-scroll-able-area)
- - [Extended](#extended)
- - [Mobile/Touch usage](#mobile/touch-usage)
- - [Accessibility (a11y)](#accessibility-a11y)
- - [Use your own Drag And Drop](#use-your-own-drag-and-drop)
- [Constructor Properties](#constructor-properties)
- [Event Callbacks](#event-callbacks)
- [Methods](#methods)
- [Classes](#classes)

# Project Page: Demo & Info

[https://dragselect.com/](https://dragselect.com/)

# Key-Features

- **No dependencies** [![No Dependency](https://david-dm.org/ThibaultJanBeyer/DragSelect.svg)](https://david-dm.org/ThibaultJanBeyer/DragSelect)
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

Thanks to:  

| ![BrowserStack](https://dragselect.com/media/browserstack.jpg) | [You?](https://paypal.me/pools/c/8gF2a5szCP) |
|--- |--- |
|[BrowserStack](https://www.browserstack.com/) is an amazing testing service which helps testing the tool on various browsers. They support this open source projects by providing a [free account for open source projects](https://www.browserstack.com/open-source) to use their service! | Thank and support us by making a [Direct Donation](https://paypal.me/pools/c/8gF2a5szCP) (Donations are distributed with all project contributors proportionally. We are grateful for any amount) or [Get in touch](mailto:thibault.beyer@gmail.com) |

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

## Extended

All options are optional. You could also just initiate the Dragselect by `new DragSelect({});` without any option.  
Find all possible properties and methods in **[the docs](https://dragselect.com/DragSelect.html)**  

```javascript
const ds = new DragSelect({
  // node/nodes that can be selected.
  // This is also optional, you could just add them later with .addSelectables().
  selectables: document.querySelectorAll('.selectable-nodes'),
  // area in which you can drag. If not provided it will be the whole document & body/documentElement.
  area: document.getElementById('area'),
  // and many more, see "properties" section in the docs
});

// if you add the function to a variable like we did, you have access to all its functions:

// fired once the user releases the mouse. (items) = selected nodes:
ds.subscribe('callback', ({ items, event }) => {})

// returns all currently selected nodes:
ds.getSelection();

// adds elements that can be selected. Won't add elements twice:
ds.addSelectables(document.getElementsByClassName('selectable-node'));

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
ds.subscribe('dragstart', ({ isDragging, isDraggingKeyboard }) => {
   if(isDragging) {
     ds.stop(false, false)
     ds.start()
   }
})
```

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

# Constructor Properties:

*DragSelect is hyper customizable*. Note, all properties are optional. See **[the docs](https://dragselect.com/DragSelect.html)** for more info. Here is the full list:  

| property | type | usage | default |
|--- |--- |--- |--- |
|area |single DOM element (node) |The square in which you are able to select |document
|selectables |DOM elements (nodes) |The elements that can be selected | []
|autoScrollSpeed |number |The speed in which the area scrolls while selecting (if available). The unit is arbitrary (interval aims for 30fps). Set to `0.0001` to disable auto-scrolling. |`5`
|overflowTolerance |{ x:number, y:number } |Tolerance for autoScroll (how close one has to be near an edges for autoScroll to start) |`{x:25,y:25}`
|zoom |number |Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom. |`1`
|customStyles |boolean |If true, no styles will be automatically applied to the selector element (except position: absolute). |`false`
|multiSelectMode |boolean |Add newly selected elements to the selection instead of replacing them. |`false`
|multiSelectToggling |boolean |Whether or not to toggle already active elements while multi-selecting. |`true` (MacOS selection behavior)
|multiSelectKeys |array |Keys that allows switching to the multi-select mode (see the multiSelectMode option). Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). Note that the best support is given for <kbd>Control</kbd>, <kbd>Shift</kbd> and <kbd>Meta</kbd>. Provide an empty array `[]` if you want to turn off the functionality. |`['Control', 'Shift', 'Meta']`
|selector |single DOM element (node) |The square that will be used to draw the selection. | Auto-created HTML Element
|draggability |boolean |When a user is dragging on an already selected element, the selection is dragged. |`true`
|immediateDrag |boolean |Whether a selectable element is draggable before being selected or needs to be selected first |`true`
|keyboardDrag |boolean |Whether or not the user can drag with the keyboard (Accessibility). |`true`
|dragKeys |{ up:string[], down:string[], left:string[], righ:string[] } |The keys available to drag element using the keyboard. Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). |`{ up:['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], righ: ['ArrowRight'] }`
|keyboardDragSpeed |number |The speed at which elements are dragged using the keyboard. In pixels per keyDown. |`10`
|useTransform |boolean |Whether to use the more performant hardware accelerated css transforms when dragging instead of the top/left positions. |`true`
|selectedClass |string |The class name assigned to the selected items. |[see classes](#classes)
|hoverClass |string |The class name assigned to the mouse hovered items. |[see classes](#classes)
|selectorClass |string |The class name assigned to the square selector helper. |[see classes](#classes)
|selectableClass |string |The class name assigned to the elements that can be selected. |[see classes](#classes)

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
|event |`MouseEvent|TouchEvent|KeyboardEvent` |The native HTML Event, depending on the situational context
|items |`Array.<HTMLElement|SVGElement|*>` |Current selected elements
|isDragging |`boolean` |If true, the user is dragging the selected elements, if false the user is drawing a selection
|isDraggingKeyboard |`boolean` |If true, the user is dragging the selected elements with the keyboard
|scroll_directions |`Array.<'top'|'bottom'|'left'|'right'|undefined>` |The direction in which the event is happening (i.e. scroll direction)
|scroll_multiplier |`number` |Speed
|item |`HTMLElement|SVGElement|*` |The single element currently being interacted with if any

> Note: all object keys are optional and might not be available, depending on the event type. So make sure to check for availability first

# Methods:
When the function is saved into a variable `var foo = new DragSelect()` you have access to all its inner functions.  
Also check **[the docs](https://dragselect.com/DragSelect.html)** for more info.

| method | properties | usage |
|--- |--- |--- |
|stop |/ |Will teardown/stop the whole functionality
|start |/ |Reset the functionality after a teardown
|getSelection |/ |Returns all currently selected nodes 
|addSelection |DOM elements (nodes), Boolean (callback), Boolean (dontAddToSelectables) |adds one or multiple elements to the selection. If boolean is set to true: callback will be called afterwards. Adds them to the selectables if they're not yet in the set (can be turned off by setting the last boolean to true) 
|removeSelection |DOM elements (nodes), Boolean (callback), Boolean (removeFromSelectables) |removes one or multiple elements to the selection. If boolean is set to true: callback will be called afterwards. If last boolean is set to true, it also removes them from the possible selectable nodes if they were. 
|toggleSelection |DOM elements (nodes), Boolean (callback), Boolean (alsoSelectables) |toggles one or multiple elements to the selection. If element is not in selection it will be added, if it is already selected, it will be removed. If boolean is set to true: callback will be called afterward. If last boolean is set to true, it also removes selected elements from possible selectable nodes & doesn’t add them to selectables if they are not (can be turned off by setting the last boolean to true).
|setSelection |DOM elements (nodes), Boolean (callback), Boolean (dontAddToSelectables) |sets the selection to one or multiple elements. If boolean is set to true: callback will be called afterwards. Adds them to the selectables if they're not yet in the set (can be turned off by setting the last boolean to true)
|clearSelection |DOM elements (nodes), Boolean (callback) |remove all elements from the selection. If boolean is set to true: callback will be called afterwards. |
|addSelectables |DOM elements (nodes), Boolean (addToSelection) |Adds elements that can be selected. Don’t worry, nodes are never added twice. If boolean is set to true: elements will also be added to current selection.
|removeSelectables |DOM elements (nodes), Boolean (removeFromSelection) |Remove elements from the set of elements that can be selected. If boolean is set to true: elements will also be removed from current selection.
|getSelectables |/ |Returns array with all nodes that can be selected.
|setSelectables |DOM elements (nodes), Boolean (removeFromSelection), Boolean (addToSelection) |Sets all elements that can be selected. Removes all current selectables (& their respective applied classes). Adds the new set to the selectables set. Thus, replacing the original set. First boolean if old elements should be removed from the selection. Second boolean if new elements should be added to the selection. 
|getInitialCursorPosition |/ |Returns the registered x, y coordinates the cursor had when first clicked 
|getCurrentCursorPosition |/ |Returns current x, y coordinates of the cursor 
|getPreviousCursorPosition |/ |Returns last registered x, y coordinates of the cursor (after last callback) 
|getInitialCursorPositionArea |/ |Returns the registered x, y coordinates relative to the area the cursor had when first clicked 
|getCurrentCursorPositionArea |/ |Returns current x, y coordinates of the cursor relative to the area
|getPreviousCursorPositionArea |/ |Returns last registered x, y coordinates of the cursor relative to the area (after last callback) 
|getCursorPositionDifference |Boolean (usePreviousCursorDifference) |Returns object with the x, y difference between the initial and the last cursor position. If the argument is set to true, it will instead return the x, y difference to the previous coordinates |
|isMultiSelect |\[event:KeyboardEvent|MouseEvent|TouchEvent\] (optional) |Whether the multi-select key is currently pressed
|isDragging |/ |Whether the user is currently drag n dropping elements (instead of selection)
|break |/ |Utility to override DragSelect internal functionality. Read [docs](#writing-a-fully-custom-solution) for more info.

# Classes
| name | trigger |
|--- |--- |
|.ds-selected |On elements that are selected
|.ds-hover |On elements that are currently hovered
|.ds-selector |On the selector element
|.ds-selector-area |The overlay where the selector resides in
|.ds-selectable |On elements that can be selected

*note: you can change the class names setting the respective property on the constructor, see **[the docs](https://dragselect.com/DragSelect.html)** properties section.*

# Have Fun!

Creating and maintaining useful tools is a lot of work. 
So don’t forget to give this repository a star if you find it useful.
Star this repo, tell all your friends and start contributing and/or [donating 1$](https://paypal.me/pools/c/8gF2a5szCP) to keep it running. Thank you :)

[![Typewriter Gif](https://dragselect.com/media/typewriter.gif)](https://thibaultjanbeyer.com/)


<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<br>
<br>
<br>

[documentation](https://dragselect.com/DragSelect.html)
