import express from 'express';
import { createTransaction, getAllTransaction, getSingleTransaction } from '../controllers/transactionController.js';
    
const router = express.Router();

router.post("/", createTransaction);

router.get("/:id", getSingleTransaction);

router.get("/", getAllTransaction);

export default router;