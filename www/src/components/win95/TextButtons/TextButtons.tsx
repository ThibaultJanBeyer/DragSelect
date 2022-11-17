import React from 'react'

import styles from './TextButtons.module.scss'
import { baseDocsUrl } from '../../../constants'

type Props = {}

export const TextButtons: React.FC<Props> = ({}) => (
  <div>
    <div className={styles.textButton}>
      <u>F</u>ile
    </div>
    <div className={styles.textButton}>
      <u>E</u>dit
    </div>
    <div className={styles.textButton}>
      <u>V</u>iew
    </div>
    <a href={baseDocsUrl} className={styles.textButton}>
      <u>H</u>elp
    </a>
  </div>
)
