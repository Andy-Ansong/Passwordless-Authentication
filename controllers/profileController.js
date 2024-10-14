const Profile = require('../model/Profile')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const pagination = require('../utils/pagination')
const search = require('../utils/searchModel')
const sort = require('../utils/sortModel')

const createProfile = asyncErrorHandler(async (req, res) => {
    let profile = await Profile.findOne({userId: req.user._id}).exec()
    if(profile){
        return res.status(409).send({status: "error", message: "Profile already exists" })
    }
    profile = new Profile({
        ...req.body,
        userId: req.user._id
    })
    await profile.save()
    res.status(201).send({
        status: "success",
        message: "Profile saved successfully",
        profile
    })
})

const getAllProfiles = asyncErrorHandler(async (req, res) => {
    let query = search(Profile, req.query)
    query = sort(query, req.query.sort)
    query = pagination(query, req.query.page, req.query.limit, startIndex, Profile.countDocuments())
    const profiles = await query
    return res.status(200).send({
        status: "success",
        page,
        profiles
    })
})

const getCurrentProfile = asyncErrorHandler(async (req, res) => {
    const profile = await Profile.findOne({userId: req.user._id}).exec()
    if(!profile){
        return res.status(404).send({status: "error", message: "Profile not found"})
    }
    res.status(200).send({
        status: "success",
        profile
    })
})

const getProfileById = asyncErrorHandler(async (req, res) => {
    const profile_id = req.params.profile_id
    const profile = await Profile.findById(profile_id)
    if(!profile){
        return res.status(404).send({status: "error", message: "Profile not found" })
    }
    res.status(200).send({
        status: "success",
        profile
    })
})

const setProfileAsViewed = asyncErrorHandler(async(req, res) => {
    const profile_id = req.params.profile_id
    const profile = await Profile.findById(profile_id)
    if(!profile){
        return res.status(404).send({status: "error", message: "Profile not found" })
    }
    const message = ""
    if(profile.viewed){
        profile.viewed = false
        message = "Profile marked as viewed"
    }else{
        profile.viewed = true
        message = "Profile unmarked as viewed"
    }
    profile.save()
    res.status(200).send({
        status: "success",
        message
    })
})

const updateProfile = asyncErrorHandler(async(req, res) => {
    const profile = await Profile.findOneAndUpdate(
        {
            _id: req.params.profile_id,
            userId: req.user._id
        },
        {...req.body, ...req.body.name},
        {
            new: true,
            runValidators: true
        }
    )
    if(!profile){
        return res.status(404).send({status: "error", message: "Profile not found" })
    }
    res.status(200).send({
        status: "success",
        message: "Profile updated successfully",
        profile
    })
})

const deleteProfile = asyncErrorHandler(async (req, res) => {
    const profile = await Profile.findOneAndDelete({
        _id: req.params.profile_id,
        userId: req.user._id
    })
    if(!profile){
        return res.status(404).send({status: "error", message: "Profile not found" })
    }
    res.status(200).send({
        status: "success",
        messaeg: "Profile deleted successfully."
    })
})

module.exports = {
    createProfile, getAllProfiles, getCurrentProfile, getProfileById,
    setProfileAsViewed, updateProfile, deleteProfile
}