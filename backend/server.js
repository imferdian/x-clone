import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";

dotenv.config();
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
