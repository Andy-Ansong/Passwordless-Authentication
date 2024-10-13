const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const CustomError = require("../utils/customError")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        required: [true, "Please enter your email to continue."],
        unique: true,
        type: String,
        validate: value => {
            if(!validator.isEmail(value)){
                return new Error("Invalid email")
            }
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const options = {
        expiresIn: '1h'
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY, options)
    user.otp.used = true;
    await user.save()
    return token
}

userSchema.methods.generateOtp = async function(){
    try{
        const user = this
        const otpCode = Math.floor(100000 + Math.random() * 900000)
        return otpCode
    }catch(error){
        return new CustomError("Unable to generate OTP", 500)
    }
}

const User = mongoose.model("User", userSchema)
module.exports = User