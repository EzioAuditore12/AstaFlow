import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useMobile } from '../../context/MobileContext';
import { useLargeDevice, useMediumDevice } from '../../context';


function SearchBarIcon({openMobileSearchBar}) {
  return (
      <FaSearch 
      className='h-[25px] w-[25px] cursor-pointer'
      onClick={openMobileSearchBar}
      />
  )
}

function SearchField(){
  return(
    <input 
    type="text"
    placeholder="Search..."
    className='w-full outline-none lg:p-1 bg-transparent'
    autoFocus
  />
  )
}


function MobileSearchBar({isOpen}) {
  if (!isOpen) return null;
  
  return(
    <div className='fixed inset-x-0 top-[64px] w-[100vw] bg-white shadow-lg transition-all duration-300 py-4 px-3 z-50'>
      <div className='flex items-center gap-2 border border-gray-300 rounded-lg p-2 max-w-4xl mx-auto'>
        <FaSearch className='text-gray-500 w-5 h-5'/>
        <SearchField/>
      </div>
    </div>
  )
}

function LargeSearchBar(){
  return(
    <div className='flex justify-center items-center border-2 px-2 rounded-lg border-black'>
      <SearchField/>
      <SearchBarIcon/>
    </div>
  )
}


function SearchBar(){
  const [isMobileSearchBarOpen, setMobileSearchBarOpen] = useState(false)
  const { isMobile } = useMobile()
  const {isMediumDevice} = useMediumDevice()
  const {isLargeDevice} = useLargeDevice()

  const toggleSearchBar = () => {
    setMobileSearchBarOpen(!isMobileSearchBarOpen)
  }
  
  return (
    <div className='relative'>
      {(isMobile || isMediumDevice) && 
      <>
        <SearchBarIcon openMobileSearchBar={toggleSearchBar}/> 
        <MobileSearchBar isOpen={isMobileSearchBarOpen} />
      </>
      }
      {isLargeDevice && <LargeSearchBar/>}
    </div>
  );
}


export default SearchBar
