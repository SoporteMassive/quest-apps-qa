/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect, useState } from 'react'

import searchStyle from './search.css'

const SearchBarMobile = () => {
  const [showSearchBar, setShowSearchBar] = useState(false)

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
    #search-bar-mobile {
      display: none;
    }
  `

  const toggleSearchBar = () => {
    const globalScope: any = globalThis ?? window
    const searchBarElement: any = globalScope.document.querySelector(
      '#search-bar-mobile'
    )

    if (showSearchBar) {
      searchBarElement.style.display = 'none'
      setShowSearchBar(false)
    } else {
      searchBarElement.style.display = 'block'
      setShowSearchBar(true)
    }
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

  return (
    <div id="iconSearch" onClick={toggleSearchBar} role="button">
      <img
        src="https://quest.vteximg.com.br/arquivos/Icon-Quest-Buscar-White.svg"
        className={`${searchStyle.iconSearchCustom}`}
        alt=""
      />
    </div>
  )
}

export default SearchBarMobile
