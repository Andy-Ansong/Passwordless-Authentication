require("dotenv").config()
const express = require("express")
const Employee = require("../model/Employee")
const userRouter = express.Router()
const auth = require("../middleware/auth")
const nodemailer = require("nodemailer")

userRouter.get("/", async (req, res) => {
    const users = await Employee.find({})
    res.status(200).send({users})
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
userRouter.get("/me", auth, async (req, res) => {
    try {
        const user = await Employee.findOne({name: "Andy Ansong"}).exec()
        res.status(200).json({ user });
    } catch (err) {
        res.status(404).json({ error: "User not found" });
    }
})

userRouter.post("/signup", async (req, res) => {
    try{
        const user = new Employee(req.body)
        await user.save()
        res.redirect(307, "/request-code")
    }catch(error){
        res.status(400).send(error)
    }
})

userRouter.post("/request-code", async (req, res) => {
    try{
        const email = req.body.email
        const user = await Employee.findOne({email}).exec()
        // if(!user){
        //     const employee = new Employee(req.body)
        //     await employee.save()
        // }
        console.log(user)
        const otp = await user.generateOtp()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: [user.email],
            replyTo: process.env.REPLY_TO,
            subject: "Passwordless Authentication",
            text: `This is your one time code\n${otp}\nCode expires in 5 minutes`
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.status(200).send({
            status: "success",
            message: "A one-time code has been sent to your email address.",
            otp: otp
        })
    }catch(error){
        res.status(400).send({
            status: "error",
            message: "The email address is not a valid email address",
        })
    }
})

userRouter.post("/verify-code", async (req, res) => {
    try{
        const email = req.body.email
        const code = req.body.code
        const user = await Employee.findOne({email}).exec()
        // const user = await Employee.findOne({'otp.code': code}).exec()
        if(!user){
            res.status(404).send({
                "status": "error",
                "message": "The email address is not a valid email address"
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
        console.log("token generated ", token)
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

module.exports = userRouter