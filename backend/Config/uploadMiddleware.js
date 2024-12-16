import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tours', 
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], 
    public_id: (req, file) => `tour_${Date.now()}_${file.originalname}`,
  },
});

const upload = multer({ storage });

export default upload;
