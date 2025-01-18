import React from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import VideoPlayer from './VideoPlayer';

function VideoPlay({ videoData }) {
    const qualities = videoData?.videoFiles?.map(file => file.quality) || ['1080p', '720p', '480p', '360p'];

    return (
        <div className='col-span-7 lg:col-span-5 w-full h-auto grid grid-cols-7 place-content-center place-items-center p-2 text-white'>
            <div className='col-span-7 w-full h-auto max-w-[900px] max-h-[900px] flex flex-col justify-center items-center gap-y-2'>
                <VideoPlayer 
                    videoId={videoData?._id} 
                    qualities={qualities}
                />
                
                <h1 className='text-2xl mr-auto text-black'>{videoData?.title}</h1>
                <div className='flex gap-2 font-semibold text-black'>
                    <h2>{new Date(videoData?.createdAt).toLocaleDateString()}</h2>
                    <h2>|</h2>
                    <h2>{videoData?.views} views</h2>
                </div>
                <div className='h-[40px] w-full bg-gray-600 rounded-md flex items-center justify-between p-3'>
                    + PlayList 
                    <AiOutlineLike/>
                </div>
                <button className='flex gap-2 items-center p-2 border-2 border-gray-600 text-black rounded-3xl'>
                    Leave a comment
                    <FaRegComment/>
                </button>
            </div>  
        </div>
    );
}

export default VideoPlay;