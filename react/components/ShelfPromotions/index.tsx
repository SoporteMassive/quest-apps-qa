import React from 'react'
import Image from 'vtex.store-image/Image'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'spContainerPromotions',
  'spContainerPromotion',
  'spTitlePromotion',
] as const

interface Promotion {
  title: string
  url: string
  image: string
}

interface ShelfPromotionsProps {
  promotions: Promotion[]
}

const ShelfPromotions = ({ promotions }: ShelfPromotionsProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.spContainerPromotions}>
      {promotions.map(({ title, url, image }) => {
        return (
          <a className={handles.spContainerPromotion} href={url} key={url}>
            <p className={handles.spTitlePromotion}>{title}</p>
            <Image src={image} />
          </a>
        )
      })}
    </div>
  )
}

ShelfPromotions.schema = {
  type: 'object',
  title: 'Promociones',
}

ShelfPromotions.defaultProps = {
  promotions: [],
}

export default ShelfPromotions
