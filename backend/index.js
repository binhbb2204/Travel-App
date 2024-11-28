import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import commentRoute from './routes/comment.js'

dotenv.config();

const app = express();

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
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/comments', commentRoute);

app.listen(port, () => {
    connect()
    console.log("Testing", port)
})