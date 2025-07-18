import asyncHandler from "express-async-handler";
import Messages from "../models/message.model.js";
import ResponseError from "../types/ResponseError.js";
import { getRecieverSocketId, io } from "../config/socket.js";
import Group from "../models/group.model.js";

export const getMessages = asyncHandler(async (req, res) => {
  const { id, type } = req.params;
  const userId = req.userId;

  if (!id || !userId) {
    throw new ResponseError("Failed to fetch messages", 400);
  }

  let messagesQuery;

  if (type === "friend") {
    messagesQuery = Messages.find({
      $or: [
        { senderId: userId, recieverId: id },
        { senderId: id, recieverId: userId },
      ],
    });
  } else if (type === "group") {
    messagesQuery = Messages.find({ groupId: id });
  } else {
    throw new ResponseError("Invalid message type", 400);
  }

  const messages = await messagesQuery.populate([
    {
      path: "senderId",
      populate: {
        path: "auth",
        select: "username email",
      },
    },
    {
      path: "repliedTo",
      populate: {
        path: "senderId",
        populate: {
          path: "auth",
          select: "username email",
        },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    messages,
  });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { type, id } = req.params;
  const { text, image, replyId } = req.body;
  const userId = req.userId;

  let imageUrl;

  if (image) {
    //handle it with cloudinary
  }

  const messageData = {
    senderId: userId,
    repliedTo: replyId,
    text,
    image: imageUrl,
  };

  if (type === "friend") {
    messageData.recieverId = id;
  } else if (type === "group") {
    messageData.groupId = id;
  } else {
    throw new ResponseError("Invalid message type", 400);
  }

  const message = await Messages.create(messageData);

  const newMessage = await message.populate([
    {
      path: "senderId",
      populate: {
        path: "auth",
        select: "username email",
      },
    },
    {
      path: "repliedTo",
      populate: {
        path: "senderId",
        populate: {
          path: "auth",
          select: "username email",
        },
      },
    },
  ]);

  if (type === "friend") {
    const recieverSocketId = getRecieverSocketId(id);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }
  } else if (type === "group") {
    const group = await Group.findById(id).select("members");
    group.members
      .filter(memberId => memberId.toString() !== userId)
      .forEach(memberId => {
        const socketId = getRecieverSocketId(memberId);
        if (socketId) {
          io.to(socketId).emit("newGroupMessage", {
            groupId: id,
            message: newMessage,
          });
        }
      });
  }

  res.json({
    success: true,
    message: newMessage,
  });
});
