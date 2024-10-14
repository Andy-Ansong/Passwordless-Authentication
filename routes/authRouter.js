import { Router } from "express"
import auth from "../middleware/auth.js"
const authRouter = Router()
import authController from "../controllers/authController.js"

authRouter.post("/request-code", authController.requestCode)
authRouter.post("/verify-code", authController.verifyCode)
authRouter.post('/logout', auth, authController.logoutUser)

export default authRouter