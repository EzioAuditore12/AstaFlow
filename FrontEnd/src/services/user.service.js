import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/users';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include token
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const getUserDetails = async (userId) => {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response;
};

const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get('/profile');
        return response.data.data; // Adjust to match your API response structure
    } catch (error) {
        console.error('Profile fetch error:', error);
        throw error.response?.data || { message: 'Failed to fetch profile' };
    }
};

export default { getUserDetails, login, getUserProfile };