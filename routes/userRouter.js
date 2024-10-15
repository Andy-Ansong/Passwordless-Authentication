import { Router } from "express"
import auth from "../middleware/auth.js"
const userRouter = Router()
import role from '../middleware/role.js'
import userController from "../controllers/userController.js"

userRouter.post("/", auth, role(["admin", "hr"]), userController.createUser)
userRouter.get("/", auth, role(["admin"]), userController.getAllUsers)

userRouter.delete("/me", auth, userController.deleteCurrentUser)
userRouter.get("/me", auth, userController.getCurrentUser)

export default userRouter