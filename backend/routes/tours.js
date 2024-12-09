import express from 'express'
import { 
    createTour, 
    deleteTour, 
    getAllTours, 
    getSingleTour, 
    updateTour, 
    searchTours, 
    getFeaturedTours, 
    getTourCount 
} from '../controllers/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
import upload from '../Config/uploadMiddleware.js';
const router = express.Router();

router.post('/', upload.array('photos'), createTour);

router.put('/:id', upload.array('photos'), updateTour);

router.delete("/:id", verifyAdmin, deleteTour);
router.get("/:id", getSingleTour);
router.get("/", getAllTours);

router.get('/search/searchTours', searchTours);
router.get('/search/getFeaturedTours', getFeaturedTours)
router.get('/search/getTourCount', getTourCount)

export default router
