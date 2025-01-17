import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/users';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

const authService = {
    register: async (formData) => {
        const response = await axiosInstance.post('/register', formData);
        return response.data;
    },

    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/login', credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: async () => {
        const response = await axiosInstance.post('/logout');
        return response.data;
    }
};

export default authService;