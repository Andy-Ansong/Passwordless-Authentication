import { Schema, model, Document } from "mongoose"
import validator from "validator"
import * as jwt from "jsonwebtoken"
import CustomError from "../utils/customError"


interface IUser extends Document{
    name: string
    email: string
    role: string
    generateAccessToken(): Promise<string>
    generateRefreshToken(): Promise<string>
    generateOtp: () => Promise<number|CustomError>
}

const userSchema = new Schema<IUser>({
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
    role: {
        type: String,
        enum: ['employee', 'hr', 'admin'],
    }
})

userSchema.methods.generateRefreshToken = async function(){
    const user = this
    const options = {
        expiresIn: '1d'
    }
    const token = jwt.sign({_id: user._id}, process.env.REFRESH_KEY, options)
    return token
}

userSchema.methods.generateAccessToken = async function(){
    const user = this
    const options = {
        expiresIn: '2m'
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY, options)
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