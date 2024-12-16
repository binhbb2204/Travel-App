import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const UserOTPVerification = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    otp: {
        type: String,

    },
    createdAt: {
        type: Date,
        expires: 600,
    },
    expiresAt: {
        type: Date,
    },
    verified: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("OTP", UserOTPVerification);