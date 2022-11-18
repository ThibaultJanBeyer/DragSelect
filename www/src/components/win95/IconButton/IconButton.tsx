import React from 'react'

import styles from './IconButton.module.scss'
import { Icon } from '../Icon/Icon'

type Props = React.PropsWithChildren<{
  iconPath?: string
  disabled?: boolean
  size?: 's' | 'm' | 'l'
  noButton?: boolean
  title?: string
  onClick?: () => void
}>

export const IconButton: React.FC<Props> = ({
  children,
  iconPath,
  disabled,
  size = 'm',
  title,
  onClick,
}) => (
  <button
    className={styles.button}
    disabled={disabled}
    title={`${title}${disabled ? ' (disabled)' : ''}`}
    onClick={onClick}
  >
    {iconPath && <Icon iconPath={iconPath} size={size} />}
    {children}
  </button>
)
