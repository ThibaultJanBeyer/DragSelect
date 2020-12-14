// @ts-check
import '../types'
/**
 * Reliably returns the exact x,y,w,h positions of the selector element
 * @param {{ scrollAmount:Vect2, initialPointerPos:Vect2, pointerPos:Vect2 }} p
 * @returns {{left:number,top:number,width:number,height:number}}
 */
export default ({ scrollAmount, initialPointerPos, pointerPos }) => {
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
   * 1. pointerPos.x (5) > initialPointerPos.x (0) - scrollAmount.x (10) === 5 > -10 === true
   * then set the x position to the cursors start position
   * selectorPos.x = initialPointerPos.x (0) - scrollAmount.x (10) === 10 // 2.
   * then we can calculate the elements width, which is
   * the new cursor position minus the initial one plus the scroll amount, so in our example:
   * 3. selectorPos.w = pointerPos.x (5) - initialPointerPos.x (0) + scrollAmount.x (10) === 15;
   *
   * let’s say after that movement we now scroll 20px to the left and move our cursor by 30px to the left:
   * 1b. pointerPos.x (-30) > initialPointerPos.x (0) - scrollAmount.x (-20) === -30 < --20 === -30 < +20 === false;
   * 2b. selectorPos.x = pointerPos.x (-30) === -30; move left position to cursor (for more info see Problem #1)
   * 3b. selectorPos.w = initialPointerPos.x (0) - pointerPos.x (-30) - scrollAmount.x (-20) === 0--30--20 === 0+30+20 === 50;  // scale width to original left position (for more info see Problem #1)
   *
   * same thing has to be done for top/bottom
   *
   * I hope that makes sense. Try stuff out and play around with variables to get a hang of it.
   */
  const selectorPos = {}

  // right
  if (pointerPos.x > initialPointerPos.x - scrollAmount.x) {
    // 1.
    selectorPos.left = initialPointerPos.x - scrollAmount.x // 2.
    selectorPos.width = pointerPos.x - initialPointerPos.x + scrollAmount.x // 3.
    // left
  } else {
    // 1b.
    selectorPos.left = pointerPos.x // 2b.
    selectorPos.width = initialPointerPos.x - pointerPos.x - scrollAmount.x // 3b.
  }

  // bottom
  if (pointerPos.y > initialPointerPos.y - scrollAmount.y) {
    selectorPos.top = initialPointerPos.y - scrollAmount.y
    selectorPos.height = pointerPos.y - initialPointerPos.y + scrollAmount.y
    // top
  } else {
    selectorPos.top = pointerPos.y
    selectorPos.height = initialPointerPos.y - pointerPos.y - scrollAmount.y
  }

  return selectorPos
}
