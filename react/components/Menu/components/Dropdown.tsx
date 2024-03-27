/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable operator-assignment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import menuStyle from '../menu.css'
import MenuItems from './MenuItems'

type Props = {
  item: any
  submenus: any
  dropdown: any
  depthLevel: any
  handleHideDropdown: any
}

const Dropdown = ({
  item,
  submenus,
  dropdown,
  depthLevel,
  handleHideDropdown,
}: Props) => {
  depthLevel = depthLevel + 1
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : ''

  return (
    <>
      <ul
        className={`${menuStyle.dropdown} ${dropdownClass} ${
          dropdown ? menuStyle.openDropdown : ''
        }`}
      >
        <li className={menuStyle.menuItemBack}>
          <button
            className={menuStyle.itemLinkBack}
            onClick={handleHideDropdown}
          >
            <i className={`${menuStyle.icon} ${menuStyle.iconArrowLeft}`}></i>
            {item.title}
          </button>
        </li>
        {submenus.map((submenu: any, index: any) => (
          <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
        ))}
      </ul>
    </>
  )
}

export default Dropdown
