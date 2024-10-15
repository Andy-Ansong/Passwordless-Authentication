import { Router } from "express"
import auth from "../middleware/auth.js"
const authRouter = Router()
import authController from "../controllers/authController.js"

authRouter.post("/request", authController.requestCode)
authRouter.post("/login", authController.verifyCode)
authRouter.post('/logout', auth, authController.logoutUser)

export default authRouter