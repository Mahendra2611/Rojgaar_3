import express from "express";
import authentication from "../middlewares/authentication.js";
import { getSaveLater,postSaveLater,deleteSaveLater } from "../controllers/saveLater.controller.js";
const router = express.Router();
router.use(authentication)
router.post("/post",postSaveLater)
router.get("/get",getSaveLater)
router.delete("/delete",deleteSaveLater)
export default router