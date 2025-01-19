import express from 'express';
import usersRoutes from "./users.route.js";
import authRoutes from "./auth.route.js";
import postRouter from "./post.route.js";

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/users', usersRoutes);
router.use('/posts', postRouter)

export default router;