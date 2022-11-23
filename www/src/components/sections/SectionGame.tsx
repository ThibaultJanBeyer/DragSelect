import React from 'react'

import styles from './Sections.module.scss'
import { BeautyButton } from '../BeautyButton'
import { ExampleBigText } from './ExampleBigText'
import { FooterLinks } from './FooterLinks'
import { baseDocsUrl } from '../../constants'

export const SectionGame: React.FC<{}> = () => (
  <div className={`${styles.container} text-center mb-60`}>
    <ExampleBigText
      titleText={`It’s all about <span class="${styles.highlight}">selecting</span> what you like…`}
      src="https://codepen.io/ThibaultJanBeyer/embed/YzvVYyR?default-tab=result&editable=true&theme-id=light"
    />
    <ExampleBigText
      titleText={`…and <span class="${styles.highlight}">dropping</span> what you don’t.`}
      src="https://codepen.io/ThibaultJanBeyer/embed/dyKRzpK?default-tab=result&editable=true&theme-id=light"
      isRight
    />
    <ExampleBigText
      titleText={`With full flexibility, <span class="${styles.highlight}">zero dependencies</span> and only pure joy!`}
      isNoCode
    />
    <div className="inline-block w-full mt-5">
      <BeautyButton href={baseDocsUrl}>Get started</BeautyButton> |{' '}
      <FooterLinks />
    </div>
  </div>
)
