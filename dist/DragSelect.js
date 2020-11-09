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
   * @property {DSCallback} [callback=() => {}] a callback function that gets fired when the element is dropped. This callback gets a property which is an array that holds all selected nodes. The second property passed is the event object.
   * @property {boolean} [customStyles=false] if set to true, no styles (except for position absolute) will be applied by default
   * @property {string} [hoverClass=ds-hover] the class assigned to the mouse hovered items
   * @property {boolean} [multiSelectMode=false] Add newly selected elements to the selection instead of replacing them.
   * @property {DSGenericInteractionCallbackEvent} [onDragMove=()=>{}] It is fired when the user drags. This callback gets the event object. Executed before DragSelect function code ran, after getting the current mouse position.
   * @property {DSGenericInteractionCallbackEvent} [onDragStartBegin=()=>{}] Is fired when the user clicks in the area. This callback gets the event object. Executed *before* DragSelect function code ran.
   * @property {DSGenericInteractionCallbackEvent} [onDragStart=()=>{}] It is fired when the user clicks in the area. This callback gets the event object. Executed after DragSelect function code ran, before the setup of event listeners.
   * @property {DSInteractionCallbackEvent} [onElementSelect=()=>{}] It is fired every time an element is selected. This callback gets a property which is the just selected node
   * @property {DSInteractionCallbackEvent} [onElementUnselect=()=>{}] It is fired every time an element is de-selected. This callback gets a property which is the just de-selected node
   * @property {string} [selectableClass=ds-selectable] the class assigned to the elements that can be selected
   * @property {HTMLElement[] | SVGElement[] | HTMLElement | SVGElement} [selectables=[]] the elements that can be selected
   * @property {string} [selectedClass=ds-selected] the class assigned to the selected items
   * @property {HTMLElement} [selector=HTMLElement] the square that will draw the selection
   * @property {string} [selectorClass=ds-selector] the class assigned to the square selector helper
   * @property {Array.<'ctrlKey'|'shiftKey'|'metaKey'>} [multiSelectKeys=['ctrlKey', 'shiftKey', 'metaKey']] An array of keys that allows switching to the multi-select mode (see the @multiSelectMode option). The only possible values are keys that are provided via the event object. So far: <kbd>ctrlKey</kbd>, <kbd>shiftKey</kbd>, <kbd>metaKey</kbd> and <kbd>altKey</kbd>. Provide an empty array `[]` if you want to turn off the functionality.
   */

  /**
   * @typedef {function} DSCallback
   * @param {DSElements} selected - The selected items
   * @param {DSEvent} [event]
   * @return {*}
   */

  /**
   * @typedef {function} DSGenericInteractionCallbackEvent
   * @param {DSEvent} [event]
   * @return {*}
   */

  /**
   * @typedef {function} DSInteractionCallbackEvent
   * @param {DSElement} item
   * @return {*}
   */

  /** @typedef {HTMLElement|SVGElement|HTMLDocument} DSArea area in which you can drag */

  /** @typedef {Array.<HTMLElement|SVGElement> | HTMLElement | SVGElement} DSInputElements the elements that can be selected */

  /** @typedef {Array.<HTMLElement|SVGElement>} DSElements the elements that can be selected */

  /** @typedef {HTMLElement|SVGElement} DSElement a single element that can be selected */

  /** @typedef {MouseEvent|TouchEvent} DSEvent en event from a touch or mouse interaction */

  /** @typedef {number} DSZoom Zoom scale factor. Unit scale zoom */

  /** @typedef {Array.<'ctrlKey'|'shiftKey'|'metaKey'>} DSMultiSelectKeys An array of keys that allows switching to the multi-select mode */

  /**
   * Scroll the area in the direction of edge
   * @param {DSArea} area
   * @param {('top'|'bottom'|'left'|'right'|false)} edge
   * @param {number} autoScrollSpeed
   */

  var _autoScroll = (function (area, edge, autoScrollSpeed) {
    var docEl = document && document.documentElement && document.documentElement.scrollTop && document.documentElement;

    var _area = area instanceof HTMLDocument ? docEl || document.body : area;

    var scrollTop = edge === 'top' && _area.scrollTop > 0;
    var scrollBot = edge === 'bottom';
    var scrollLeft = edge === 'left' && _area.scrollLeft > 0;
    var scrollRight = edge === 'right';
    if (scrollTop) _area.scrollTop -= 1 * autoScrollSpeed;else if (scrollBot) _area.scrollTop += 1 * autoScrollSpeed;else if (scrollLeft) _area.scrollLeft -= 1 * autoScrollSpeed;else if (scrollRight) _area.scrollLeft += 1 * autoScrollSpeed;
  });

  /**
   * Create the selector node when not provided by options object.
   * @param {boolean} customStyles
   * @param {DSArea} area
   * @return {HTMLElement}
   */

  var _createSelector = (function (customStyles, area) {
    var selector = document.createElement('div');
    selector.style.position = 'absolute';

    if (!customStyles) {
      selector.style.background = 'rgba(0, 0, 255, 0.1)';
      selector.style.border = '1px solid rgba(0, 0, 255, 0.45)';
      selector.style.display = 'none';
      selector.style.pointerEvents = 'none'; // fix for issue #8 (ie11+)
    }

    var _area = area === document ? document.body : area;

    _area.appendChild(selector);

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
      width: area.clientWidth || rect.width,
      height: area.clientHeight || rect.height
    };
  });

  /**
   * @param {DSArea} area
   */

  var _getComputedBorder = (function (area) {
    if (area instanceof HTMLDocument) return 0;
    var computedStyles = getComputedStyle(area);
    return parseInt(computedStyles.borderWidth) || 0;
  });

  /** @type {TouchEvent} */

  var _lastTouch;
  /**
   * Returns cursor x, y position based on event object
   * /!\ for internal calculation reasons it does _not_ take
   * the AREA scroll into consideration unless it’s the outer Document.
   * Use the public .getCursorPos() for anything else, it’s more flexible
   * @param {DSArea} area
   * @param {DSZoom} zoom
   * @param {DSEvent} [event]
   * @return {{x: number, y: number}} cursor X/Y position
   */


  var _getCursorPos = (function (area, zoom, event) {
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

    var docScroll = _getScroll(); // needed when document is scroll-able but area is not


    return {
      // if it’s constrained in an area the area should be subtracted calculate
      x: (cPos.x - areaRect.left - docScroll.x) / zoom,
      y: (cPos.y - areaRect.top - docScroll.y) / zoom
    };
  });

  /**
   * Returns the current x, y scroll value of area
   * If area has no scroll it will return 0
   * If area scrollTop/Left is not available
   * @param {DSArea} [area]
   * @return {{x:number,y:number}} scroll X/Y
   */

  var _getScroll = (function (area) {
    var body = {
      top: document.body.scrollTop > 0 ? document.body.scrollTop : document.documentElement.scrollTop,
      left: document.body.scrollLeft > 0 ? document.body.scrollLeft : document.documentElement.scrollLeft
    }; // when the rectangle is bound to the document, no scroll is needed

    var scroll = {
      // @ts-ignore
      y: area && area.scrollTop >= 0 ? area.scrollTop : body.top,
      // @ts-ignore
      x: area && area.scrollLeft >= 0 ? area.scrollLeft : body.left
    };
    return scroll;
  });

  /**
   * Reliably returns the exact x,y,w,h positions of the selector element
   * @param {DSArea} area
   * @param {DSZoom} zoom
   * @param {{x: number, y: number}} initialScroll
   * @param {{x: number, y: number}} initialCursorPos
   * @param {DSEvent} [event]
   * @returns {{x:number,y:number,w:number,h:number}}
   */

  var _getSelectorPosition = (function (area, zoom, initialScroll, initialCursorPos, event) {
    var cursorPosNew = _getCursorPos(area, zoom, event);

    var scrollNew = _getScroll(area); // if area or document is scrolled those values have to be included as well


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
     * Unfortunately, things get even more complicated when we are inside a scroll-able
     * DIV. Then, let’s say we scroll to the right by 10px and move the cursor right by 5px in our
     * checks we have to subtract 10px from the initialcursor position in our check
     * (since the initial position is moved to the left by 10px) so in our example:
     * 1. cursorPosNew.x (5) > initialCursorPos.x (0) - scrollAmount.x (10) === 5 > -10 === true
     * then reset the x position to its initial position (since we might have changed that
     * position when scrolling to the left before going right) in our example:
     * 2. selectorPos.x = initialCursorPos.x (0) + initialScroll.x (0) === 0;
     * then we can calculate the elements width, which is
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
     * I hope that makes sense. Try stuff out and play around with variables to get a hang of it.
     */

    var selectorPos = {}; // right

    if (cursorPosNew.x > initialCursorPos.x - scrollAmount.x) {
      // 1.
      selectorPos.x = initialCursorPos.x + initialScroll.x; // 2.

      selectorPos.w = cursorPosNew.x - initialCursorPos.x + scrollAmount.x; // 3.
      // left
    } else {
      // 1b.
      selectorPos.x = cursorPosNew.x + scrollNew.x; // 2b.

      selectorPos.w = initialCursorPos.x - cursorPosNew.x - scrollAmount.x; // 3b.
    } // bottom


    if (cursorPosNew.y > initialCursorPos.y - scrollAmount.y) {
      selectorPos.y = initialCursorPos.y + initialScroll.y;
      selectorPos.h = cursorPosNew.y - initialCursorPos.y + scrollAmount.y; // top
    } else {
      selectorPos.y = cursorPosNew.y + scrollNew.y;
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
   * Checks if there is a collision between the element and the selector
   * (whether they touch each other)
   * @param {DSElement} element
   * @param {HTMLElement} selector
   * @param {DSZoom} zoom
   * @param {DSArea} area
   * @return {boolean}
   */

  var _isElementTouching = (function (element, selector, zoom, area) {
    var scroll = _getScroll(area);

    var selectionRect = {
      y: selector.getBoundingClientRect().top / zoom + scroll.y,
      x: selector.getBoundingClientRect().left / zoom + scroll.x,
      h: selector.offsetHeight,
      w: selector.offsetWidth
    };
    var rect = element.getBoundingClientRect();
    var elementRect = {
      y: rect.top / zoom + scroll.y,
      x: rect.left / zoom + scroll.x,
      h: rect.height / zoom,
      w: rect.width / zoom
    }; // Axis-Aligned Bounding Box Collision Detection.
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

    if (selectionRect.x < elementRect.x + elementRect.w && selectionRect.x + selectionRect.w > elementRect.x && selectionRect.y < elementRect.y + elementRect.h && selectionRect.h + selectionRect.y > elementRect.y) {
      return true; // collision detected!
    } else {
      return false;
    }
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
   * Based on a click event object in an area,
   * checks if the click was triggered onto a scrollbar.
   * @param {DSArea} area
   * @param {DSZoom} zoom
   * @param {DSEvent} event
   * @return {boolean}
   */

  var _isScrollbarClick = (function (area, zoom, event) {
    var cPos = _getCursorPos(area, zoom, event);

    var areaRect = _getAreaRect(area);

    var border = _getComputedBorder(area);

    if (areaRect.width + border <= cPos.x) return true;
    if (areaRect.height + border <= cPos.y) return true;
    return false;
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

  /**
   * Check if the selector is near an edge of the area
   * @memberof DragSelect#
   * @function isCursorNearEdge
   * @param {DSArea} area
   * @param {DSZoom} zoom
   * @param {DSEvent} [event]
   * @return {('top'|'bottom'|'left'|'right'|false)}
   */

  var isCursorNearEdge = (function (area, zoom, event) {
    var cursorPosition = _getCursorPos(area, zoom, event);

    var areaRect = _getAreaRect(area);

    var tolerance = {
      x: Math.max(areaRect.width / 10, 30),
      y: Math.max(areaRect.height / 10, 30)
    };
    if (cursorPosition.y < tolerance.y) return 'top';
    if (areaRect.height - cursorPosition.y < tolerance.y) return 'bottom';
    if (areaRect.width - cursorPosition.x < tolerance.x) return 'right';
    if (cursorPosition.x < tolerance.x) return 'left';
    return false;
  });

  /**
   * Transforms any list or single item to an array so user doesn’t have to care.
   * @memberof DragSelect#
   * @function toArray
   * @param {DSInputElements} items a single item, a Node-list or any element group
   * @return {DSElements}
   */

  var toArray = (function (items) {
    if (!items) return [];
    if (!Array.isArray(items) && (items instanceof HTMLElement || items instanceof SVGElement)) return [items];
    return _toConsumableArray(items);
  });

  //////////////////////////////////////////////////////////////////////////////////////

  var DragSelect = /*#__PURE__*/function () {
    /** @type {boolean} */

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
          _ref$callback = _ref.callback,
          callback = _ref$callback === void 0 ? function () {} : _ref$callback,
          _ref$customStyles = _ref.customStyles,
          customStyles = _ref$customStyles === void 0 ? false : _ref$customStyles,
          _ref$hoverClass = _ref.hoverClass,
          hoverClass = _ref$hoverClass === void 0 ? 'ds-hover' : _ref$hoverClass,
          _ref$multiSelectKeys = _ref.multiSelectKeys,
          multiSelectKeys = _ref$multiSelectKeys === void 0 ? ['ctrlKey', 'shiftKey', 'metaKey'] : _ref$multiSelectKeys,
          _ref$multiSelectMode = _ref.multiSelectMode,
          multiSelectMode = _ref$multiSelectMode === void 0 ? false : _ref$multiSelectMode,
          _ref$onDragMove = _ref.onDragMove,
          onDragMove = _ref$onDragMove === void 0 ? function () {} : _ref$onDragMove,
          _ref$onDragStart = _ref.onDragStart,
          onDragStart = _ref$onDragStart === void 0 ? function () {} : _ref$onDragStart,
          _ref$onDragStartBegin = _ref.onDragStartBegin,
          onDragStartBegin = _ref$onDragStartBegin === void 0 ? function () {} : _ref$onDragStartBegin,
          _ref$onElementSelect = _ref.onElementSelect,
          onElementSelect = _ref$onElementSelect === void 0 ? function () {} : _ref$onElementSelect,
          _ref$onElementUnselec = _ref.onElementUnselect,
          onElementUnselect = _ref$onElementUnselec === void 0 ? function () {} : _ref$onElementUnselec,
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
          _ref$zoom = _ref.zoom,
          zoom = _ref$zoom === void 0 ? 1 : _ref$zoom;

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

      _defineProperty(this, "toArray", toArray);

      this.selectedClass = selectedClass;
      this.hoverClass = hoverClass;
      this.selectorClass = selectorClass;
      this.selectableClass = selectableClass;
      this.selectables = [];
      this._initialSelectables = toArray(selectables);
      this.multiSelectKeys = multiSelectKeys;
      this.multiSelectMode = multiSelectMode;
      this.autoScrollSpeed = autoScrollSpeed === 0 ? 0 : autoScrollSpeed;
      this.selectCallback = onElementSelect;
      this.unselectCallback = onElementUnselect;
      this.onDragStartBegin = onDragStartBegin;
      this.moveStartCallback = onDragStart;
      this.moveCallback = onDragMove;
      this.callback = callback;
      this.area = _handleArea(area);
      this.customStyles = customStyles;
      this.zoom = zoom; // Selector

      this.selector = selector || _createSelector(this.customStyles, this.area);
      this.selector.classList.add(this.selectorClass);
      this.start();
    }
    /**
     * Add/Remove Selectables also handles css classes and event listeners.
     * @param {DSElements} selectables - selectable elements.
     * @param {boolean} [remove] - if elements should be removed.
     * @param {boolean} [fromSelection] - if elements should also be added/removed to the selection.
     * @private
     */


    _createClass(DragSelect, [{
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
        if (this.mouseInteraction) {
          return;
        } // fix firefox doubleclick issue
        // right-clicks


        if (event.button === 2) return;
        /** @type {any} */

        var node = event.target;
        this._multiSelectKeyPressed = _isMultiSelectKeyPressed(this.multiSelectKeys, this.multiSelectMode, event);

        if (this._multiSelectKeyPressed) {
          this._prevSelected = this._selected.slice();
        } // #9
        else {
            this._prevSelected = [];
          } // #9


        this.checkIfInsideSelection(true); // reset selection if no multiselectionkeypressed

        if (this.selectables.indexOf(node) > -1) {
          this.toggle(node);
        }

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
        console.log('Startup!'); // touchmove handler

        if (event.type === 'touchstart') // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
          event.preventDefault(); // right-clicks

        if (
        /** @type {*} */
        event.button === 2) return;
        if (_isScrollbarClick(this.area, this.zoom, event)) return; // callback

        this.onDragStartBegin(event);
        if (this._breaked) return false;
        this.mouseInteraction = true;
        this.selector.style.display = 'block';
        this._multiSelectKeyPressed = _isMultiSelectKeyPressed(this.multiSelectKeys, this.multiSelectMode, event);
        if (this._multiSelectKeyPressed) this._prevSelected = this._selected.slice(); // #9
        else this._prevSelected = []; // #9
        // move element on location

        this._getStartingPositions(event);

        this.checkIfInsideSelection(true);
        this.selector.style.display = 'none'; // hidden unless moved, fix for issue #8
        // callback

        this.moveStartCallback(event);
        if (this._breaked) return false; // event listeners

        this.area.removeEventListener('mousedown', this._startUp);
        this.area.removeEventListener('touchstart', this._startUp, {
          // @ts-ignore
          passive: false
        });
        this.area.addEventListener('mousemove', this._handleMove);
        this.area.addEventListener('touchmove', this._handleMove, {
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
        this._initialCursorPos = this._newCursorPos = _getCursorPos(this.area, this.zoom, event);
        this._initialScroll = _getScroll(this.area);
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
        this._newCursorPos = _getCursorPos(this.area, this.zoom, event); // callback

        this.moveCallback(event);
        if (this._breaked) return false;
        this.selector.style.display = 'block'; // hidden unless moved, fix for issue #8
        // move element on location

        _updatePos(this.selector, _getSelectorPosition(this.area, this.zoom, this._initialScroll, this._initialCursorPos, event));

        this.checkIfInsideSelection(null); // scroll area if area is scroll-able

        this._setScrollState(event);
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

          if (_isElementTouching(selectable, this.selector, this.zoom, this.area)) {
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
        this.selectCallback(item);
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
        this.unselectCallback(item);
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

        var edge = isCursorNearEdge(this.area, this.zoom, event);

        if (edge) {
          if (this._autoScrollInterval) window.clearInterval(this._autoScrollInterval);
          this._autoScrollInterval = window.setInterval(function () {
            _this2._newCursorPos = _getCursorPos(_this2.area, _this2.zoom, event);

            _updatePos(_this2.selector, _getSelectorPosition(_this2.area, _this2.zoom, _this2._initialScroll, _this2._initialCursorPos, event));

            _this2.checkIfInsideSelection(null);

            _autoScroll(_this2.area, edge, _this2.autoScrollSpeed);
          });
        } else if (!edge && this._autoScrollInterval) {
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
      value: function reset(event, withCallback) {
        var _this3 = this;

        this._previousCursorPos = _getCursorPos(this.area, this.zoom, event);
        document.removeEventListener('mouseup', this._end);
        document.removeEventListener('touchend', this._end);
        this.area.removeEventListener('mousemove', this._handleMove);
        this.area.removeEventListener('touchmove', this._handleMove, {
          // @ts-ignore
          passive: false
        });
        this.area.addEventListener('mousedown', this._startUp);
        this.area.addEventListener('touchstart', this._startUp, {
          passive: false
        });
        if (withCallback) this.callback(this.getSelection(), event);
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

    }, {
      key: "getSelection",

      /**
       * Returns the current selected nodes
       * @return {Array.<(HTMLElement|SVGElement)>}
       */
      value: function getSelection() {
        return _toConsumableArray(this._selected);
      }
      /**
       * Returns cursor x, y position based on event object
       * Will be relative to an area including the scroll unless advised otherwise
       * @param {Object} [event]
       * @param {(HTMLElement|SVGElement|false)} [_area] containing area / this.area if === undefined / document if === false
       * @param {boolean} [ignoreScroll] if true, the scroll will be ignored
       * @return {{x:number,y:number}} cursor { x/y }
       */

    }, {
      key: "getCursorPos",
      value: function getCursorPos(event, _area, ignoreScroll) {
        if (!event) return {
          x: 0,
          y: 0
        };
        var area = _area || _area !== false && this.area;

        var pos = _getCursorPos(area, this.zoom, event);

        var scroll = ignoreScroll ? {
          x: 0,
          y: 0
        } : _getScroll(area);
        return {
          x: pos.x + scroll.x,
          y: pos.y + scroll.y
        };
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

        var nodes = toArray(elements);
        nodes.forEach(function (node) {
          return _this5.select(node);
        });
        if (!dontAddToSelectables) this.addSelectables(elements);
        if (triggerCallback) this.callback(this._selected);
        return this._selected;
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

        var nodes = toArray(elements);
        nodes.forEach(function (node) {
          return _this6.unselect(node);
        });

        if (removeFromSelectables) {
          this.removeSelectables(elements);
        }

        if (triggerCallback) {
          this.callback(this._selected);
        }

        return this._selected;
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
        var nodes = toArray(elements);

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
        if (triggerCallback) this.callback(this._selected);
        return this._selected;
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
        var nodes = toArray(elements);

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
        var nodes = toArray(elements);

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
