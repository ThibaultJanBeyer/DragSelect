import React, { useEffect } from 'react'

import styles from './ActionPanel.module.css'
import { IconButton } from '../IconButton/IconButton'
import { DropDown } from './DropDown/DropDown'
import { useDragSelect } from '../../DragSelectContext'

const w95del = '/w95-icons/Recycle Bin with paper.ico'
const w95paste = '/w95-icons/Paste.png'
const w95copy = '/w95-icons/Copy.png'
const w95cut = '/w95-icons/Cut.png'
const w95up = '/w95-icons/Folder-Up.png'
const w95mnd = '/w95-icons/Map-Network-Drive.png'
const w95dnd = '/w95-icons/Disconnect-Network-Drive.png'

type Props = {
  title: string
  icon: string
}

export const ActionPanel: React.FC<Props> = ({ title, icon }) => {
  const ds = useDragSelect()

  useEffect(() => {
    if (!ds) return
    let addedMultiplier = 1
    let isRunning = true

    const interval = () => {
      if (!isRunning) return
      // @ts-ignore
      ds?.publish('__add', { value: 1 })
      addedMultiplier += 0.5

      setTimeout(interval, Math.random() * (5000 * addedMultiplier - 500) + 500)
    }
    interval()

    return () => {
      isRunning = false
    }
  }, [ds])

  return (
    <div className={styles.root}>
      <DropDown title={title} icon={icon} />
      <div className={styles.group}>
        <IconButton iconPath={w95up} title="Up" disabled />
      </div>
      <div className={styles.group}>
        <IconButton
          iconPath={w95mnd}
          title="Pull New Elements"
          onClick={() => {
            // @ts-ignore
            ds?.publish('__add', {
              value: Math.floor(Math.random() * (5 - 1) + 1),
            })
          }}
        />
        <IconButton
          iconPath={w95dnd}
          title="Clear Elements"
          onClick={() => ds?.removeSelectables(ds.getSelectables(), true, true)}
        />
      </div>
      <div className={styles.group}>
        <IconButton iconPath={w95cut} title="Cut" disabled />
        <IconButton iconPath={w95copy} title="Copy" disabled />
        <IconButton iconPath={w95paste} title="paste" disabled />
      </div>
      <IconButton
        iconPath={w95del}
        title="Delete Selected Element(s)"
        onClick={() => {
          ds?.removeSelectables(ds.getSelection(), true, true)
        }}
      />
    </div>
  )
}
