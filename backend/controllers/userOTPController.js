import UserOTPVerification from "../Models/UserOTPVerification.js";
import User from "../Models/User.js";
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'
// import img from '../../frontend/src/images/TAB.gif'
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
})

const generatedOTP = () => {
    return `${Math.floor(100000 + Math.random() * 900000)}`;
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
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            <h1 style="margin: 0; font-size: 24px;">Email Verification</h1>
                        </div>
                        
                        <div style="background-color: white; padding: 20px; text-align: center;">
                            <img src="../../frontend/src/images/TAB.gif" alt="Security Icon" style="width: 100px; height: 100px; margin-bottom: 20px;">
                            
                            <h2 style="color: #333;">Two-Factor Authentication</h2>
                            <p style="color: #666; margin-bottom: 20px;">To ensure the security of your account, please use the verification code below:</p>
                            
                            <h1 style="background-color: #f0f0f0; padding: 15px; text-align: center; letter-spacing: 5px; color: #007bff; border-radius: 5px; font-size: 28px;">
                                ${otp}
                            </h1>
                            
                            <p style="color: #999; margin-top: 20px;">
                                <strong>Important:</strong> This code will expire in 10 minutes. 
                                Do not share this code with anyone.
                            </p>
                        </div>
                        
                        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; color: #666; font-size: 12px;">
                            <p style="margin: 0;">© 2024 TAB Travel | Security Verification</p>
                            <p style="margin: 5px 0 0; font-size: 10px;">If you did not request this code, please ignore this email or contact support.</p>
                        </div>
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