import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
export const postJob = async(req,res)=>{
try {
   
    const { title, description, requirements, salary, location, jobType, experienceLevel, position } = req.body;
    const userId = req.userId
   if(!userId){
   // console.log("error")
    return res.status(Number(process.env.CLIENT_ERROR_STATUS_CODE)||400).json({
        
        message:"Admin error occured"
    })
   }
    if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position ) {
       // console.log("error")
        return res.status(Number(process.env.INPUT_FIELD_HTTPS_CODE)||400).json({
            message: "Some Inputs are missing",
            success: false
        })
    }
   
    const companyId = await Company.findOne({userId:userId})
   if(!companyId){
   // console.log("error")
    return res.status(Number(process.env.CLIENT_ERROR_STATUS_CODE)||400).json({
        message:"Company doesn't exist"
    })
   }
    const job = await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel: experienceLevel,
        position,
        company: companyId,
        created_by: userId
    })
    return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
        message:"Job created successfully",
        job:job
    })
} catch (error) {
   
    return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
        message:"Something went wrong in post job"
    })
}
}
export const getAllJobs = async(req,res)=>{
try {
   //console.log("get all jobs called")
    const userId = req.userId
    const job = await Job.find({}).populate("company").sort({createdAt:-1})
    //console.log(job)
    if(!job){
        return res.status(Number(process.env.NOT_FOUND_STATUS_CODE)||404).json({
            message:"Jobs not found"
        })
    }
    //console.log("job return")
    return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
        job:job
    })
} catch (error) {
    return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).josn({
        message:"Something went wrong"
    })
}
}
export const getAdminJobs = async(req,res)=>{
   try {
    const adminId = req.userId;
   // console.log("get admin")
    if(!adminId){
        return res.status(Number(process.env.NOT_FOUND_STATUS_CODE)||404).json({
            message: "Admin Id required",
            success: false
        })
    }
    
    const job = await Job.find({ created_by: adminId })
    .populate({
        path:'company',
        
    })
    .populate({
        path:'applications',
        select:"status"
    })
    .sort({ createdAt: -1 });
   // console.log(job)
    if (!job) {
        return res.status(Number(process.env.NOT_FOUND_STATUS_CODE)||404).json({
            message: "Jobs not found.",
            success: false
        })
    };
   
    return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
        jobs:job,
        success: true
    })
   } catch (error) {
    //console.log(error)
    return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).josn({
        message:"Server Error"
    })
   }

}
export const getJobById = async(req,res)=>{
   // console.log("grt job called")
    try {
        const jobId = req.params.id;
        const userId = req.userId;
    const job = await Job.findById(jobId).populate('company').populate({path:"applications",job:jobId})
    //console.log(job)
    if(!job){
        res.status(400).josn({
            message:"Jobs not found"
        })
    }
    //const hasApplied = job.applications.some((application)=>application.equals(userId))
    //console.log(hasApplied);
    return res.status(200).json({
        job:job
    })
    } catch (error) {
        //console.log(error);
        return res.status(200).json({
            messgae:"something went wrong when fetching jobs"
        })
    }
}
export const updateJob = async(req,res)=>{
try {
    //console.log("update job")
    const { title, description, requirements, salary, location, jobType, experienceLevel, position } = req.body;
    
    const {query:{id}} = req;
    //console.log(id)
    //console.log(req.body)
    if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position ) {
       // console.log("error")
        return res.status(400).json({
            message: "Some Inputs are missing",
            success: false
        })
    }
    const updateData = {
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel: experienceLevel,
        position,
        
    }
   const newData = await Job.findByIdAndUpdate(id,updateData,{new:true})
   return res.status(200).json({
    message:"Data update successfully",
    success:true,
    job:newData
   })
} catch (error) {
    return res.status(400).json({
        message:"Something went wrong",
        success:false,
       
       })
}
}
export const deleteJob = async(req,res)=>{
    try {
    const Jobid = req.params.id;
    
   const jobDeleted =  await Job.findByIdAndDelete(Jobid);
  
   if(!jobDeleted){
    return res.status(400).json({
        message:"Job deletion failed"
       })
   }
  else{
    return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
        message:"Job deleted successfully"
       })
  }
    } catch (error) {
        //console.log(error)
        return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
            message:"something went wrong"
        })
    }
}
