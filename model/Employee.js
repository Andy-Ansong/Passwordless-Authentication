const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        required: true,
        unique: true,
        type: String,
        validate: value => {
            if(!validator.isEmail(value)){
                return new Error({error: "Invalid email"})
            }
        }
    },
    role: {
        type: String,
        required: true
    },
    otp: [{
        expires_at: {
            type: Date,
        },
        code: {
            type: String,
        },
        used: {
            type: Boolean,
            default: false
        }
    }]
})

employeeSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const employee = mongoose.model("Employee", employeeSchema)
module.exports = employee