import express from 'express'
import { deleteUser, getAllUsers, getSingleUser, updateUser, updateUserPassword } from '../controllers/userController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getSingleUser);
router.get("/", verifyAdmin, getAllUsers);
router.put("/:id/password", verifyUser, updateUserPassword);

// Note for line 10
// router.get("/", verifyAdmin, getAllUsers);

export default router