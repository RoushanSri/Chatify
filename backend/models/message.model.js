import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  recieverId: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  groupId: {
    type: mongoose.Schema.ObjectId,
    ref: "Group",
  },
  text:{
    type: String
  },
  repliedTo:{
    type: mongoose.Schema.ObjectId,
    ref: "Messages"
  },
  image:{
    type:String
  }
},{timestamps:true});

const Messages = mongoose.model("Messages",MessageSchema)
export default Messages;
