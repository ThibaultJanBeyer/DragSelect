export default () => {
  const rect = element.getBoundingClientRect()
  const eRect = {
    y: rect.top,
    x: rect.left,
    h: rect.height,
    w: rect.width,
  }
  const aRect = this.DS.SelectorArea.position

  if (eRect.x <= aRect.x)
    // left
    setStylePosition(
      element,
      { x: elementPos.x + aRect.x - eRect.x, y: elementPos.y },
      this._useTransform
    )

  if (eRect.y <= aRect.y)
    // top
    setStylePosition(
      element,
      { y: elementPos.y + aRect.y - eRect.y, x: elementPos.x },
      this._useTransform
    )

  if (eRect.x + eRect.w >= aRect.x + aRect.w)
    // right
    setStylePosition(
      element,
      {
        x: elementPos.x + (aRect.x + aRect.w - (eRect.x + eRect.w)),
        y: elementPos.y,
      },
      this._useTransform
    )

  if (eRect.y + eRect.h >= aRect.y + aRect.h)
    // bottom
    setStylePosition(
      element,
      {
        y: elementPos.y + (aRect.y + aRect.h - (eRect.y + eRect.h)),
        x: elementPos.x,
      },
      this._useTransform
    )
}
