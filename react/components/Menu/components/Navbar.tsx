/* eslint-disable no-shadow */
/* eslint-disable padding-line-between-statements */
import React, { useEffect, useState } from 'react'
import { Spinner } from 'vtex.styleguide'

import MenuItems from './MenuItems'
import menuStyle from '../menu.css'

const Navbar = () => {
  const [dataMenu, setDataMenu] = useState([])

  useEffect(() => {
    fetch(`/files/menu-sidebar.json`)
      .then((response) => response.json())
      .then((dataMenu) => {
        setDataMenu(dataMenu)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <nav>
      {dataMenu?.length ? (
        <ul className={menuStyle.navBar}>
          {dataMenu.map((menu, index) => {
            const depthLevel = 0
            return (
              <MenuItems items={menu} key={index} depthLevel={depthLevel} />
            )
          })}
        </ul>
      ) : (
        <Spinner color="white" size={20} />
      )}
    </nav>
  )
}

export default Navbar
