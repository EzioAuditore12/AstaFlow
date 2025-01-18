import React from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import VideoPlayer from './VideoPlayer';

function VideoPlay({ videoData }) {
    if (!videoData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='col-span-7 lg:col-span-5 w-full h-auto grid grid-cols-7 place-content-center place-items-center p-2'>
            <div className='col-span-7 w-full h-auto max-w-[900px] flex flex-col justify-center items-center gap-y-2'>
                <VideoPlayer videoData={videoData} />
                
                <div className='w-full'>
                    <h1 className='text-2xl font-bold text-black'>{videoData.title}</h1>
                    <div className='flex items-center gap-4 mt-2'>
                        <img 
                            src={videoData.owner.avatar} 
                            alt={videoData.owner.username}
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className='font-semibold'>{videoData.owner.fullName}</p>
                            <p className='text-sm text-gray-500'>@{videoData.owner.username}</p>
                        </div>
                    </div>
                    
                    <div className='flex gap-4 mt-4 text-sm text-gray-600'>
                        <span>{videoData.views} views</span>
                        <span>•</span>
                        <span>{new Date(videoData.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className='w-full flex gap-4 mt-4'>
                    <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200'>
                        <AiOutlineLike />
                        <span>{videoData.likes}</span>
                    </button>
                    <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200'>
                        <FaRegComment />
                        <span>{videoData.comments}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoPlay;