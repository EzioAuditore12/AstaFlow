import axios from './axios.config';

class VideoService {
    async uploadVideo(formData) {
        try {
            const response = await axios.post('/users/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    async getVideo(videoId) {
        try {
            const response = await axios.get(`/users/videos/${videoId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    async streamVideo(videoId, quality) {
        try {
            const response = await axios.get(`/users/stream/${videoId}/${quality}`, {
                responseType: 'blob'
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}

export default new VideoService(); 