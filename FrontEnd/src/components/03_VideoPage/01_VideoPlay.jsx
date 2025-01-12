import React from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";

function VideoPlay({

}) {
  return (
    <div className='col-span-7 lg:col-span-5 w-full h-auto grid grid-cols-7 place-content-center place-items-center text-white '>
        <div className='col-span-7 w-full h-auto max-w-[900px] max-h-[900px] flex flex-col justify-center items-center gap-y-2'>
        <img
         className='object-cover'
         src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" />
         <h1 className='text-2xl mr-auto'>Anderson Fights His Way to Glory</h1>
         <h1 className='mr-auto'>Published on February 15,2019</h1>
         <div className='h-[40px] w-full bg-gray-600 rounded-md flex items-center justify-between p-3'>
         + PlayList 
         <AiOutlineLike/>
         </div>
         <button className='flex gap-2 items-center p-2 border-2 border-gray-50 rounded-3xl'>
         Leave a comment
         <FaRegComment/>
         </button>
        </div>  
    </div>
  )
}

export default VideoPlay