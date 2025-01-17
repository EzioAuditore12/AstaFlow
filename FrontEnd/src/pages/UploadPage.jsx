import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
    const [isUploading, setIsUploading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            }
            return [...prev, categoryId];
        });
    };

    const onSubmit = async (data) => {
        try {
            if (selectedCategories.length === 0) {
                toast.error('Please select at least one category');
                return;
            }

            setIsUploading(true);
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('video', data.video[0]);
            formData.append('thumbnail', data.thumbnail[0]);
            formData.append('posterImage', data.posterImage[0]);
            formData.append('categories', JSON.stringify(selectedCategories));

            await videoService.uploadVideo(formData);
            toast.success('Video uploaded successfully!');
            reset();
            setSelectedCategories([]);
            navigate('/user');
        } catch (error) {
            toast.error(error.message || 'Failed to upload video');
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="mt-[60px] min-h-screen bg-gray-50 p-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">Upload Video</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isUploading}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                            disabled={isUploading}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Video File</label>
                        <input
                            type="file"
                            accept="video/*"
                            {...register("video", { required: "Video file is required" })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isUploading}
                        />
                        {errors.video && (
                            <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Thumbnail</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("thumbnail", { required: "Thumbnail is required" })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isUploading}
                        />
                        {errors.thumbnail && (
                            <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Poster Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("posterImage", { required: "Poster image is required" })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isUploading}
                        />
                        {errors.posterImage && (
                            <p className="text-red-500 text-sm mt-1">{errors.posterImage.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Categories</label>
                        <div className="grid grid-cols-2 gap-2">
                            {CATEGORIES.map(category => (
                                <label
                                    key={category.id}
                                    className={`flex items-center p-2 rounded border cursor-pointer ${
                                        selectedCategories.includes(category.id)
                                            ? 'bg-blue-50 border-blue-500'
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={() => handleCategoryChange(category.id)}
                                        disabled={isUploading}
                                    />
                                    {category.name}
                                </label>
                            ))}
                        </div>
                        {selectedCategories.length === 0 && (
                            <p className="text-red-500 text-sm mt-1">Please select at least one category</p>
                        )}
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