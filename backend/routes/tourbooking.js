import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createTourBooking, deleteTourBooking, deleteUserTourBooking, getAllTourBooking, getTourBooking, getUserTourBooking, updateTourBooking, updateUserTourBooking } from '../controllers/bookingController.js';
const router = express.Router();

router.post("/", verifyUser, createTourBooking);
router.get("/:id", verifyUser, getTourBooking);
router.get("/", verifyAdmin, getAllTourBooking);
router.get("/search/getUserTourBooking", verifyUser, getUserTourBooking);
router.delete("/deleteUserTourBooking", verifyUser, deleteUserTourBooking);
router.delete("/:id", verifyAdmin, deleteTourBooking);
router.put("/updateUserTourBooking", verifyUser, updateUserTourBooking);
router.put("/:id", verifyAdmin, updateTourBooking);

export default router;