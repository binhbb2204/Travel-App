// src/services/tourService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/tours';

export const tourService = {
  createTour: async (tourData) => {
    try {
      const response = await axios.post(`${BASE_URL}`, tourData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating tour:', error);
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
  // Get all tours
  getAllTours: async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all tours:', error);
      throw error;
    }
  },

  // Search tours with flexible parameters
  searchTours: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Mapping frontend params to backend param names
      const paramMapping = {
        keyword: 'keyword',
        country: 'country',
        city: 'city',
        minPrice: 'minPrice',
        maxPrice: 'maxPrice',
        duration: 'duration',
        groupSize: 'maxGroupSize'
      };

      // Add non-empty and non-default parameters
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

  // Get featured tours
  getFeaturedTours: async (page = 0) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/getFeaturedTours?page=${page}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching featured tours:', error);
      throw error;
    }
  },

  // Get tour count
  getTourCount: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/search/getTourCount`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching tour count:', error);
      throw error;
    }
  },

  // Extract unique countries and cities
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
  }
};