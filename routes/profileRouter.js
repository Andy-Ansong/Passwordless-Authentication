const express = require('express')
const Profile = require('../model/Profile')
const profileRouter = express.Router()
const auth = require('../middleware/auth')

// get all profiles
profileRouter.get("/", async (req, res) => {
    const profiles = await Profile.find({})
    res.send({profiles})
})

// create a profile
profileRouter.post("/", async (req, res) => {
    res.send({message: "Working"})
})

module.exports = profileRouter