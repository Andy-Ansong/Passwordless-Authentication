const express = require('express')
const Profile = require('../model/Profile')
const profileRouter = express.Router()
const auth = require('../middleware/auth')

// create a profile
profileRouter.post("/", async (req, res) => {
    try{
        const profile = new Profile(req.body)
        await profile.save()
        res.status(201).send({message: "Profile saved successfully", profile})
    }catch(err){
        res.send({error: "There was a problem saving data. Please try again"})
    }
})

// get all profiles
profileRouter.get("/", async (req, res) => {
    const profiles = await Profile.find({})
    res.status(200).send({profiles})
})

// get single profile
profileRouter.get(":profile_id", async (req, res) => {
    try{
        const profile_id = req.params.profile_id
        const profile = await Profile.findById(profile_id)
        res.status(200).send({profile})
    }catch(err){
        res.status(404).send({error: "Profile not found"})
    }
})

// update profile by id
profileRouter.put("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const updatedProfile = req.body;
        const profile = await Profile.findByIdAndDelete(id)
        profile.save()
        res.status(204).send()
    }catch(err){
        res.status(404).send({error: "Profile not found"})
    }
})

// delete profile by id
profileRouter.delete("/:profile_id", async (req, res) => {
    try{
        const profile_id = req.params.profile_id
        const profile = await Profile.findByIdAndDelete(profile_id)
        profile.save()
        res.status(204).send()
    }catch(err){
        res.status(404).send({error: "Profile not found"})
    }
})

module.exports = profileRouter