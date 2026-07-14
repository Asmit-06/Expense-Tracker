import { register,login,getMe,refreshAccessToken } from "../controllers/authController.js";
import {protect} from "../middleware/protect.js"
import express from "express"

const router = express.Router()
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/refresh",refreshAccessToken)

export default router;