/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

import Dropdown from './Dropdown'
import menuStyle from '../menu.css'

type Props = {
  items: any
  depthLevel: any
}

const MenuItems = ({ items, depthLevel }: Props) => {
  const [dropdown, setDropdown] = useState(false)

  const handleHideDropdown = () => {
    setDropdown(false)
  }

  return (
    <li className={menuStyle.menuItem}>
      {!items.children ? (
        <a
          href={items.link}
          target={items.blank ? '_blank' : ''}
          className={menuStyle.itemLink}
        >
          {items.title}
        </a>
      ) : (
        <>
          <button
            className={menuStyle.buttonDropdown}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {/* <span className={menuStyle[items.icon]}></span> */}
            {items.title}
            <i className={`${menuStyle.icon} ${menuStyle.iconArrowRight}`} />
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.children}
            item={items}
            dropdown={dropdown}
            handleHideDropdown={handleHideDropdown}
          />
        </>
      )}
    </li>
  )
}

export default MenuItems
