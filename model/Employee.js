import mongoose, { Schema, model } from "mongoose"

const employeeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        validate: {
            validator: (value) => /^[a-zA-Z\s]+$/.test(value),
            message: "Name should only contain alphabets and spaces."
        }
    },
    gender: {
        type: String,
        enum: ['Male', 'female'],
        required: [true, "Please enter your gender ( Male / Female )"],
        validate: value => {
            if(["Male", "Female"].includes(value)){
                return new Error("Gender can be either Male or Female")
            }
        }
    },
    image: {
        type: String
    },
    bio: {
        type: String,
        required: [true, "Write a short description about yourself in the bio"],
    },
    birthDate: {
        type: Date,
        required: [true, "Please enter your date of birth"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter you phone number"],
        // validate: {
        //     validator: (value) => /^[0-9]$/.test(value),
        //     message: "Phone number must be 10 digits."
        // }
    },
    skills: [{
        skill: String,
    }],
    Department: {
        Role: {
            position: {
                type: String,
                default: "Not assigned"
            },
            location: {
                type: String,
                default: "Not assigned"
            },
            startDate: {
                type: Date,
                default: Date.now
            }
        },
        Team: {
            name: {
                type: String,
                default: "Not assigned"
            },
            role: {
                type: String,
                default: "Not assigned"
            },
            isLeader: {
                type: Boolean,
                default: false
            }
        }
    },
    WorkSchedule: {
        type: [{
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                required: true
            },
            type: {
                type: String,
                enum: ['On-site', 'Remote'],
                required: true
            }
        }],
        default: [
            { day: 'Monday', type: 'On-site' },
            { day: 'Tuesday', type: 'On-site' },
            { day: 'Wednesday', type: 'On-site' },
            { day: 'Thursday', type: 'On-site' },
            { day: 'Friday', type: 'Remote' }
        ]
    }
})

export default model("Employee", employeeSchema)