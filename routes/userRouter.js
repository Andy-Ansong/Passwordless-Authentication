const express = require("express")
const auth = require("../middleware/auth")
const userRouter = express.Router()
const role = require('../middleware/role')
const userController = require("../controllers/userController")

userRouter.get("/", auth, role(["admin"]), userController.getAllUsers)

userRouter.delete("/me", auth, userController.deleteCurrentUser)

userRouter.get("/me", auth, userController.getCurrentUser)

module.exports = userRouter