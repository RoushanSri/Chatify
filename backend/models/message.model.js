import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  recieverId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  text:{
    type: String
  },
  image:{
    type:String
  }
},{timestamps:true});

const Messages = mongoose.model("Messages",MessageSchema)
export default Messages;
