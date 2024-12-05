import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/accommodation_booking';

export const accommodationBookingService = {
    createAccoBook: async (accoBookingData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            await axios.post(`${BASE_URL}`, accoBookingData, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error creating accommodations booking:', error);
            throw error;
        }
    },

    getAllAccoBook: async () => {
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
            console.error('Error get all accommodations booking:', error);
            throw error;
        }
    },

    getUserAccoBook: async (userId, status) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const response = await axios.get(`${BASE_URL}/search/getUserAccoBooking?userId=${userId}&status=${status}`,{
                headers: {
                    'Authorization': `Bearer ${token}`, 
                }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error finding accommodation booking`, error);
            throw error;
        }
    },

    deleteUserAccoBook: async (userId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            await axios.delete(`${BASE_URL}/deleteUserAccoBooking?userId=${userId}`,{
                headers: {
                    'Authorization': `Bearer ${token}`, 
                }
            });
        } catch (error) {
            console.error(`Error deleting accommodation booking`, error);
            throw error;
        }
    },

    deleteAccoBook: async (id) => {
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
            console.error(`Error deleting accommodation booking`, error);
            throw error;
        }
    },

    updateUserAccoBook: async (userId, updateData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const response = await axios.put(`${BASE_URL}/updateUserAccoBooking?userId=${userId}`, updateData,{
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
            return response.data; // Return the updated data if needed
        } catch (error) {
            console.error(`Error updating accommodation booking`, error);
            throw error; // Throw the error to handle it in the calling function
        }
    },

    updateAccoBook: async (id, updateData) => {
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
            console.error(`Error updating accommodation booking`, error);
            throw error; // Throw the error to handle it in the calling function
        }
    },
};

