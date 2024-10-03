require("dotenv").config();
const express = require("express");
const Employee = require("../model/Employee");
const jwt = require("jsonwebtoken"); // Ensure you import jwt
const userRouter = express.Router();
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");

// Helper function to send emails
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Route to get all employees
userRouter.get("/", async (req, res) => {
    try {
        const users = await Employee.find({});
        res.status(200).send({ users });
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch users" });
    }
});

// Route to get currently logged in employee
userRouter.get("/me", auth, async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await Employee.findById(data._id); // Use findById and await it
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user });
    } catch (err) {
        res.status(401).json({ error: "Unauthorized" });
    }
});

// Route to sign up
userRouter.post("/signup", async (req, res) => {
    try {
        const user = new Employee(req.body);
        await user.save();
        res.redirect(307, "/request-code");
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to request one-time code
userRouter.post("/request-code", async (req, res) => {
    try {
        const email = req.body.email;
        const user = await Employee.findOne({ email }).exec();
        if (!user) {
            return res.status(404).send({ status: "error", message: "User not found" });
        }

        const otp = await user.generateOtp();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Passwordless Authentication",
            text: `This is your one-time code: ${otp}. Code expires in 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send({
            status: "success",
            message: "A one-time code has been sent to your email address."
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: "The email address is not valid or user does not exist.",
        });
    }
});

// Route to verify one-time code to login user for an hour
userRouter.post("/verify-code", async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await Employee.findOne({ email }).exec();
        if (!user) {
            return res.status(404).send({ status: "error", message: "User not found" });
        }

        // Check OTP validity
        if (user.otp.code !== code) {
            return res.status(400).send({ status: "error", message: "The one-time code you entered is invalid." });
        }
        if (user.otp.expires_at < new Date()) {
            return res.status(400).send({ status: "error", message: "The one-time code has expired. Please request a new code." });
        }
        if (user.otp.used) {
            return res.status(400).send({ status: "error", message: "The one-time code has already been used." });
        }

        const token = await user.generateAuthToken();
        res.send({
            status: "success",
            message: "Authentication successful. You are now logged in.",
            token,
            expires_in: 3600
        });
    } catch (err) {
        console.error("An error occurred", err);
        res.status(400).send(err);
    }
});

// Manual logout
userRouter.post('/logout', (req, res) => {
    // Invalidate the token on the client-side, as mentioned earlier
    res.json({
        status: 'success',
        message: 'You have been logged out successfully.',
    });
});

module.exports = userRouter;
