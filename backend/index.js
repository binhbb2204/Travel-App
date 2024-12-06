import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import bodyParser from 'body-parser';
import path from 'path';

import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import commentRoute from './routes/comment.js'
import accoRoute from './routes/accommodations.js'
import tourBookingRoute from './routes/tourbooking.js'
import accoBookingRoute from './routes/accommodationBooking.js';

dotenv.config();

const app = express();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) 
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|webp|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
      fileSize: 5 * 1024 * 1024 // 5MB file size limit
    }
});

const port = process.env.PORT || 3000;
const corsOptions = {
    origin: true,
    credential: true,

}

//db connection
mongoose.set('strictQuery', false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected successfully")
    } catch (error) {
        console.log("db connected unsuccessfully")
    }
}
//testing

app.use(express.json()); // Parse JSON bodies
app.use(cors(corsOptions));
app.use(cookieParser()); // Parse cookies

app.use('/uploads', express.static('uploads'))


app.use('/api/v1/tours', (req, res, next) => {
    upload.array('photos', 50)(req, res, next); // Allow up to 50 photos
}, tourRoute);

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/comments', commentRoute);
app.use('/api/v1/accommodations', accoRoute);
app.use('/api/v1/tour_booking', tourBookingRoute);
app.use('/api/v1/accommodation_booking', accoBookingRoute);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            error: 'File upload error',
            message: err.message
        });
    } else if (err) {
        return res.status(500).json({
            error: 'Server error',
            message: err.message
        });
    }
    next();
});

app.listen(port, () => {
    connect();
    console.log(`Server running on port ${port}`);
});

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
}));
