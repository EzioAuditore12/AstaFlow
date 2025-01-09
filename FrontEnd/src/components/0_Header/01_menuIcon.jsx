import React from 'react'
import { FiAlignJustify } from "react-icons/fi";

function MenuIcon({ openSidebar }) {
  return (
    <FiAlignJustify 
      className='h-[40px] w-[40px] cursor-pointer' 
      onClick={openSidebar}
    />
  )
}

export default MenuIcon
