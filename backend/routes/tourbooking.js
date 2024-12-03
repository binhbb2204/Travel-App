import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createTourBooking, getAllTourBooking, getTourBooking } from '../controllers/bookingController.js';
const router = express.Router();

router.post("/", verifyUser, createTourBooking);
router.get("/:id", verifyUser, getTourBooking);
router.get("/", verifyAdmin, getAllTourBooking);
export default router