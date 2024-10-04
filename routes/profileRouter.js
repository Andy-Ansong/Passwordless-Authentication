const express = require('express')
const Profile = require('../model/Profile')
const profileRouter = express.Router()
const auth = require('../middleware/auth')

/**
 * @swagger
 * /api/v1/profile:
 *   post:
 *     summary: Create a profile
 *     tags: [Profile]
 *     responses:
 *       201:
 *         description: A successful response
 *       400:
 *          description: Failed to create due to invalid credentials
 */
profileRouter.post("/", auth(false), async (req, res) => {
    try{
        let profile = await Profile.findOne({userId: req.user._id}).exec()
        if(profile){
            return res.status(409).send({ error: "Profile already exists" })
        }
        profile = new Profile({
            ...req.body,
            userId: req.user._id
        })
        await profile.save()
        res.status(201).send({ message: "Profile saved successfully", profile })
    }catch(err) {
        res.status(400).send({ error: "There was a problem saving the profile. Please try again." })
    }
})

/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     summary: Get all profiles
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
profileRouter.get("/", auth(true), async (req, res) => {
    try{
        const profiles = await Profile.find({})
        res.status(200).send({ profiles })
    }catch(err){
        res.status(500).send({ error: "Failed to retrieve profiles." })
    }
})



/**
 * @swagger
 * /api/v1/profile/me:
 *   get:
 *     summary: Get current user profile
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
profileRouter.get("/me", auth(false), async (req, res) => {
    try{
        const profile = await Profile.findOne({userId: req.user._id}).exec()
        if(!profile){
            return res.status(404).send({ error: "Profile not found" })
        }
        res.status(200).send({ profile })
    }catch(err){
        res.status(404).send({ error: "Profile not found" })
    }
})

/**
 * @swagger
 * /api/v1/profile/{profile_id}:
 *   get:
 *     summary: Get profile by id
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
profileRouter.get("/:profile_id", auth(true), async (req, res) => {
    try{
        const profile_id = req.params.profile_id
        const profile = await Profile.findById(profile_id)
        if(!profile){
            return res.status(404).send({ error: "Profile not found" })
        }
        res.status(200).send({ profile })
    }catch(err){
        res.status(404).send({ error: "Profile not found" })
    }
})

/**
 * @swagger
 * /api/v1/profile/{profile_id}/viewed:
 *   put:
 *     summary: Mark a profile as viewed
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
profileRouter.put("/:profile_id/viewed", auth(true), async(req, res) => {
    try{
        const profile_id = req.params.profile_id
        const profile = await Profile.findByIdAndUpdate(
            profile_id,
            {viewed: true},
            {new: true}
        )
        if(!profile){
            return res.status(404).send({ error: "Profile not found" })
        }
        res.status(200).send({message: "Profile marked as viewed"})
    }catch(err){
        res.status(500).send({error: "Failed to update profile."})
    }
})

/**
 * @swagger
 * /api/v1/profile/{profile_id}/viewed:
 *   put:
 *     summary: Update user profile
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
 *          description: Failed to retrive profiles
 */
profileRouter.put("/:profile_id", auth, async (req, res) => {
    try{
        const profile = await Profile.findOneAndUpdate(
            { _id: req.params.profile_id, userId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        )
        if(!profile){
            return res.status(404).send({ error: "Profile not found" })
        }
        res.status(200).send({ message: "Profile updated successfully", profile })
    }catch(err){
        res.status(400).send({ error: "Failed to update profile." })
    }
})

/**
 * @swagger
 * /api/v1/profile/{profile_id}:
 *   delete:
 *     summary: delete user profile
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
 *          description: Failed to retrive profiles
 */
profileRouter.delete("/:profile_id", auth, async (req, res) => {
    try{
        const profile = await Profile.findOneAndDelete({
            _id: req.params.profile_id,
            userId: req.user._id
        })
        if(!profile){
            return res.status(404).send({ error: "Profile not found" })
        }
        res.status(204).send()
    }catch(err){
        res.status(500).send({ error: "Failed to delete profile." })
    }
})

module.exports = profileRouter
