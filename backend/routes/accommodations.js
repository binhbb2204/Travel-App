import express from 'express';
import { 
    createAccommodation
} from '../controllers/accommodationController.js';
    
import { 
    updateAccommodation
} from '../controllers/accommodationController.js';

import { 
    deleteAccommodation
} from '../controllers/accommodationController.js';

import { 
    getSingleAccommodation
} from '../controllers/accommodationController.js';

import { 
    getAllAccommodation
} from '../controllers/accommodationController.js';

import {
    getAccommodationBySearch
} from '../controllers/accommodationController.js';

const router = express.Router();

router.post("/", createAccommodation);

// router.delete("/:id", createAccommodation);

router.put("/:id", updateAccommodation);

router.delete("/:id", deleteAccommodation);

router.get("/:id", getSingleAccommodation);

router.get("/", getAllAccommodation);

router.get("/search/getAccommodationBySearch", getAccommodationBySearch);

export default router;