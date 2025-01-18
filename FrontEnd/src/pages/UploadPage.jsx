import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import videoService from '../services/video.service';

const CATEGORIES = [
    { id: 'anime', name: 'Anime' },
    { id: 'movies', name: 'Movies' },
    { id: 'tvshows', name: 'TV Shows' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'music', name: 'Music' },
    { id: 'education', name: 'Education' },
    { id: 'sports', name: 'Sports' },
    { id: 'news', name: 'News' }
];

function UploadPage() {
    const navigate = useNavigate();
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categories: []
    });
    const [files, setFiles] = useState({
        video: null,
        thumbnail: null,
        posterImage: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files: fileList } = e.target;
        setFiles(prev => ({
            ...prev,
            [name]: fileList[0]
        }));
    };

    const handleCategoryChange = (categoryId) => {
        setFormData(prev => {
            const categories = prev.categories.includes(categoryId)
                ? prev.categories.filter(id => id !== categoryId)
                : [...prev.categories, categoryId];
            return { ...prev, categories };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submission started');
        
        // Validation
        if (!formData.title.trim()) {
            console.log('Title validation failed');
            toast.error('Title is required');
            return;
        }
        if (!formData.description.trim()) {
            toast.error('Description is required');
            return;
        }
        if (formData.categories.length === 0) {
            toast.error('Please select at least one category');
            return;
        }
        if (!files.video) {
            toast.error('Video file is required');
            return;
        }
        if (!files.thumbnail) {
            toast.error('Thumbnail is required');
            return;
        }
        if (!files.posterImage) {
            toast.error('Poster image is required');
            return;
        }

        setIsUploading(true);
        console.log('Starting upload with data:', { formData, files });

        try {
            const uploadFormData = new FormData();
            uploadFormData.append('title', formData.title);
            uploadFormData.append('description', formData.description);
            uploadFormData.append('categories', JSON.stringify(formData.categories));
            uploadFormData.append('video', files.video);
            uploadFormData.append('thumbnail', files.thumbnail);
            uploadFormData.append('posterImage', files.posterImage);
            console.log('FormData created');

            const response = await videoService.uploadVideo(uploadFormData);
            console.log('Upload successful:', response);
            
            toast.success('Video uploaded successfully!');
            navigate(`/video/${response.data.videoId}`);
        } catch (error) {
            console.error('Upload error details:', error);
            toast.error(error.response?.data?.message || 'Failed to upload video');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="mt-[60px] min-h-screen bg-gray-50 p-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">Upload Video</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isUploading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                            disabled={isUploading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Video File</label>
                        <input
                            type="file"
                            name="video"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isUploading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Thumbnail</label>
                        <input
                            type="file"
                            name="thumbnail"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isUploading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Poster Image</label>
                        <input
                            type="file"
                            name="posterImage"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isUploading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Categories</label>
                        <div className="grid grid-cols-2 gap-2">
                            {CATEGORIES.map(category => (
                                <label
                                    key={category.id}
                                    className={`flex items-center p-2 rounded border cursor-pointer ${
                                        formData.categories.includes(category.id)
                                            ? 'bg-blue-50 border-blue-500'
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={formData.categories.includes(category.id)}
                                        onChange={() => handleCategoryChange(category.id)}
                                        disabled={isUploading}
                                    />
                                    {category.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors ${
                            isUploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload Video'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UploadPage; 