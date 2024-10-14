const User = require("../model/User")
const Profile = require("../model/Profile")
const sendOtpEmailService = require("../services/emailService")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const CustomError = require("../utils/customError")
const search = require("../utils/searchModel")
const pagination = require("../utils/pagination")
const sort = require("../utils/sortModel")

const createAdmin = async(req, res) => {
    const { email, name } = req.body
    if(!email){
        return res.status(400).send({
            message: "Please enter your email address"
        })
    }
    if(!name){
        return res.status(400).send({
            message: "Please enter your name"
        })
    }
    try{
        const user = await User.findOne({email}).exec()
        if(user){
            return res.status(409).send({message: "User already exists"})
        }
        const new_user = new User({name, email, role: "admin"})
        await new_user.save()

        const otp = await new_user.generateOtp()
        await sendOtpEmailService(new_user.email, otp)

        return res.status(200).send({
            status: "success",
            message: "A one-time code has been sent to your email address."
        })
    }catch(err){
        res.send(500).send({message: "There was an error connecting to the server, please try again"})
    }
}

const requestCode = asyncErrorHandler(async (req, res) => {
    const email = req.body.email
    if(!email){
        return res.status(400).send({
            message: "Please enter your email address",
        })
    }
    const user = await User.findOne({email}).exec()
    if(!user){
        let new_user = new User({email})
        await new_user.save()
    }

    const otp = await user.generateOtp()
    req.session.otp = otp
    req.session.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000 )
    req.session.userId = user._id
    await sendOtpEmailService(user.email, otp)

    res.status(200).send({
        status: "success",
        message: "A one-time code has been sent to your email address."
    })
})

const verifyCode = asyncErrorHandler(async (req, res, next) => {
    const { code } = req.body

    if(!code){
        return res.status(400).send({
            message: "Please enter your one-time code",
        })
    }
    if(code.length !== 6){
        return res.status(400).send({
            message: "The one-time code you entered is not 6 digits"
        })
    }

    if (req.session !== code) {
        return res.status(400).send({
            message: "The one-time code you entered is invalid."
        })
    }
    if(req.session.otpExpiresAt < new Date()){
        return res.status(400).send({
            message: "The one-time code has expired. Please request a new code.",
        })
    }
    const user = await User.findById(req.session.userId).exec()
    if (!user) {
        return res.status(404).send({
            message: "User not found. Please request a new OTP."
        })
    }
    const token = await user.generateAuthToken()

    delete req.session.otp
    delete req.session.otpExpiresAt
    delete req.session.userId

    res.status(200).send({
        status: "success",
        message: "Authentication successful. You are now logged in.",
        token,
        expires_in: 3600
    })
})

const getAllUsers = asyncErrorHandler(async (req, res) => {
    let query = search(User, req.query)
    query = sort(query, req.query.sort)
    query = pagination(query, req.query.page, req.query.limit, startIndex, User.countDocuments())
    const users = await query
    return res.status(200).send({users})
})

const getCurrentUser = asyncErrorHandler(async (req, res, next) => {
    const user = req.user
    if(!user){
        const error = new CustomError(
            "User not found",
            404
        )
        return next(error)
    }
    return res.status(200).send({
        status: "success",
        user
    })
})

const deleteCurrentUser = asyncErrorHandler(async(req, res, next) => {
    const userId = req.user._id
    const deletedUser = await User.findOneAndDelete(userId)
    if(!deletedUser){
        const error = new CustomError(
            "User not found",
            404
        )
        return next(error)
    }
    await Profile.findOneAndDelete({
        userId: userId
    })
    return res.status(200).send({message: "User deleted successfully"})
})

const logoutUser = asyncErrorHandler(async (req, res) => {
    return res.status(200).send({
        status: "success",
        message: 'You have been logged out successfully.',
    })
})

module.exports = {
    requestCode, verifyCode, getAllUsers, getCurrentUser,
    logoutUser, deleteCurrentUser, createAdmin
}