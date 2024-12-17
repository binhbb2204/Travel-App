import UserOTPVerification from "../Models/UserOTPVerification.js";
import User from "../Models/User.js";
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
})

const generatedOTP = () => {
    return `${Math.floor(1000 + Math.random() * 9000)}`;
}

export const sendOTPVerificationEmail = async (req, res) => {
    try {
        const { email, userId } = req.body;

        const existingUser = await User.findById(userId);

        if(!existingUser){
            return res.status(404).json({
                status: false,
                message: "User not found"
            })
        }

        const otp = generatedOTP();

        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Two-Factor Authentication</h2>
                    <p>Your verification code is:</p>
                    <h1 style="background-color: #f0f0f0; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h1>
                    <p>This code will expire in 10 minutes.</p>
                </div>
                `
        }
        
        const newOTPVerification = new UserOTPVerification({
            userId,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000

        })
        
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            status: "PENDING",
            message: "Verification OTP email sent",
            data: {
                userId,
                email
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: error.message,
        })
    }
}

export const verifyOTP = async(req, res) => {
    try {
        const { userId, otp } = req.body;

        const otpRecord = await UserOTPVerification.findOne({userId});

        if(!otpRecord){
            return res.status(400).json({
                status: false,
                message: "OTP verification record not found"
            })
        }

        const {otp: hashedOTP} = otpRecord;
        const isValid = await bcrypt.compare(otp, hashedOTP);

        if(!isValid){
            return res.status(400).json({
                status: false,
                message: "Invalid OTP"
            })
        }

        await User.findByIdAndUpdate(userId, {verified: true});

        await UserOTPVerification.deleteOne({userId});

        res.status(200).json({
            status: true,
            message: "Email verified successfully!"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}