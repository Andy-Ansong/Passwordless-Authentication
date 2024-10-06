const express = require('express')
const profileRouter = express.Router()
const auth = require('../middleware/auth')
const profileController = require('../controllers/profileController')

/**
 * @swagger
 * /api/v1/profile:
 *   post:
 *     summary: Create a profile
 *     security:
 *       - BearerAuth: []
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *                 description: The gender of the user
 *               bio:
 *                 type: string
 *                 description: A short biography of the user
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: The user's birth date
 *               phoneNumber:
 *                 type: string
 *                 description: The user's phone number
 *               languages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     language:
 *                       type: string
 *             example:
 *               {
 *                 "name": "John Doe",
 *                 "gender": "Male",
 *                 "bio": "Software Developer",
 *                 "birthDate": "2004-04-14",
 *                 "phoneNumber": "+233509895421",
 *                 "languages": [{"language": "English"}]
 *               }
 *     responses:
 *       201:
 *         description: A successful response
 *       400:
 *          description: Failed to create due to invalid credentials
 */
profileRouter.post("/", auth(false), profileController.createProfile)

/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     summary: Get all profiles
 *     security:
 *       - BearerAuth: []
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Unauthorized, user must log in first
 *       403:
 *         description: Forbidden, user is not an admin
 *       500:
 *          description: Failed to retrive profiles
 */
profileRouter.get("/", auth(true), profileController.getAllProfiles)


/**
 * @swagger
 * /api/v1/profile/me:
 *   get:
 *     summary: Get current user profile
 *     security:
 *       - BearerAuth: []
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Unauthorized, user must log in first
 *       403:
 *         description: Forbidden, user is not an admin
 *       404:
 *         description: Profile not found
 */
profileRouter.get("/me", auth(false), profileController.getCurrentProfile)

/**
 * @swagger
 * /api/v1/profile/{profile_id}:
 *   get:
 *     summary: Get profile by id
 *     security:
 *       - BearerAuth: []
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: profile_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Unauthorized, user must log in first
 *       403:
 *         description: Forbidden, user is not an admin
 *       404:
 *         description: Profile not found
 */
profileRouter.get("/:profile_id", auth(true), profileController.getProfileById)

/**
 * @swagger
 * /api/v1/profile/{profile_id}/viewed:
 *   patch:
 *     summary: Mark a profile as viewed
 *     security:
 *       - BearerAuth: []
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: profile_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Unauthorized, user must log in first
 *       403:
 *         description: Forbidden, user is not an admin
 *       404:
 *         description: Profile not found
 *       500:
 *          description: Failed to update profile
 */
profileRouter.patch("/:profile_id/viewed", auth(true), profileController.setProfileAsViewed)

/**
 * @swagger
 * /api/v1/profile/{profile_id}:
 *   patch:
 *     summary: Update user profile
 *     security:
 *       - BearerAuth: []
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: profile_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Unauthorized, user must log in first
 *       403:
 *         description: Forbidden, user is not an admin
 *       404:
 *         description: Profile not found
 *       500:
 *          description: Failed to update profile
 */
profileRouter.patch("/:profile_id", auth, profileController.updateProfile)

/**
 * @swagger
 * /api/v1/profile/{profile_id}:
 *   delete:
 *     summary: delete user profile
 *     security:
 *       - BearerAuth: []
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: profile_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
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
profileRouter.delete("/:profile_id", auth, profileController.deleteProfile)

module.exports = profileRouter
