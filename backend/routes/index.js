import express from 'express';
import usersRoutes from "./users.routes.js";
import authRoutes from "./auth.routes.js";
import postRouter from "./post.router.js";

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/users', usersRoutes);
router.use('/posts', postRouter)

export default router;