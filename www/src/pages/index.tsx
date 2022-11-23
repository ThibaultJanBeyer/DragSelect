import React from 'react';
import Head from '@docusaurus/Head';

import styles from './index.module.scss';
import { SectionExample } from '../components/sections/SectionExample'
import { SectionGame } from '../components/sections/SectionGame'
import { SectionIntro } from '../components/sections/SectionIntro'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <html className={styles.head} />
        <body className={styles.body} />
      </Head>
      <header className={styles.header}>
        <SectionIntro />
      </header>
      <main>
        <SectionExample />
        <SectionGame />
      </main>
    </>
  );
}
