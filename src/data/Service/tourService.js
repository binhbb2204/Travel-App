import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

export const tourService = {
    getAllTours: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tours`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tours:', error);
            throw error;
        }
    },

    searchTours: async (searchParams) => {
        try {
            const queryString = new URLSearchParams(
                Object.fromEntries(
                    Object.entries(searchParams).filter(([_, v]) => v !== '' && v !== 'any')
                )
            ).toString();

            const response = await axios.get(`${BASE_URL}/tours/search/searchTours?${queryString}`);
            return response.data;
        } catch (error) {
            console.error('Error searching tours:', error);
            throw error;
        }
    },

    getSingleTour: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/tours/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tour details:', error);
            throw error;
        }
    }
};