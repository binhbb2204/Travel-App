import axios from "axios";

const getBaseUrl = () => {
    // If running on localhost
    if (window.location.hostname === 'localhost') {
        return 'http://localhost:8000/api/v1/otp';
    }

    // For mobile/other networks, use current host
    return `${window.location.protocol}//${window.location.hostname}:8000/api/v1/otp`
};
const BASE_URL = getBaseUrl();

export const otpService = {
    sendOTPVerificationEmail: async (email, userId) => {
        try {
            const response = await axios.post(`${BASE_URL}/send`, {email, userId});
            return {
                success: true,
                data: response.data,
                message: response.data.message || "OTP sent successfully"
            };
        } catch (error) {
            console.error('Error creating otp:', error);
            throw error;
        }
    },

    verifyOTP: async (userId, otp) => {
        try {
            const response = await axios.post(`${BASE_URL}/verify`, {
                userId,
                otp
            });

            if (!response.data.status) {
                throw new Error(response.data.message || "OTP verification failed");
            }

            return {
                success: true,
                data: response.data,
                message: response.data.message || "OTP verified successfully"
            }
        } catch (error) {
            console.log("OTP verify error", error)

            return {
                success: false,
                error: error.response?.data?.message || error.message || "Failed to verify OTP",
                status: error.response?.status
            };
        }
    },

    isOTPSent: (result) => {
        return result.success && result.data?.status === "PENDING";
    }
}