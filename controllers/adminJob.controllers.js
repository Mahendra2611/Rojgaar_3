
import { AdminJob } from "../models/adminJob.model.js"
export const postAdminJob = async(req,res)=>{
    try {
        const {name,location,role,mode,jobType,skills,link} = req.body;
        console.log(name)
        console.log(role)
        console.log(jobType)
        console.log(link)
        console.log(location)
        console.log(mode)
        console.log(skills)
        if(!name || !role ||!jobType || !link){
            return res.status(400).json({
                message:"input fiels are not correct",
            })
        }
        const check = await AdminJob.findOne({name:name,location:location,role:role,mode:mode,jobType:jobType})
       //console.log(check)
        if(check){
            return res.status(400).json({
                message:"job has already been created",
            })
        }
        const result = await AdminJob.create({
            name,
            location,
            role,
            mode,
            jobType,
            skills,
            link
        })
       //console.log(result)
        if(!result){
            return res.status(500).json({
                message:"job can't be created",
            })
        }
        return res.json({
            message:" admin job created successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"server error occured",
        })
    }

}
export const updateAdminJob = async(req,res)=>{
    
  
    try {
        const {name,location,role,mode,jobType,skills,link} = req.body;
        const jobId = req.params.jobId
        //console.log(jobId)
        if(!name || !role ||!jobType || !link){
            return res.status(400).json({
                message:"input fiels are not correct",
                jobData:null,
            })
        }

        const result = await AdminJob.findByIdAndUpdate(jobId,{
            name,
            location,
            role,
            mode,
            jobType,
            skills,
            link
        },{new:true})
        if(!result){
            return res.status(500).json({
                message:"job can't be updated",
                jobData:null,
            })
        }
        return res.json({
            message:" admin job update successfully",
            jobData:result,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"server error occured",
            jobData:null,
        })
    }

}
export const deleteAdminJob = async(req,res)=>{
    //console.log("called")
    try {
       
        const jobId = req.params.jobId
        if(!jobId){
            return res.status(400).json({
                message:"job doesn't exist",
               
            })
        }
        const check = await AdminJob.findById(jobId);
       //console.log(check)
        if(!check){
            return res.status(400).json({
                message:"job doesn't exist",
               
            })
        }
        
        const result = await AdminJob.findByIdAndDelete(jobId)
        //console.log(result)
        if(!result){
            return res.status(500).json({
                message:"job can't be deleted",
               
            })
        }
        return res.json({
            message:" admin job deleted successfully",
           
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"server error occured",
          
        })
    }

}
export const getAdminJob = async(req,res)=>{ 
    try {
        const result = await AdminJob.find({}).sort({createdAt:-1});
        //console.log(result)
        return res.json({
            message:" admin job fetched successfully",
           jobData:result,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"server error occured",
          
        })
    }

}

export const getAdminJobById = async(req,res)=>{ 
    const jobId = req.params.id
    console.log(jobId)
    if(!jobId){
        return res.status(400).json({
            message:"job id is not correct",
            job:null,
        })
    }
    try {
        const result = await AdminJob.findById(jobId);
        //console.log(result)
        return res.json({
            message:" admin job fetched successfully",
           job:result,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"server error occured",
          job:null
        })
    }

}
