import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from "./db/connectMongoDB.js";
import {v2 as cloudinary} from 'cloudinary';

import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import * as path from "node:path";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}


app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
    connectMongoDB()
})
