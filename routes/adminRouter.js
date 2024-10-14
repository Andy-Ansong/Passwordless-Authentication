import { Router } from "express"
import role from '../middleware/role.js'
import auth from "../middleware/auth.js"
const adminRouter = Router()
import adminController from "../controllers/adminController.js"

adminRouter.post("/createAdmin", auth, role(["admin"]), adminController.createAdmin)

export default adminRouter