import axios from 'axios';
import { authService } from './authService';

const getBaseUrl = () => {
  // If running on localhost
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:8000/api/v1/accommodations';
  }
  
  // For mobile/other networks, use current host
  return `${window.location.protocol}//${window.location.hostname}:8000/api/v1/accommodations`;
};

const BASE_URL = getBaseUrl();

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

export const accommodationService = {
  createAccommodation: async (accommodationData) => {
    try {
      const user = authService.getCurrentUser();
      if (user.role !== 'admin') {
        throw new Error('Only admin can create accommodations');
      }

      const response = await api.post('', accommodationData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating accommodation:', error);
      throw error;
    }
  },

  updateAccommodation: async (accommodationId, accommodationData) => {
    try {
      const user = authService.getCurrentUser();
      if (user.role !== 'admin') {
        throw new Error('Only admin can update accommodations');
      }

      const response = await api.put(`/${accommodationId}`, accommodationData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.data;
    } catch (error) {
      console.error(`Error updating accommodation with ID ${accommodationId}:`, error);
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

  deleteAccommodation: async (accommodationId) => {
    try {
      // Check if user is admin before making the request
      const user = authService.getCurrentUser();
      if (user.role !== 'admin') {
        throw new Error('Only admin can delete accommodations');
      }

      const response = await api.delete(`/${accommodationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting accommodation with ID ${accommodationId}:`, error);
      throw error;
    }
  },
};