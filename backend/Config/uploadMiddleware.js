import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tours', // Folder name in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png'], // Limit to specific formats
    public_id: (req, file) => `tour_${Date.now()}_${file.originalname}`,
  },
});

const upload = multer({ storage });

export default upload;
