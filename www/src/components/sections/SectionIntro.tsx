import React from 'react'

import sectionStyles from './Sections.module.scss'
import { Logo } from '../Logo'
import { BeautyButton } from '../BeautyButton'
import { FooterLinks } from './FooterLinks'
import { baseDocsUrl, basePricingUrl } from '../../constants'

export const SectionIntro: React.FC<{}> = () => (
  <div className={`${sectionStyles.container} text-center`}>
    <div className={sectionStyles.logo}>
      <Logo />
    </div>
    <h1 className="visuallyhidden">DragSelect</h1>
    <p className="m-10">
      Easy javascript <span>Drag-Select & Drop</span> functionality done right.
    </p>
    <div className="inline-block m-5">
      <div className="inline-block mr-5">
        <BeautyButton href={baseDocsUrl}>Getting Started</BeautyButton>
      </div>
      | <div className="inline-block mr-5">
        <BeautyButton href={basePricingUrl} isPrimary={false}>Pricing</BeautyButton>
      </div>
      <div className="m-5">
        <FooterLinks />
      </div>
    </div>
  </div>
)
