export const createSelectorElement = (customStyles: boolean) => {
  const selector = document.createElement('div')

  selector.style.position = 'absolute'
  if (!customStyles) {
    selector.style.background = 'rgba(0, 175, 255, 0.2)'
    selector.style.border = '1px solid rgba(0, 175, 255, 0.8)'
    selector.style.display = 'none'
    selector.style.pointerEvents = 'none' // fix for issue #8 (ie11+)
  }

  return selector
}
