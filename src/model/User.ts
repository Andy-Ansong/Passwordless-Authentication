import { Schema, model, Document, Types } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import CustomError from "@/utils/customError"; // Adjust path if necessary

// Define the interface for the User document
export interface IUser extends Document {
    name?: string;
    email: string;
    role?: "employee" | "hr" | "admin";
    generateRefreshToken(): Promise<string>;
    generateAccessToken(): Promise<string>;
    generateOtp(): Promise<number | CustomError>;
}

// Define the schema
const userSchema = new Schema<IUser>({
    name: {
        type: String,
    },
    email: {
        required: [true, "Please enter your email to continue."],
        unique: true,
        type: String,
        validate: (value: string) => {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email");
            }
        },
    },
    role: {
        type: String,
        enum: ['employee', 'hr', 'admin'],
    },
});

// Method to generate refresh token
userSchema.methods.generateRefreshToken = async function (): Promise<string> {
    const user = this;
    const options = {
        expiresIn: '1d',
    };
    const token = jwt.sign({ _id: user._id }, process.env.REFRESH_KEY as string, options);
    return token;
};

// Method to generate access token
userSchema.methods.generateAccessToken = async function (): Promise<string> {
    const user = this;
    const options = {
        expiresIn: '1h',
    };
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY as string, options);
    await user.save();
    return token;
};

// Method to generate OTP
userSchema.methods.generateOtp = async function (): Promise<number | CustomError> {
    try {
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        return otpCode;
    } catch (error) {
        return new CustomError("Unable to generate OTP", 500);
    }
};

// Create the User model using the schema
const User = model<IUser>("User", userSchema);

export default User;
