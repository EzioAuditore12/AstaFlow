import React from 'react'
import SearchItemsResult from '../components/02_Search/01_searchItemsResult'

const SearchCategory='hi'
const PageNo=1
function SearchResult() {
  return (
    <div className='mt-[50px]'>
    <div className=' w-full h-[250px] flex justify-center items-center'>
        <h1 className='text-3xl'>Search Results :{SearchCategory} --{PageNo}</h1>
    </div>
    <SearchItemsResult/>
    </div>
  )
}

export default SearchResult