// STAR THIS PLUGIN ON GITHUB:
//
// https://github.com/ThibaultJanBeyer/dragSelect
//
// Please give it a like, this is what makes me happy :-)
// Thanks You

var selection = document.querySelector("#rectangle");
var items = document.querySelectorAll('.item');
var selected = [];
// on mousedown
document.addEventListener('mousedown', startUp);

function startUp(e) {
  console.log('START');
  var cursorPos = { // event.clientX/Y fallback for IE8-
    x: e.pageX || e.clientX,
    y: e.pageY || e.clientY
  };
  // move element on location
  selection.style.display = 'block';
  selection.style.top = cursorPos.y + 'px';
  selection.style.left = cursorPos.x + 'px';
  checkIfInside();
  
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', reset);
  
  // resize that div while mouse is pressed
  function move(e) {
    var cursorPos2 = { // event.clientX/Y fallback for IE8-
      x: e.pageX || e.clientX,
      y: e.pageY || e.clientY
    };
    // check for direction
    if(cursorPos2.x > cursorPos.x) {
      selection.style.width = cursorPos2.x - cursorPos.x + 'px';
    } else {
      selection.style.left = cursorPos2.x + 'px';
      selection.style.width = cursorPos.x - cursorPos2.x + 'px';
    }

    if(cursorPos2.y > cursorPos.y) {
      selection.style.height = cursorPos2.y - cursorPos.y + 'px';
    } else {
      selection.style.top = cursorPos2.y + 'px';
      selection.style.height = cursorPos.y - cursorPos2.y + 'px';
    }
    
    checkIfInside();
  }
  
  // and finally unbind those functions when mouse click is released
  function reset() {
    console.log('STOP');
    selection.style.width = '0';
    selection.style.height = '0';
    selection.style.display = 'none';

    //document.removeEventListener('mousedown', mousedown);
    document.removeEventListener('mousemove', move);
  }
  
  function checkIfInside() {
    // return elements that are inside the container
    for(var i = 0, il = items.length; i < il; i++) {
      var item = items[i];

      if(isElementTouching(item, selection)) {
        selected.push(item);
        addClass(item, 'selected');
      } else {
        selected.splice(selected.indexOf(item), 1);
        removeClass(item, 'selected');
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


// Relevant Discussions:
// https://stackoverflow.com/questions/11979586/select-and-drag-to-get-selected-elements
// https://stackoverflow.com/questions/5851156/javascript-drag-select-functionality-done-right
// https://plainjs.com/
// http://youmightnotneedjqueryplugins.com/
// https://codecanyon.net/item/grapesheadlines-animated-headers/19715814?s_rank=1 ???
