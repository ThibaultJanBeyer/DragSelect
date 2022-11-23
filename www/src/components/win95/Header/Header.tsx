import React from 'react'

import styles from './Header.module.scss'
import { Icon } from '../Icon/Icon'

type Props = {
  icon: string
  title: string
}

export const Header: React.FC<Props> = ({ icon, title }) => (
  <div className={styles.root}>
    <Icon iconPath={icon} size="l" />
    <div className={styles.font}>{title}</div>
  </div>
)
