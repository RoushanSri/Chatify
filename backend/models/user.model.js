import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    auth:{
        type: mongoose.Schema.ObjectId,
        ref: "Auth",
        required:true
    },
    friends:[
        {
            type:mongoose.Schema.ObjectId,
            ref: "User",
        }
    ],
    bio: {
        type: String,
        trim: true,
        maxlength: 300
    }
},{
    timestamps:true
})

const User = mongoose.model("User", UserSchema)

export default User;