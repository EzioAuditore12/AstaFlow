import React, { useState, useRef, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import videoService from '../../services/video.service';

function VideoPlayer({ videoId, qualities }) {
    const [currentQuality, setCurrentQuality] = useState('720p');
    const [showQualityMenu, setShowQualityMenu] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const videoRef = useRef(null);
    const currentTime = useRef(0);

    useEffect(() => {
        const loadVideo = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const url = await videoService.streamVideo(videoId, currentQuality);
                setVideoUrl(url);
            } catch (err) {
                console.error('Error loading video:', err);
                setError('Failed to load video');
            } finally {
                setIsLoading(false);
            }
        };

        if (videoId) {
            loadVideo();
        }

        // Cleanup
        return () => {
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }
        };
    }, [videoId, currentQuality]);

    const handleQualityChange = async (quality) => {
        if (videoRef.current) {
            currentTime.current = videoRef.current.currentTime;
            setCurrentQuality(quality);
            setShowQualityMenu(false);
        }
    };

    const handleVideoLoad = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = currentTime.current;
        }
    };

    if (isLoading) {
        return (
            <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="relative w-full">
            <video
                ref={videoRef}
                className="w-full h-auto"
                controls
                autoPlay
                onLoadedData={handleVideoLoad}
                src={videoUrl}
            >
                Your browser does not support the video tag.
            </video>

            {/* Quality selector */}
            <div className="absolute bottom-12 right-4">
                <button
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                >
                    <FaCog className="w-5 h-5" />
                </button>

                {showQualityMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-75 rounded-lg overflow-hidden">
                        {qualities.map((quality) => (
                            <button
                                key={quality}
                                className={`block w-full px-4 py-2 text-left text-white hover:bg-gray-700 ${
                                    currentQuality === quality ? 'bg-gray-700' : ''
                                }`}
                                onClick={() => handleQualityChange(quality)}
                            >
                                {quality}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoPlayer; 