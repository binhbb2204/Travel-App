import express from 'express';
import { createAccommodation } from '../controllers/accommodationController.js';

const router = express.Router();

router.post("/", createAccommodation);

export default router;