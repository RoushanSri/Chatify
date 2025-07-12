import asyncHandler from "express-async-handler";
import Users from "../models/user.model.js";
import ResponseError from "../types/ResponseError.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const id = req.userId;

  const user = await Users.findById(id)
    .populate("auth", "-password")
    .populate("friends", "auth bio");

  if (!user) throw new ResponseError("User does not exist", 404);

  res.status(200).json({
    success: true,
    user: user,
  });
});

export const addFriend = asyncHandler(async (req, res) => {
  const { friendId } = req.body;
  const userId = req.userId;

  if (!friendId) {
    throw new ResponseError("Friend ID is required", 400);
  }

  const user = await Users.findById(userId);
  const friend = await Users.findById(friendId);

  if (!user || !friend) {
    throw new ResponseError("User or Friend not found", 404);
  }

  if (user.friends.includes(friendId)) {
    throw new ResponseError("Friend already added", 400);
  }

  user.friends.push(friendId);
  await user.save();

  friend.friends.push(userId)
  await friend.save()

  res.status(201).json({
    success: true,
    message: "Friend added successfully!",
    data: user.friends,
  });
});
