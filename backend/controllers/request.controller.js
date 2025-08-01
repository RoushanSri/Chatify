import asyncHandler from "express-async-handler";
import ResponseError from "../types/ResponseError.js";
import Requests from "../models/request.model.js";
import { getRecieverSocketId, io } from "../config/socket.js";

export const sendRequest = asyncHandler(async (req, res) => {
  const { recieverId } = req.body;
  const senderId = req.userId;

  if (!senderId || !recieverId)
    throw new ResponseError("SenderId and RecieverId is required", 400);

  const alreadyRequest = await Requests.findOne({ senderId, recieverId });

  console.log(alreadyRequest);

  if (alreadyRequest) throw new ResponseError("Request Already sent", 402);

  const request = await Requests.create({
    senderId,
    recieverId,
  });

  if (!request) throw new ResponseError("Request not created", 401);

  const newRequest = request.populate("senderId recieverId");

  const recieverSocketId = getRecieverSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newRequest", newRequest);
    }

  res.json({
    success: true,
    request: newRequest,
  });
});

export const fetchRequest = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const requests = await Requests.find({ recieverId: userId }).populate({
    path: "senderId",
    populate: {
      path: "auth",
      select: "username email",
    },
  });

  res.json({
    success: true,
    requests,
  });
});

export const fetchRequestCount = asyncHandler(async(req, res)=>{
  const recieverId = req.userId

  const count = await Requests.countDocuments({
    recieverId
  });

  res.json({
    success:true,
    count
  })
})
