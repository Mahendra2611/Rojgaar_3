import { Router } from "express";
import { register,login,logout,updateProfile } from "../controllers/user.controller.js";
import { registerSchema } from "../utils/RegisterSchema.js";
import { loginSchema } from "../utils/LoginSchema.js";
import { profileSchema } from "../utils/ProfileSchema.js";
import { checkSchema } from "express-validator";
import authentication from "../middlewares/authentication.js";
import { upload } from "../middlewares/multer.js";
const router = Router();
router.post("/register",checkSchema(registerSchema),register)
router.post("/login",checkSchema(loginSchema),login);
router.get("/logout",authentication,logout)
//router.post("/profile/update",authentication,upload.fields([{name:"profilePhoto"},{name:"resume"}]),updateProfile)
router.post('/profile/update', upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'resume', maxCount: 1 }]),authentication, updateProfile);
export default router;