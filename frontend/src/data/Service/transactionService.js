import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/transactions';

export const transactionService = {

  createTransaction: async (transactionData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        await axios.post(`${BASE_URL}`, transactionData, {
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

  getAllTransactions: async () => {
    try {
      const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
      }
      const response = await axios.get(`${BASE_URL}`,{
        headers: {
            'Authorization': `Bearer ${token}`, 
        }
    });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all accommodations:', error);
      throw error;
    }
  },


  getSingleTransaction: async (transId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${transId}`,{
        headers: {
            'Authorization': `Bearer ${token}`, 
        }
    });
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching accommodation with ID ${transId}:`, error);
      throw error;
    }
  },

  getUserTransaction: async (userId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
          throw new Error('No authentication token found');
      }
      const response = await axios.get(`${BASE_URL}/getUserTransaction?userId=${userId}`,{
          headers: {
              'Authorization': `Bearer ${token}`, 
          }
      });
      // console.log("tried get user acco book");
      // console.log(response.data.data);
      return response.data.data;
      
    } catch (error) {
      console.log(userId);

        console.error(`Error finding transaction`, error);
        // throw error;
        return 0;
    }
  }
};