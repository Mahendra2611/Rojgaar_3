import mongoose from "mongoose"
export default async function connectDB(){
     await mongoose.connect(process.env.DATABASE_URL)
     .then(()=>console.log("database connected"))
}