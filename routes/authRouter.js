require("dotenv").config()
const express = require("express")
const User = require("../model/User")
const authRouter = express.Router()
const auth = require("../middleware/auth")
const nodemailer = require("nodemailer")

// helper function to send emails
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

// route to get all users
authRouter.get("/", async (req, res) => {
    const users = await User.find({})
    res.status(200).send({users})
})

// route to get currently logged in users
authRouter.get("/me", auth, async (req, res) => {
    try {
        const user = req.user
        res.status(200).json({ user })
    } catch (err) {
        res.status(404).json({ error: "User not found" })
    }
})

// route to request one time code
authRouter.post("/request-code", async (req, res) => {
    try{
        const email = req.body.email

        const user = await User.findOne({email}).exec()
        if (!user) {
            user = new User({ email })
            await user.save()
        }

        const otp = await user.generateOtp()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: [user.email],
            replyTo: process.env.REPLY_TO,
            subject: "Passwordless Authentication",
            // text: `This is your one-time code:\n${otp}\nCode expires in 5 minutes.`, // Plain text version (optional)
            html: `
                <div>
                    <h1>Passwordless Authentication</h1>
                    <p>This is your one-time code:</p>
                    <h2 style="color: #f56607">${otp}</h2>
                    <p>The code expires in 5 minutes.</p>
                    <br />
                    <p>Thank you</p>
                </div>
            `
        }
        const info = await transporter.sendMail(mailOptions)

        res.status(200).send({
            status: "success",
            message: "A one-time code has been sent to your email address."
        })
    }catch(error){
        res.status(400).send({
            status: "error",
            message: "The email address is not a valid email address",
        })
    }
})

// route to verify one time code to login user for an hour
authRouter.post("/verify-code", async (req, res) => {
    try{
        const { code } = req.body
        const user = await User.findOne({
            "otp.code": code,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            "otp.used": false
        }).exec()
        // const user = await User.findOne({'otp.code': code}).exec()
        if(!user){
            res.status(404).send({
                "status": "error",
                "message": "The one-time code you entered is invalid or expired"
            })
        }
        if(user.otp.code != code){
            res.status(400).send({
                status: "Error",
                message: "The one-time code you entered is invalid."
            })
        }
        if(user.otp.expires_at < new Date()){
            res.status(400).send({
                message: "The one-time code has expired. Please request a new code.",
                status: "error",
            })
        }
        if(user.otp.used){
            res.status(400).send({
                message: "The one-time code has expired. Please request a new code.",
                status: "error",
            })
        }
        const token = await user.generateAuthToken()
        res.send({
            status: "success",
            message: "Authentication successful. You are now logged in.",
            token,
            expires_in: 3600
        })
    }catch(err){
        console.log("An error occured")
        res.status(400).send(err)
    }
})

// route to create a recruiter
authRouter.post("/recruiter", async (req, res) => {
    try {
        const { name, email } = req.body
        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(400).send({
                status: "error",
                message: "A user with this email already exists."
            })
        }
        const recruiter = new User({
            name,
            email,
            isRecruiter: true
        })
        await recruiter.save()
        const token = await recruiter.generateAuthToken()
        res.status(201).send({
            status: "success",
            message: "Recruiter created successfully.",
            recruiter,
            token
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "An error occurred while creating the recruiter.",
            error: error.message
        })
    }
})

// Manual logout
authRouter.post('/logout', async (req, res) => {
    res.json({
        status: 'success',
        message: 'You have been logged out successfully.',
    })
})

module.exports = authRouter