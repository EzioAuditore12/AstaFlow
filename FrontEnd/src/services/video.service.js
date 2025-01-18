import axios from 'axios';

class VideoService {
    async uploadVideo(formData) {
        return axios.post('/api/v1/users/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    async getVideoById(videoId) {
        return axios.get(`/api/v1/users/videos/${videoId}`);
    }

    async streamVideo(videoId, quality = '720p') {
        return axios.get(`/api/v1/users/stream/${videoId}/${quality}`);
    }
}

export default new VideoService(); 