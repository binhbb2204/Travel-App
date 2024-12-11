import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/transactions';

export const transactionService = {
  getAllTransactions: async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all accommodations:', error);
      throw error;
    }
  },


  getSingleTransaction: async (transId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${transId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching accommodation with ID ${transId}:`, error);
      throw error;
    }
  },
};