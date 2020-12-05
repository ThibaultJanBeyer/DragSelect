# Planned Improvements for v2

## Fix #58

https://github.com/ThibaultJanBeyer/DragSelect/issues/58 Seems like an easy win. Just add a new param to modify the multi-selection behavior.

## Interaction Handler

The interactions: Start/Move/End should be abstracted away in their own method. It's not really logical that the Area module owns all user-interaction. Sure it kinda makes sense but not really either :D


## Main loop

check whether to use a mainLoop using requestAnimationFrame instead of modifier callbacks, that could help improving performance of course the pointer position should still be updated by an event listener it would also require us to check whether there has been a change or not before checking whether elements are in the selection.

This could help with:

- AutoScroll Updates
- Area updates
- Selector updates
- HandleMove would be abstracted away

## Check other issues

## Performance improvements

Investigate if web-workers can be used to improve selection performance. Currently >=25k nodes causes huge lags.

## Add drag-ability

This one is huge. Huge effort = huge reward. So ideally after a selection, a user should be able to dragNdrop the selection (i.e. by moving on an already selected node). Maybe the dragNdrop library can be re-used (not sure).

A user should be able to disable that functionality if he does not want it
