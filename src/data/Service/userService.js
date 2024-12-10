import axios from 'axios';

const getBaseUrl = () => {
    // If running on localhost
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:8000/api/v1/users';
    }
    
    // For mobile/other networks, use current host
    return `${window.location.protocol}//${window.location.hostname}:8000/api/v1/users`;
};
const BASE_URL = getBaseUrl();

export const userService = {
    getSingleUser: async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/${userId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error finding user data:', error);
            throw error;
        }
    },
};

