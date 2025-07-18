import asyncHandler from "express-async-handler";
import Group from "../models/group.model.js";
import ResponseError from "../types/ResponseError.js";

export const addMember = asyncHandler(async (req, res) => {
  const { groupId, newMemberId } = req.body;

  const group = await Group.findById(groupId);
  if (!group) throw new ResponseError("Group not found", 404);

  if (group.members.includes(newMemberId)) {
    throw new ResponseError("User already in group", 400);
  }

  group.members.push(newMemberId);
  await group.save();

  const newGroup = await Group.findById(group._id)
  .populate({
    path: "members",
    select: "_id bio",
    populate: {
      path: "auth",
      select: "username email",
    },
  })
  .populate({
    path: "createdBy",
    select: "_id bio",
    populate: {
      path: "auth",
      select: "username email",
    },
  });

  res.json({ success: true, group: newGroup });
});

export const createGroup = asyncHandler(async (req, res) => {
  const { name, members, description } = req.body;
  const userId = req.userId;

  if (!name || !members || members.length < 2) {
    throw new ResponseError("Group name and at least 2 members are required", 400);
  }

  const allMembers = [...members, userId];

  const group = await Group.create({
    name,
    members: allMembers,
    createdBy: userId,
    description
  })

  const newGroup = await Group.findById(group._id)
  .populate({
    path: "members",
    select: "_id bio",
    populate: {
      path: "auth",
      select: "username email",
    },
  })
  .populate({
    path: "createdBy",
    select: "_id bio",
    populate: {
      path: "auth",
      select: "username email",
    },
  });

  res.status(201).json({ success: true, group:newGroup });
});

export const removeMember = asyncHandler(async (req, res) => {
  const { groupId, memberId } = req.body;

  const group = await Group.findById(groupId);
  if (!group) throw new ResponseError("Group not found", 404);

  group.members = group.members.filter(id => id.toString() !== memberId);
  await group.save();

  const newGroup = await Group.findById(group._id)
  .populate({
    path: "members",
    select: "_id bio",
    populate: {
      path: "auth",
      select: "username email",
    },
  })
  .populate({
    path: "createdBy",
    select: "_id bio",
    populate: {
      path: "auth",
      select: "username email",
    },
  });

  res.json({ success: true, group:newGroup });
});

export const fetchGroupInfo = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId).populate({
    path: "members",
    select: "_id bio",
    populate: {
      path: "auth",
      select: "username email",
    },
  })
  .populate({
    path: "createdBy",
    select: "_id bio",
    populate: {
      path: "auth",
      select: "username email",
    },
  });

  if (!group) throw new ResponseError("Group not found", 404);

  res.json({ success: true, group });
});

export const leaveGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.body;
  const userId = req.userId;

  const group = await Group.findById(groupId);
  if (!group) throw new ResponseError("Group not found", 404);

  const initialCount = group.members.length;
  group.members = group.members.filter(id => id.toString() !== userId);

  if (group.members.length === 0) {
    await group.deleteOne();
    return res.json({ success: true, message: "Group deleted as last member left." });
  }

  await group.save();

  const left = group.members.length < initialCount;
  if (!left) throw new ResponseError("You are not a member of this group", 400);

  res.json({ success: true, message: "You left the group", group });
});

export const deleteGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const userId = req.userId;

  const group = await Group.findById(groupId);
  if (!group) throw new ResponseError("Group not found", 404);

  if (group.createdBy.toString() !== userId) {
    throw new ResponseError("Only group admin can delete this group", 403);
  }

  await group.deleteOne();

  res.json({ success: true, message: "Group deleted successfully" });
});


