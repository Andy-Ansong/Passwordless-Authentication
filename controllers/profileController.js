const Profile = require('../model/Profile')

const createProfile = async (req, res) => {
    try{
        let profile = await Profile.findOne({userId: req.user._id}).exec()
        if(profile){
            return res.status(409).send({ message: "Profile already exists" })
        }
        profile = new Profile({
            ...req.body,
            userId: req.user._id
        })
        await profile.save()
        res.status(201).send({ message: "Profile saved successfully", profile })
    }catch(err) {
        res.status(400).send({ message: "There was a problem saving the profile. Please try again." })
    }
}

const getAllProfiles = async (req, res) => {
    try{
        const profiles = await Profile.find({})
        res.status(200).send({ profiles })
    }catch(err){
        return res.status(500).send({ message: "Failed to retrieve profiles." })
    }
}

const getCurrentProfile = async (req, res) => {
    try{
        const profile = await Profile.findOne({userId: req.user._id}).exec()
        if(!profile){
            return res.status(404).send({ message: "Profile not found" })
        }
        res.status(200).send({ profile })
    }catch(err){
        res.status(404).send({ message: "Profile not found" })
    }
}

const getProfileById = async (req, res) => {
    console.log("get profile by id")
    console.log(req.params.profile_id)
    try{
        const profile_id = req.params.profile_id
        const profile = await Profile.findById(profile_id)
        if(!profile){
            return res.status(404).send({ message: "Profile not found" })
        }
        res.status(200).send({ profile })
    }catch(err){
        res.status(404).send({ message: "Profile not found" })
    }
}

const setProfileAsViewed = async(req, res) => {
    try{
        const profile_id = req.params.profile_id
        // const profile = await Profile.findByIdAndUpdate(
        //     profile_id,
        //     {viewed: true},
        //     {new: true}
        // )
        const profile = await Profile.findById(profile_id)
        if(!profile){
            return res.status(404).send({ message: "Profile not found" })
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
        res.status(200).send({message})
    }catch(err){
        res.status(500).send({message: "Failed to update profile."})
    }
}

const updateProfile = async(req, res) => {
    try{
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
            return res.status(404).send({ message: "Profile not found" })
        }
        res.status(200).send({ message: "Profile updated successfully", profile })
    }catch(err){
        res.status(400).send({ message: "Failed to update profile." })
    }
}

const deleteProfile = async (req, res) => {
    try{
        const profile = await Profile.findOneAndDelete({
            _id: req.params.profile_id,
            userId: req.user._id
        })
        if(!profile){
            return res.status(404).send({ message: "Profile not found" })
        }
        res.status(204).send()
    }catch(err){
        res.status(500).send({ message: "Failed to delete profile." })
    }
}

module.exports = {
    createProfile, getAllProfiles, getCurrentProfile, getProfileById,
    setProfileAsViewed, updateProfile, deleteProfile
}