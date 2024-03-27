import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useSEOContext } from '../../contexts/SEOContext'
import RichText from '../RichText'

const CSS_HANDLES = [
  'seoParagraphContainer',
  'seoParagraphItem',
  'seoParagraphTitle',
] as const

const SeoParagraph = () => {
  const { state } = useSEOContext()
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles.seoParagraphContainer} flex`}>
      <div className={`${handles.seoParagraphItem} w-100`}>
        <h2 className={handles.seoParagraphTitle}><RichText text={state?.col1Title ?? ''} /></h2>
        <RichText text={state?.col1Paragraph ?? ''} />
      </div>
      <div className={`${handles.seoParagraphItem} w-100`}>
        <h2 className={handles.seoParagraphTitle}><RichText text={state?.col2Title ?? ''} /></h2>
        <RichText text={state?.col2Paragraph ?? ''} />
      </div>
      <div className={`${handles.seoParagraphItem} w-100`}>
        <h2 className={handles.seoParagraphTitle}><RichText text={state?.col3Title ?? ''} /></h2>
        <RichText text={state?.col3Paragraph ?? ''} />
      </div>
    </div>
  )
}

export default SeoParagraph
