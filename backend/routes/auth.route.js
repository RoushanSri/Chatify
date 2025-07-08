import express from 'express'
import { login, logout, register, verifyEmail } from '../controllers/auth.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/login',login);
router.post('/register', register)
router.get("/verify-email", verifyEmail)
router.get("/logout", isAuthenticated, logout)

export default router