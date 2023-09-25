import React, { useEffect, useRef, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import styles from './Sections.module.scss'
import { Window } from '../win95/Window'

export const SectionExample: React.FC<{}> = () => {
  const bgRef = useRef(null)
  const [inView, setInview] = useState(false)

  useEffect(() => {
    if (!bgRef?.current) return

    const handleScroll = () => {
      const {scrollY} = window
      if (bgRef?.current)
        (bgRef.current as any).style.backgroundPositionY = `${
          scrollY * 0.35 - 300
        }px`
    }

    if (inView) document.addEventListener('scroll', handleScroll, { passive: true })
    else document.removeEventListener('scroll', handleScroll, {
      // @ts-ignore
      passive: true
    })

    return () => {
      document.removeEventListener('scroll', handleScroll, {
        // @ts-ignore
        passive: true
      })
    }
  }, [bgRef, inView])

  return (
    <Waypoint onEnter={() => setInview(true)} onLeave={() => setInview(false)}>
      <div className={styles.hArea} ref={bgRef}>
        <div className={`${styles.container} ${styles.expanded}`}>
          <div style={{ height: '450px' }}>
            <Window />
          </div>
        </div>
      </div>
    </Waypoint>
  )
}
