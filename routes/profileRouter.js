import { Router } from 'express'
const profileRouter = Router()
import auth from '../middleware/auth.js'
import role from '../middleware/role.js'
import profileController from '../controllers/profileController.js'

profileRouter.post("/", auth, profileController.createProfile)
profileRouter.get("/", auth, role(["admin"]), profileController.getAllProfiles)

profileRouter.get("/current", auth, profileController.getCurrentProfile)
profileRouter.delete("/current", auth, profileController.deleteProfile)

profileRouter.get("/:id", auth, role(["admin"]), profileController.getProfileById)
profileRouter.patch("/:id/view", auth, role(["admin"]), profileController.setProfileAsViewed)
profileRouter.patch("/:id", auth, profileController.updateProfile)

export default profileRouter
