import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from './cloudinaryConfig.js';

const accommodationStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'accommodations', // Separate folder for accommodations
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], 
    public_id: (req, file) => `accommodation_${Date.now()}_${file.originalname}`,
  },
});

const uploadAccommodation = multer({ storage: accommodationStorage });

export default uploadAccommodation;