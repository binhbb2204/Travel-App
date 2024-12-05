import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createAccommodationBooking, deleteAccoBooking, deleteUserAccoBooking, getAccommodationBooking, getAllAccommodationBooking, updateAccoBooking, updateUserAccoBooking } from '../controllers/accommodationBookingController.js'; 
import {getUserAccoBooking } from '../controllers/accommodationBookingController.js'; 

const router = express.Router();

router.post("/", verifyUser, createAccommodationBooking);
router.get("/:id", verifyUser, getAccommodationBooking);
router.get("/", verifyAdmin, getAllAccommodationBooking);
router.get("/search/getUserAccoBooking", getUserAccoBooking);
router.delete("/deleteUserAccoBooking", deleteUserAccoBooking);
router.delete("/:id", deleteAccoBooking);
router.put("/updateUserAccoBooking", updateUserAccoBooking);
router.put("/:id", updateAccoBooking);

export default router;