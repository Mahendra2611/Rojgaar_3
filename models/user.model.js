import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter','admin'],
        required:true,
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String,default:""},
        resumeOriginalName:{type:String,default:""},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{
            type:String,
            default:"",
        },
        profilePhotoPublicId:{type:String},
        resumePublicId:{type:String}
    }

},{timestamps:true})
export const User = mongoose.model("User",userSchema)