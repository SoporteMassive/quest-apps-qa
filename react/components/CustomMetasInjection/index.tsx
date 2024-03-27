/* eslint-disable react/jsx-key */
import React from 'react'
import { Helmet } from 'vtex.render-runtime'

interface IMeta {
  property: string
  content: string
}

interface Props {
  metas: IMeta[]
}

function CustomMetasInjection({ metas }: Props) {
  return (
    <>
      {metas.length ? (
        metas.map((meta: IMeta) => (
          <Helmet>
            <meta property={meta.property} content={meta.content} />
          </Helmet>
        ))
      ) : (
        <></>
      )}
    </>
  )
}

export default CustomMetasInjection
