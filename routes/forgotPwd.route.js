import { Router } from "express";
import { checkEmail,verifyOTP,updatePwd } from "../controllers/forgotPwd.controllers.js";
const router = Router();
router.post("/checkEmail",checkEmail)
router.post("/verifyOTP",verifyOTP)
router.post("/updatePwd",updatePwd)
export default router
