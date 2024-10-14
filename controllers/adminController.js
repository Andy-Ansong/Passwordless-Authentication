import User from "../model/User.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"

const createAdmin = asyncErrorHandler(async(req, res) => {
    const { email, name } = req.body
    if(!email){
        return res.status(400).send({
            status: "error",
            message: "Please enter your email address"
        })
    }
    if(!name){
        return res.status(400).send({
            status: "error",
            message: "Please enter your name"
        })
    }
    const user = await User.findOne({email}).exec()
    if(user){
        return res.status(409).send({status: "error", message: "User already exists"})
    }
    const new_user = new User({name, email, role: "admin"})
    await new_user.save()

    const otp = await new_user.generateOtp()
    await sendOtpEmailService(new_user.email, otp)

    return res.status(200).send({
        status: "success",
        message: "A one-time code has been sent to your email address."
    })
})

export default {
    createAdmin
}