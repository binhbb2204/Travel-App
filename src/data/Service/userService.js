import axios from 'axios';

import { authService } from './authService';
const getBaseUrl = () => {
    // If running on localhost
    if (window.location.hostname === 'localhost') {
        return 'http://localhost:8000/api/v1/users';
    }

    // For mobile/other networks, use current host
    return `${window.location.protocol}//${window.location.hostname}:8000/api/v1/users`;
};

const BASE_URL = getBaseUrl();

const api = axios.create({
    baseURL: BASE_URL,
  });
  
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export const userService = {
    getAllUsers: async () => {
        try {
            const token = authService.getCurrentUser().token;
            const response = await axios.get(`${BASE_URL}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching all tours:', error);
            throw error;
        }
    },
    
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

    updateUserPassword: async (userId, passwordData) => {
        try {
            const token = authService.getCurrentUser().token;
            const response = await axios.put(`${BASE_URL}/${userId}/password`, passwordData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    },
};