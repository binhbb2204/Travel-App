import express from 'express'
import { deleteUser, getAllUsers, getSingleUser, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getSingleUser);
router.get("/", verifyAdmin, getAllUsers);

// Note for line 10
// router.get("/", verifyAdmin, getAllUsers);

export default router