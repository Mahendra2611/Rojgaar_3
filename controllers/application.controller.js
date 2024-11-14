import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";


export const applyJob = async (req, res) => {
    try {
        //console.log("apply job called")
        const userId = req.userId;
        const role = req.userRole;
        if(role !== "student"){
            return res.status(Number(process.env.CLIENT_ERROR_STATUS_CODE)||400).json({
                message: "Log in as student",
                success: false
            })
        }
        const jobId = req.params.id;
       // console.log(userId)
        //console.log(jobId)
        if (!jobId) {
            return res.status(Number(process.env.CLIENT_ERROR_STATUS_CODE)||400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        //console.log("apply job")
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(Number(process.env.CLIENT_ERROR_STATUS_CODE)||400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
       // console.log("job exist")
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(Number(process.env.NOT_FOUND_STATUS_CODE)||404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
       // console.log("create application")
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });
        //console.log(newApplication)
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        //console.log(error);
        return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
            message: "apply job failed"
        })
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        //console.log("apllied job called")
        const userId = req.userId;
        //console.log(userId)
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            select:'title',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                select:'name',
                options:{sort:{createdAt:-1}},
            }
        });
        //console.log(application)
        //console.log("erro check")
        if(!application){
            return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
                message:"No Applications Found",
                application:[],
                success:false
            })
        };
       // console.log("return")
        return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
            application,
            success:true
        })
    } catch (error) {
        //console.log(error);
        return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
            message: "Get Application failed",
            application:[]
        })
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).select('applications').populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant',
                select:['fullName','email','phoneNumber','profile.resume',"profile.resumeOriginalName"]
            }
        });
        if(!job){
            return res.status(Number(process.env.NOT_FOUND_STATUS_CODE)||404).json({
                message:'Job not found.',
                success:false
            })
        };
        //console.log(job)
        return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
            job, 
            succees:true
        });
    } catch (error) {
        //console.log(error);
        return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
            message: "get job failed"
        })
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        //console.log(status)
        const applicationId = req.params.id;
        if(!status){
            return res.status(Number(process.env.CLIENT_ERROR_STATUS_CODE)||400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(Number(process.env.NOT_FOUND_STATUS_CODE)||404).json({
                message:"Application not found.",
                success:false
            })
        };
        if(application.status !== 'pending'){
            return res.status(Number(process.env.NOT_FOUND_STATUS_CODE)||400).json({
                message:"Application already updated",
                success:false
            })
        }
        // update the status
        application.status = status.toLowerCase();
        await application.save();
        //console.log("sattus updated")
        //console.log(application)
        return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
       // console.log(error);
        return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
            message: "get job failed"
        })
    }
}