import React from 'react'
import GitHubButton from 'react-github-btn'

import { baseDocsUrl, basePricingUrl } from '../../constants'

export const FooterLinks: React.FC<{}> = () => (
  <>
    <a href={basePricingUrl} className="metalink">
      Licensing
    </a>{' '}
    |{' '}
    <a
      href="https://github.com/ThibaultJanBeyer/DragSelect"
      className="metalink"
    >
      Github
    </a>{' '}
    |{' '}
    <a href="https://www.npmjs.com/package/dragselect" className="metalink">
      NPM
    </a>{' '}
    |{' '}
    <a href={baseDocsUrl} className="metalink">
      Docs
    </a>
    {/* {' '}
    |{' '}
    <a href={baseExamplesUrl} className="metalink">
      Examples
    </a> */}
    <div className="m-5">
      <div className="inline-block mr-5 align-middle">
        <GitHubButton
          href="https://github.com/ThibaultJanBeyer/DragSelect"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star ThibaultJanBeyer/DragSelect on GitHub"
        >
          Star
        </GitHubButton>
      </div>
      <div className="inline-block mr-5 align-middle">
        <GitHubButton
          href="https://github.com/sponsors/ThibaultJanBeyer"
          data-icon="octicon-heart"
          data-size="large"
          aria-label="Sponsor @ThibaultJanBeyer on GitHub"
        >
          Sponsor
        </GitHubButton>
      </div>
    </div>
  </>
)
