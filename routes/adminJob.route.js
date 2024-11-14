import { Router } from "express";
import { postAdminJob,updateAdminJob,deleteAdminJob,getAdminJob,getAdminJobById } from "../controllers/adminJob.controllers.js";
import validAdmin2 from "../middlewares/validAdmin2.js";
import authentication from "../middlewares/authentication.js";
const router = Router();

router.get("/get",getAdminJob)
router.get("/getById/:id",getAdminJobById)
router.post("/post",authentication,validAdmin2,postAdminJob);
router.delete("/delete/:jobId",authentication,validAdmin2,deleteAdminJob)
router.put("/update/:jobId",authentication,validAdmin2,updateAdminJob)
export default router