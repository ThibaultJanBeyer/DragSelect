import React from 'react'
import styles from './SectionPricing.module.scss'
import { Icon } from '@iconify/react';

export const SectionPricing: React.FC<{}> = () => (
  <>
    <div className={styles.container}>
      <div className={`${styles.boxAlt}`}>
        <div className={`${styles.boxInner}`}>
          <h3 className={styles.title}>Startup</h3>
          <div>
            <strong className={styles.price}>$29</strong>/lifetime
            <p>For personal use</p>
            <ul className={styles.ul}>
              <li className={styles.li}>
                <Icon icon="material-symbols:check-box-outline-blank" className={styles.iconReg} />
                <strong className={styles.highlightReg}>Five</strong> team members
              </li>
              <li className={styles.li}>
                <Icon icon="material-symbols:check-box-outline-blank" className={styles.iconReg} />
                <strong className={styles.highlightReg}>One</strong> product by company
              </li>
              <li className={styles.li}>
                <Icon icon="material-symbols:check-box-outline-blank" className={styles.iconReg} />
                <strong className={styles.highlightReg}>Can't</strong> use in a product for sale*
              </li>
              <li className={styles.li}>
                <Icon icon="material-symbols:check-box-outline-blank" className={styles.iconReg} />
                <strong className={styles.highlightReg}>Regular</strong> GitHub support
              </li>
              <li className={styles.li}>
                <Icon icon="material-symbols:check-box-outline-rounded" className={styles.icon} />
                <strong className={styles.highlight}>Lifetime free updates</strong>
              </li>
            </ul>
            <p className={styles.purchase}>
              Purchase Now
            </p>
          </div>
        </div>
      </div>
      <div className={`${styles.box}`}>
        <div className={`${styles.boxInner}`}>
          <h3 className={styles.title}>Enterprise</h3>
          <div>
            <strong className={styles.price}>$299</strong>/lifetime
            <p>Large teams & organizations</p>
            <ul className={styles.ul}>
              <li className={styles.li}>
                <Icon icon="material-symbols:check-box-outline-rounded" className={styles.icon} />
                <strong className={styles.highlight}>Unlimited</strong> team members
              </li>
              <li className={styles.li}>
                <Icon icon="material-symbols:check-box-outline-rounded" className={styles.icon} />
                <strong className={styles.highlight}>Unlimited</strong> products by company
              </li>
              <li className={styles.li}>
                <Icon icon="material-symbols:check-box-outline-rounded" className={styles.icon} />
                <strong className={styles.highlight}>Can</strong> use in a product for sale*
              </li>
              <li className={styles.li}>
                <Icon icon="material-symbols:check-box-outline-rounded" className={styles.icon} />
                <strong className={styles.highlight}>Priority</strong> GitHub support
              </li>
              <li className={styles.li}>
                <Icon icon="material-symbols:check-box-outline-rounded" className={styles.icon} />
                <strong className={styles.highlight}>Lifetime free updates</strong>
              </li>
            </ul>
            <p className={`${styles.purchase} ${styles.purchaseHighlight}`}>
              Purchase Now
            </p>
          </div>
        </div>
      </div>
    </div>
    <p className={styles.note}>
      *If you want to include DragSelect as part of a product that is for sale, a software developer kit (SDK), web application builder or website builder, downloadable or installable products like Wordpress themes, HTML templates, or something that produces copies that each use DragSelect, you need to choose the Enterprise license.
    </p>
  </>
)
