```
       __                 _____      __          __ 
  ____/ /________ _____ _/ ___/___  / /__  _____/ /_
 / __  / ___/ __ `/ __ `/\__ \/ _ \/ / _ \/ ___/ __/
/ /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_  
\__,_/_/   \__,_/\__, //____/\___/_/\___/\___/\__/  
                /____/                              
```

# dragSelect
easily add a selection algorythm to your application/website.

# Project Page: Demo & Info

https://thibaultjanbeyer.github.io/dragSelect/

# Key-Features

- No dependencies
- Add drag selection.
- Choose which elements can be selected.
- Awesome browser support, works even on IE7
- Ease of use
- Lightweight, only 1KB gzipped
- DragSelect was written with Performance in mind.
- Free & open source under MIT License

# Why?

Because aparently there is nothing that does not require jquery out there yet.

# 1. Installation
## easy

Just download the file (minified) and add it to your document:

<script src="https://thibaultjanbeyer.github.io/dragSelect/ds.min.js"></script>

## npm

npm install --save-dev npm-dragselect

## bower

bower install --save-dev dragselect

That's it, you're ready to rock!
Of course you can also just include the function within your code to save a request.

# Usage

Now in your JavaScript you can simply pass elements to the function like so:

## simple

The rectangle has to have a `position: fixed/absolute` attribute. The other ones have purely visual reasons.
```html
<div id="rectangle" 
     style="position: fixed;
            background-color: blue;
            border: 1px solid blue;
            display:none;"></div>
```

```javascript
dragSelect({
  selectables: document.getElementsByClassName('selectable-node')
});
```

## complete

```javascript
var ds = dragSelect({
  selector: document.getElementById('rectangle'), // draggable element '#rectangle is default but can be set to anything'
  selectables: [ document.getElementById('selectable1') ], // nodes that can be selected as array
  area: document.getElementById('area'), // area in which you can drag'
  onElementSelect: function(element) {}, // this is optional, it is fired every time an element is selected. (element) = just selected node
  onElementUnselect: function(element) {}, // this is optional, it is fired every time an element is de-selected. (element) = just de-selected node.
  callback: function(elements) {} // this is optional is fired once the user releases the mouse. (elements) = selected nodes.
});

// if you add the function to a variable like we did, you have access to all its functions
// and can now use start() and stop() like so:
ds.getSelection();  // returns all currently selected nodes

ds.stop();  // will teardown/stop the whole functionality
ds.start();  // reset the functionality after a teardown
```

## Properties:
| property | type | usage |
|--- |--- |--- |
|selector |single DOM element (node) |the square that will draw the selection. Default = #rectangle|
|selectables |DOM elements (nodes) |the elements that can be selected|
|area |single DOM element (node) |The square in which you are able to select |
|onElementSelect |function |this is optional, it is fired every time an element is selected. This callback gets a property which is the just selected node|
|onElementUnselect |function |this is optional, it is fired every time an element is de-selected. This callback gets a property which is the just de-selected node.|
|callback |function |callback function that gets fired when the element is dropped. This callback gets a property which is an array that holds all selected nodes|

## Methods:
When the function is saved into a variable `var foo = dragSelect({...}` you have access to all its inner functions. There are way more than listed here. Here are just the most usable:  

| method | properties | usage |
|--- |--- |--- |
|stop |/ |will teardown/stop the whole functionality |
|start |/ |reset the functionality after a teardown |
|getSelection |/ |returns all currently selected nodes |
|addSelectables |DOM elements (nodes) |adds elements that can be selected. Don’t worry, a smart algorythm makes sure that nodes are never added twice |
|removeSelectables |DOM elements (nodes) |remove elements that can be selected. Also removes the 'selected' class from those elements. |

## Classes
| name | trigger |
|--- |--- |
|.ds-selected | on elements that are selected

# Have Fun!

[![Typewriter Gif](https://thibaultjanbeyer.github.io/dragSelect/typewriter.gif)](http://thibaultjanbeyer.com/)