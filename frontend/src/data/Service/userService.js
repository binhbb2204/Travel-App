import axios from 'axios';
import { authService } from "../../data/Service/authService";

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
            const token = authService.getCurrentUser().token;
            const response = await axios.get(`${BASE_URL}/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            console.error('Error finding user data:', error);
            throw error;
        }
    },

    updateUserProfile: async (userId, userData) => {
        try {
            const token = authService.getCurrentUser().token;
            const response = await axios.put(`${BASE_URL}/${userId}`, userData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    },

    getTransactionHistory: async (userId) => {
        try {
            const token = authService.getCurrentUser().token;
            const response = await axios.get(`${BASE_URL}/${userId}/transactions`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    },
};