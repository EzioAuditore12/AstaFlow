import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    withCredentials: true
});

// Add request interceptor to include auth token
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle token refresh or logout logic here
            localStorage.removeItem('accessToken');
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default instance; 