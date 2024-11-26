import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js'

dotenv.config();

const app = express();

const port = process.env.PORT ||    3000;
//mongodb+srv://binhbb2204:<db_password>@cluster0.uljyg.mongodb.net/
//db connection
mongoose.set('strictQuery', false);
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected successfully")
    } catch (error) {
        console.log("db connected unsuccessfully")
    }
}
//testing


app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use('/tours', tourRoute);

app.listen(port, ()=>{
    connect()
    console.log("Testing", port)
})