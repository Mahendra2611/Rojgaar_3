import exrpress from "express"
import { Company } from "../models/company.model.js"
import { registerCompany,getCompany,getCompanyById,updateCompany,deleteCompany } from "../controllers/company.controller.js";
import { companyRegisterSchema } from "../utils/companyRegisterSchema.js";
import { checkSchema } from "express-validator";
import { Companyupload } from "../middlewares/multer.js";
import validAdmin from "../middlewares/validAdmin.js";
import authentication from "../middlewares/authentication.js";
const router = exrpress.Router();
router.use(authentication)
router.use(validAdmin)
router.post("/register",Companyupload.single('logo'),registerCompany);
router.get("/get",getCompany);
router.get("/get/:id",getCompanyById);
router.post("/update/:id",Companyupload.single('logo'),updateCompany);
router.delete("/deletecompany/:id",deleteCompany)
export default router