import { SaveLater } from "../models/saveLater.model.js";
export const postSaveLater = async(req,res)=>{
    const userId = req.userId;
    //console.log(userId)
    const jobId = req.query.id
    //console.log(jobId)
    try {
        if(!jobId){
            return res.status(Number(process.env.INPUT_FIELD_HTTPS_CODE)||400).json({
                message:"Job is not present",
               }
           )
        }
        //update result has the value before creating the new document in it
       const updateResult = await SaveLater.findOneAndUpdate({user:userId},{$addToSet:{savedJob:jobId}},{upsert:true})
       console.log(updateResult)
       if(updateResult.savedJob.includes(jobId)){
        return res.status(Number(process.env.CLIENT_ERROR_STATUS_CODE)||400).json({
            message:"Already Saved",
           }
       )
       }
       
       return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
        message:"Job Saved successfully",
       }
   )

    } 
    catch (error) {
        return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
             message:"Something went wrong",
            }
        )
    }
}
export const deleteSaveLater = async(req,res)=>{
    const userId = req.userId;
   // console.log(userId)
    const jobId = req.query.id
    //console.log(jobId)
    try {
        if(!jobId||!userId){
            return res.status(Number(process.env.CLIENT_ERROR_STATUS_CODE)||400).json({
                message:"Something went wrong",
               }
            )
           }
       const result =  await SaveLater.updateOne({user:userId},{$pull:{savedJob:jobId}})
       if(!result){
        return res.status(Number(process.env.CLIENT_ERROR_STATUS_CODE)||400).json({
            message:"Something went wrong",
           }
        )
       }
      // console.log(result)
        return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
            savedUser:result,
            message:"Job Deleted successfully",
           }
        )
    } catch (error) {
        return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
            message:"Something went wrong",
           }
       )
    }
}
export const getSaveLater = async(req,res)=>{
    const userId = req.userId
    //console.log(userId)
    try {
        const result = await SaveLater.findOne({user:userId})
        //console.log(result)
        if(!result){
            return res.status(Number(process.env.NOT_FOUND_STATUS_CODE)||400).json({
                message:"No Saved job Found"
            })
        }
        return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
            savedJob:result,
            message:"Job returned successfully",
           }
        )
    } catch (error) {
        return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
            message:"Something went wrong",
           }
       )
    }
}