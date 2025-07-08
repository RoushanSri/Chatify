import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const AuthSchema = new mongoose.Schema(
  {
    email: {
        type:String,
        required: true,
        unique: true
    },
    username:{
        type:String,
        required:true
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

AuthSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const Auth = mongoose.model("Auth", AuthSchema);

export default Auth;
