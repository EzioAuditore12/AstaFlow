import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import videoService from '../services/video.service';

function UploadPage() {
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            const formData = new FormData();
            // Add your form data here
            formData.append('title', title);
            formData.append('description', description);
            formData.append('categories', JSON.stringify(categories));
            formData.append('video', videoFile);
            formData.append('thumbnail', thumbnailFile);
            formData.append('posterImage', posterImage);

            const response = await videoService.uploadVideo(formData);
            
            toast.success('Video uploaded successfully!');
            // Redirect to the video page
            navigate(`/video/${response.data.videoId}`);
        } catch (error) {
            toast.error('Failed to upload video');
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    // ... rest of your component code ...
}

export default UploadPage; 