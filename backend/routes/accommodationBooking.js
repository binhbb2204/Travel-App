import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createAccommodationBooking, getAccommodationBooking, getAllAccommodationBooking } from '../controllers/accommodationBookingController.js'; 
const router = express.Router();

router.post("/", verifyUser, createAccommodationBooking);
router.get("/:id", verifyUser, getAccommodationBooking);
router.get("/", verifyAdmin, getAllAccommodationBooking);

export default router;