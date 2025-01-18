import React, { useEffect, useState } from 'react';
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
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                console.log('Fetching video data for ID:', videoId);
                const response = await videoService.getVideoById(videoId);
                console.log('Video data received:', response.data);
                setVideoData(response.data);
            } catch (error) {
                console.error('Error fetching video:', error);
                setError(error.message || 'Failed to load video');
                toast.error('Failed to load video');
            } finally {
                setIsLoading(false);
            }
        };

        if (videoId) {
            fetchVideoData();
        }
    }, [videoId]);

    if (isLoading) {
        return (
            <div className="mt-[60px] min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading video...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-[60px] min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className='mt-[60px] w-full min-h-screen grid grid-cols-7 place-content-center place-items-center bg-gray-100'>
            <VideoPlay videoData={videoData} />
            <UpNext />
            <RelatedVideos />
        </div>
    );
}

export default VideoPage;