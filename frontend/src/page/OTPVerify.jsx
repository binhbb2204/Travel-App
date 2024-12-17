import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Form } from 'reactstrap';
import { otpService } from '../data/Service/otpService';
import ChristmasParallaxBackground from "../ui/ChristmasParallaxBackground";
import { Gift } from 'lucide-react';

const OTPVerify = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
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
            setSuccess(response.message);

            setTimeout(() => {
                navigate('/home');
            }, 1500);
        } catch (error) {
            setError(error.response?.data.message || 'OTP verification failed. Please try again.');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <ChristmasParallaxBackground />
            <div className="absolute inset-0 flex items-center justify-center">
                <Form onSubmit={handleOtpSubmit} className="bg-white p-6 rounded shadow-md z-10">
                    <h2 className="text-lg font-bold mb-4">OTP Verification</h2>
                    {error && <Alert color="danger">{error}</Alert>}
                    {success && <Alert color="success">{success}</Alert>}

                    <input
                        type="text"
                        placeholder="Enter OTP code here..."
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        required
                    />

                    <button
                        type="submit"
                        className="flex items-center justify-center w-full p-2 rounded text-white transition-all duration-300"
                        style={{
                            background: 'linear-gradient(90deg, #4c6ef5, #007bff)',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            border: 'none',
                            minHeight: '50px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(90deg, #3a5bc9, #0062cc)'; 
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(90deg, #4c6ef5, #007bff)'; 
                        }}
                    >
                        <span className="flex items-center font-bold">
                            Verify
                            <Gift className="ml-2" size={20} />
                        </span>
                    </button>

                </Form>
            </div>
        </div>
    );
};

export default OTPVerify;