const express = require("express")
const auth = require("../middleware/auth")
const userRouter = express.Router()
const role = require('../middleware/role')
const userController = require("../controllers/userController")

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A successful response
 *       500:
 *          description: Failed to retrive users
 */
userRouter.get("/", auth, role(["admin"]), userController.getAllUsers)

/**
 * @swagger
 * /api/v1/user/me:
 *   delete:
 *     summary: delete current user
 *     security:
 *       - Authorization: []
 *     tags: [User]
 *     responses:
 *       204:
 *         description: Successfully deleted profile
 *       401:
 *         description: Unauthorized, user must log in first
 *       404:
 *         description: Profile not found
 *       500:
 *          description: Failed to delete profile
 */
userRouter.delete("/me", auth, userController.deleteCurrentUser)

/**
 * @swagger
 * /api/v1/user/me:
 *   get:
 *     summary: Get current user details
 *     security:
 *       - Authorization: []
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *          description: User not found
 */
userRouter.get("/me", auth, userController.getCurrentUser)

module.exports = userRouter