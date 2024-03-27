import React, { useEffect, useState } from 'react'

import searchStyle from './viewMore2.css'

const ViewMore = () => {
  const [viewMore, setViewMore] = useState(false)
  const [buttonText, setButtonText] = useState('Ver más')

  const injectStyles = (css: string, id?: string): void => {
    const globalScope: any = globalThis ?? window
    const styleElement: any = globalScope.document.createElement('style')

    if (id) {
      styleElement.id = id
    }

    styleElement.innerText = css
    globalScope.document.head.appendChild(styleElement)
  }

  const css = `
    #viewMore-custom2 {
      height: 75px;
      overflow: hidden;
    }
  `

  const toggleviewMore = () => {
    const viewMoreElement: HTMLElement | null = document.querySelector(
      '#viewMore-custom2'
    )

    if (!viewMoreElement) {
      return
    }

    if (!viewMore) {
      viewMoreElement.style.height = '80px'
      setButtonText('Ver más')
    } else {
      viewMoreElement.style.height = 'auto'
      setButtonText('Ver menos')
    }

    setViewMore(!viewMore)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (typeof globalThis !== 'undefined' || typeof window !== 'undefined') {
        clearInterval(intervalId)
        injectStyles(css, 'customStyle')
      }
    }, 100)

    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setViewMore(true)
  }, [])

  return (
    <div className={`${searchStyle.containerButton}`}>
      <button
        className={`${searchStyle.buttonViewMore}`}
        onClick={toggleviewMore}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default ViewMore
