import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
   priority:{
        type:String,
        enum:["low","medium","high"],
        default:"medium"
    },
    dueDate:{
        type:Date
    },
    board:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Board",
        required:true
    },
    column:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Column",
        required:true
    },
    assignees:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    ],
    completed:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Task = mongoose.model("Task",taskSchema)

export default Task