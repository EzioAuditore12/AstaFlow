import React, { useState } from 'react'
import MenuIcon from './01_menuIcon'
import Logo from './02_logo'
import NavItems from './03_navItems'
import SearchBar from './04_searchBar'
import Upload from './05_upload'
import User from './06_user'

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const toggleMenu = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <header className='p-2 flex justify-between'>
      <div className='flex justify-center items-center gap-3'>
        <MenuIcon openSidebar={toggleMenu} />
        <Logo/>
        <NavItems isOpen={isSidebarOpen} onClose={closeSidebar} />
      </div>
      <div className='flex justify-center items-center gap-5'>
        <SearchBar/>
        <Upload/>
        <User/>
      </div>
    </header>
  )
}

export default Header
