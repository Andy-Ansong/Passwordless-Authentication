const express = require("express")
const role = require('../middleware/role')
const auth = require("../middleware/auth")
const adminRouter = express.Router()
const adminController = require("../controllers/adminController")

adminRouter.post("/createAdmin", auth, role(["admin"]), adminController.createAdmin)

module.exports = adminRouter