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


function SearchItems({
    searchResultsHistory
}){
    return(
        <div className='col-span-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 place-content-center place-items-center w-full gap-y-3'>
            {searchResultsHistory.map((item,index)=>{
                return(
                <div
                key={item.id} 
                className='col-span-1 flex-col justify-center items-center w-[80%] h-full'>
                    <img 
                    src={item.posterImage}
                     className="h-auto w-full"   
                    />
                <h1 className='text-center'>{item.title}</h1>
                </div>
                )
            })}
        </div>
    )
}

function SearchItemsResult({
    searchResults
}){
    return(
        <div className='w-full h-auto grid grid-cols-2 place-content-center place-items-center bg-gray-100 p-4 gap-y-5'>
        <SearchItemsOptionAndFilteration/>
        <SearchItems searchResultsHistory={searchResults}/>
        </div>
    )
}
export default SearchItemsResult