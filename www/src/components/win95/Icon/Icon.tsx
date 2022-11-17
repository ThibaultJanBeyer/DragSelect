import React from 'react'

type Props = React.PropsWithChildren<{
  iconPath: string
  size?: 's' | 'm' | 'l' | 'xl'
}>

const sizeMap = {
  s: 1.2,
  m: 1.6,
  l: 2,
  xl: 3.3,
}

export const Icon: React.FC<Props> = ({ iconPath, size = 'm' }) => (
  <div
    style={{
      width: `${sizeMap[size]}rem`,
      margin: `2px ${size === 's' ? '0' : 'auto'}`,
    }}
  >
    <img src={iconPath} alt="" />
  </div>
)
