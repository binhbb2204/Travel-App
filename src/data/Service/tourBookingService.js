import axios from 'axios';

const getBaseUrl = () => {
    // If running on localhost
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:8000/api/v1/tour_booking';
    }
    
    // For mobile/other networks, use current host
    return `${window.location.protocol}//${window.location.hostname}:8000/api/v1/tour_booking`;
};
const BASE_URL = 'http://localhost:8000/api/v1/tour_booking';

export const tourBookingService = {
    createTourBook: async (tourBookingData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            await axios.post(`${BASE_URL}`, tourBookingData, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error creating tours booking:', error);
            throw error;
        }
    },

    getAllTourBook: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const response = await axios.get(`${BASE_URL}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Error get all tours booking:', error);
            throw error;
        }
    },

    getUserTourBook: async (userId, status) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const response = await axios.get(`${BASE_URL}/search/getUserTourBooking?userId=${userId}&status=${status}`,{
                headers: {
                    'Authorization': `Bearer ${token}`, 
                }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error finding tour booking`, error);
            return 0;
            // throw error;
        }
    },

    deleteUserTourBook: async (userId, status) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            await axios.delete(`${BASE_URL}/deleteUserTourBooking?userId=${userId}&status=${status}`,{
                headers: {
                    'Authorization': `Bearer ${token}`, 
                }
            });
        } catch (error) {
            console.error(`Error deleting tour booking`, error);
            throw error;
        }
    },

    deleteTourBook: async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            await axios.delete(`${BASE_URL}/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`, 
                }
            });
        } catch (error) {
            console.error(`Error deleting tour booking`, error);
            throw error;
        }
    },

    updateUserTourBook: async (userId, status, updateData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const response = await axios.put(`${BASE_URL}/updateUserTourBooking?userId=${userId}&status=${status}`, updateData,{
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
            return response.data; // Return the updated data if needed
        } catch (error) {
            console.error(`Error updating tour booking`, error);
            throw error; // Throw the error to handle it in the calling function
        }
    },

    updateTourBook: async (id, updateData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const response = await axios.put(`${BASE_URL}/${id}`, updateData, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
            return response.data; // Return the updated data if needed
        } catch (error) {
            console.error(`Error updating tour booking`, error);
            throw error; // Throw the error to handle it in the calling function
        }
    },
};

