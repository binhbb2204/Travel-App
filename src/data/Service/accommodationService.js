import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/accommodations';

export const accommodationService = {
  getAllAccommodations: async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all accommodations:', error);
      throw error;
    }
  },

  searchAccommodations: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      const paramMapping = {
        keyword: 'keyword',
        country: 'country',
        city: 'city',
        type: 'type',
        minPrice: 'minPrice',
        maxPrice: 'maxPrice',
        groupSize: 'maxGroupSize'
      };

      Object.entries(params).forEach(([key, value]) => {
        const backendKey = paramMapping[key];
        if (value && value !== 'any' && backendKey) {
          queryParams.append(backendKey, value);
        }
      });

      const response = await axios.get(`${BASE_URL}/search/getAccommodationBySearch?${queryParams.toString()}`);
      return response.data.data;
    } catch (error) {
      console.error('Error searching accommodations:', error);
      throw error;
    }
  },

  getUniqueLocations: async () => {
    try {
      const accommodations = await accommodationService.getAllAccommodations();
      
      const uniqueCountries = [...new Set(accommodations.map(acco => acco.country))].sort();
      
      const citiesMap = accommodations.reduce((acc, acco) => {
        if (!acc[acco.country]) acc[acco.country] = [];
        if (!acc[acco.country].includes(acco.city)) 
          acc[acco.country].push(acco.city);
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

  getSingleAccommodation: async (accommodationId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${accommodationId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching accommodation with ID ${accommodationId}:`, error);
      throw error;
    }
  },

  getFeaturedAccommodations: async (page = 0) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/getFeaturedAccommodations?page=${page}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching featured accommodations:', error);
      throw error;
    }
  },

  getAccommodationCount: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/search/getAccommodationCount`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching accommodation count:', error);
      throw error;
    }
  },

  updateAccommodation: async () => {
    try {

    } catch (error) {

    }
  },

  deleteAccommodation: async () => {
    try {

    } catch (error) {

    }
  },

};