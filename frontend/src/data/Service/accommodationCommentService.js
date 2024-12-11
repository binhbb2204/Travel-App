import axios from 'axios';

const getBaseUrl = () => {
    // If running on localhost
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:8000/api/v1/accom-comments';
    }
    
    // For mobile/other networks, use current host
    return `${window.location.protocol}//${window.location.hostname}:8000/api/v1/accom-comments`;
};
const BASE_URL = getBaseUrl();

export const accommodationCommentService = {
    createComment: async (accoId, commentData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.post(`${BASE_URL}/${accoId}`, commentData, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });

            return response;
        } catch (error) {
            console.error('Accommodation Comment Creation Error:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    getComments: async (accoId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.get(`${BASE_URL}/${accoId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response;
        } catch (error) {
            console.error('Failed to fetch accommodation comments:', error);
            throw error;
        }
    },

    updateComment: async (commentId, updateData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.put(`${BASE_URL}/${commentId}`, updateData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            return response;
        } catch (error) {
            console.error('Failed to update accommodation comment:', error);
            throw error;
        }
    },

    deleteComment: async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.delete(`${BASE_URL}/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response;
        } catch (error) {
            console.error('Failed to delete accommodation comment:', error);
            throw error;
        }
    },

    toggleLike: async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
    
            const response = await axios.put(`${BASE_URL}/${commentId}`, 
                { likes: true }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            return response;
        } catch (error) {
            console.error('Failed to toggle like on accommodation comment:', error);
            throw error;
        }
    }
};