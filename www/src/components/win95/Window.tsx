import React from 'react'

import styles from './Window.module.scss'
import { ActionPanel } from './ActionPanel/ActionPanel'
import { Body } from './Body/Body'
import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { TextButtons } from './TextButtons/TextButtons'
import { DragSelectProvider } from '../DragSelectContext'

type Props = {
  title?: string
  icon?: string
}

export const Window: React.FC<Props> = ({
  title = '(CEO:Responsibilities)',
  icon = '/w95-icons/Computer are Earth.ico',
}) => (
  <div className={styles.root}>
    <Header icon={icon} title={title} />
    <TextButtons />
    <DragSelectProvider settings={{ selectorClass: styles.selector }}>
      <ActionPanel icon={icon} title={title} />
      <Body />
      <Footer />
    </DragSelectProvider>
  </div>
)
