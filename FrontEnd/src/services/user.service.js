import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/users';

const userService = {
    getUserDetails: async (userId) => {
        try {
            console.log('Fetching user details for ID:', userId);
            const response = await axios.get(`${API_URL}/user/${userId}`, {
                withCredentials: true
            });
            console.log('User details response:', response.data);
            return response;
        } catch (error) {
            console.error('User details error:', error.response || error);
            throw error.response?.data || error.message;
        }
    },

    getUserProfile: async () => {
        try {
            console.log('Fetching user profile...');
            const token = localStorage.getItem('accessToken');
            
            const response = await axios.get(`${API_URL}/profile`, {
                withCredentials: true,
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json'
                }
            });
            
            // Ensure watchHistory exists
            if (response.data?.data?.user) {
                response.data.data.user.watchHistory = response.data.data.user.watchHistory || [];
            }
            
            console.log('Profile response:', response.data);
            return response;
        } catch (error) {
            console.error('Profile fetch error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            throw error.response?.data || error.message;
        }
    }
};

export default userService;