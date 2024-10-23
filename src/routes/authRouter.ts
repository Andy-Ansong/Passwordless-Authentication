import { Router } from "express"
import auth from "../middleware/auth"
const authRouter = Router()
import authController from "../controllers/authController"

authRouter.post("/request", authController.requestCode)
authRouter.post("/login", authController.login)
authRouter.post("/refresh", authController.refreshToken)
authRouter.post('/logout', auth, authController.logout)

export default authRouter