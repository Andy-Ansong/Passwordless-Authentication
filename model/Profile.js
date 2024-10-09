const mongoose = require("mongoose")
const validator = require("validator")

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        validate: value => {
            if(!value){
                return new Error("Please enter your name")
            }
            if(!validator.isAlphanumeric(value)){
                return new Error("Name can only include alphabets or numbers.")
            }
        }
    },
    gender: {
        type: String,
        enum: ['Male', 'male', 'female', 'Female'],
        required: true,
        validate: value => {
            if(!value){
                return {error: "Please enter your gender ( Male / Female )"}
            }
            if(value != "Male" || value != "Female"){
                return new Error("Gender can be either Male or Female")
            }
        }
    },
    bio: {
        type: String,
        required: true,
        validate: value => {
            if(!value){
                return new Error("Write a short description about yourself in the bio")
            }
        }
    },
    birthDate: {
        type: Date,
        required: true,
        validate: value => {
            if(!value){
                return new Error("Please enter your date of birth")
            }
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: value => {
            if(!value){
                return new Error("Please enter you phone number")
            }
        }
    },
    languages: [{
        language: String
    }],
    education: [{
        institution: {
            type: String,
            required: true
        },
        degree: {
            type: String
        },
        course: {
            type: String,
            required: true
        },
        startYear: {
            type: Date
        },
        endYear: {
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