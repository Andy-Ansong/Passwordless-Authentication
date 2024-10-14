import Profile from '../model/Profile.js'
import errorHandler from '../utils/errorHandler.js'
import pagination from '../utils/pagination.js'
import search from '../utils/searchModel.js'
import sort from '../utils/sortModel.js'

const createProfile = errorHandler(async (req, res) => {
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

const getAllProfiles = errorHandler(async (req, res) => {
    let query = search(Profile, req.query)
    query = sort(query, req.query.sort)
    const page = req.query.page
    const total = Profile.countDocuments()
    query = pagination(query, page, req.query.limit, startIndex, total)
    const profiles = await query
    return res.status(200).send({
        page,
        total,
        status: "success",
        profiles
    })
})

const getCurrentProfile = errorHandler(async (req, res) => {
    const profile = await Profile.findOne({userId: req.user._id}).exec()
    if(!profile){
        return res.status(404).send({status: "error", message: "Profile not found"})
    }
    res.status(200).send({
        status: "success",
        profile
    })
})

const getProfileById = errorHandler(async (req, res) => {
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

const setProfileAsViewed = errorHandler(async(req, res) => {
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

const updateProfile = errorHandler(async(req, res) => {
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

const deleteProfile = errorHandler(async (req, res) => {
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

export default {
    createProfile, getAllProfiles, getCurrentProfile, getProfileById,
    setProfileAsViewed, updateProfile, deleteProfile
}