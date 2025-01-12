import React from 'react'
import VideoPlay from '../components/03_VideoPage/01_VideoPlay'
import UpNext from '../components/03_VideoPage/02_UpNext'

function VideoPage() {
  return (
    <div className='mt-[60px] w-full bg-gray-800 text-white p-2 grid grid-cols-7 place-content-center place-items-center lg:place-items-start lg:gap-x-1'>
        <VideoPlay/>
        <UpNext/>
    </div>
  )
}

export default VideoPage