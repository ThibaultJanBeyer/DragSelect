/* 
@TODO: rewrite it in a OOP manner so that people can extend/mixin the dragselect

       __                 _____      __          __ 
  ____/ /________ _____ _/ ___/___  / /__  _____/ /_
 / __  / ___/ __ `/ __ `/\__ \/ _ \/ / _ \/ ___/ __/
/ /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_  
\__,_/_/   \__,_/\__, //____/\___/_/\___/\___/\__/  
                /____/                              

Key-Features

  - No dependencies
  - Add drag selection.
  - Choose which elements can be selected.
  - Awesome browser support, works even on IE7
  - Ease of use
  - Lightweight, only ~1KB gzipped
  - Free & open source under MIT License

 Classes

.ds-selected                   on elements that are selected
 Properties
  ** @selectables       nodes           the elements that can be selected
  ** @selector          node            the square that will draw the selection
  ** @area              node            area in which you can drag. If not provided it will be the whole document
  ** @customStyles      boolean         if set to true, no styles (except for position absolute) will be applied by default
  ** @onElementSelect   function        this is optional, it is fired every time an element is selected. This callback gets a property which is the just selected node
  ** @onElementUnselect function        this is optional, it is fired every time an element is de-selected. This callback gets a property which is the just de-selected node
  ** @callback          function        a callback function that gets fired when the element is dropped. This callback gets a property which is an array that holds all selected nodes

 Methods

  ** .start             ()                    reset the functionality after a teardown
  ** .stop              ()                    will teardown/stop the whole functionality
  ** .getSelection      ()                    returns the current selection
  ** .addSelectables    ([nodes])             add elements that can be selected. Intelligent algorythm never adds elements twice.
  ** .removeSelectables ([nodes])             remove elements that can be selected. Also removes the 'selected' class from those elements.
  ** and everything else


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

  // Setup
  //////////////////////////////////////////////////////////////////////////////////////

  var selector,
      selectables,
      selectCallback,
      unselectCallback,
      callback,
      initialCursorPos,
      area,
      selected,
      initialScroll;

  function _setup() {
    selectables = toArray(options.selectables) || [];
    selectCallback = options.onElementSelect || function() {};
    unselectCallback = options.onElementUnselect || function() {};
    callback = options.callback || function() {};
    area = options.area || document;

    selector = options.selector || _createSelection();
    addClass(selector, 'ds-selector');

    selected = [];
  } _setup();

  function _createSelection() {
    var selector = document.createElement('div');

    selector.style.position = 'absolute';
    if(!options.customStyles) {
      selector.style.background = 'rgba(0, 0, 255, 0.2)';
      selector.style.border = '1px solid rgba(0, 0, 255, 0.5)';
      selector.style.display = 'none';
    }

    var _area = area === document ? document.body : area;
    _area.appendChild(selector);

    return selector;
  }

  // Start
  //////////////////////////////////////////////////////////////////////////////////////

  function start() {
    area.addEventListener('mousedown', _startUp);
  } start();


  // Startups
  //////////////////////////////////////////////////////////////////////////////////////

  function _startUp(event) {
    selector.style.display = 'block';

    // move element on location
    getStartingPositions(event);
    checkIfInsideSelection();

    area.removeEventListener('mousedown', _startUp);
    area.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', reset);
  }

  function getStartingPositions(event) {
    initialCursorPos = getCursorPos(event);
    initialScroll = getScroll(area);

    var selectorPos = {};
    selectorPos.x = initialCursorPos.x + initialScroll.x;
    selectorPos.y = initialCursorPos.y + initialScroll.y;
    selectorPos.w = 0;
    selectorPos.h = 0;
    _updatePos(selector, selectorPos);
  }


  // Movements/Sizing of selection
  //////////////////////////////////////////////////////////////////////////////////////

  // resize that div while mouse is pressed
  function handleMove(event) {
    // move element on location
    var selectorPos = getPosition(event);
    _updatePos(selector, selectorPos);
    checkIfInsideSelection();

    // scroll area if area is 
    autoScroll(event);
  }

  function getPosition(event) {
    var cursorPosNew = getCursorPos(event);
    var scrollNew = getScroll(area);

    // if area or document is scrolled those values have to be included aswell
    var scrollAmount = {
      x: scrollNew.x - initialScroll.x,
      y: scrollNew.y - initialScroll.y
    };

    /** check for direction
     *
     * This is quite complicated math, so also quite complicated to explain. Lemme’ try:
     *
     * Problem #1:
     * Sadly in HTML we can not have negative sizes.
     * so if we want to scale our element 10px to the right then it is easy,
     * we just have to add +10px to the width. But if we want to scale the element
     * -10px to the left then things become more complicated, we have to move
     * the element -10px to the left on the x axis and also scale the element
     * by +10px width to fake a negative sizing.
     * 
     * One solution to this problem is using css-transforms scale() with
     * transform-origin of top left. BUT we can’t use this since it will size
     * everything, then when your element has a border for example, the border will
     * get inanely huge. Also transforms are not widely supported in IE.
     * 
     * Example #1:
     * Unfortunately, things get even more complicated when we are inside a scrollable
     * DIV. Then, let’s say we scoll to the right by 10px and move the cursor right by 5px in our
     * checks we have to substract 10px from the initialcursor position in our check
     * (since the inital position is moved to the left by 10px) so in our example:
     * 1. cursorPosNew.x (5) > initialCursorPos.x (0) - scrollAmount.x (10) === 5 > -10 === true
     * then reset the x position to its initial position (since we might have changed that
     * position when scrolling to the left before going right) in our example:
     * 2. selectorPos.x = initialCursorPos.x (0) + initialScroll.x (0) === 0;
     * then we cann calculate the elements width, which is
     * the new cursor position minus the initial one plus the scroll amount, so in our example:
     * 3. selectorPos.w = cursorPosNew.x (5) - initialCursorPos.x (0) + scrollAmount.x (10) === 15;
     * 
     * let’s say after that movement we now scroll 20px to the left and move our cursor by 30px to the left:
     * 1b. cursorPosNew.x (-30) > initialCursorPos.x (0) - scrollAmount.x (-20) === -30 > -20 === false;
     * 2b. selectorPos.x = cursorPosNew.x (-30) + scrollNew.x (-20)
     *                   === -50;  // move left position to cursor (for more info see Problem #1)
     * 3b. selectorPos.w = initialCursorPos.x (0) - cursorPosNew.x (-30) - scrollAmount.x (-20) 
     *                   === 0--30--20 === 0+30+20 === 50;  // scale width to original left position (for more info see Problem #1)
     * 
     * same thing has to be done for top/bottom
     * 
     * I hope that makes sence, try stuff out and play around with variables to get a hang of it.
     */
    var selectorPos = {};

    // console.log('yala', cursorPosNew.y, initialCursorPos.y, scrollAmount.y, initialScroll.y);
    // right
    if(cursorPosNew.x > initialCursorPos.x - scrollAmount.x) {  // 1.
      selectorPos.x = initialCursorPos.x + initialScroll.x;  // 2.
      selectorPos.w = cursorPosNew.x - initialCursorPos.x + scrollAmount.x;  // 3.
    // left
    } else {  // 1b.
      selectorPos.x = cursorPosNew.x + scrollNew.x;  // 2b.
      selectorPos.w = initialCursorPos.x - cursorPosNew.x - scrollAmount.x;  // 3b.
    }

    // bottom
    if(cursorPosNew.y > initialCursorPos.y - scrollAmount.y) {
      selectorPos.y = initialCursorPos.y + initialScroll.y;
      selectorPos.h = cursorPosNew.y - initialCursorPos.y + scrollAmount.y;
    // top
    } else {
      selectorPos.y = cursorPosNew.y + scrollNew.y;
      selectorPos.h = initialCursorPos.y - cursorPosNew.y - scrollAmount.y;
    }

    return selectorPos;
  }


  // Colision detection
  //////////////////////////////////////////////////////////////////////////////////////

  function checkIfInsideSelection() {
    for(var i = 0, il = selectables.length; i < il; i++) {
      var selectable = selectables[i];
      var posInSelectedArray = selected.indexOf(selectable);

      if( isElementTouching(selectable, selector) ) {

        if( posInSelectedArray < 0 ) {
          selected.push(selectable);
          addClass(selectable, 'selected');
          selectCallback(selectable);
        }

      } else {

        if( posInSelectedArray > -1 ) {
          selected.splice(posInSelectedArray, 1);
          removeClass(selectable, 'selected');
          unselectCallback(selectable);
        }

      }

    }
  }

  //- Is Element touching Selection? (and vice-versa)
  function isElementTouching(element, container) {
    /**
     * calculating everything here on every move consumes more performance
     * but makes sure to get the right positions even if the containers are
     * resized or moved on the fly. This also makes the function kinda context independant.
     */
    var scroll = getScroll(area);

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
    }
    else {
      return false;
    }
  }


  // Autoscroll
  //////////////////////////////////////////////////////////////////////////////////////
  
  //- Scroll the area by selecting
  function autoScroll(event) {
    var edge = isCursorNearEdge(event);

    var _area = area === document ? area.body : area;

    if( edge === 'top' && _area.scrollTop > 0 ) { _area.scrollTop -= 1; }
    else if( edge === 'bottom' ) { _area.scrollTop += 1; }
    else if( edge === 'left' && _area.scrollLeft > 0 ) { _area.scrollLeft -= 1; }
    else if( edge === 'right' ) { _area.scrollLeft += 1; }
  }

  // Check if the selector is near an edge of the area
  function isCursorNearEdge(event) {
    var cursorPosition = getCursorPos(event);
    var areaRect = getAreaRect(area);

    var tolerance = {
      x: Math.max(areaRect.width / 10, 20),
      y: Math.max(areaRect.height / 10, 20)
    };

    // document body also changes the cursor position values so we have to take
    // the scroll amount into consideration for these calculations
    var scroll = area === document ? getScroll(document.body) : { x: 0, y: 0 };

    if(cursorPosition.y < tolerance.y + scroll.y) { return 'top'; }
    else if(areaRect.height - cursorPosition.y + scroll.y < tolerance.y) { return 'bottom'; }
    else if(areaRect.width - cursorPosition.x + scroll.x < tolerance.x) { return 'right'; }
    else if(cursorPosition.x < tolerance.x + scroll.x) { return 'left'; }

    return false;
  }

  //- Reset
  function reset() {
    // unbind those functions when mouse click is released
    selector.style.width = '0';
    selector.style.height = '0';
    selector.style.display = 'none';

    callback(selected);

    area.removeEventListener('mousemove', handleMove);
    area.addEventListener('mousedown', _startUp);
  }

  //- Stop
  function stop() {
    reset();
    area.removeEventListener('mousedown', _startUp);
    document.removeEventListener('mouseup', reset);
  }


  // Usefull methods for user
  //////////////////////////////////////////////////////////////////////////////////////

  //- getSelection
  function getSelection() {
    return selected;
  }

  //- Add/Remove Selectables
  function addSelectables(_nodes) {
    var nodes = toArray(_nodes);
    for (var i  = 0, il = nodes.length; i < il; i++) {
      var node = nodes[i];
      if(selectables.indexOf(node) < 0) {
        selectables.push(node);
      }
    }
  }

  function removeSelectables(_nodes) {
    var nodes = toArray(_nodes);
    for (var i  = 0, il = nodes.length; i < il; i++) {
      var node = nodes[i];
      if(selectables.indexOf(node) > 0) {
        removeClass(node, 'selected');
        selectables.splice(selectables.indexOf(node), 1);
      }
    }
  }


  // Helpers
  //////////////////////////////////////////////////////////////////////////////////////

  /**
   * Adds a class to an element
   * sadly legacy phones/browsers don’t support .classlist so we use this workaround
   * all credits to http://clubmate.fi/javascript-adding-and-removing-class-names-from-elements/
   * @param {*} element 
   * @param {*} classname 
   * @return {node} element
   */
  function addClass( element, classname ) {
    var cn = element.className;
    if( cn.indexOf(classname) !== -1 ) { return element; }  // test for existance
    if( cn !== '' ) { classname = ' ' + classname; }  // add a space if the element already has class
    element.className = cn+classname;
    return element;
  }

  /**
   * Removes a class of an element
   * sadly legacy phones/browsers don’t support .classlist so we use this workaround
   * all credits to http://clubmate.fi/javascript-adding-and-removing-class-names-from-elements/
   * @param {*} element 
   * @param {*} classname 
   * @return {node} element
   */
  function removeClass( element, classname ) {
    var cn = element.className;
    var rxp = new RegExp( classname + '\\b', 'g' );
    cn = cn.replace( rxp, '' );
    element.className = cn;
  }

  /**
   * Transforms an Object to an array
   * this is mainly used to transform Nodelists
   * into arrays of nodes. So user doesn’t have to care
   * @param {*} obj
   * @return {array}
   */
  function toArray( obj ) {
    if( !obj ) { return false; }
    if( !obj.length && isElement( obj ) ) { return [obj]; }

    var array = [];
    for ( var i = obj.length - 1; i >= 0; i-- ) { 
      array[i] = obj[i];
    }

    return array;
  }

  /**
   * Checks if a node is of type element
   * all credits to vikynandha: https://gist.github.com/vikynandha/6539809 
   * @param {*} obj
   * @return {bool}
   */
  function isElement( obj ) {
    try {  // Using W3 DOM2 (works for FF, Opera and Chrom)
      return obj instanceof HTMLElement;
    }
    catch( e ){
      // Browsers not supporting W3 DOM2 don't have HTMLElement and
      // an exception is thrown and we end up here. Testing some
      // properties that all elements have. (works on IE7)
      return ( typeof obj === 'object' ) &&
             ( obj.nodeType === 1 ) &&
             ( typeof obj.style === 'object' ) &&
             ( typeof obj.ownerDocument === 'object' );
    }
  }

  /**
   * Returns cursor x, y position based on event object
   * @param {obj} event
   * @return {obj} cursor X/Y
   */
  function getCursorPos( event ) {
    var cPos = {  // event.clientX/Y fallback for <IE8
      x: event.pageX || event.clientX,
      y: event.pageY || event.clientY
    };

    var areaRect = getAreaRect( area );

    return {  // if it’s constrained in an area the area should be substracted calculate 
      x: cPos.x - areaRect.left,
      y: cPos.y - areaRect.top
    };
  }

  /**
   * Returns the current x, y scroll value of a container
   * If container has no scroll it will return the
   * window/document scroll values
   * @param {node} area
   * @return {obj} scroll X/Y
   */
  function getScroll( area ) {
    var scroll = {  // when the rectangle is bound to the document, no scroll is needed
      y: area && area.scrollTop >= 0 ? area.scrollTop : 0,
      x: area && area.scrollLeft >= 0 ? area.scrollLeft : 0
    };

    return scroll;
  }

  /**
   * Returns the top/left/bottom/right/width/height
   * values of a node
   * @param {node} area 
   * @return {object}
   */
  function getAreaRect( area ) {
    if(area === document) {
      var size = {
        y: area.documentElement.clientHeight > 0 ? area.documentElement.clientHeight : window.innerHeight,
        x: area.documentElement.clientWidth > 0 ? area.documentElement.clientWidth : window.innerWidth,
      };
      return { top: 0, left: 0, bottom: 0, right: 0, width: size.x, height: size.y };
    }

    return {
      top: area.getBoundingClientRect().top,
      left: area.getBoundingClientRect().left,
      bottom: area.getBoundingClientRect().bottom,
      right: area.getBoundingClientRect().right,
      width: area.offsetWidth,
      height: area.offsetHeight
    };
  }

  /**
   * Updates the node style left, top, width,
   * height values accordingly.
   * @param {node} node 
   * @param {object} pos { x, y, w, h }
   * @return {node}
   */
  function _updatePos( node, pos ) {
    node.style.left = pos.x + 'px';
    node.style.top = pos.y + 'px';
    node.style.width = pos.w + 'px';
    node.style.height = pos.h + 'px';
    return node;
  }


  // Return
  //////////////////////////////////////////////////////////////////////////////////////

  var DS = {
    _updatePos: _updatePos,
    isElement: isElement,
    toArray: toArray,
    removeClass: removeClass,
    addClass: addClass,
    stop: stop,
    isElementTouching: isElementTouching,
    reset: reset,
    checkIfInsideSelection: checkIfInsideSelection,
    handleMove: handleMove,
    _startUp: _startUp,
    start: start,
    getSelection: getSelection,
    removeSelectables: removeSelectables,
    addSelectables: addSelectables
  };
  return DS;

};


// Make exportable
//////////////////////////////////////////////////////////////////////////////////////

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
