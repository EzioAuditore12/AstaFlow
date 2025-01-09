import React from 'react'
import { FiAlignJustify } from "react-icons/fi";

function MenuIcon({ openSidebar }) {
  return (
    <FiAlignJustify 
      className='h-[40px] w-[40px] menu-icon' 
      onClick={openSidebar}
    />
  )
}

export default MenuIcon
