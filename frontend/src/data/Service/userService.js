import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/users';

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

