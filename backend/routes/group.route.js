import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { addMember, createGroup, deleteGroup, fetchGroupInfo, removeMember } from '../controllers/group.controller.js'

const router = express.Router()

router.post("/createGroup", isAuthenticated, createGroup)
router.post("/addMemeber", isAuthenticated, addMember)
router.post("/removeMember", isAuthenticated, removeMember)
router.delete("/deleteGroup/:id", isAuthenticated, deleteGroup)
router.get("/fetchGroupDetail/:id", isAuthenticated, fetchGroupInfo)

export default router