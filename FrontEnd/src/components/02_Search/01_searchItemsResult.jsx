import React from 'react'
import { TbFilterSearch } from "react-icons/tb";
import { BsArrowDownUp } from "react-icons/bs";

function SearchItemsOptionAndFilteration() {
  return (
        <div className='col-span-2 w-full flex justify-between '>
            <div className='flex gap-2'>
            <TbFilterSearch className='h-[20px] w-[20px]'/>
            <p>Filters</p>
            </div>
            <div className='flex gap-2'>
            <BsArrowDownUp className='h-[20px] w-[20px]'/>
            <p>Relevance</p>
            </div>
        </div>
  )
}


function SearchItems(){
    return(
        <div className='col-span-2 w-full'>
        
        </div>
    )
}

function SearchItemsResult(){
    return(
        <div className='w-full h-auto grid grid-cols-2 place-content-center place-items-center bg-gray-100 p-4'>
        <SearchItemsOptionAndFilteration/>

        </div>
    )
}
export default SearchItemsResult