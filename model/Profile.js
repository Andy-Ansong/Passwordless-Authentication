const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    languages: [{
        language: String
    }],
    education: [{
        location: String,
        duration: String,
        course: String
    }],
    workExperience: [{
        location: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String,
    }],
    skills: [{
        skill: String
    }],
    certifications: [{
        certificate: {
            name: String,
            dateReceived: Date
        }
    }],
    currentRole: {
        role: String,
        startDate: Date,
        endDate: Date,
        location: String
    },
    interests: [{
        interest: String
    }]
})

const Profile = mongoose.model("Profile", profileSchema)
module.exports = Profile