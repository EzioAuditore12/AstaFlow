import React, { useState, useRef } from 'react';
import { FaCog } from 'react-icons/fa';

function VideoPlayer({ videoId, qualities }) {
    const [currentQuality, setCurrentQuality] = useState('720p');
    const [showQualityMenu, setShowQualityMenu] = useState(false);
    const videoRef = useRef(null);
    const currentTime = useRef(0);

    const handleQualityChange = (quality) => {
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

    return (
        <div className="relative w-full">
            <video
                ref={videoRef}
                className="w-full h-auto"
                controls
                onLoadedData={handleVideoLoad}
                src={`/api/v1/users/stream/${videoId}/${currentQuality}`}
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