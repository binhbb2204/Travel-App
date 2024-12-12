import axios from 'axios';

const getBaseUrl = () => {
    // If running on localhost
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:8000/api/v1/auth';
    }
    
    // For mobile/other networks, use current host
    return `${window.location.protocol}//${window.location.hostname}:8000/api/v1/auth`;
};
const BASE_URL = getBaseUrl();
export const authService = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/register`, userData);
            return response.data;

        } catch (error) {
            console.error('Register failed:', error.response ? error.response.data : error.message);
            throw error;
        }
    },
    login: async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, { email, password });
            const { token, data, role } = response.data;
            // Assuming the backend returns a token

            localStorage.setItem('token', token);
            localStorage.setItem('userId', data._id);
            localStorage.setItem('username', data.name);
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userRole', role);
            console.log("Token:", token)
            return response.data;
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    logout: () => {
        // Remove all user-related items from localStorage
        const keysToRemove = [
            'token', 
            'userId', 
            'username', 
            'userEmail', 
            'userRole', 
        ];
    
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
    },

    getCurrentUser: () => {
        return {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
            username: localStorage.getItem('username'),
            email: localStorage.getItem('userEmail'),
            role: localStorage.getItem('userRole')
        };
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
}