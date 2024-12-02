import express from 'express';
import { verifyUser } from '../utils/verifyToken.js';
import { createTourBooking } from '../controllers/bookingController.js';
const router = express.Router();

router.post("/", verifyUser, createTourBooking);

export default router