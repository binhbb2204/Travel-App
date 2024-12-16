import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import multer from 'multer';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import commentRoute from './routes/comment.js';
import accoRoute from './routes/accommodations.js';
import tourBookingRoute from './routes/tourbooking.js';
import accoBookingRoute from './routes/accommodationBooking.js';
import accoCommentRoute from './routes/accom_comment.js'
import transactionRoute from './routes/transactions.js'
import otpRoute from './routes/otp.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database Connection
mongoose.set('strictQuery', false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

// Routes
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/comments', commentRoute);
app.use('/api/v1/accom-comments', accoCommentRoute);
app.use('/api/v1/accommodations', accoRoute);
app.use('/api/v1/tour_booking', tourBookingRoute);
app.use('/api/v1/accommodation_booking', accoBookingRoute);
app.use('/api/v1/transactions', transactionRoute);
app.use('/api/v1/otp', otpRoute);
// Error handling for file upload or other server issues
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: 'File upload error',
      message: err.message,
    });
  } else if (err) {
    return res.status(500).json({
      error: 'Server error',
      message: err.message,
    });
  }
  next();
});

app.listen(port, '0.0.0.0', async () => {
  await connect();
  console.log(`Server running on port ${port}`);
});
