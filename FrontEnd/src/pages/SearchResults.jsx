import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import FilterBar from '../components/02_Search/02_filterBar';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const query = searchParams.get('q');
                const category = searchParams.get('category');
                const sort = searchParams.get('sort');
                
                const response = await axios.get(`/api/v1/search`, {
                    params: {
                        q: query,
                        category,
                        sort,
                        page: searchParams.get('page') || 1
                    }
                });
                
                setVideos(response.data.data.videos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchParams]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="mt-[60px] grid grid-cols-4 gap-4">
            <FilterBar />
            <div className="col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function VideoCard({ video }) {
    return (
        <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="font-bold">{video.title}</h3>
                <p className="text-sm text-gray-600">
                    {video.owner.username} • {video.views} views
                </p>
            </div>
        </div>
    );
}

export default SearchResults; 