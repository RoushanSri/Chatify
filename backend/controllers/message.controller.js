import asyncHandler from "express-async-handler";
import Messages from "../models/message.model.js";
import ResponseError from "../types/ResponseError.js";

export const getMessages = asyncHandler(async (req, res) => {
  const { friendId } = req.params;
  const userId = req.userId;

  if (!friendId || !userId)
    throw new ResponseError("Failed to fetch messages", 402);

  const messages = await Messages.find({
    $or: [
      { senderId: userId, recieverId: friendId },
      { senderId: friendId, recieverId: userId },
    ],
  }).populate({
    path: "senderId",
    populate: {
      path: "auth",
      select: "username email",
    },
  })

  res.status(200).json({
    success: true,
    messages,
  });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { friendId } = req.params;
  const { text, image } = req.body;
  const userId = req.userId;

  let imageUrl;

  if (image) {
    //handle it with cloudinary
  }

  const message = await Messages.create({
    senderId: userId,
    recieverId: friendId,
    text,
    image: imageUrl,
  });

  const newMessage = await message.populate({
    path: "senderId",
    populate: {
      path: "auth",
      select: "username email",
    },
  });

  res.json({
    success: true,
    message:newMessage,
  });
});
