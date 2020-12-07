/***

 ~~~ Version 2.0.0 ~~~

 ******************************************

    ____                   _____      __          __ 
   / __ \_________ _____ _/ ___/___  / /__  _____/ /_
  / / / / ___/ __ `/ __ `/\__ \/ _ \/ / _ \/ ___/ __/
 / /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_  
/_____/_/   \__,_/\__, //____/\___/_/\___/\___/\__/  
               /____/                              

 ******************************************
 
 {*} {*} STAR THIS PLUGIN ON GITHUB {*} {*}

 https://github.com/ThibaultJanBeyer/DragSelect
 Please give it a like, this is what makes me happy :-)
 Thank You

 {*} {*} STAR THIS PLUGIN ON GITHUB {*} {*}

 ******************************************
 ********* The MIT License (MIT) **********
 ******************************************
 Created 2017 by ThibaultJanBeyer
 web: http://www.thibaultjanbeyer.com/
 github: https://github.com/ThibaultJanBeyer/DragSelect

*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DragSelect = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * The Settings to be passed to the Class
   * @typedef {Object} Settings
   * @property {HTMLElement|SVGElement|HTMLDocument} [area=document] area in which you can drag. If not provided it will be the whole document
   * @property {number} [autoScrollSpeed=1] Speed in which the area scrolls while selecting (if available). Unit is pixel per movement.
   * @property {number} [zoom=1] Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom.
   * @property {boolean} [customStyles=false] if set to true, no styles (except for position absolute) will be applied by default
   * @property {string} [hoverClass=ds-hover] the class assigned to the mouse hovered items
   * @property {boolean} [multiSelectMode=false] Add newly selected elements to the selection instead of replacing them.
   * @property {string} [selectableClass=ds-selectable] the class assigned to the elements that can be selected
   * @property {HTMLElement[] | SVGElement[] | HTMLElement | SVGElement} [selectables=[]] the elements that can be selected
   * @property {string} [selectedClass=ds-selected] the class assigned to the selected items
   * @property {HTMLElement} [selector=HTMLElement] the square that will draw the selection
   * @property {string} [selectorClass=ds-selector] the class assigned to the square selector helper
   * @property {string} [selectorAreaClass=ds-selector-area] the class assigned to the square in which the selector resides. By default it's invisible
   * @property {DSCallbackEvent} [callback] Deprecated: please use DragSelect.subscribe('callback', callback) instead
   * @property {DSDragMoveEvent} [onDragMove] Deprecated: please use DragSelect.subscribe('onDragMove', onDragMove) instead
   * @property {DSDragMoveBeginEvent} [onDragStartBegin]  Deprecated: please use DragSelect.subscribe('onDragStartBegin', onDragStartBegin) instead
   * @property {DSDragStartEvent} [onDragStart]  Deprecated: please use DragSelect.subscribe('onDragStart', onDragStart) instead
   * @property {DSElementSelectEvent} [onElementSelect]  Deprecated: please use DragSelect.subscribe('onElementSelect', onElementSelect) instead
   * @property {DSElementUnSelectEvent} [onElementUnselect]  Deprecated: please use DragSelect.subscribe('onElementUnselect', onElementUnselect) instead
   * @property {Array.<'ctrlKey'|'shiftKey'|'metaKey'>} [multiSelectKeys=['ctrlKey', 'shiftKey', 'metaKey']] An array of keys that allows switching to the multi-select mode (see the @multiSelectMode option). The only possible values are keys that are provided via the event object. So far: <kbd>ctrlKey</kbd>, <kbd>shiftKey</kbd>, <kbd>metaKey</kbd> and <kbd>altKey</kbd>. Provide an empty array `[]` if you want to turn off the functionality.
   */

  /**
   * The Object that is passed back to any callback method
   * @typedef {Object} CallbackObject
   * @property {Array<HTMLElement|SVGElement|any>} items The items currently selected
   * @property {MouseEvent|TouchEvent|Event} [event] The respective event object
   * @property {HTMLElement|SVGElement|any} [item] The single item currently interacted with
   */

  /**
   * @typedef {function} DSCallback
   * @param {CallbackObject} selected
   */

  /**
   * Callback function that gets fired when the element is selected.
   * @typedef {DSCallback} DSCallbackEvent
   */

  /**
   * Fired while the user drags.
   * @typedef {DSCallback} DSDragMoveEvent
   */

  /**
   * Fired while the user drags.
   * @typedef {DSCallback} DSDragMoveBeginEvent
   */

  /**
   * When the user clicks in the area.
   * @typedef {DSCallback} DSDragStartEvent
   */

  /**
   * Fired every time an element is selected.
   * @typedef {DSCallback} DSElementSelectEvent
   */

  /**
   * Fired every time an element is un-selected.
   * @typedef {DSCallback} DSElementUnSelectEvent
   */

  /** @typedef {HTMLElement|SVGElement|HTMLDocument} DSArea area in which you can drag */

  /** @typedef {HTMLElement} DSSelectorArea area in which you can drag */

  /** @typedef {Array.<HTMLElement|SVGElement> | HTMLElement | SVGElement} DSInputElements the elements that can be selected */

  /** @typedef {Array.<HTMLElement|SVGElement>} DSElements the elements that can be selected */

  /** @typedef {HTMLElement|SVGElement} DSElement a single element that can be selected */

  /** @typedef {MouseEvent|TouchEvent} DSEvent en event from a touch or mouse interaction */

  /** @typedef {number} DSZoom Zoom scale factor. Unit scale zoom */

  /** @typedef {Array.<'ctrlKey'|'shiftKey'|'metaKey'>} DSMultiSelectKeys An array of keys that allows switching to the multi-select mode */

  /** @typedef {'dragmove'|'dragstartbegin'|'dragstart'|'elementselect'|'elementunselect'|'callback'} DSCallbackNames the name of the callback */

  /**
   * @param {'scrollTop'|'scrollHeight'} y
   * @param {'scrollLeft'|'scrollWidth'} x
   * @param {DSArea} [area]
   * @return {{x:number,y:number}} scroll X/Y
   * @private
   */

  var unified = function unified(y, x, area) {
    var body = {
      y: document.body[y] > 0 ? document.body[y] : document.documentElement[y],
      x: document.body[x] > 0 ? document.body[x] : document.documentElement[x]
    };
    return {
      y: area && area[y] >= 0 ? area[y] : body.y,
      x: area && area[x] >= 0 ? area[x] : body.x
    };
  };
  /**
   * Returns the current x, y scroll value of area
   * If area has no scroll it will return 0
   * If area scrollTop/Left is not available
   * @param {DSArea} [area]
   * @return {{x:number,y:number}} scroll X/Y
   * @private
   */


  var getCurrent = function getCurrent(area) {
    return unified('scrollTop', 'scrollLeft', area);
  };
  /**
   * Checks whether the area can scroll or not
   * @param {DSArea} area
   * @return {boolean} scroll X/Y
   * @private
   */

  var canScroll = function canScroll(area) {
    var scroll = getCurrent(area);
    if (scroll.x || scroll.y) return true;

    var _area = area instanceof HTMLDocument ? area.documentElement : area;

    _area.scrollTop = 1;
    if (_area.scrollTop) return true;
    return false;
  };

  /**
   * This module fixes an issue where the position of the selector would be screwed when the area is scaled/zoomed
   * Since apparently also the scroll speed is skewed
   */

  /**
   * @private
   */
  var initVal = {
    x: 0,
    y: 0
  };
  /**
   * @private
   */

  var _zoomedScroll = initVal;
  var get = function get() {
    return _objectSpread2({}, _zoomedScroll);
  };
  var set = function set(value) {
    return _objectSpread2({}, _zoomedScroll = value);
  };
  var reset = function reset() {
    return _objectSpread2({}, _zoomedScroll = initVal);
  };

  /**
   * @callback DSModificationCallback
   * @param {*} event
   */

  var SelectorArea = /*#__PURE__*/function () {
    /** @type {DSModificationCallback} */

    /** @type {MutationObserver} */

    /** @type {HTMLDivElement} */

    /**
     * @class SelectorArea
     * @constructor SelectorArea
     * @param {{ Area:*, selectorAreaClass:string, selector:HTMLElement}} obj
     * @ignore
     */
    function SelectorArea(_ref) {
      var Area = _ref.Area,
          selectorAreaClass = _ref.selectorAreaClass,
          selector = _ref.selector;

      _classCallCheck(this, SelectorArea);

      _defineProperty(this, "modificationCallback", void 0);

      _defineProperty(this, "modificationObserver", void 0);

      _defineProperty(this, "node", void 0);

      this.Area = Area;
      this.selectorAreaClass = selectorAreaClass;
      this.selector = selector;
      this.setup();
    }
    /**
     * - Create Selector Area
     * - Update Selector Area Position
     * - Create modification callbacks and observers
     * - Append selector to Selector Area
     * - Append Selector Area to body
     */


    _createClass(SelectorArea, [{
      key: "setup",
      value: function setup() {
        var _this = this;

        this.node = createSelectorArea(this.selectorAreaClass);
        this.update();

        this.modificationCallback = function (event) {
          return _this.update();
        };

        this.modificationObserver = new MutationObserver(this.modificationCallback);
        this.node.append(this.selector);
        document.body.append(this.node);
      }
      /**
       * Add observers
       */

    }, {
      key: "start",
      value: function start() {
        addObservers(this.Area.node, this.modificationCallback, this.modificationObserver);
      }
      /**
       * Update Position
       */

    }, {
      key: "update",
      value: function update() {
        updatePosition(this.node, this.Area.node);
      }
      /**
       * Remove observers
       */

    }, {
      key: "stop",
      value: function stop() {
        removeObservers(this.modificationObserver, this.modificationCallback);
      }
      /**
       * - Remove observers
       * - Remove selector
       * - Remove Selector Area
       */

    }, {
      key: "teardown",
      value: function teardown() {
        this.stop();
        this.selector.remove();
        this.node.remove();
      }
    }]);

    return SelectorArea;
  }();
  /**
   * Creates the SelectorArea
   * @param {string} selectorAreaClass
   * @return {HTMLDivElement}
   * @private
   */


  var createSelectorArea = function createSelectorArea(selectorAreaClass) {
    var node = document.createElement('div');
    node.style.position = 'fixed';
    node.style.overflow = 'hidden';
    node.style.pointerEvents = 'none';
    node.classList.add(selectorAreaClass);
    return node;
  };
  /**
   * Adds event-listeners to the selectorArea
   * @param {DSArea} area
   * @param {DSModificationCallback} callback
   * @param {MutationObserver} modificationObserver
   * @private
   */


  var addObservers = function addObservers(area, callback, modificationObserver) {
    window.addEventListener('resize', callback);
    window.addEventListener('scroll', callback);
    modificationObserver.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true
    });
    modificationObserver.observe(area, {
      attributes: true
    });
  };
  /**
   * Removes event-listeners to the selectorArea
   * @param {MutationObserver} modificationObserver
   * @param {DSModificationCallback} callback
   * @private
   */


  var removeObservers = function removeObservers(modificationObserver, callback) {
    window.removeEventListener('resize', callback);
    window.removeEventListener('scroll', callback);
    modificationObserver.disconnect();
  };
  /**
   * Updates the selectorAreas positions to match the areas
   * @param {HTMLElement} selectorArea
   * @param {DSArea} area
   * @return {HTMLElement}
   * @private
   */


  var updatePosition = function updatePosition(selectorArea, area) {
    var rect = _getAreaRect(area);

    var border = _getComputedBorder(area);

    selectorArea.style.top = "".concat(rect.top + border.top, "px");
    selectorArea.style.left = "".concat(rect.left + border.left, "px");
    selectorArea.style.width = "".concat(rect.width - border.left - border.right, "px");
    selectorArea.style.height = "".concat(rect.height - border.top - border.bottom, "px");
    return selectorArea;
  };

  var PubSub = /*#__PURE__*/function () {
    function PubSub() {
      _classCallCheck(this, PubSub);

      _defineProperty(this, "subscribers", {});
    }

    _createClass(PubSub, [{
      key: "subscribe",

      /**
       * Subscribe to an event
       * @memberof DragSelect#
       * @function subscribe
       * @param {DSCallbackNames} eventName
       * @param {DSCallback} callback
       * @returns {number} event id, can be used to unsubscribe
       */
      value: function subscribe(eventName, callback) {
        if (!Array.isArray(this.subscribers[eventName])) this.subscribers[eventName] = [];
        this.subscribers[eventName].push(callback);
        return this.subscribers[eventName].length - 1;
      }
      /**
       * Removes event subscription
       * @memberof DragSelect#
       * @function unsubscribe
       * @param {DSCallbackNames} eventName
       * @param {DSCallback} [callback]
       * @param {number} [id] event id returned when subscribed (more performant than callback search)
       */

    }, {
      key: "unsubscribe",
      value: function unsubscribe(eventName, callback, id) {
        if (id) this.subscribers[eventName].splice(id, 1);else this.subscribers[eventName] = this.subscribers[eventName].filter(function (cb) {
          return cb !== callback;
        });
      }
      /**
       * Publishes an event to all subscribers
       * @memberof DragSelect#
       * @function publish
       * @param {DSCallbackNames} eventName
       * @param {CallbackObject} data passed to the subscription method
       */

    }, {
      key: "publish",
      value: function publish(eventName, data) {
        if (!Array.isArray(this.subscribers[eventName])) return;
        this.subscribers[eventName].forEach(function (callback) {
          return callback(data);
        });
      }
    }]);

    return PubSub;
  }();

  /**
   * Scroll the area in the direction of edge
   * @param {DSArea} area
   * @param {Array.<'top'|'bottom'|'left'|'right'|undefined>} edges
   * @param {number} autoScrollSpeed
   */

  var _autoScroll = (function (area, edges, autoScrollSpeed) {
    var docEl = document && document.documentElement && document.documentElement.scrollTop && document.documentElement;

    var _area = area instanceof HTMLDocument ? docEl || document.body : area;

    var scrollTop = edges.includes('top') && _area.scrollTop > 0;
    var scrollBot = edges.includes('bottom');
    var scrollLeft = edges.includes('left') && _area.scrollLeft > 0;
    var scrollRight = edges.includes('right');
    if (scrollTop) _area.scrollTop -= 1 * autoScrollSpeed;
    if (scrollBot) _area.scrollTop += 1 * autoScrollSpeed;
    if (scrollLeft) _area.scrollLeft -= 1 * autoScrollSpeed;
    if (scrollRight) _area.scrollLeft += 1 * autoScrollSpeed;
  });

  /**
   * Create the selector node when not provided by options object.
   * @param {boolean} customStyles
   * @return {HTMLElement}
   */

  var _createSelector = (function (customStyles) {
    var selector = document.createElement('div');
    selector.style.position = 'absolute';

    if (!customStyles) {
      selector.style.background = 'rgba(0, 0, 255, 0.1)';
      selector.style.border = '1px solid rgba(0, 0, 255, 0.45)';
      selector.style.display = 'none';
      selector.style.pointerEvents = 'none'; // fix for issue #8 (ie11+)
    }

    return selector;
  });

  /**
   * Returns the top/left/bottom/right/width/height
   * values of an area. If area is document then everything
   * except the sizes will be nulled.
   * @param {DSArea} area
   * @returns {{top:number,left:number,bottom:number,right:number,width:number,height:number}}
   */

  var _getAreaRect = (function (area) {
    if (area instanceof Document) return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: area.documentElement.clientWidth > 0 ? area.documentElement.clientWidth : window.innerWidth,
      height: area.documentElement.clientHeight > 0 ? area.documentElement.clientHeight : window.innerHeight
    };
    var rect = area.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
      height: rect.height
    };
  });

  /**
   * @param {DSArea} area
   */

  var _getComputedBorder = (function (area) {
    if (area instanceof HTMLDocument) return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };
    var computedStyles = getComputedStyle(area);
    return {
      top: parseInt(computedStyles.borderTopWidth) || 0,
      bottom: parseInt(computedStyles.borderBottomWidth) || 0,
      left: parseInt(computedStyles.borderLeftWidth) || 0,
      right: parseInt(computedStyles.borderRightWidth) || 0
    };
  });

  /**
   * @private
   * @type {TouchEvent}
   */

  var _lastTouch;
  /**
   * Returns cursor x, y position based on event object
   * /!\ for internal calculation reasons it does _not_ take
   * the AREA scroll into consideration unless it’s the outer Document.
   * Use the public .getCursorPos() for anything else, it’s more flexible
   * @param {DSArea} area
   * @param {DSEvent} [event]
   * @param {DSZoom} [zoom]
   * @return {{x: number, y: number}} cursor X/Y position
   */


  var _getCursorPos = (function (area, event) {
    var zoom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    if (!event) return {
      x: 0,
      y: 0
    }; // touchend has not touches. so we take the last touch if a touchevent, we need to store the positions

    if ('touches' in event && event.type !== 'touchend') _lastTouch = event; // if a touchevent, return the last touch rather than the regular event
    // we need .touches[0] from that event instead

    var _event = 'touches' in event ? _lastTouch.touches[0] : event;

    var cPos = {
      x: _event.pageX,
      y: _event.pageY
    };

    var areaRect = _getAreaRect(area);

    var docScroll = getCurrent(); // needed when document is scroll-able but area is not


    return {
      // if it’s constrained in an area the area should be subtracted calculate
      x: (cPos.x - areaRect.left - docScroll.x) / zoom,
      y: (cPos.y - areaRect.top - docScroll.y) / zoom
    };
  });

  /**
   * Reliably returns the exact x,y,w,h positions of the selector element
   * @param {DSSelectorArea} selectorArea
   * @param {DSArea} area
   * @param {{x: number, y: number}} initialScroll
   * @param {{x: number, y: number}} initialCursorPos
   * @param {DSZoom} [zoom]
   * @param {DSEvent} [event]
   * @returns {{x:number,y:number,w:number,h:number}}
   */

  var _getSelectorPosition = (function (selectorArea, area, initialScroll, initialCursorPos, zoom, event) {
    var cursorPosNew = _getCursorPos(selectorArea, event);

    var scrollNew = getCurrent(area); // if area or document is scrolled those values have to be considered as well


    var scrollDiff = {
      x: scrollNew.x - initialScroll.x,
      y: scrollNew.y - initialScroll.y
    }; // if area is zoomed we'll also need to incorporate that when scrolling…

    if (zoom) {
      set({
        x: scrollDiff.x * zoom - scrollDiff.x,
        y: scrollDiff.y * zoom - scrollDiff.y
      });
    }

    var zoomScroll = get();

    var scrollAmount = {
      x: scrollDiff.x + zoomScroll.x,
      y: scrollDiff.y + zoomScroll.y
    };
    /** check for direction
     *
     * This is quite complicated, so also quite complicated to explain. Lemme’ try:
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
     * Unfortunately, things get even more complicated when we are inside a scroll-able
     * DIV. Then, let’s say we scroll to the right by 10px and move the cursor right by 5px in our
     * checks we have to subtract 10px from the initialcursor position in our check
     * (since the initial position is moved to the left by 10px) so in our example:
     * 1. cursorPosNew.x (5) > initialCursorPos.x (0) - scrollAmount.x (10) === 5 > -10 === true
     * then set the x position to the cursors start position
     * selectorPos.x = initialCursorPos.x (0) - scrollAmount.x (10) === 10 // 2.
     * then we can calculate the elements width, which is
     * the new cursor position minus the initial one plus the scroll amount, so in our example:
     * 3. selectorPos.w = cursorPosNew.x (5) - initialCursorPos.x (0) + scrollAmount.x (10) === 15;
     *
     * let’s say after that movement we now scroll 20px to the left and move our cursor by 30px to the left:
     * 1b. cursorPosNew.x (-30) > initialCursorPos.x (0) - scrollAmount.x (-20) === -30 < --20 === -30 < +20 === false;
     * 2b. selectorPos.x = cursorPosNew.x (-30) === -30; move left position to cursor (for more info see Problem #1)
     * 3b. selectorPos.w = initialCursorPos.x (0) - cursorPosNew.x (-30) - scrollAmount.x (-20) === 0--30--20 === 0+30+20 === 50;  // scale width to original left position (for more info see Problem #1)
     *
     * same thing has to be done for top/bottom
     *
     * I hope that makes sense. Try stuff out and play around with variables to get a hang of it.
     */

    var selectorPos = {}; // right

    if (cursorPosNew.x > initialCursorPos.x - scrollAmount.x) {
      // 1.
      selectorPos.x = initialCursorPos.x - scrollAmount.x; // 2.

      selectorPos.w = cursorPosNew.x - initialCursorPos.x + scrollAmount.x; // 3.
      // left
    } else {
      // 1b.
      selectorPos.x = cursorPosNew.x; // 2b.

      selectorPos.w = initialCursorPos.x - cursorPosNew.x - scrollAmount.x; // 3b.
    } // bottom


    if (cursorPosNew.y > initialCursorPos.y - scrollAmount.y) {
      selectorPos.y = initialCursorPos.y - scrollAmount.y;
      selectorPos.h = cursorPosNew.y - initialCursorPos.y + scrollAmount.y; // top
    } else {
      selectorPos.y = cursorPosNew.y;
      selectorPos.h = initialCursorPos.y - cursorPosNew.y - scrollAmount.y;
    }

    return selectorPos;
  });

  /**
   * Fix: Area has to have a special position attribute for calculations
   * @param {DSArea} area
   * @returns {DSArea}
   */

  var _handleArea = (function (area) {
    if (area instanceof HTMLDocument) return area;
    var computedStyles = getComputedStyle(area);
    var position = computedStyles.position;
    var isPositioned = position === 'absolute' || position === 'relative' || position === 'fixed';
    if (!isPositioned) area.style.position = 'relative';
    return area;
  });

  /**
   * Axis-Aligned Bounding Box Collision Detection.
   * Imagine following Example:
   *
   *
   *        b01
   *     a01[1]a02
   *        b02      b11
   *              a11[2]a12
   *                 b12
   *
   *
   * to check if those two boxes collide we do this AABB calculation:
   * 1. a01 < a12 (left border pos box1 smaller than right border pos box2)
   * 2. a02 > a11 (right border pos box1 larger than left border pos box2)
   * 3. b01 < b12 (top border pos box1 smaller than bottom border pos box2)
   * 4. b02 > b11 (bottom border pos box1 larger than top border pos box2)
   * {@link https://en.wikipedia.org/wiki/Minimum_bounding_box#Axis-aligned_minimum_bounding_box Wikipedia}
   * {@link https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection MDN}
   * @param {{x:number,y:number,w:number,h:number}} a
   * @param {{x:number,y:number,w:number,h:number}} b
   */
  var _isCollision = (function (el1, el2) {
    if (el1.x < el2.x + el2.w && // 1.
    el1.x + el1.w > el2.x && // 2.
    el1.y < el2.y + el2.h && // 3.
    el1.h + el1.y > el2.y // 4.
    ) {
        return true; // collision detected!
      } else {
      return false;
    }
  });

  /**
   * Check if the selector is near a edges of the area
   * @param {DSSelectorArea} area
   * @param {DSEvent} [event]
   * @return {Array.<'top'|'bottom'|'left'|'right'|undefined>}
   */

  var _isCursorNearEdges = (function (area, event) {
    var cursorPosition = _getCursorPos(area, event);

    var areaRect = _getAreaRect(area);

    var tolerance = {
      x: 10,
      y: 10
    };
    var edges = [];
    if (cursorPosition.y < tolerance.y) edges.push('top');
    if (areaRect.height - cursorPosition.y < tolerance.y) edges.push('bottom');
    if (areaRect.width - cursorPosition.x < tolerance.x) edges.push('right');
    if (cursorPosition.x < tolerance.x) edges.push('left');
    return (
      /** @type {Array.<'top'|'bottom'|'left'|'right'|undefined>} */
      edges
    );
  });

  /**
   * Checks if there is a collision between the element and the selector
   * (whether they touch each other)
   * @param {DSElement} element
   * @param {HTMLElement} selector
   * @param {DSArea} area
   * @param {DSSelectorArea} selectorArea
   * @return {boolean}
   */

  var _isElementTouching = (function (element, selector, area, selectorArea) {
    if (!_isInArea(element, area, selectorArea)) return;
    var selectionRect = {
      y: selector.getBoundingClientRect().top,
      x: selector.getBoundingClientRect().left,
      h: selector.offsetHeight,
      w: selector.offsetWidth
    };
    var rect = element.getBoundingClientRect();
    var elementRect = {
      y: rect.top,
      x: rect.left,
      h: rect.height,
      w: rect.width
    };
    if (_isCollision(selectionRect, elementRect)) return true;
    return false;
  });

  /**
   * Checks if there is a collision between the element and the selector
   * (whether they touch each other)
   * @param {DSElement} element
   * @param {DSArea} area
   * @param {DSSelectorArea} selectorArea
   * @return {boolean}
   */

  var _isInArea = (function (element, area, selectorArea) {
    if (area.contains(element) && canScroll(area)) return true;
    var selectorAreaRect = {
      y: selectorArea.getBoundingClientRect().top,
      x: selectorArea.getBoundingClientRect().left,
      h: selectorArea.offsetHeight,
      w: selectorArea.offsetWidth
    };
    var rect = element.getBoundingClientRect();
    var elementRect = {
      y: rect.top,
      x: rect.left,
      h: rect.height,
      w: rect.width
    };
    if (_isCollision(selectorAreaRect, elementRect)) return true;
    return false;
  });

  /**
   * Check if some multi-selection modifier key is pressed
   * @param {DSMultiSelectKeys} multiSelectKeys
   * @param {boolean} multiSelectMode
   * @param {DSEvent} event
   * @return {boolean}
   */

  var _isMultiSelectKeyPressed = (function (multiSelectKeys, multiSelectMode, event) {
    if (multiSelectMode) return true;
    return multiSelectKeys.some(function (mKey) {
      return event[mKey];
    });
  });

  /**
   * @private
   * @type {TouchEvent}
   */

  var _lastTouch$1;
  /**
   * Based on a click event object in an area,
   * checks if the click was triggered onto a scrollbar.
   * @param {DSSelectorArea} area
   * @param {DSEvent} event
   * @return {boolean}
   */


  var _isSelectorAreaClick = (function (area, event) {
    // touchend has not touches. so we take the last touch if a touchevent, we need to store the positions
    if ('touches' in event && event.type !== 'touchend') _lastTouch$1 = event; // if a touchevent, return the last touch rather than the regular event
    // we need .touches[0] from that event instead

    var _event = 'touches' in event ? _lastTouch$1.touches[0] : event;

    var cPos = {
      x: _event.clientX,
      y: _event.clientY,
      w: 0,
      h: 0
    };
    var areaRect = {
      x: area.getBoundingClientRect().left,
      y: area.getBoundingClientRect().top,
      w: area.offsetWidth,
      h: area.offsetHeight
    };
    return _isCollision(cPos, areaRect);
  });

  /**
   * Transforms any list or single item to an array so user doesn’t have to care.
   * @param {DSInputElements} items a single item, a Node-list or any element group
   * @return {DSElements}
   */

  var _toArray = (function (items) {
    if (!items) return [];
    if (!Array.isArray(items) && (items instanceof HTMLElement || items instanceof SVGElement)) return [items];
    return _toConsumableArray(items);
  });

  /**
   * Updates element style left, top, width, height values
   * according to pos input object.
   * @param {DSElement} element
   * @param {{ x:number, y:number, w:number, h:number }} pos
   * @return {DSElement}
   */

  var _updatePos = (function (element, pos) {
    element.style.left = "".concat(pos.x, "px");
    element.style.top = "".concat(pos.y, "px");
    element.style.width = "".concat(pos.w, "px");
    element.style.height = "".concat(pos.h, "px");
    return element;
  });

  //////////////////////////////////////////////////////////////////////////////////////

  var DragSelect = /*#__PURE__*/function () {
    /** @type {boolean} **/

    /** @type {{x: number, y: number}} */

    /** @type {{x: number, y: number}} */

    /** @type {{x: number, y: number}} */

    /** @type {{x: number, y: number}} */

    /** @type {Array.<(SVGElement|HTMLElement)>} */

    /** @type {Array.<(SVGElement|HTMLElement)>} */
    // memory to fix #9

    /** @type {number|null} */

    /**
     * @class DragSelect
     * @constructor DragSelect
     * @param {Settings} settings
     */
    function DragSelect(_ref) {
      var _this = this;

      var _ref$area = _ref.area,
          area = _ref$area === void 0 ? document : _ref$area,
          _ref$autoScrollSpeed = _ref.autoScrollSpeed,
          autoScrollSpeed = _ref$autoScrollSpeed === void 0 ? 1 : _ref$autoScrollSpeed,
          _ref$customStyles = _ref.customStyles,
          customStyles = _ref$customStyles === void 0 ? false : _ref$customStyles,
          _ref$hoverClass = _ref.hoverClass,
          hoverClass = _ref$hoverClass === void 0 ? 'ds-hover' : _ref$hoverClass,
          _ref$multiSelectKeys = _ref.multiSelectKeys,
          multiSelectKeys = _ref$multiSelectKeys === void 0 ? ['ctrlKey', 'shiftKey', 'metaKey'] : _ref$multiSelectKeys,
          _ref$multiSelectMode = _ref.multiSelectMode,
          multiSelectMode = _ref$multiSelectMode === void 0 ? false : _ref$multiSelectMode,
          _ref$selectableClass = _ref.selectableClass,
          selectableClass = _ref$selectableClass === void 0 ? 'ds-selectable' : _ref$selectableClass,
          _ref$selectables = _ref.selectables,
          selectables = _ref$selectables === void 0 ? [] : _ref$selectables,
          _ref$selectedClass = _ref.selectedClass,
          selectedClass = _ref$selectedClass === void 0 ? 'ds-selected' : _ref$selectedClass,
          _ref$selector = _ref.selector,
          selector = _ref$selector === void 0 ? undefined : _ref$selector,
          _ref$selectorClass = _ref.selectorClass,
          selectorClass = _ref$selectorClass === void 0 ? 'ds-selector' : _ref$selectorClass,
          _ref$selectorAreaClas = _ref.selectorAreaClass,
          selectorAreaClass = _ref$selectorAreaClas === void 0 ? 'ds-selector-area' : _ref$selectorAreaClas,
          _ref$zoom = _ref.zoom,
          zoom = _ref$zoom === void 0 ? 1 : _ref$zoom,
          callback = _ref.callback,
          onDragMove = _ref.onDragMove,
          onDragStart = _ref.onDragStart,
          onDragStartBegin = _ref.onDragStartBegin,
          onElementSelect = _ref.onElementSelect,
          onElementUnselect = _ref.onElementUnselect;

      _classCallCheck(this, DragSelect);

      _defineProperty(this, "_multiSelectKeyPressed", false);

      _defineProperty(this, "_initialCursorPos", {
        x: 0,
        y: 0
      });

      _defineProperty(this, "_newCursorPos", {
        x: 0,
        y: 0
      });

      _defineProperty(this, "_previousCursorPos", {
        x: 0,
        y: 0
      });

      _defineProperty(this, "_initialScroll", {
        x: 0,
        y: 0
      });

      _defineProperty(this, "_selected", []);

      _defineProperty(this, "_prevSelected", []);

      _defineProperty(this, "_autoScrollInterval", null);

      _defineProperty(this, "_onClick", function (event) {
        return _this.handleClick(event);
      });

      _defineProperty(this, "_startUp", function (event) {
        return _this.startUp(event);
      });

      _defineProperty(this, "_handleMove", function (event) {
        return _this.handleMove(event);
      });

      _defineProperty(this, "_end", function (event) {
        return _this.reset(event, true);
      });

      this.selectedClass = selectedClass;
      this.hoverClass = hoverClass;
      this.selectorClass = selectorClass;
      this.selectableClass = selectableClass;
      this.selectables = [];
      this._initialSelectables = _toArray(selectables);
      this.multiSelectKeys = multiSelectKeys;
      this.multiSelectMode = multiSelectMode;
      this.autoScrollSpeed = autoScrollSpeed === 0 ? 0 : autoScrollSpeed;
      this.area = _handleArea(area);
      this.customStyles = customStyles;
      this.zoom = zoom;

      this._setupPubSub();

      this._callbacksTemp({
        callback: callback,
        onDragMove: onDragMove,
        onDragStart: onDragStart,
        onDragStartBegin: onDragStartBegin,
        onElementSelect: onElementSelect,
        onElementUnselect: onElementUnselect
      }); // Selector


      this.selector = selector || _createSelector(this.customStyles);
      this.selector.classList.add(this.selectorClass);
      this.SelectorArea = new SelectorArea({
        Area: {
          node: this.area
        },
        selectorAreaClass: selectorAreaClass,
        selector: this.selector
      });
      this.start();
    }

    _createClass(DragSelect, [{
      key: "_setupPubSub",
      value: function _setupPubSub() {
        this.PubSub = new PubSub();
        this.subscribe = this.PubSub.subscribe.bind(this.PubSub);
        this.unsubscribe = this.PubSub.unsubscribe.bind(this.PubSub);
        this.publish = this.PubSub.publish.bind(this.PubSub);
      } // @TODO: remove after deprecation

    }, {
      key: "_callbacksTemp",
      value: function _callbacksTemp(_ref2) {
        var callback = _ref2.callback,
            onDragMove = _ref2.onDragMove,
            onDragStart = _ref2.onDragStart,
            onDragStartBegin = _ref2.onDragStartBegin,
            onElementSelect = _ref2.onElementSelect,
            onElementUnselect = _ref2.onElementUnselect;

        var warnMessage = function warnMessage(name, newName) {
          return console.warn("[DragSelect] ".concat(name, " is being deprecated. Use DragSelect.subscribe(\"").concat(newName, "\", (callbackObject) => {}) instead. See docs for more info"));
        };

        if (callback) {
          warnMessage('callback', 'callback');
          this.subscribe('callback', function (_ref3) {
            var items = _ref3.items,
                item = _ref3.item,
                event = _ref3.event;
            return callback(items, event);
          });
        }

        if (onDragMove) {
          warnMessage('onDragMove', 'dragmove');
          this.subscribe('dragmove', function (_ref4) {
            var items = _ref4.items,
                item = _ref4.item,
                event = _ref4.event;
            return onDragMove(event);
          });
        }

        if (onDragStart) {
          warnMessage('onDragStart', 'dragstart');
          this.subscribe('dragstart', function (_ref5) {
            var items = _ref5.items,
                item = _ref5.item,
                event = _ref5.event;
            return onDragStart(event);
          });
        }

        if (onDragStartBegin) {
          warnMessage('onDragStartBegin', 'dragstartbegin');
          this.subscribe('dragstartbegin', function (_ref6) {
            var items = _ref6.items,
                item = _ref6.item,
                event = _ref6.event;
            return onDragStartBegin(event);
          });
        }

        if (onElementSelect) {
          warnMessage('onElementSelect', 'elementselect');
          this.subscribe('elementselect', function (_ref7) {
            var items = _ref7.items,
                item = _ref7.item,
                event = _ref7.event;
            return onElementSelect(item, event);
          });
        }

        if (onElementUnselect) {
          warnMessage('onElementUnselect', 'elementunselect');
          this.subscribe('elementunselect', function (_ref8) {
            var items = _ref8.items,
                item = _ref8.item,
                event = _ref8.event;
            return onElementUnselect(item, event);
          });
        }
      }
      /**
       * Add/Remove Selectables also handles css classes and event listeners.
       * @param {DSElements} selectables - selectable elements.
       * @param {boolean} [remove] - if elements should be removed.
       * @param {boolean} [fromSelection] - if elements should also be added/removed to the selection.
       * @private
       */

    }, {
      key: "_handleSelectables",
      value: function _handleSelectables(selectables, remove, fromSelection) {
        for (var index = 0; index < selectables.length; index++) {
          var selectable = selectables[index];
          var indexOf = this.selectables.indexOf(selectable);

          if (indexOf < 0 && !remove) {
            this._addSelectable(selectable, fromSelection);
          } else if (indexOf > -1 && remove) {
            this._removeSelectable(selectable, indexOf, fromSelection);
          }
        }
      }
      /**
       * @param {(HTMLElement|SVGElement)} selectable
       * @param {boolean} toSelection also adds it to the current selection
       * @private
       */

    }, {
      key: "_addSelectable",
      value: function _addSelectable(selectable, toSelection) {
        selectable.classList.add(this.selectableClass);
        selectable.addEventListener('click', this._onClick);
        this.selectables.push(selectable); // also add to current selection

        if (toSelection && this._selected.indexOf(selectable) < 0) {
          selectable.classList.add(this.selectedClass);

          this._selected.push(selectable);
        }
      }
      /**
       * @param {(HTMLElement|SVGElement)} selectable
       * @param {number} indexOf
       * @param {boolean} [fromSelection] also adds it to the current selection
       * @private
       */

    }, {
      key: "_removeSelectable",
      value: function _removeSelectable(selectable, indexOf, fromSelection) {
        selectable.classList.remove(this.hoverClass);
        selectable.classList.remove(this.selectableClass);
        selectable.removeEventListener('click', this._onClick);
        this.selectables.splice(indexOf, 1); // also remove from current selection

        if (fromSelection && this._selected.indexOf(selectable) > -1) {
          selectable.classList.remove(this.selectedClass);

          this._selected.splice(this._selected.indexOf(selectable), 1);
        }
      }
      /**
       * @param {MouseEvent} event
       * @private
       */

    }, {
      key: "handleClick",

      /**
       * Triggers when a node is actively selected.
       *
       * This might be an "onClick" method but it also triggers when
       * <button> nodes are pressed via the keyboard.
       * Making DragSelect accessible for everyone!
       *
       * @param {MouseEvent} event
       * @private
       */
      value: function handleClick(event) {
        if (this.mouseInteraction) return; // fix firefox doubleclick issue

        if (event.button === 2) return; // right-clicks

        /** @type {any} */

        var node = event.target;
        if (!this.selectables.includes(node)) return;
        if (!_isInArea(node, this.area, this.SelectorArea.node)) return; // fix for multi-selection issue #9

        this._multiSelectKeyPressed = _isMultiSelectKeyPressed(this.multiSelectKeys, this.multiSelectMode, event);
        if (this._multiSelectKeyPressed) this._prevSelected = this._selected.slice();else this._prevSelected = []; // actual selection logic

        this.checkIfInsideSelection(true); // reset selection if no multiselectionkeypressed

        this.toggle(node);

        this._end(event);
      } // Start
      //////////////////////////////////////////////////////////////////////////////////////

      /**
       * Starts the functionality. Automatically triggered when created.
       * Also, reset the functionality after a teardown
       */

    }, {
      key: "start",
      value: function start() {
        this._handleSelectables(this._initialSelectables);

        this.area.addEventListener('mousedown', this._startUp);
        this.area.addEventListener('touchstart', this._startUp, {
          passive: false
        });
        this.SelectorArea.start();
      }
      /**
       * @param {DSEvent} event - The event object.
       * @private
       */

    }, {
      key: "startUp",

      /**
       * Startup when the area is clicked.
       * @param {DSEvent} event - The event object.
       * @private
       */
      value: function startUp(event) {
        // touchmove handler
        if (event.type === 'touchstart') // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
          event.preventDefault();
        this.mouseInteraction = true; // right-clicks

        if (
        /** @type {*} */
        event.button === 2) return;
        if (!_isSelectorAreaClick(this.SelectorArea.node, event)) return; // callback

        this.PubSub.publish('dragstartbegin', {
          items: this.getSelection(),
          event: event
        });
        if (this._breaked) return false;
        this.selector.style.display = 'block';
        this._multiSelectKeyPressed = _isMultiSelectKeyPressed(this.multiSelectKeys, this.multiSelectMode, event);
        if (this._multiSelectKeyPressed) this._prevSelected = this._selected.slice(); // #9
        else this._prevSelected = []; // #9
        // move element on location

        this._getStartingPositions(event);

        this.checkIfInsideSelection(true);
        this.selector.style.display = 'none'; // hidden unless moved, fix for issue #8
        // callback

        this.PubSub.publish('dragstart', {
          items: this.getSelection(),
          event: event
        });
        if (this._breaked) return false; // event listeners

        this.area.removeEventListener('mousedown', this._startUp);
        this.area.removeEventListener('touchstart', this._startUp, {
          // @ts-ignore
          passive: false
        });
        document.addEventListener('mousemove', this._handleMove);
        document.addEventListener('touchmove', this._handleMove, {
          passive: false
        });
        document.addEventListener('mouseup', this._end);
        document.addEventListener('touchend', this._end);
      }
      /**
       * Grabs the starting position of all needed elements
       * @param {DSEvent} event - The event object.
       * @private
       */

    }, {
      key: "_getStartingPositions",
      value: function _getStartingPositions(event) {
        this._initialCursorPos = this._newCursorPos = _getCursorPos(this.SelectorArea.node, event);
        this._initialScroll = getCurrent(this.area);
        var selectorPos = {};
        selectorPos.x = this._initialCursorPos.x + this._initialScroll.x;
        selectorPos.y = this._initialCursorPos.y + this._initialScroll.y;
        selectorPos.w = 0;
        selectorPos.h = 0;

        _updatePos(this.selector, selectorPos);
      } // Movements/Sizing of selection
      //////////////////////////////////////////////////////////////////////////////////////

      /**
       * @param {DSEvent} event - The event object.
       * @private
       */

    }, {
      key: "handleMove",

      /**
       * Handles what happens while the mouse is moved
       * @param {DSEvent} event - The event object.
       * @private
       */
      value: function handleMove(event) {
        this._newCursorPos = _getCursorPos(this.SelectorArea.node, event); // callback

        this.PubSub.publish('dragmove', {
          items: this.getSelection(),
          event: event
        });
        if (this._breaked) return false;
        this.selector.style.display = 'block'; // hidden unless moved, fix for issue #8
        // move element on location

        this._moveSelection(event); // scroll area if area is scroll-able


        this._setScrollState(event);
      }
    }, {
      key: "_moveSelection",
      value: function _moveSelection(event, zoom) {
        _updatePos(this.selector, _getSelectorPosition(this.SelectorArea.node, this.area, this._initialScroll, this._initialCursorPos, zoom, event));

        this.checkIfInsideSelection(null);
      } // Colision detection
      //////////////////////////////////////////////////////////////////////////////////////

      /**
       * Checks if any selectable element is inside selection.
       * @param {boolean} [force] forces through. Handles first clicks and accessibility. Here is user is clicking directly onto some element at start, (contrary to later hovers) we can assume that he really wants to select/deselect that item.
       * @return {boolean}
       */

    }, {
      key: "checkIfInsideSelection",
      value: function checkIfInsideSelection(force) {
        var anyInside = false;

        for (var i = 0, il = this.selectables.length; i < il; i++) {
          var selectable = this.selectables[i];

          if (_isElementTouching(selectable, this.selector, this.area, this.SelectorArea.node)) {
            this._handleSelection(selectable, force);

            anyInside = true;
          } else {
            this._handleUnselection(selectable, force);
          }
        }

        return anyInside;
      }
      /**
       * Logic when an item is selected
       * @param {(HTMLElement|SVGElement)} item selected item.
       * @param {boolean} [force] forces through.
       * @private
       */

    }, {
      key: "_handleSelection",
      value: function _handleSelection(item, force) {
        if (item.classList.contains(this.hoverClass) && !force) return false;
        if (!this._selected.includes(item)) this.select(item);else if (this._multiSelectKeyPressed) this.unselect(item);
        item.classList.add(this.hoverClass);
      }
      /**
       * Logic when an item is de-selected
       * @param {(HTMLElement|SVGElement)} item selected item.
       * @param {boolean} [force] forces through.
       * @private
       */

    }, {
      key: "_handleUnselection",
      value: function _handleUnselection(item, force) {
        if (!item.classList.contains(this.hoverClass) && !force) return false;

        var inSelection = this._selected.includes(item);

        var inPrevSelection = this._prevSelected.includes(item); // #9

        /**
         * Special algorithm for issue #9.
         * if a multiselectkey is pressed, ds 'remembers' the last selection and reverts
         * to that state if the selection is not kept, to mimic the natural OS behaviour
         * = if item was selected and is not in selection anymore, reselect it
         * = if item was not selected and is not in selection anymore, unselect it
         */


        if (inSelection && !inPrevSelection) this.unselect(item);else if (!inSelection && inPrevSelection) this.select(item);
        item.classList.remove(this.hoverClass);
      }
      /**
       * Adds an item to the selection.
       * @param {(HTMLElement|SVGElement)} item selected item.
       * @return {(HTMLElement|SVGElement|false)} item
       */

    }, {
      key: "select",
      value: function select(item) {
        if (this._selected.indexOf(item) > -1) return false;

        this._selected.push(item);

        item.classList.add(this.selectedClass);
        this.PubSub.publish('elementselect', {
          items: this.getSelection(),
          item: item
        });
        if (this._breaked) return false;
        return item;
      }
      /**
       * Removes an item from the selection.
       * @param {(HTMLElement|SVGElement)} item selected item.
       * @return {(HTMLElement|SVGElement|false)} item
       */

    }, {
      key: "unselect",
      value: function unselect(item) {
        if (this._selected.indexOf(item) < 0) return false;

        this._selected.splice(this._selected.indexOf(item), 1);

        item.classList.remove(this.selectedClass);
        this.PubSub.publish('elementunselect', {
          items: this.getSelection(),
          item: item
        });
        if (this._breaked) return false;
        return item;
      }
      /**
       * Adds/Removes an item to the selection.
       * If it is already selected = remove, if not = add.
       * @param {(HTMLElement|SVGElement)} item – item to select.
       * @return {(HTMLElement|SVGElement)} item
       */

    }, {
      key: "toggle",
      value: function toggle(item) {
        if (this._selected.includes(item)) this.unselect(item);else this.select(item);
        return item;
      } // Autoscroll
      //////////////////////////////////////////////////////////////////////////////////////

      /**
       * Creates an interval that autoscrolls while the cursor is near the edge
       * @param {DSEvent} event – event object.
       * @private
       */

    }, {
      key: "_setScrollState",
      value: function _setScrollState(event) {
        var _this2 = this;

        var edges = _isCursorNearEdges(this.SelectorArea.node, event);

        if (edges.length) {
          if (this._autoScrollInterval) window.clearInterval(this._autoScrollInterval);
          this._autoScrollInterval = window.setInterval(function () {
            _this2._newCursorPos = _getCursorPos(_this2.SelectorArea.node, event);

            _this2._moveSelection(event, _this2.zoom);

            _autoScroll(_this2.area, edges, _this2.autoScrollSpeed);
          });
        } else if (!edges.length && this._autoScrollInterval) {
          window.clearInterval(this._autoScrollInterval);
          this._autoScrollInterval = null;
        }
      } // Ending
      //////////////////////////////////////////////////////////////////////////////////////

      /**
       * Triggered on mouse click release (end of dragging a selection).
       * Calls the callback method & unbind functions.
       * @param {DSEvent} event - The event object.
       * @private
       */

    }, {
      key: "reset",

      /**
       * Unbind functions i.e. when mouse click is released
       * @param {Object} [event] - The event object.
       * @param {boolean} [withCallback] - whether or not the callback should be called
       */
      value: function reset$1(event, withCallback) {
        var _this3 = this;

        this._previousCursorPos = _getCursorPos(this.SelectorArea.node, event);

        reset();

        document.removeEventListener('mouseup', this._end);
        document.removeEventListener('touchend', this._end);
        document.removeEventListener('mousemove', this._handleMove);
        document.removeEventListener('touchmove', this._handleMove, {
          // @ts-ignore
          passive: false
        });
        this.area.addEventListener('mousedown', this._startUp);
        this.area.addEventListener('touchstart', this._startUp, {
          passive: false
        });
        if (withCallback) this.PubSub.publish('callback', {
          items: this.getSelection(),
          event: event
        });
        if (this._breaked) return false;
        this.selector.style.width = '0';
        this.selector.style.height = '0';
        this.selector.style.display = 'none';

        if (this._autoScrollInterval) {
          window.clearInterval(this._autoScrollInterval);
          this._autoScrollInterval = null;
        }

        setTimeout(function () {
          return (// debounce in order "onClick" to work
            _this3.mouseInteraction = false
          );
        }, 100);
      }
      /**
       * Function break: used in callbacks to disable the execution of the upcoming code at the specific moment
       * In contrary to stop():
       * - Event listeners, callback calls and calculation will continue working
       * - Selector won’t display and will not select
       */

    }, {
      key: "break",
      value: function _break() {
        var _this4 = this;

        this._breaked = true;
        setTimeout( // debounce the break should only break once instantly after call
        function () {
          return _this4._breaked = false;
        }, 100);
      }
      /**
       * Complete function teardown
       * Will teardown/stop the whole functionality
       * @param {boolean} [remove=true] - if elements should be removed.
       * @param {boolean} [fromSelection=true] - if elements should also be added/removed to the selection.
       * @param {boolean} [withCallback] - if elements should also be added/removed to the selection.
       */

    }, {
      key: "stop",
      value: function stop() {
        var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var fromSelection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var withCallback = arguments.length > 2 ? arguments[2] : undefined;
        this.reset(false, withCallback);
        this.SelectorArea.stop();
        this.area.removeEventListener('mousedown', this._startUp);
        this.area.removeEventListener('touchstart', this._startUp, {
          // @ts-ignore
          passive: false
        });
        document.removeEventListener('mouseup', this._end);
        document.removeEventListener('touchend', this._end);

        this._handleSelectables(_toConsumableArray(this.selectables), remove, fromSelection);
      } // Useful methods for the user
      //////////////////////////////////////////////////////////////////////////////////////

      /**
       * Returns the current selected nodes
       * @return {Array.<(HTMLElement|SVGElement)>}
       */

    }, {
      key: "getSelection",
      value: function getSelection() {
        return _toConsumableArray(this._selected);
      }
      /**
       * Adds several elements to the selection list
       * also adds the specific classes and take into account all calculations.
       * Does not clear the selection, in contrary to .setSelection
       * Can add multiple elements at once, in contrary to .select
       * @param {DSInputElements} elements one or multiple elements
       * @param {boolean} [triggerCallback] - if callback should be called
       * @param {boolean} [dontAddToSelectables] - if element should not be added to the list of selectable elements
       * @return {DSElements} all selected elements
       */

    }, {
      key: "addSelection",
      value: function addSelection(elements, triggerCallback, dontAddToSelectables) {
        var _this5 = this;

        var nodes = _toArray(elements);

        nodes.forEach(function (node) {
          return _this5.select(node);
        });
        if (!dontAddToSelectables) this.addSelectables(elements);
        if (triggerCallback) this.PubSub.publish('callback', {
          items: this.getSelection()
        });
        return this.getSelection();
      }
      /**
       * Removes specific elements from the selection
       * Multiple elements can be given at once, in contrary to unselect
       * @param {DSInputElements} elements one or multiple elements
       * @param {boolean} [triggerCallback] - if callback should be called
       * @param {boolean} [removeFromSelectables] - if element should be removed from the list of selectable elements
       * @return {DSElements} all selected elements
       */

    }, {
      key: "removeSelection",
      value: function removeSelection(elements, triggerCallback, removeFromSelectables) {
        var _this6 = this;

        var nodes = _toArray(elements);

        nodes.forEach(function (node) {
          return _this6.unselect(node);
        });

        if (removeFromSelectables) {
          this.removeSelectables(elements);
        }

        if (triggerCallback) {
          this.PubSub.publish('callback', {
            items: this.getSelection()
          });
        }

        return this.getSelection();
      }
      /**
       * Toggles specific elements from the selection:
       * If element is not in selection it will be added, if it is already selected, it will be removed.
       * Multiple elements can be given at once.
       * @param {DSInputElements} elements one or multiple elements
       * @param {boolean} [triggerCallback] - if callback should be called
       * @param {boolean} [special] - if true, it also removes selected elements from possible selectable elements & don’t add them to selectables if they are not
       * @return {DSElements} all selected elements
       */

    }, {
      key: "toggleSelection",
      value: function toggleSelection(elements, triggerCallback, special) {
        var nodes = _toArray(elements);

        for (var index = 0, il = nodes.length; index < il; index++) {
          var node = nodes[index];

          if (this._selected.indexOf(node) < 0) {
            this.addSelection(node, triggerCallback, special);
          } else {
            this.removeSelection(node, triggerCallback, special);
          }
        }

        return this._selected;
      }
      /**
       * Sets the current selected elements and optionally run the callback
       * By default, adds new elements also to the list of selectables
       * @param {DSInputElements} elements – dom elements
       * @param {boolean} [triggerCallback] - if callback should be called
       * @param {boolean} [dontAddToSelectables] - if element should not be added to the list of selectable elements
       * @return {DSElements}
       */

    }, {
      key: "setSelection",
      value: function setSelection(elements, triggerCallback, dontAddToSelectables) {
        this.clearSelection();
        this.addSelection(elements, triggerCallback, dontAddToSelectables);
        return this._selected;
      }
      /**
       * Unselect / Deselect all current selected Nodes
       * @param {boolean} [triggerCallback] - if callback should be called
       * @return {DSElements} this.selected, should be empty
       */

    }, {
      key: "clearSelection",
      value: function clearSelection(triggerCallback) {
        var _this7 = this;

        var selection = this._selected.slice();

        selection.forEach(function (element) {
          return _this7.unselect(element);
        });
        if (triggerCallback) this.PubSub.publish('callback', {
          items: this.getSelection()
        });
        return this.getSelection();
      }
      /**
       * Add elements that can be selected.
       * The algorithm makes sure that no node is added twice
       * @param {DSInputElements} elements dom element(s)
       * @param {boolean} [addToSelection] if elements should also be added to current selection
       * @return {DSInputElements} the added element(s)
       */

    }, {
      key: "addSelectables",
      value: function addSelectables(elements, addToSelection) {
        var nodes = _toArray(elements);

        this._handleSelectables(nodes, false, addToSelection);

        return elements;
      }
      /**
       * Gets all nodes that can be selected
       * @return {DSElements} this.selectables
       */

    }, {
      key: "getSelectables",
      value: function getSelectables() {
        return this.selectables;
      }
      /**
       * Sets all elements that can be selected.
       * Removes all current selectables (& their respective classes).
       * Adds the new set to the selectables set, thus replacing the original set.
       * @param {DSInputElements} elements – dom element(s)
       * @param {boolean} [removeFromSelection] if elements should also be removed from current selection
       * @param {boolean} [addToSelection] if elements should also be added to current selection
       * @return {DSInputElements} elements – the added element(s)
       */

    }, {
      key: "setSelectables",
      value: function setSelectables(elements, removeFromSelection, addToSelection) {
        this._handleSelectables(this.getSelectables(), true, removeFromSelection);

        return this.addSelectables(elements, addToSelection);
      }
      /**
       * Remove elements from the elements that can be selected.
       * @param {DSInputElements} elements – dom element(s)
       * @param {boolean} [removeFromSelection] if elements should also be removed from current selection
       * @return {DSInputElements} the removed element(s)
       */

    }, {
      key: "removeSelectables",
      value: function removeSelectables(elements, removeFromSelection) {
        var nodes = _toArray(elements);

        this._handleSelectables(nodes, true, removeFromSelection);

        return elements;
      }
      /**
       * Returns the starting/initial position of the cursor/selector
       * @return {{x:number,y:number}}
       */

    }, {
      key: "getInitialCursorPosition",
      value: function getInitialCursorPosition() {
        return this._initialCursorPos;
      }
      /**
       * Returns the last seen position of the cursor/selector
       * @return {{x:number,y:number}}
       */

    }, {
      key: "getCurrentCursorPosition",
      value: function getCurrentCursorPosition() {
        return this._newCursorPos;
      }
      /**
       * Returns the previous position of the cursor/selector
       * @return {{x:number,y:number}}
       */

    }, {
      key: "getPreviousCursorPosition",
      value: function getPreviousCursorPosition() {
        return this._previousCursorPos;
      }
      /**
       * Returns the cursor position difference between start and now
       * If usePreviousCursorDifference is passed,
       * it will output the cursor position difference between the previous selection and now
       * @param {boolean} [usePreviousCursorDifference]
       * @return {{x:number,y:number}}
       */

    }, {
      key: "getCursorPositionDifference",
      value: function getCursorPositionDifference(usePreviousCursorDifference) {
        var posA = this.getCurrentCursorPosition();
        var posB = usePreviousCursorDifference ? this.getPreviousCursorPosition() : this.getInitialCursorPosition();
        return {
          x: posA.x - posB.x,
          y: posA.y - posB.y
        };
      }
    }]);

    return DragSelect;
  }();

  return DragSelect;

})));
