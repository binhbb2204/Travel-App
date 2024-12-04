import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/auth';
export const authService = {
    login: async (email, password) => {
        try {
            const response = await axios.post( `${BASE_URL}/login`, { email, password });
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
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        
        // Clear all items related to "Remember Me" functionality
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
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