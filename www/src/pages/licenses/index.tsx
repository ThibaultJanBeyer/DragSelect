import React from "react";
import Head from "@docusaurus/Head";

import { Logo } from "../../components/Logo";
import styles from "./index.module.scss";
import { SectionPricing } from "@site/src/components/sections/SectionPricing";
import { FooterLinks } from "@site/src/components/sections/FooterLinks";
import { BeautyButton } from "@site/src/components/BeautyButton";
import { baseDocsUrl } from "@site/src/constants";

export default function License(): JSX.Element {
  return (
    <div
      style={{
        padding: "0 20px",
      }}
    >
      <Head>
        <html className={styles.head} />
        <body className={styles.body} />
        <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>
          <a href="/">
            <Logo />
          </a>
        </div>
        <div className={styles.heroBanner}>
          <h1>Pricing: Free</h1>
          <p>
            DragSelect is, and will forever be, a free and open-source tool.{" "}
            <strong>Free for any non-commercial project</strong>. However, this
            is a lot of work and hard work should be rewarded, so if you are
            using DragSelect for business and/or commercial sites, projects, and
            applications you’ll have to get the commercial license to keep your
            source proprietary and the project alive.
          </p>
        </div>
      </header>
      <main>
        <h2 className={styles.section__title}>Commercial licenses</h2>
        <SectionPricing />
        <h2 className={styles.section__title}>Open source license</h2>
        <p>
          If you are creating an open source application under a license
          compatible with the{" "}
          <a href="https://www.gnu.org/licenses/gpl-3.0.html">
            GNU GPL license v3
          </a>
          , you may use this project under the terms of the GPLv3. Questions?
          Read the{" "}
          <a href="https://www.gnu.org/licenses/gpl-faq.html#GPLRequireSourcePostedPublic">
            GPL FAQ
          </a>
          . or this{" "}
          <a href="https://greendrake.info/publications/js-gpl">blog post</a>.
          Basically, if your project is not commercial, no need to worry.
        </p>
        <h2 className={styles.section__title}>Student discount</h2>
        <p>
          If you are a student currently enrolled in a College or University,
          write me via{" "}
          <a href="mailto:thibault.beyer@gmail.com">thibault.beyer@gmail.com</a>{" "}
          to get a free license.
        </p>
        <h2 className={styles.section__title}>Earning Distribution</h2>
        <p>
          All earnings from enterprise licenses are distributed on a yearly
          basis to all contributors of DragSelect according to their overall
          percentual contribution
        </p>
        <h2 className={styles.section__title}>Key Points</h2>
        <p>
          Please find the key points of the commercial license below. If you
          have any more questions, please contact at{" "}
          <a href="mailto:thibault.beyer@gmail.com">thibault.beyer@gmail.com</a>
        </p>
        <h3 className={styles.section__subTitle}>Team member</h3>
        <p>
          The Commercial license "Startup" is priced per team member. A team
          member is an individual person permitted to make modifications for
          your applications that uses DragSelect, whether such person is your
          employee or a consultant or contractor providing services to you. One
          startup license includes 5 team members: this means you buy one
          startup license per 5 team members. The enterprise license however has
          no limits: this means you only buy the enterprise license once no
          matter how big your company is.
        </p>
        <h3 className={styles.section__subTitle}>Free updates</h3>
        <p>
          You are entitled to receive all updates up to the major version of
          DragSelect as well as later versions as permitted.
        </p>
        <h3 className={styles.section__subTitle}>Usage in saleable products</h3>
        <p>
          You need an Enterprise license to use DragSelect in a product which
          end users can be charged for.
        </p>
        <h3 className={styles.section__subTitle}>Number of products</h3>
        <p>
          With any license, DragSelect can be used as part of a single product.
        </p>
        <h3 className={styles.section__subTitle}>Reselling</h3>
        <p>
          DragSelect cannot be used in a product offered for sale, where
          DragSelect contributes to the core value of the product being sold. If
          you like to build something based on DragSelect such as a pro
          WordPress plugin for DragSelect, please reach out to us at{" "}
          <a href="mailto:thibault.beyer@gmail.com">thibault.beyer@gmail.com</a>
          . DragSelect may not be used for re-selling, sub-licensing, or sharing
          purposes, and cannot otherwise be redistributed on its own (even for
          free).
        </p>
        <h3 className={styles.section__subTitle}>Unlimited time</h3>
        <p>
          The commercial License is not limited in time. Once you purchase a
          license, you can use if for lifetime under the terms of the particular
          license.
        </p>
        <h3 className={styles.section__subTitle}>No exclusivity</h3>
        <p>
          The commercial License is not exclusive and other buyers may purchase
          DragSelect.
        </p>
        <h3 className={styles.section__subTitle}>Support</h3>
        <p>
          Organization and team license holders will get faster response and
          priority for reported issues and questions
        </p>
        <h3 className={styles.section__subTitle}>
          All official plugins included
        </h3>
        <p>
          Along with DragSelect, you get access to all DragSelect official
          plugins listed on the official website
        </p>
      </main>
      <div className="inline-block w-full mt-40 text-center">
        <BeautyButton href={baseDocsUrl}>Get started</BeautyButton> |{" "}
        <FooterLinks />
      </div>
    </div>
  );
}
