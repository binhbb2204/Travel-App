import express from 'express'
import { createComment, getComments, updateComment, deleteComment } from  '../controllers/accomCommentController.js';
import {verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
const router = express.Router();

router.post("/:accoId", verifyUser, createComment);
router.get("/:accoId", verifyUser, getComments);
router.put("/:commentId", verifyUser, updateComment);
router.delete("/:commentId", verifyUser, deleteComment);
export default router;