import React from 'react'
import styles from './DropDown.module.scss'
import { IconButton } from '../../IconButton/IconButton'
import { Icon } from '../../Icon/Icon'

type Props = {
  title: string
  icon: string
}

export const DropDown: React.FC<Props> = ({ title, icon }) => (
  <div className={styles.root}>
    <Icon iconPath={icon} size="l" />
    <div className={styles.text}>{title}</div>
    <IconButton title='dropdown' disabled>▼</IconButton>
  </div>
)
