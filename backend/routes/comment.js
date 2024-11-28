import express from 'express';
import { createComment, createReply } from '../controllers/commentController.js';
import { verifyUser } from '../utils/verifyToken.js';
const router = express.Router();

router.post('/:tourId', verifyUser, createComment)

// Add a reply to a comment or reply
router.post('/reply/:commentId/:parentReplyId?', verifyUser, createReply);;



export default router;