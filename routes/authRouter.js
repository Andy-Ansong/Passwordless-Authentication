require("dotenv").config()
const express = require("express")
const authRouter = express.Router()
const role = require('../middleware/role')
const authController = require("../controllers/authControllers")
const auth = require("../middleware/auth")

/**
 * @swagger
 * /api/v1/auth/createAdmin:
 *   post:
 *     summary: Create an admin
 *     security:
 *       - Authorization: []
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *           example:
 *             name: "John Doe"
 *             email: "user@example.com"
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *          description: Invalid email address
 */
authRouter.post("/createAdmin", auth, role(["admin"]), authController.createAdmin)

/**
 * @swagger
 * /api/v1/auth/request-code:
 *   post:
 *     summary: Request a one-time code for login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *           example:
 *             email: "user@example.com"
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *          description: Invalid email address
 */
authRouter.post("/request-code", authController.requestCode)

/**
 * @swagger
 * /api/v1/auth/verify-code:
 *   post:
 *     summary: Verify one-time code for login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The one-time code for login
 *           example: { "code": "123456" }
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *          description: The one-time code is invalid or expired
 *       404:
 *          description: No with that one-time code
 */
authRouter.post("/verify-code", authController.verifyCode)

/**
 * @swagger
 * /api/v1/auth:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A successful response
 *       500:
 *          description: Failed to retrive users
 */
authRouter.get("/", auth, role(["admin"]), authController.getAllUsers)

/**
 * @swagger
 * /api/v1/auth/me:
 *   delete:
 *     summary: delete current user
 *     security:
 *       - Authorization: []
 *     tags: [Auth]
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
authRouter.delete("/me", auth, authController.deleteCurrentUser)

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user details
 *     security:
 *       - Authorization: []
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *          description: User not found
 */
authRouter.get("/me", auth, authController.getCurrentUser)

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     security:
 *       - Authorization: []
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized, user must log in first
 *       500:
 *          description: Failed to log out user
 */
authRouter.post('/logout', auth, authController.logoutUser)

module.exports = authRouter