const User = require("../model/User")
const Profile = require("../model/Profile")
const sendOtpEmailService = require("../services/emailService")

const requestCode = async (req, res) => {
    const email = req.body.email
    if(!email){
        res.status(400).send({
            message: "Please enter your email address",
        })
    }
    try{
        const user = await User.findOne({email}).exec()
        if (!user) {
            let new_user = new User({email})
            await new_user.save()
        }

        const otp = await user.generateOtp()
        await sendOtpEmailService(user.email, otp)

        res.status(200).send({
            message: "A one-time code has been sent to your email address."
        })
    }catch(error){
        res.status(400).send({
            message: "The email address is not a valid email address",
        })
    }
}

const verifyCode = async (req, res) => {
    const { code } = req.body
    if(!code){
        return res.status(400).send({
            message: "Please enter your one-time code",
        })
    }
    try{
        if(code.length != 6){
            return res.status(400).send({
                message: "The one-time code you entered is not 6 digits"
            })
        }

        const users = await User.find({
            "otp.code": code,
            "otp.used": false
        }).exec()

        const user = users.filter(u => u._id !== u.otp.userId)[0]
        if(!user){
            return res.status(404).send({
                "message": "The one-time code you entered is invalid or expired"
            })
        }
        if(user.otp.code != code){
            return res.status(400).send({
                message: "The one-time code you entered is invalid."
            })
        }
        if(user.otp.expires_at < new Date()){
            return res.status(400).send({
                message: "The one-time code has expired. Please request a new code.",
            })
        }
        if(user.otp.used){
            return res.status(400).send({
                message: "The one-time code has expired. Please request a new code.",
            })
        }
        const token = await user.generateAuthToken()
        res.status(200).send({
            message: "Authentication successful. You are now logged in.",
            token,
            expires_in: 3600
        })
    }catch(err){
        res.status(400).send({message: "Please enter otp"})
    }
}

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({})
        res.status(200).send({users})
    }
    catch(err){
        res.status(500).send({ message: "Failed to retrieve users." })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const user = req.user
        return res.status(200).send({user})
    }catch(err){
        return res.status(404).send({message: "User not found"})
    }
}

const deleteCurrentUser = async(req, res) => {
    try{
        const userId = req.user._id
        const deletedUser = await User.findOneAndDelete(userId)
        if(!deletedUser){
            return res.status(404).send({message: "User not found"})
        }
        await Profile.findOneAndDelete({
            userId: userId
        })
        return res.status(200).send({message: "User deleted successfully"})
    }catch{
    }
}

const logoutUser = async (req, res) => {
    try{
        console.log("logging out user")
        return res.status(200).send({
            status: 'success',
            message: 'You have been logged out successfully.',
        })
    }catch(error){
        return res.status(500).send({
            status: "error",
            message: "An error occurred while logging out.",
            error: error.message
        })
    }
}

module.exports = {
    requestCode, verifyCode, getAllUsers, getCurrentUser,
    logoutUser, deleteCurrentUser
}