import { register,login,getMe,refreshAccessToken,forgotPassword,resetPassword,updateAvatar } from "../controllers/authController.js";
import {protect} from "../middleware/protect.js"

import express from "express"
import upload from "../middleware/upload.js";

const router = express.Router()
router.patch("/avatar",protect,upload.single("avatar"),updateAvatar)
router.post("/forgot-password",forgotPassword)
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/refresh",refreshAccessToken)
router.post("/reset-password/:token",resetPassword)
export default router;