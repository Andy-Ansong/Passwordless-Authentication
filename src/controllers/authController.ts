import { Request, Response, NextFunction } from "express";
import User from "@model/User";
import sendOtpEmailService from "../services/emailService";
import errorHandler from "../utils/errorHandler";

// Request one-time code
const requestCode = errorHandler(async (req: Request, res: Response): Promise<Response> => {
    const email: string = req.body.email;
    if (!email) {
        return res.status(400).send({
            status: "error",
            message: "Please enter your email address",
        });
    }
    const user = await User.findOne({ email }).exec();
    if (!user) {
        return res.status(404).send({
            status: "error",
            message: `Account not found`,
        });
    }

    const otp = await user.generateOtp();
    req.session.otp = otp;
    req.session.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    if(user._id)
        req.session.userId = user._id.toString();
    await sendOtpEmailService(user.email, otp);

    return res.status(200).send({
        status: "success",
        otp,
        message: "A one-time code has been sent to your email address.",
    });
});

// Login with one-time code
const login = errorHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).send({
            status: "error",
            message: "Please enter your one-time code",
        });
    }
    if (code.length !== 6) {
        return res.status(400).send({
            status: "error",
            message: "The code must contain exactly 6 digits",
        });
    }

    if (req.session.otp !== code) {
        return res.status(400).send({
            status: "error",
            message: "The code you entered is invalid.",
        });
    }
    if (req.session.otpExpiresAt && req.session.otpExpiresAt < new Date()) {
        return res.status(400).send({
            status: "error",
            message: "Code has expired. Request a new code.",
        });
    }
    const user = await User.findById(req.session.userId).exec();
    if (!user) {
        return res.status(404).send({
            status: "error",
            message: "User not found. Please request a new OTP.",
        });
    }
    const newRefreshToken = await user.generateRefreshToken();
    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // Refresh token expires in 24 hours
    });
    const accessToken = await user.generateAccessToken();

    // Clear OTP session data
    delete req.session.otp;
    delete req.session.otpExpiresAt;
    delete req.session.userId;

    return res.status(200).send({
        status: "success",
        message: "Authentication successful. You are now logged in.",
        accessToken,
        user,
        expires_in: 60 * 60 * 1000, // Access token expires in 1 hour
    });
});

// Logout
const logout = errorHandler(async (req: Request, res: Response): Promise<Response> => {
    res.clearCookie('refreshToken');
    return res.status(200).send({
        status: "success",
        message: 'You have been logged out successfully.',
    });
});

export default {
    requestCode,
    login,
    logout,
};
