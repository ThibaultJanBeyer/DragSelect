import React, { memo, useEffect, useRef, useState } from 'react'
import { BubbleExplosion } from 'beautiful-web-animations'

import styles from './Item.module.scss'
import { FileIcon } from './FileIcon'
import { getRandomFileName } from './fileNames'
import { useDragSelect } from '../../../DragSelectContext'

const explode = async (element: HTMLElement, isAppearing?: boolean) => {
  const BE = BubbleExplosion({
    element,
    content: `url("${element
      .querySelector('img[data-img]')
      ?.getAttribute('data-img')}")`,
    particles: { direction: isAppearing ? 'up' : 'down', size: 15 },
    isAppearing,
  })
  await BE.trigger()
  BE.destroy()
}

const _Item: React.FC = () => {
  const [available, setAvailable] = useState(true)
  const ds = useDragSelect()
  const inputEl = useRef(null)

  useEffect(() => {
    const element = inputEl.current as unknown as HTMLElement
    if (!element || !ds || !available) return

    const cb = async ({ item }: { item: any }) => {
      if (item !== element) return
      ds.unsubscribe('Selectable:removed', cb)
      await explode(element)
      setAvailable(false)
    }

    const firstEffect = async () => {
      await explode(element, true)
      ds.addSelectables(element)
      ds?.subscribe('Selectable:removed', cb)
    }

    if (!ds.SelectableSet.has(element)) firstEffect()

    return () => {
      if (!element || !ds) return
      ds.unsubscribe('Selectable:removed', cb)
    }
  }, [ds, inputEl, available])

  if (!available) return null

  return (
    <button className={styles.root} ref={inputEl}>
      <FileIcon />
      <div>{getRandomFileName()}</div>
    </button>
  )
}

export const Item = memo(_Item)
