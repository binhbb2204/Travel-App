import express from 'express';
import { 
    createAccommodation,
    updateAccommodation,
    deleteAccommodation,
    getSingleAccommodation,
    getAllAccommodation,
    getAccommodationBySearch,
    getFeaturedAccommodations,
    getAccommodationCount
} from '../controllers/accommodationController.js';
import uploadAccommodation from '../Config/uploadAccommodationMiddleware.js';


const router = express.Router();

router.post("/", uploadAccommodation.array('photos'), createAccommodation);

// router.delete("/:id", createAccommodation);

router.put("/:id", uploadAccommodation.array('photos'), updateAccommodation);

router.delete("/:id", deleteAccommodation);

router.get("/:id", getSingleAccommodation);

router.get("/", getAllAccommodation);

router.get("/search/getAccommodationBySearch", getAccommodationBySearch);

router.get("/search/getFeatureAccommodations", getFeaturedAccommodations);

router.get("/search/getAccommodationCount", getAccommodationCount);

export default router;