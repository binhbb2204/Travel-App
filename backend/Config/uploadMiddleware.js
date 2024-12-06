import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'tours', 
      allowed_formats: ['jpg', 'png', 'jpeg'], 
    },
  });
  
const upload = multer({ storage: storage });
  
export default upload;