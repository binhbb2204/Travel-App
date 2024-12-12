import express from 'express';
import { createTransaction, getAllTransaction, getSingleTransaction, getUserTransaction } from '../controllers/transactionController.js';
    
const router = express.Router();

router.post("/", createTransaction);

router.get("/:id", getSingleTransaction);

router.get("/", getAllTransaction);

router.get("/getUserTransaction", getUserTransaction);

export default router;