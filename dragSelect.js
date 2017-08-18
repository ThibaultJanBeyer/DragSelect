/* 

v1.0.0
     _                     __    _                 
  __| |_ __ __ _  __ _  /\ \ \__| |_ __ ___  _ __  
 / _` | '__/ _` |/ _` |/  \/ / _` | '__/ _ \| '_ \ 
| (_| | | | (_| | (_| / /\  / (_| | | | (_) | |_) |
 \__,_|_|  \__,_|\__, \_\ \/ \__,_|_|  \___/| .__/ 
                 |___/                      |_|    


 Key-Features

- Add drag selection.
- Choose which elements can be selected.
- Awesome browser support, works even on IE5
- Ease of use
- Lightweight, only 1KB gzipped
- Free & open source under MIT License


 Classes

.ds-selected                   on elements that are selected


 Properties

** @selector          node            the square that will draw the selection
** @selectables       array of nodes  the elements that can be selected
** @onElementSelect   function        this is optional, it is fired every time an element is selected. This callback gets a property which is the just selected node
** @onElementUnselect function        this is optional, it is fired every time an element is de-selected. This callback gets a property which is the just de-selected node
** @callback          function        a callback function that gets fired when the element is dropped. This callback gets a property which is an array that holds all selected nodes



 STAR THIS PLUGIN ON GITHUB:

 https://github.com/ThibaultJanBeyer/dragSelect

 Please give it a like, this is what makes me happy :-)
 Thanks You



 ******************************************
 ********* The MIT License (MIT) **********
 ******************************************

 Copyright (c) 2017 ThibaultJanBeyer
 web: http://www.thibaultjanbeyer.com/
 github: https://github.com/ThibaultJanBeyer/dragSelect

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

*/

var dragSelect = function(options) {
  // Errors
  if(!options) {
    console.log('ERROR: dragSelect: please provide an options object to the function. See reference at: https://github.com/ThibaultJanBeyer/dragSelect for more info');
  }

  // Setup
  var selector = options.selector || document.getElementById("rectangle");
  var selectables = options.selectables;
  var selectCallback = options.onElementSelect;
  var UnselectCallback = options.onElementUnselect;
  var callback = options.callback;

  var selected = [];

  //- Start
  function start() {
    document.addEventListener('mousedown', startUp);
  }
  start();

  var cursorPos;
  function startUp(e) {
    console.log('STARTUP');
    cursorPos = { // event.clientX/Y fallback for IE8-
      x: e.pageX || e.clientX,
      y: e.pageY || e.clientY
    };
    // move element on location
    selector.style.display = 'block';
    selector.style.top = cursorPos.y + 'px';
    selector.style.left = cursorPos.x + 'px';
    checkIfInside();
    
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', reset);
  }

  // resize that div while mouse is pressed
  var cursorPos2;
  function move(e) {
    cursorPos2 = { // event.clientX/Y fallback for IE8-
      x: e.pageX || e.clientX,
      y: e.pageY || e.clientY
    };
    // check for direction
    if(cursorPos2.x > cursorPos.x) {
      selector.style.width = cursorPos2.x - cursorPos.x + 'px';
    } else {
      selector.style.left = cursorPos2.x + 'px';
      selector.style.width = cursorPos.x - cursorPos2.x + 'px';
    }

    if(cursorPos2.y > cursorPos.y) {
      selector.style.height = cursorPos2.y - cursorPos.y + 'px';
    } else {
      selector.style.top = cursorPos2.y + 'px';
      selector.style.height = cursorPos.y - cursorPos2.y + 'px';
    }
    
    checkIfInside();
  }
  
  function checkIfInside() {
    // return elements that are inside the container
    for(var i = 0, il = selectables.length; i < il; i++) {
      var selectable = selectables[i];
      var index = selected.indexOf(selectable);

      if(isElementTouching(selectable, selector)) {
        if(index < 0) {
          selected.push(selectable);
          addClass(selectable, 'selected');
        }
      } else {
        if(index > -1) {
          selected.splice(selected.indexOf(selectable), 1);
          removeClass(selectable, 'selected');
        }
      }
    }
  }

  // and finally unbind those functions when mouse click is released
  function reset() {
    selector.style.width = '0';
    selector.style.height = '0';
    selector.style.display = 'none';

    //document.removeEventListener('mousedown', mousedown);
    document.removeEventListener('mousemove', move);
  }

  //- Is Element touching Selection? (and vice-versa)
  function isElementTouching(element, container) {
    /**
     * calculating everything here on every move consumes more performance
     * but makes sure to get the right positions even if the containers are
     * resized or moved on the fly. This also makes the function kinda context independant.
     */
    var scroll = {
      // fallback for IE9-
      x: window.scrollY || document.documentElement.scrollTop,
      y: window.scrollX || document.documentElement.scrollLeft
    };
    var containerRect = {
      y: container.getBoundingClientRect().top + scroll.y,
      x: container.getBoundingClientRect().left + scroll.x,
      h: container.offsetHeight,
      w: container.offsetWidth
    };
    var elementRect = {
      y: element.getBoundingClientRect().top + scroll.y,
      x: element.getBoundingClientRect().left + scroll.x,
      h: element.offsetHeight,
      w: element.offsetWidth    
    };

    // Axis-Aligned Bounding Box Colision Detection.
    // Imagine following Example:
    //    b01
    // a01[1]a02
    //    b02      b11
    //          a11[2]a12
    //             b12
    // to check if those two boxes collide we do this AABB calculation:
    //& a01 < a12 (left border pos box1 smaller than right border pos box2)
    //& a02 > a11 (right border pos box1 larger than left border pos box2)
    //& b01 < b12 (top border pos box1 smaller than bottom border pos box2)
    //& b02 > b11 (bottom border pos box1 larger than top border pos box2)
    // See: https://en.wikipedia.org/wiki/Minimum_bounding_box#Axis-aligned_minimum_bounding_box and https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (
      containerRect.x                   < elementRect.x + elementRect.w &&
      containerRect.x + containerRect.w > elementRect.x &&
      containerRect.y                   < elementRect.y + elementRect.h &&
      containerRect.h + containerRect.y > elementRect.y
    ) {
      return true; // collision detected!
    } else {
      return false;
    }
  }

  function getSelection() {
    return selected;
  }

  //- Stop
  function stop() {
    reset();
    document.removeEventListener('mousedown', startUp);
  }

  /* * * * * *
  * HELPERS *
  * * * * * */
  // sadly old phones/browsers do not support the quite new .classlist
  // so we have to use this workaround to add/remove classes
  // all credits to http://clubmate.fi/javascript-adding-and-removing-class-names-from-elements/
  function addClass( element, classname ) {
    var cn = element.className;
    //test for existance
    if( cn.indexOf(classname) !== -1 ) { return; }
    //add a space if the element already has class
    if( cn !== '' ) { classname = ' ' + classname; }
    element.className = cn+classname;
  }

  function removeClass( element, classname ) {
    var cn = element.className;
    var rxp = new RegExp( classname + '\\b', 'g' );
    cn = cn.replace( classname, '' );
    element.className = cn;
  }

  var DS = {
    removeClass: removeClass,
    addClass: addClass,
    stop: stop,
    isElementTouching: isElementTouching,
    reset: reset,
    checkIfInside: checkIfInside,
    move: move,
    startUp: startUp,
    start: start,
    getSelection: getSelection
  };
  return DS;

};

// make exportable
if (typeof module !== 'undefined' && module !== null) {
  module.exports = dragSelect;
} else {
  window.dragSelect = dragSelect;
}

// Relevant Discussions:
// https://stackoverflow.com/questions/11979586/select-and-drag-to-get-selected-elements
// https://stackoverflow.com/questions/5851156/javascript-drag-select-functionality-done-right
// https://plainjs.com/
// http://youmightnotneedjqueryplugins.com/
// https://codecanyon.net/item/grapesheadlines-animated-headers/19715814?s_rank=1 ???
