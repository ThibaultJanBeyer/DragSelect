import { DSArea } from "../types"

type Props = {
  computedStyle: CSSStyleDeclaration
  node: DSArea
}

/** Fix: some elements have to have a special position attribute for calculations */
export const handleElementPositionAttribute = ({ computedStyle, node }: Props) => {
  const { position } = computedStyle
  const isPositioned =
    position === 'absolute' || position === 'relative' || position === 'fixed'
  if (!(node instanceof Document) && !isPositioned)
    node.style.position = 'relative'
}
