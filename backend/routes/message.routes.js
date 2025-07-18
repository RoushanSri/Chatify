import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getMessages, sendMessage } from '../controllers/message.controller.js';

const router = express.Router()

router.get("/:type/:id",isAuthenticated, getMessages)
router.post("/send/:type/:id", isAuthenticated, sendMessage)

export default router;