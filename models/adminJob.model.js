import mongoose from "mongoose";
const AdminJobScehma = new mongoose.Schema({
name:{
    type:String,
},
location:{
    type:String,
},
role:{
type:String,
},
mode:{
type:String,
},
jobType:{
    type:String,
},
skills:[{type:String}],
link:{
    type:String,
    required:true,
}
},{timestamps:true})

export const AdminJob = mongoose.model("AdminJob",AdminJobScehma)