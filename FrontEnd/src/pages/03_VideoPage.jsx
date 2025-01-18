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

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await videoService.getVideoById(videoId);
                setVideoData(response.data.data);
            } catch (error) {
                toast.error('Failed to load video');
                console.error('Error loading video:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (videoId) {
            fetchVideoData();
        }
    }, [videoId]);

    if (isLoading) {
        return <div>Loading...</div>;
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