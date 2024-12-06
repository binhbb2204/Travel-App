import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createAccommodationBooking, deleteAccoBooking, deleteUserAccoBooking, getAccommodationBooking, getAllAccommodationBooking, updateAccoBooking, updateUserAccoBooking } from '../controllers/accommodationBookingController.js'; 
import {getUserAccoBooking } from '../controllers/accommodationBookingController.js'; 

const router = express.Router();

router.post("/", verifyUser, createAccommodationBooking);
router.get("/:id", verifyUser, getAccommodationBooking);
router.get("/", verifyAdmin, getAllAccommodationBooking);
router.get("/search/getUserAccoBooking", verifyUser, getUserAccoBooking);
router.delete("/deleteUserAccoBooking", verifyUser, deleteUserAccoBooking);
router.delete("/:id", verifyAdmin, deleteAccoBooking);
router.put("/updateUserAccoBooking", verifyUser, updateUserAccoBooking);
router.put("/:id", verifyAdmin, updateAccoBooking);

export default router;