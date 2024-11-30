
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

    async searchTours(params) {
        try {
          const queryString = new URLSearchParams(
            Object.fromEntries(
              Object.entries(params).filter(([_, v]) => v != null && v !== '')
            )
          ).toString();
      
          const response = await axios.get(`${BASE_URL}/search/searchTours?${queryString}`);
          
          // Explicitly return the data array
          return response.data.data || [];
        } catch (error) {
          console.error('Error searching tours:', error);
          throw error;
        }
    },
};

export default tourData;