import asyncHandler from "express-async-handler";
import Users from "../models/user.model.js";
import ResponseError from "../types/ResponseError.js";
import Auths from "../models/auth.model.js";
import Requests from "../models/request.model.js";


export const getUserProfile = asyncHandler(async (req, res) => {
  const id = req.userId;

  const user = await Users.findById(id)
    .populate("auth", "-password")
    .populate({
        path: "friends",
        select: "auth bio groups",
        populate: {
          path: "auth",
          select: "username email",
        }
      })
      .populate("groups");

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

  await Requests.deleteMany({
    $or: [
      { senderId: userId, recieverId: friendId },
      { senderId: friendId, recieverId: userId },
    ],
  });

  const updatedUser = await Users.findById(userId).populate("auth", "-password")
    .populate({
        path: "friends",
        select: "auth bio",
        populate: {
          path: "auth",
          select: "username email",
        }
      });

  res.status(201).json({
    success: true,
    message: "Friend added successfully!",
    data: updatedUser.friends,
  });
});

export const searchUser = asyncHandler(async (req, res) => {
  const { email } = req.query;

  if (!email) {
    throw new ResponseError("Email address is required", 400);
  }

  const auth = await Auths.findOne({ email }).select("-password");
  if (!auth) throw new ResponseError("User does not exist", 404);

  const searchedUser = await Users.findOne({ auth: auth._id }).populate("auth");
  if (!searchedUser) throw new ResponseError("User data not found", 404);

  const currentUser = await Users.findOne({ auth: req.authId }).populate("friends", "auth");
  
  const isFriend = currentUser.friends.some(
    (friend) => friend.auth.toString() === searchedUser.auth._id.toString()
  );

  const alreadyRequested = await Requests.findOne({
    senderId: currentUser._id,
    recieverId: searchedUser._id,
  });

  res.json({
    success: true,
    user: searchedUser,
    alreadyFriend: isFriend,
    alreadyRequested: !!alreadyRequested,
  });
});

export const removeFriend = asyncHandler(async (req, res) => {
  const { friendId } = req.query;
  const userId = req.userId;

  if (!friendId) {
    throw new ResponseError("Friend ID is required", 400);
  }

  const user = await Users.findById(userId);
  const friend = await Users.findById(friendId);

  if (!user || !friend) {
    throw new ResponseError("User or Friend not found", 404);
  }

  user.friends = user.friends.filter(id => id.toString() !== friendId);
  await user.save();

  friend.friends = friend.friends.filter(id => id.toString() !== userId);
  await friend.save();

  res.status(200).json({ success: true, message: "Friend removed successfully", friendId });
});
