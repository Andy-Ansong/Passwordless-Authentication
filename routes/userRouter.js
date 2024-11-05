import { Router } from "express"
import auth from "../middleware/auth.js"
const userRouter = Router()
import userController from "../controllers/userController.js"

userRouter.get("/", auth, userController.getAllUsers)

export default userRouter