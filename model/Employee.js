const {Schema, default: mongoose} = require("mongoose")

const employeeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
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
    image: {
        type: String
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
    email: {
        required: true,
        unique: true,
        type: String,
        validate: value => {
            if(!value){
                return new Error("Please enter your email to continue")
            }
            if(!validator.isEmail(value)){
                return new Error("Invalid email")
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
    skills: [{
        skill: String
    }],
    Department: {
        Role: {
            position: String,
            location: String,
            startDate: {
                type: Date,
                default: new Date()
            }
        },
        Team: {
            name: String,
            role: String,
        }
    },
    WorkSchedule: {
        Days : {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            },
            type: {
                type: String,
                enum: ['On-site', 'Remote']
            }
        }
    }
})

module.exports = mongoose.model("Employee", employeeSchema)