import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useSEOContext } from '../../contexts/SEOContext'
import RichText from '../RichText'

const CSS_HANDLES = ['seoLongTextContainer', 'seoLongTextTitle'] as const

const SeoLongText = () => {
  const { state } = useSEOContext()
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.seoLongTextContainer}>
      <h1 className={handles.seoLongTextTitle}>
        <RichText text={state.mainTitle ?? ''} />
      </h1>
      <RichText text={state?.mainParagraph ?? ''} />
    </div>
  )
}

export default SeoLongText
