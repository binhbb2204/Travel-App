import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/accommodation_booking';

export const accommodationBookingService = {
    createAccoBook: async (accoBookingData) => {
        try {
            await axios.post(`${BASE_URL}`, accoBookingData);
        } catch (error) {
            console.error('Error creating accommodations booking:', error);
            throw error;
        }
    },

    getAllAccoBook: async () => {
        try {
            const response = await axios.get(`${BASE_URL}`);
            return response.data.data;
        } catch (error) {
            console.error('Error get all accommodations booking:', error);
            throw error;
        }
    },

    getCurrentAccoBook: async (userId, status) => {
        try {
            const response = await axios.get(`${BASE_URL}/search/getUserAccoBooking?userId=${userId}&status=${status}`);
            return response.data.data;
        } catch (error) {
            console.error(`Error finding accommodation booking`, error);
            throw error;
        }
    },

    deleteUserAccoBook: async (userId) => {
        try {
            await axios.delete(`${BASE_URL}/deleteUserAccoBooking?userId=${userId}`);
        } catch (error) {
            console.error(`Error deleting accommodation booking`, error);
            throw error;
        }
    },

    deleteAccoBook: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
        } catch (error) {
            console.error(`Error deleting accommodation booking`, error);
            throw error;
        }
    },

    deleteAccoBook: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
        } catch (error) {
            console.error(`Error deleting accommodation booking`, error);
            throw error;
        }
    },

    updateUserAccoBook: async (userId, updateData) => {
        try {
            const response = await axios.put(`${BASE_URL}/updateUserAccoBooking?userId=${userId}`, updateData);
            return response.data; // Return the updated data if needed
        } catch (error) {
            console.error(`Error updating accommodation booking`, error);
            throw error; // Throw the error to handle it in the calling function
        }
    },

    updateAccoBook: async (id, updateData) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, updateData);
            return response.data; // Return the updated data if needed
        } catch (error) {
            console.error(`Error updating accommodation booking`, error);
            throw error; // Throw the error to handle it in the calling function
        }
    },
};

