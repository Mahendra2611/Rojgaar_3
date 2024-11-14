import mongoose from "mongoose";
const saveLaterSchema =  new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    savedJob:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    }]
},{timeStamps:true})
export const SaveLater = mongoose.model("SaveLater",saveLaterSchema)