import { Router } from 'express'
const profileRouter = Router()
import auth from '../middleware/auth.js'
import role from '../middleware/role.js'
import profileController from '../controllers/profileController.js'

profileRouter.post("/", auth, profileController.createProfile)
profileRouter.get("/", auth, role(["admin"]), profileController.getAllProfiles)

profileRouter.get("/me", auth, profileController.getCurrentProfile)
profileRouter.delete("/me", auth, profileController.deleteProfile)

profileRouter.get("/:profile_id", auth, role(["admin"]), profileController.getProfileById)
profileRouter.patch("/:profile_id/view", auth, role(["admin"]), profileController.setProfileAsViewed)
profileRouter.patch("/:profile_id", auth, profileController.updateProfile)

export default profileRouter
