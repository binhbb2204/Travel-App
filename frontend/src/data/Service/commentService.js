import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/comments';

export const commentService = {
    createComment: async(tourId, commentData) => {
        try {
            const response = await axios.post(`${BASE_URL}/${tourId}`, commentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createComment: async(tourId, commentData) => {
        try {
            const response = await axios.post(`${BASE_URL}/${tourId}`, commentData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    },
    
    createReply: async (commentId, replyData, parentReplyId = null) => {
        const url = parentReplyId 
            ? `${BASE_URL}/reply/${commentId}/${parentReplyId}` 
            : `${BASE_URL}/reply/${commentId}`;
        
        try {
            const response = await axios.post(url, replyData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating reply:', error);
            throw error;
        }
    },
    likeComment: async (itemId) => {
        try {
            const response = await axios.post(`${BASE_URL}/like/${itemId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error liking comment:', error);
            throw error;
        }
    },
    getMoreReplies: async (itemId, page = 1, limit = 5) => {
        try {
            const response = await axios.get(`${BASE_URL}/${itemId}/replies`, {
                params: { page, limit },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching more replies:', error);
            throw error;
        }
    }
}