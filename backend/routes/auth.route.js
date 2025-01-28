import express from 'express';
import {getMe, login, logout, register} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/google', googleLogin)
router.get('/me', protectRoute, getMe)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)


export default router;