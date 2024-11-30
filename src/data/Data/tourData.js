
import { tourService } from "../Service/tourService";

const tourData = {
    fetchTours: async () => {
        try {
            const response = await tourService.getAllTours();
            return response.data || [];
        } catch (error) {
            console.error('Error fetching tour data:', error);
            return [];
        }
    },

    searchTours: async (searchParams) => {
        try {
            const response = await tourService.searchTours(searchParams);
            return response.data || [];
        } catch (error) {
            console.error('Error searching tours:', error);
            return [];
        }
    }
};

export default tourData;