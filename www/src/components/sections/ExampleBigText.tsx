import React, { useEffect, useRef, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { animated, useSpring, easings } from '@react-spring/web'
import Typewriter from 'typewriter-effect/dist/core'

import styles from './ExampleBigText.module.scss'
import { CodePen } from './Codepen'

type Props = {
  titleText: string
  src?: string
  isRight?: boolean
  isNoCode?: boolean
}

export const ExampleBigText: React.FC<Props> = ({
  titleText,
  src,
  isRight,
  isNoCode,
}) => {
  const [inView, setInview] = useState(false)
  const textOne = useRef(null)

  const transition = useSpring({
    delay: 1000,
    reverse: !inView,
    from: {
      y: 50,
      opacity: 0,
    },
    to: {
      opacity: 1,
      y: 0,
    },
    config: {
      duration: 1000,
      easing: easings.easeInOutQuad,
    },
  })

  useEffect(() => {
    if (!textOne.current || !inView) return
    const typewriter = new Typewriter(textOne.current, {
      delay: 65,
      cursor: '',
    })
    typewriter.start().typeString(titleText)
    return () => {
      typewriter.deleteAll().stop()
    }
  }, [textOne, inView, titleText])

  return (
    <Waypoint onEnter={() => setInview(true)}>
      <div className={isNoCode ? 'mt-20' : 'mt-96'}>
        {!isNoCode && src && (
          <animated.div
            style={transition}
            className={`${styles.codebox}  ${
              isRight ? 'float-left' : 'float-right'
            }`}
          >
            <CodePen src={src} />
          </animated.div>
        )}
        <div
          ref={textOne}
          className={`${styles.text} huge-text ${
            isRight ? 'text-right' : 'text-left'
          }`}
        />
      </div>
    </Waypoint>
  )
}
