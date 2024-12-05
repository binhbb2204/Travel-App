import express from 'express'
import { createComment, getComments, updateComment, deleteComment } from '../controllers/commentController.js'
import {verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/:tourId", verifyUser, createComment);
router.get("/:tourId", verifyUser, getComments);
router.put("/:commentId", verifyUser, updateComment);
router.delete("/:commentId", verifyUser, deleteComment);
export default router;