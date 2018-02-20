# 1.7.21-23

- fix issue with getCursorPositionDifference for single clicks. See [#13](https://github.com/ThibaultJanBeyer/DragSelect/issues/13). Big thanks to [@RealTJ](https://github.com/RealTJ) for the help
- ! getCursorPositionDifference now returns negative values when moving to the left and positive values when moving to the right (exact oposite as before). This is more consistent with the default behaviour on a X/Y axis.

# 1.7.20

- Add new `.toggleSelection` public method

# 1.7.19

- Solve issue [#10](https://github.com/ThibaultJanBeyer/DragSelect/issues/10)
- Improve public .getCursorPos() method and made initial one private
- Add more local tests representing different scenarios for proper manual testing

# 1.7.18

- Prevent rightclick from triggering a selection.
- Add release event to the document not the area. (makes more sense, as a user, when I release the mouse click I want to release selection as well)

# 1.7.16 + 1.7.17

- Fix selection algorithm issue reported in issue [#9](https://github.com/ThibaultJanBeyer/DragSelect/issues/9)
- Improve `.addSelection`, `.removeSelection` and `.setSelection` by adding a third option (see docs).

# 1.7.15

- Add several new methods, helpful for user: `.addSelection`, `.removeSelection`, `.setSelection`, `.clearSelection`.

# 1.7.14

- Enhanced SVG support for legacy browsers

# 1.7.13

- Add AMD Modules support

# 1.7.12

- Add SVG Support
- Add `break` functionality to break out of execution from within callbacks
- Add 2 more callbacks: `onDragStart` and `onDragMove`
- Pass the event object to `callback`
