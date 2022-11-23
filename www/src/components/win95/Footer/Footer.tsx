import React, { useEffect, useState } from 'react'

import styles from './Footer.module.scss'
import { useDragSelect } from '../../DragSelectContext'

type Props = {}

export const Footer: React.FC<Props> = ({}) => {
  const [selectedAmount, setSelectedAmount] = useState(0)
  const ds = useDragSelect()

  useEffect(() => {
    if (!ds) return

    const cb = ({ items = [] }) => {
      console.log('CALLBACK', items)
      setSelectedAmount(items.length)
    }
    ds?.subscribe('callback', cb)
    return () => {
      ds?.unsubscribe('callback', cb)
    }
  }, [ds])

  return (
    <div className={styles.root}>
      <div className={styles.element}>
        <div className={styles.font}>{selectedAmount || 0} object(s)</div>
      </div>
      <div className={styles.element}>
        <div className={styles.font}>{selectedAmount * 1.7}MB</div>
      </div>
    </div>
  )
}
