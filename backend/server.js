import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from "./db/connectMongoDB.js";
import {v2 as cloudinary} from 'cloudinary';

import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);


app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
    connectMongoDB()
})
