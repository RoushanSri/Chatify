import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            default:""
        },
        members:[
            {
                type:mongoose.Schema.ObjectId,
                ref:"User"
            }
        ],
        isGroup:{
            type:Boolean,
            default:true
        },
        createdBy:{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    }
)

const Group = mongoose.model("Group",groupSchema)
export default Group