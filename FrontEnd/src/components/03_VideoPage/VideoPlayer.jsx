import React, { useState, useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';
import { FaCog } from 'react-icons/fa';

function VideoPlayer({ videoData }) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [currentQuality, setCurrentQuality] = useState('720p');
    const [showQualityMenu, setShowQualityMenu] = useState(false);

    useEffect(() => {
        if (!videoRef.current || !videoData?.videoFiles) return;

        // Find the video URL for current quality
        const currentVideo = videoData.videoFiles.find(f => f.quality === currentQuality);
        const videoUrl = currentVideo ? `http://localhost:8000${currentVideo.url}` : '';
        console.log('Current video URL:', videoUrl);

        const videoJsOptions = {
            autoplay: false,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [{
                src: videoUrl,
                type: 'video/mp4'
            }],
            playbackRates: [0.5, 1, 1.5, 2],
            userActions: {
                hotkeys: true
            }
        };

        // Initialize video.js player
        const player = videojs(videoRef.current, videoJsOptions, () => {
            console.log('Player ready');
            playerRef.current = player;
        });

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        };
    }, [videoData, currentQuality]);

    const handleQualityChange = (quality) => {
        if (!playerRef.current || !videoData?.videoFiles) return;

        const newVideo = videoData.videoFiles.find(f => f.quality === quality);
        if (!newVideo) return;

        const currentTime = playerRef.current.currentTime();
        const wasPlaying = !playerRef.current.paused();

        playerRef.current.src({
            src: `http://localhost:8000${newVideo.url}`,
            type: 'video/mp4'
        });

        playerRef.current.currentTime(currentTime);
        if (wasPlaying) {
            playerRef.current.play();
        }

        setCurrentQuality(quality);
        setShowQualityMenu(false);
    };

    if (!videoData?.videoFiles?.length) {
        return <div>No video sources available</div>;
    }

    return (
        <div className="relative w-full">
            <div data-vjs-player>
                <video
                    ref={videoRef}
                    className="video-js vjs-theme-forest vjs-big-play-centered"
                >
                    <p className="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a
                        web browser that supports HTML5 video
                    </p>
                </video>
            </div>

            {/* Quality selector */}
            <div className="absolute bottom-4 right-4 z-10">
                <button
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 flex items-center gap-2"
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                >
                    <FaCog className={`w-5 h-5 ${showQualityMenu ? 'rotate-90' : ''} transition-transform`} />
                    <span>{currentQuality}</span>
                </button>

                {showQualityMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-75 rounded-lg overflow-hidden">
                        {videoData.videoFiles.map(file => (
                            <button
                                key={file.quality}
                                className={`block w-full px-4 py-2 text-left text-white hover:bg-gray-700 ${
                                    currentQuality === file.quality ? 'bg-gray-700' : ''
                                }`}
                                onClick={() => handleQualityChange(file.quality)}
                            >
                                {file.quality}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoPlayer; 