import express from 'express';
import { 
    createComment, 
    createReply,
    likeItem,
    getTourComments,
    getMoreReplies
} from '../controllers/commentController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new comment for a tour
router.post('/:tourId', verifyUser, createComment);

// Create a reply (to a comment or another reply)
router.post('/reply/:commentId/:parentReplyId?', verifyUser, createReply);

// Like an item (comment or reply)
router.post('/like/:itemId', verifyUser, likeItem);

// Get comments for a tour with pagination
router.get('/:tourId', verifyUser, getTourComments);

// Get more replies for a specific comment/reply
router.get('/:itemId/replies', verifyUser, getMoreReplies);

export default router;