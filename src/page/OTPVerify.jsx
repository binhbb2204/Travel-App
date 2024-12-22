import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Alert, Form } from 'reactstrap';
import { otpService } from '../data/Service/otpService';
import ChristmasParallaxBackground from "../ui/ChristmasParallaxBackground";
import { Gift, AlertTriangle, ShieldCheck } from 'lucide-react';

const OTPVerify = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const location = useLocation();

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await otpService.verifyOTP(userId, otp);
            
            if (!response.success) {
                throw new Error(response.error || 'OTP verification failed');
            }
            setSuccess(response.message);
            localStorage.setItem('otpVerified', 'true');
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        } catch (error) {
            setError(error.response?.data.message || 'OTP verification failed. Please try again.');
            setOtp('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4 relative overflow-hidden">
            <ChristmasParallaxBackground />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md z-10 border-4 border-blue-300"
            >
                <div className="text-center mb-6">
                    <div className="flex justify-center items-center mb-4">
                        <Gift className="text-blue-600 mr-2" size={40} />
                        <h1 className="text-3xl font-bold text-blue-800">OTP Verification</h1>
                    </div>
                    <p className="text-blue-600">One more step to secure your account!</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <Alert color="danger" className="mb-4 flex items-center">
                        <AlertTriangle className="mr-2 text-red-600" size={20} />
                        {error}
                    </Alert>
                )}

                {/* Success Alert */}
                {success && (
                    <Alert color="success" className="mb-4 flex items-center">
                        <ShieldCheck className="mr-2 text-green-600" size={20} />
                        {success}
                    </Alert>
                )}

                <Form onSubmit={handleOtpSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <ShieldCheck className="text-blue-500" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                            <Gift className="ml-2" size={20} />
                        </button>
                    </div>
                </Form>
            </motion.div>
        </div>
    );
};

export default OTPVerify;