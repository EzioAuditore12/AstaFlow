import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function UploadForm() {
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            setIsUploading(true);
            const formData = new FormData();
            
            // Append text data
            formData.append('title', data.title);
            formData.append('description', data.description);
            
            // Append files
            formData.append('video', data.video[0]);
            formData.append('thumbnail', data.thumbnail[0]);
            formData.append('posterImage', data.posterImage[0]);

            const response = await fetch('/api/v1/users/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Upload failed');

            toast.success('Video uploaded successfully!');
            navigate('/'); // or wherever you want to redirect after upload
        } catch (error) {
            toast.error(error.message || 'Error uploading video');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-4 space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    {...register("description", { required: "Description is required" })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Video File</label>
                <input
                    type="file"
                    accept="video/*"
                    {...register("video", { required: "Video file is required" })}
                    className="mt-1 block w-full"
                />
                {errors.video && <p className="text-red-500 text-sm">{errors.video.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Thumbnail Image</label>
                <input
                    type="file"
                    accept="image/*"
                    {...register("thumbnail", { required: "Thumbnail is required" })}
                    className="mt-1 block w-full"
                />
                {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Poster Image</label>
                <input
                    type="file"
                    accept="image/*"
                    {...register("posterImage", { required: "Poster image is required" })}
                    className="mt-1 block w-full"
                />
                {errors.posterImage && <p className="text-red-500 text-sm">{errors.posterImage.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isUploading}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {isUploading ? 'Uploading...' : 'Upload Video'}
            </button>
        </form>
    );
}

export default UploadForm; 