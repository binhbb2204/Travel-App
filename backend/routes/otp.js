import express from 'express'
import {sendOTPVerificationEmail, verifyOTP} from '../controllers/userOTPController.js'

const router = express.Router();

router.post('/send', sendOTPVerificationEmail);
router.post('/verify', verifyOTP);

export default router