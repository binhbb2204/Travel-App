import axios from 'axios';
import { authService } from './authService';

const BASE_URL = 'http://localhost:8000/api/v1/tours';


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

export const tourService = {
  createTour: async (tourData) => {
    try {
      const user = authService.getCurrentUser();
      if (user.role !== 'admin') {
        throw new Error('Only admin can create tours');
      }

      const response = await api.post('', tourData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating tour:', error);
      throw error;
    }
  },


  updateTour: async (tourId, tourData) => {
    try {
      const user = authService.getCurrentUser();
      if (user.role !== 'admin') {
        throw new Error('Only admin can update tours');
      }

      const response = await api.put(`${tourId}`, tourData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error(`Error updating tour with ID ${tourId}:`, error);
      throw error;
    }
  },
  
  getSingleTour: async (tourId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${tourId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching tour with ID ${tourId}:`, error);
      throw error;
    }
  },

  getAllTours: async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all tours:', error);
      throw error;
    }
  },

  searchTours: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      const paramMapping = {
        keyword: 'keyword',
        country: 'country',
        city: 'city',
        minPrice: 'minPrice',
        maxPrice: 'maxPrice',
        duration: 'duration',
        groupSize: 'maxGroupSize'
      };

      Object.entries(params).forEach(([key, value]) => {
        const backendKey = paramMapping[key];
        if (value && value !== 'any' && backendKey) {
          queryParams.append(backendKey, value);
        }
      });

      const response = await axios.get(`${BASE_URL}/search/searchTours?${queryParams.toString()}`);
      return response.data.data;
    } catch (error) {
      console.error('Error searching tours:', error);
      throw error;
    }
  },

  getFeaturedTours: async (page = 0) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/getFeaturedTours?page=${page}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching featured tours:', error);
      throw error;
    }
  },

  getTourCount: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/search/getTourCount`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching tour count:', error);
      throw error;
    }
  },

  getUniqueLocations: async () => {
    try {
      const tours = await tourService.getAllTours();
      
      const uniqueCountries = [...new Set(tours.map(tour => tour.country))].sort();
      
      const citiesMap = tours.reduce((acc, tour) => {
        if (!acc[tour.country]) acc[tour.country] = [];
        if (!acc[tour.country].includes(tour.city)) 
          acc[tour.country].push(tour.city);
        return acc;
      }, {});

      return {
        countries: uniqueCountries,
        cities: citiesMap
      };
    } catch (error) {
      console.error('Error fetching unique locations:', error);
      throw error;
    }
  },

  deleteTour: async (tourId) => {
    try {
      // Check if user is admin before making the request
      const user = authService.getCurrentUser();
      if (user.role !== 'admin') {
        throw new Error('Only admin can delete tours');
      }

      const response = await api.delete(`${BASE_URL}/${tourId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting tour with ID ${tourId}:`, error);
      throw error;
    }
  },
};