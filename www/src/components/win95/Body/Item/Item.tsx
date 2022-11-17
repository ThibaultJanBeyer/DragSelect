import React, { memo, useEffect, useRef, useState } from 'react'

import styles from './Item.module.scss'
import { FileIcon } from './FileIcon'
import { getRandomFileName } from './fileNames'
import { useDragSelect } from '../../../DragSelectContext'
import { BubbleExplosion } from 'beautiful-web-animations'

type Props = {}

const _Item: React.FC<Props> = () => {
  const [available, setAvailable] = useState(true)
  const ds = useDragSelect()
  const inputEl = useRef(null)

  useEffect(() => {
    const element = inputEl.current as unknown as HTMLElement
    if (!element || !ds || !available) return

    const explode = async (isAppearing?: boolean) => {
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

    const cb = async ({ item }: { item: any }) => {
      if (item !== element) return
      ds.unsubscribe('Selectable:removed', cb)
      await explode()
      setAvailable(false)
    }

    if (!ds.SelectableSet.has(element)) {
      ds.addSelectables(element)
      ds?.subscribe('Selectable:removed', cb)
      return
    }

    explode(true)

    return () => {
      if (!element || !ds) return
      console.log('unmount') // <= why is it unmounting?
      // ds.removeSelectables(el) // <= this is happening automatically
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
