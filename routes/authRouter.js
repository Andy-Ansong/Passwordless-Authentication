const express = require("express")
const auth = require("../middleware/auth")
const authRouter = express.Router()
const authController = require("../controllers/authController")

authRouter.post("/request-code", authController.requestCode)
authRouter.post("/verify-code", authController.verifyCode)
authRouter.post('/logout', auth, authController.logoutUser)

module.exports = authRouter