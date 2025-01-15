import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
    connectMongoDB()
})
