import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { addFriend, getUserProfile, searchUser } from '../controllers/user.controller.js'

const router = express.Router()

router.get("/getProfile", isAuthenticated, getUserProfile)
router.post("/addFriend", isAuthenticated, addFriend)
router.get("/search", isAuthenticated, searchUser)

export default router