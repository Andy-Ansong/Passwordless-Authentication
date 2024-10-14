const express = require('express')
const profileRouter = express.Router()
const auth = require('../middleware/auth')
const role = require('../middleware/role')
const profileController = require('../controllers/profileController')

profileRouter.post("/", auth, profileController.createProfile)
profileRouter.get("/", auth, role(["admin"]), profileController.getAllProfiles)

profileRouter.get("/me", auth, profileController.getCurrentProfile)
profileRouter.delete("/me", auth, profileController.deleteProfile)

profileRouter.get("/:profile_id", auth, role(["admin"]), profileController.getProfileById)
profileRouter.patch("/:profile_id/viewed", auth, role(["admin"]), profileController.setProfileAsViewed)
profileRouter.patch("/:profile_id", auth, profileController.updateProfile)

module.exports = profileRouter
