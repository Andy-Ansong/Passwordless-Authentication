import User from "../model/User.js"
import sendOtpEmailService from "../services/emailService.js"
import errorHandler from "../utils/errorHandler.js"

const requestCode = errorHandler(async (req, res) => {
    const email = req.body.email
    if(!email){
        return res.status(400).send({
            status: "error",
            message: "Please enter your email address",
        })
    }
    const user = await User.findOne({email}).exec()
    if(!user){
        return res.status(404).send({status: "error", message: `Account not found`})
        // let new_user = new User({email, role: "employee"})
        // await new_user.save()
    }

    const otp = await user.generateOtp()
    req.session.otp = otp
    req.session.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000 )
    req.session.userId = user._id
    await sendOtpEmailService(user.email, otp)

    res.status(200).send({
        status: "success",
        otp,
        message: "A one-time code has been sent to your email address."
    })
})

const login = errorHandler(async (req, res, next) => {
    const { code } = req.body
    if(!code){
        return res.status(400).send({
            status: "error",
            message: "Please enter your one-time code",
        })
    }
    if(code.length != 6){
        return res.status(400).send({
            status: "error",
            message: "The code you entered is not 6 digits"
        })
    }

    if (req.session.otp != code) {
        return res.status(400).send({
            status: "error",
            message: "The code you entered is invalid."
        })
    }
    if(req.session.otpExpiresAt < new Date()){
        return res.status(400).send({
            status: "error",
            message: "Code has expired. Request a new code.",
        })
    }
    const user = await User.findById(req.session.userId).exec()
    if (!user) {
        return res.status(404).send({
            status: "error",
            message: "User not found. Please request a new OTP."
        })
    }
    const refreshToken = await user.generateRefreshToken()
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000
    })
    console.log("request: ", req.cookies)
    const accessToken = await user.generateAccessToken()

    delete req.session.otp
    delete req.session.otpExpiresAt
    delete req.session.userId

    res.status(200).send({
        status: "success",
        message: "Authentication successful. You are now logged in.",
        accessToken,
        refreshToken,
        expires_in: 120
    })
})

const refreshToken = errorHandler(async (req, res) => {
    console.log(req.cookies)
    const refreshToken = req.cookies.refreshToken
    console.log(refreshToken)
    if(!refreshToken){
        return res.status(401).send({
            status: "error",
            message: "Unauthorized. Please log in to continue.",
        })
    }
    const data = verify(refreshToken, process.env.JWT_KEY)
    const user = await User.findById(data._id).exec()
    if(!user){
        return res.status(401).send({
            "status": "error",
            "message": "Unauthorized. Please log in to continue."
        })
    }
    const accessToken = await user.generateAccessToken()
    return res.status(200).send({
        status: "success",
        message: "Authentication successful. You are now logged in.",
        accessToken
    })
})

const logout = errorHandler(async (req, res) => {
    res.clearCookie('refreshToken')
    return res.status(200).send({
        status: "success",
        message: 'You have been logged out successfully.',
    })
})

export default {
    requestCode, login, refreshToken, logout
}