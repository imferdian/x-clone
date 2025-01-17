import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from "./db/connectMongoDB.js";
import {v2 as cloudinary} from 'cloudinary';

import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
    connectMongoDB()
})
