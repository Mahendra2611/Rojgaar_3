import express from 'express'
import authentication from '../middlewares/authentication.js'
import validAdmin from '../middlewares/validAdmin.js';
import { postJob,getAdminJobs,getAllJobs,getJobById,updateJob,deleteJob } from '../controllers/job.controller.js';
import validUser from '../middlewares/validUser.js';
const router = express.Router();

router.post("/post",authentication,validAdmin,postJob);
router.get("/get",getAllJobs)
router.get("/getadminjobs",authentication,validAdmin,(getAdminJobs));
router.get("/get/:id",authentication,validUser,getJobById);
router.post("/update",authentication,validAdmin,updateJob)
router.delete("/deletejob/:id",authentication,validAdmin,deleteJob)
export default router 