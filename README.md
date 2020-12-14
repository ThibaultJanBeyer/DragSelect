```
    ____                   _____      __          __ 
   / __ \_________ _____ _/ ___/___  / /__  _____/ /_
  / / / / ___/ __ `/ __ `/\__ \/ _ \/ / _ \/ ___/ __/
 / /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_  
/_____/_/   \__,_/\__, //____/\___/_/\___/\___/\__/  
                 /____/                              
```

[GitHub](https://github.com/ThibaultJanBeyer/DragSelect/) | [NPM](https://www.npmjs.com/package/dragselect) | [Project-Page](https://thibaultjanbeyer.github.io/DragSelect/)  

[![Build Status](https://travis-ci.com/ThibaultJanBeyer/DragSelect.svg?branch=master)](https://travis-ci.com/ThibaultJanBeyer/DragSelect) ![gzip size](http://img.badgesize.io/https://thibaultjanbeyer.github.io/DragSelect/ds.min.js?compression=gzip) ![npm downloads count](https://img.shields.io/npm/dt/dragselect.svg) [![No Dependency](https://david-dm.org/ThibaultJanBeyer/DragSelect.svg)](https://david-dm.org/ThibaultJanBeyer/DragSelect)

# DragSelect ![GitHub package.json version](https://img.shields.io/github/package-json/v/ThibaultJanBeyer/DragSelect.svg)
easily add a selection algorithm to your application/website.

# TOC

- [Project Page: Demo & Info](#project-page-demo--info)
- [Key-Features](#key-features)
- [Why?](#why)
- [Supporters](#supporters)
- [Installation](#installation)
- [Usage](#usage)
- [Constructor Properties](#constructor-properties)
- [Callbacks](#callbacks)
- [Methods](#methods)
- [Classes](#classes)

# Project Page: Demo & Info

[https://thibaultjanbeyer.github.io/DragSelect/](https://thibaultjanbeyer.github.io/DragSelect/)

# Key-Features

- **No dependencies** [![No Dependency](https://david-dm.org/ThibaultJanBeyer/DragSelect.svg)](https://david-dm.org/ThibaultJanBeyer/DragSelect)
- Replicates operating system drag-selection in the browser
- Accessibility (a11y)
- Add drag selection
- Use modifier keys to make multiple independent selections
- Choose which elements can be selected
- Selected elements can be dragged and dropped
- Great browser support, works even like a charm on IE10
- Lightweight, only ![gzip size](http://img.badgesize.io/https://thibaultjanbeyer.github.io/DragSelect/ds.min.js?compression=gzip)
- Popular: ![npm downloads count](https://img.shields.io/npm/dt/dragselect.svg) on npm
- DragSelect was written with Performance in mind (can easily select >15.000 Elements)
- Supports SVG
- Supports mobile (touch interaction)
- Free & open source under MIT License
- Ease of use

![demo-gif](https://thibaultjanbeyer.github.io/DragSelect/media/dragselect.gif)

# Why?

Because apparently there is nothing that does not require jquery out there yet.  
This is better than https://jqueryui.com/selectable/ and has no dependencies.
We use it currently in a professional rich interface application where we have a file management system. The user can select files to organize them and change their metadata, with this plugin our users are able to select multiple files and perform batch/bulk-operations (applying changes to multiple files at once). We also started using it in production for a huge, graphical cloud hosting manager with a lot of active users. Users can select multiple servers, storages, etc. on an artboard to perform multi-operations, re-organize them or batch-delete. We’re running it since January 18' it’s super helpful and very stable, let’s keep it that way. I can easily think of dozens other possibilites this can be used for. I’m really keen to know how you use it in your projects, please let me know.

# Supporters

Thanks to:  

| ![BrowserStack](https://thibaultjanbeyer.github.io/DragSelect/media/browserstack.jpg) | [You?](https://paypal.me/pools/c/8gF2a5szCP) |
|--- |--- |
|[BrowserStack](https://www.browserstack.com/) is an amazing testing service which helps testing the tool on various browsers. They support this open source projects by providing a [free account for open source projects](https://www.browserstack.com/open-source) to use their service! | Thank and support us by making a [Direct Donation](https://paypal.me/pools/c/8gF2a5szCP) (Donations are distributed with all project contributors proportionally. We are grateful for any amount) or [Get in touch](mailto:thibault.beyer@gmail.com) |
# Installation
## global

Just [download the file](https://github.com/ThibaultJanBeyer/DragSelect/blob/master/docs/DragSelect.js) ([minified](https://github.com/ThibaultJanBeyer/DragSelect/blob/master/docs/ds.min.js)) and add it to your document:

```html
<script src="https://thibaultjanbeyer.github.io/DragSelect/ds.min.js"></script>
```

> Note: if you are using `<script type=module` you can use the `DragSelect.es6m.js` or `ds.es6m.min.js` files as they include `export default DragSelect`

> We don't recommend the direct linking for production set-up since you'll not benefit from versioning. Please use `npm` or `bower` if you can.

## npm
```console
npm install --save dragselect
```

## bower
```console
bower install --save dragselect
```

That's it, you're ready to rock!  
Of course you can also just include the code within your code to save a request.  

DragSelect supports `module.exports`, `AMD Modules` with `define` and has a fallback to global namespace for maximum out of the box support.

# Usage

Now in your JavaScript you can simply pass elements to the function like so:

## simple

The simplest possible usage.  
Choose which elements can be selected:

```javascript
new DragSelect({
  selectables: document.getElementsByClassName('selectable-nodes')
});
```

<p data-height="265" data-theme-id="0" data-slug-hash="prpwYG" data-default-tab="js,result" data-user="ThibaultJanBeyer" data-embed-version="2" data-pen-title="prpwYG" class="codepen">See the Pen <a href="https://codepen.io/ThibaultJanBeyer/pen/prpwYG/">prpwYG</a> on CodePen.</p>

## Within a scroll-able Area

Here the selection is constrained. You can only use the selection inside of the container with the red border:

<p data-height="265" data-theme-id="0" data-slug-hash="Nvobgq" data-default-tab="js,result" data-user="ThibaultJanBeyer" data-embed-version="2" data-pen-title="DragSelect with Scrollable AREA" class="codepen">See the Pen <a href="https://codepen.io/ThibaultJanBeyer/pen/Nvobgq/">DragSelect with Scrollable AREA</a> on CodePen.</p>

## extended

All options are optional. You could also just initiate the Dragselect by `new DragSelect({});` without any option.  
Find all possible properties and methods in **[the docs](https://thibaultjanbeyer.github.io/DragSelect/DragSelect.html)**  

```javascript
const ds = new DragSelect({
  // node/nodes that can be selected.
  // This is also optional, you could just add them later with .addSelectables().
  selectables: document.querySelectorAll('.selectable-nodes'),
  // area in which you can drag. If not provided it will be the whole document & body/documentElement.
  area: document.getElementById('area'),
  // and many more, see "properties" section in the docs
});

// fired once the user releases the mouse. (items) = selected nodes.
ds.subscribe('callback', ({ items, event }) => {})

// if you add the function to a variable like we did, you have access to all its functions:
ds.getSelection(); // returns all currently selected nodes

// adds elements that can be selected. Won't add elements twice.
ds.addSelectables(document.getElementsByClassName('selectable-node'));

ds.stop(); // will teardown/stop the whole functionality
ds.start(); // reset the functionality after a teardown

// and many more, see "methods" section in documentation
```  

*You can also use the "shift", "ctrl" or "command" key to make multiple independent selections.*

## Mobile/Touch usage

Keep in mind that using DragSelect on a mobile/touch device will also turn off the default scroll behavior (on `click` + `drag` interaction).
In 99% of the use-cases, this is what you want. If DragSelect is only one part of a website, and you still want to be able to scroll the page on mobile, you can use an `area` [property](#constructor-properties). This way the scroll behavior remains for all the rest of the page.

## Accessibility (a11y)

DragSelect is accessibly by default:  

> TLDR; => Your `selectables` should be buttons: `<button type="button"></button>`.  

Obviously, keyboard users won’t get the full visual experience but it works similarly to the OS default behavior. You can select items using the default select keys (usually space or enter) and also multi-select when using a modifier key at the same time (unfortunately this does not work in firefox for now since FF doesn’t add the modifier key in the event object when using the keyboard). There is one little thing you have to do tho’: the `selectables` have to be pressable (clickable)! To achieve this, they should be of type `<button type="button"></button>`.  

<p data-height="265" data-theme-id="0" data-slug-hash="prpwYG" data-default-tab="html,result" data-user="ThibaultJanBeyer" data-embed-version="2" data-pen-title="DragSelect" class="codepen">See the Pen <a href="https://codepen.io/ThibaultJanBeyer/pen/prpwYG/">DragSelect</a> on CodePen.</p>

# Constructor Properties:

Full list of properties to pass to the constructor object is found in **[the docs](https://thibaultjanbeyer.github.io/DragSelect/DragSelect.html)**  
Here are some properties for your convenience. Note, all properties are optional:  

| property | type | usage | default |
|--- |--- |--- |--- |
|area |single DOM element (node) |The square in which you are able to select |document
|selectables |DOM elements (nodes) |The elements that can be selected | []
|autoScrollSpeed |number |The speed in which the area scrolls while selecting (if available). The unit is arbitrary (interval aims for 30fps). Set to `0.0001` to disable auto-scrolling. |`5`
|zoom |number |Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom. |`1`
|customStyles |boolean |If true, no styles will be automatically applied to the selector element (except position: absolute). |`false`
|multiSelectMode |boolean |Add newly selected elements to the selection instead of replacing them. |`false`
|multiSelectToggling |boolean |Whether or not to toggle already active elements while multi-selecting. |`true` (MacOS selection behavior)
|multiSelectKeys |array |Keys that allows switching to the multi-select mode (see the multiSelectMode option). Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). Note that the best support is given for <kbd>Control</kbd>, <kbd>Shift</kbd> and <kbd>Meta</kbd>. Provide an empty array `[]` if you want to turn off the functionality. |`['Control', 'Shift', 'Meta']`
|selector |single DOM element (node) |The square that will be used to draw the selection. | Auto-created HTML Element
|draggability |boolean |When a user is dragging on an already selected element, the selection is dragged. |`true`
|immediateDrag |boolean |Whether a selectable element is draggable before being selected or needs to be selected first |`true`
|useTransform |boolean |Whether to use the more performant hardware accelerated css transforms when dragging instead of the top/left positions. |`true`
|selectedClass |string |The class name assigned to the selected items. |[see classes](#classes)
|hoverClass |string |The class name assigned to the mouse hovered items. |[see classes](#classes)
|selectorClass |string |The class name assigned to the square selector helper. |[see classes](#classes)
|selectableClass |string |The class name assigned to the elements that can be selected. |[see classes](#classes)

# Callbacks

Callbacks are used like this:

```JavaScript
ds.subscribe('<callback_name>', (callback_object) => {})
```

DragSelect offers a lot of useful callbacks to react to changes, check out **[the docs](https://thibaultjanbeyer.github.io/DragSelect/DragSelect.html)**. Here are some for your convenience:  

|callback_name |callback_object |description |
|--- |--- |---
|callback |`{ items, event }` |Fired after the selection (i.e. on mouse-up). 
|dragstart |`{ items, event }` |Fired when the selection starts (i.e. on mouse-down). 
|dragmove |`{ items, event }` |Fired when the mouse moves while dragging (i.e. on mouse-move).
|autoscroll |`{ data }` |Fired when the area is auto-scrolled (i.e. cursor on a corner of the area).
|elementselect |`{ items, item }` |Fired when an element is added to the selection.
|elementunselect |`{ items, item }` |Fired when an element is removed from the selection.

# Methods:
When the function is saved into a variable `var foo = new DragSelect()` you have access to all its inner functions.  
There are way more than listed here. You can find all in **[the docs](https://thibaultjanbeyer.github.io/DragSelect/DragSelect.html)**. Here are just the most usable:  

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
|isMultiSelect |/ |Whether the multi-select key is currently pressed

# Classes
| name | trigger |
|--- |--- |
|.ds-selected |On elements that are selected
|.ds-hover |On elements that are currently hovered
|.ds-selector |On the selector element
|.ds-selector-area |The overlay where the selector resides in
|.ds-selectable |On elements that can be selected

*note: you can change the class names setting the respective property on the constructor, see **[the docs](https://thibaultjanbeyer.github.io/DragSelect/DragSelect.html)** properties section.*

# Have Fun!

Creating and maintaining useful tools is a lot of work. 
So don’t forget to give this repository a star if you find it useful.
Star this repo, tell all your friends and start contributing and/or [donating 1$](https://paypal.me/pools/c/8gF2a5szCP) to keep it running. Thank you :)

[![Typewriter Gif](https://thibaultjanbeyer.github.io/DragSelect/media/typewriter.gif)](http://thibaultjanbeyer.com/)


<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<br>
<br>
<br>

[documentation](https://thibaultjanbeyer.github.io/DragSelect/DragSelect.html)
