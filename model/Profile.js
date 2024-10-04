const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
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
        type: String,
        required: true
    },
    languages: [{
        language: String
    }],
    education: [{
        institution: {
            type: String,
            required: true
        },
        degreeLevel: {
            type: String
        },
        course: {
            type: String,
            required: true
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    }],
    workExperience: [{
        company: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date
        },
        description: {
            type: String
        }
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
    }],
    viewed: {
        type: Boolean,
        default: false
    }
})

const Profile = mongoose.model("Profile", profileSchema)
module.exports = Profile