import { register,login,getMe,refreshAccessToken,forgotPassword,resetPassword } from "../controllers/authController.js";
import {protect} from "../middleware/protect.js"

import express from "express"

const router = express.Router()
router.post("/forgot-password",forgotPassword)
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/refresh",refreshAccessToken)
router.post("/reset-password/:token",resetPassword)
export default router;