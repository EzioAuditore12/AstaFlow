import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlay from '../components/03_VideoPage/01_VideoPlay';
import UpNext from '../components/03_VideoPage/02_UpNext';
import RelatedVideos from '../components/03_VideoPage/03_RelatedVideos';
import videoService from '../services/video.service';
import { toast } from 'react-hot-toast';

function VideoPage() {
    const { videoId } = useParams();
    const [videoData, setVideoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                setIsLoading(true);
                const response = await videoService.getVideo(videoId);
                setVideoData(response.data);
            } catch (error) {
                toast.error('Failed to load video');
                console.error('Error fetching video:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (videoId) {
            fetchVideo();
        }
    }, [videoId]);

    if (isLoading) {
        return (
            <div className="mt-[60px] min-h-screen bg-gray-100 flex items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className='mt-[60px] min-h-screen bg-gray-100'>
            <div className='w-full h-auto grid grid-cols-7 place-content-center place-items-start'>
                <VideoPlay videoData={videoData} />
                <UpNext />
            </div>
            <RelatedVideos />
        </div>
    );
}

export default VideoPage;