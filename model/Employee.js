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
            if(["Male", "Female"].incluesd(value)){
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
        validate: {
            validator: (value) => /^[0-9]{10}$/.test(value),
            message: "Phone number must be 10 digits."
        }
    },
    skills: [{
        skill: String
    }],
    Department: {
        Role: {
            position: {
                type: String,
                required: true
            },
            location: {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                default: Date.now
            }
        },
        Team: {
            name: {
                type: String,
                required: true
            },
            role: {
                type: String,
                required: true
            }
        }
    },
    WorkSchedule: {
        Days: [{
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
        }]
    }
})

module.exports = mongoose.model("Employee", employeeSchema)