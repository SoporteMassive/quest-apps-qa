/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react'

import menuStyle from './menu.css'
import Navbar from './components/Navbar'

const MenuApp = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleMenu = (event: any) => {
    event.preventDefault()
    setIsOpen(true)
  }

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')
  }, [isOpen])

  const handleClickOutside = () => setIsOpen(false)

  return (
    <div className={menuStyle.container}>
      <div className={menuStyle.wrapper}>
        <div className={menuStyle.button}>
          <button className={menuStyle.button__icon} onClick={handleMenu}>
            <span className={`${menuStyle.iconMenu} ${menuStyle.icon}`} />
          </button>
        </div>
        <div
          className={`${menuStyle.drawer} ${
            isOpen ? menuStyle.drawer__isOpen : ''
          }`}
        >
          <div className={menuStyle.overlayMenu} onClick={handleClickOutside} />
          <div className={menuStyle.wrapperInner}>
            <div className={menuStyle.headerMenu}>
              <div className={menuStyle.headerBrand}>
                <i className={`${menuStyle.icon} ${menuStyle.JCBrand}`} />
              </div>
              {children}
              <button
                type="button"
                className={menuStyle.closeMenu}
                onClick={() => setIsOpen(false)}
              >
                <i className={`${menuStyle.icon} ${menuStyle.iconClose}`} />
              </button>
            </div>
            <div className={menuStyle.sectionMenu}>
              <Navbar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuApp
