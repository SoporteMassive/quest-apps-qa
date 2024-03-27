import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useSEOContext } from '../../contexts/SEOContext'
import RichText from '../RichText'

const CSS_HANDLES = [
  'seoLinksContainer',
  'seoLinksTitle',
  'seoLinksItems',
  'seoLinksItem',
] as const

const SeoLinks = () => {
  const { state } = useSEOContext()
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.seoLinksContainer}>
      <h2 className={handles.seoLinksTitle}>
        <RichText text={state?.linksTitle ?? ''} />
      </h2>
      <div className={`${handles.seoLinksItems} flex`}>
        {state?.links?.split(',').map((link) => (
          <RichText
            key={link}
            text={link}
            className={`${handles.seoLinksItem}`}
          />
        ))}
      </div>
    </div>
  )
}

export default SeoLinks
