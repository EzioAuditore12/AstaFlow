import axiosInstance from '../utils/axios';

class VideoService {
    async uploadVideo(formData) {
        try {
            const response = await axiosInstance.post('/users/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Upload error:', error.response || error);
            throw error;
        }
    }

    async getVideoById(videoId) {
        try {
            const response = await axiosInstance.get(`/users/videos/${videoId}`);
            return response.data;
        } catch (error) {
            console.error('Get video error:', error.response || error);
            throw error;
        }
    }

    async streamVideo(videoId, quality = '720p') {
        try {
            const response = await axiosInstance.get(`/users/stream/${videoId}/${quality}`, {
                responseType: 'blob'
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error('Stream error:', error.response || error);
            throw error;
        }
    }
}

export default new VideoService(); 