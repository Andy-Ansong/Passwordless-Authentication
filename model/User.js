import { Schema, model } from "mongoose"
import validator from "validator"
import jwt from "jsonwebtoken"
import CustomError from "../utils/customError.js"

const {isEmail} = validator
const {sign} = jwt

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        required: [true, "Please enter your email to continue."],
        unique: true,
        type: String,
        validate: value => {
            if(!isEmail(value)){
                return new Error("Invalid email")
            }
        }
    },
    role: {
        type: String,
        enum: ['employee', 'admin', 'hr'],
    }
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const options = {
        expiresIn: '1h'
    }
    const token = sign({_id: user._id}, process.env.JWT_KEY, options)
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

const User = model("User", userSchema)
export default User