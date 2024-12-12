import express from 'express';
import { createTransaction, getAllTransaction, getSingleTransaction } from '../controllers/transactionController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { getUserTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.post("/", createTransaction);

router.get("/:id", getSingleTransaction);

router.get("/", getAllTransaction);

router.get("/getUserTransaction", verifyUser, getUserTransaction);

export default router;