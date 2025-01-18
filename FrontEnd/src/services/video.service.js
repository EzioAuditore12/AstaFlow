import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

class VideoService {
    async uploadVideo(formData) {
        try {
            const response = await axios.post(`${BASE_URL}/users/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getVideoById(videoId) {
        try {
            const response = await axios.get(`${BASE_URL}/users/videos/${videoId}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async streamVideo(videoId, quality = '720p') {
        try {
            const response = await axios.get(`${BASE_URL}/users/stream/${videoId}/${quality}`, {
                responseType: 'blob',
                withCredentials: true
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            throw error;
        }
    }
}

export default new VideoService(); 