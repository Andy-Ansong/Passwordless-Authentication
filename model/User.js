const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
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
                return new Error("Invalid email")
            }
        }
    },
    role: {
        type: String,
        required: true
    },
    otp: {
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
        user.otp = {
            code: otpCode,
            expires_at: new Date(new Date().getTime() + ( 5 * 60 * 1000 )),
            used: false
        }
        await user.save()
        return otpCode
    }catch(error){
        return error
    }
}

const User = mongoose.model("User", userSchema)
module.exports = User