const express = require('express')
const Profile = require('../model/Profile')
const profileRouter = express.Router()
const auth = require('../middleware/auth')

// Create a new profile
profileRouter.post("/", auth, async (req, res) => {
    try{
        const profile = new Profile({
            ...req.body,
            userId: req.user._id
        })
        await profile.save()
        res.status(201).send({ message: "Profile saved successfully", profile })
    }catch(err) {
        res.status(400).send({ error: "There was a problem saving the profile. Please try again." })
    }
})

// Get all profiles
profileRouter.get("/", auth(true), async (req, res) => {
    try {
        const profiles = await Profile.find({})
        res.status(200).send({ profiles })
    } catch (err) {
        res.status(500).send({ error: "Failed to retrieve profiles." })
    }
})

// Get a single profile by id
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

// Mark a profile as viewed by a recuriter
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

// Get the profile of the currently authenticated user
profileRouter.get("/me", auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ userId: req.user._id })
        if(!profile){
            return res.status(404).send({ error: "Profile not found" })
        }
        res.status(200).send({ profile })
    }catch(err){
        res.status(500).send({ error: "Failed to retrieve your profile." })
    }
})

// Update profile by id
profileRouter.put("/:id", auth, async (req, res) => {
    try{
        const profile = await Profile.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
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

// Delete profile by id
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
        res.status(400).send({ error: "Failed to delete profile." })
    }
})

module.exports = profileRouter
