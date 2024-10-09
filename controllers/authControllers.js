const User = require("../model/User")
const Profile = require("../model/Profile")
const sendOtpEmailService = require("../services/emailService")

const requestCode = async (req, res) => {
    const email = req.body.email
    if(!email){
        res.status(400).send({
            status: "error",
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
            status: "success",
            message: "A one-time code has been sent to your email address."
        })
    }catch(error){
        res.status(400).send({
            status: "error",
            message: "The email address is not a valid email address",
            error
        })
    }
}

const verifyCode = async (req, res) => {
    try{
        const { code } = req.body
        if(!code){
            res.status(400).send({
                status: "error",
                message: "Please enter your one-time code",
                error
            })
        }
        if(code.length != 6){
            return res.status(400).send({
                "status": "error",
                "message": "The one-time code you entered is invalid"
            })
        }

        const users = await User.find({
            "otp.code": code,
            "otp.used": false
        }).exec()

        const user = users.filter(u => u._id !== u.otp.userId)[0]
        if(!user){
            return res.status(404).send({
                "status": "error",
                "message": "The one-time code you entered is invalid or expired"
            })
        }
        if(user.otp.code != code){
            return res.status(400).send({
                status: "Error",
                message: "The one-time code you entered is invalid."
            })
        }
        if(user.otp.expires_at < new Date()){
            return res.status(400).send({
                message: "The one-time code has expired. Please request a new code.",
                status: "error",
            })
        }
        if(user.otp.used){
            return res.status(400).send({
                message: "The one-time code has expired. Please request a new code.",
                status: "error",
            })
        }
        const token = await user.generateAuthToken()
        res.status(200).send({
            status: "success",
            message: "Authentication successful. You are now logged in.",
            token,
            expires_in: 3600
        })
    }catch(err){
        res.status(400).send({message: err})
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