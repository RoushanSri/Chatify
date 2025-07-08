import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", AuthSchema);

export default Auth;
