import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getMessages, sendMessage } from '../controllers/message.controller.js';

const router = express.Router()

router.get("/:friendId",isAuthenticated, getMessages)
router.post("/send/:friendId", isAuthenticated, sendMessage)

export default router;