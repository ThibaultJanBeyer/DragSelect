export const createSelectorAreaElement = () => {
  const node = document.createElement('div')
  node.style.position = 'fixed'
  node.style.overflow = 'hidden'
  node.style.pointerEvents = 'none'
  node.style.zIndex = '999999999999999999'
  return node
}
