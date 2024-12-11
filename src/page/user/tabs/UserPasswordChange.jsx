import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { userService } from '../../../data/Service/userService';
import { authService } from '../../../data/Service/authService';

const UserPasswordChange = () => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const [error, setError] = useState(null);
    const [savedMessage, setSavedMessage] = useState(null);

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSavePassword = async () => {
        setError(null);
        setSavedMessage(null);

        // Validation checks
        if (!passwordData.currentPassword) {
            setError('Current password is required.');
            return;
        }

        if (!passwordData.newPassword) {
            setError('New password is required.');
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New password and confirmation do not match.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(passwordData.newPassword)) {
            setError('Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.');
            return;
        }

        try {
            const userId = authService.getCurrentUser().userId;

            await userService.updateUserPassword(userId, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });

            // Success handling
            setSavedMessage({
                type: 'success',
                text: 'Password updated successfully!'
            });

            // Reset form
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (err) {
            // Error handling
            const errorMessage = err.response?.data.message || 'Failed to update password.';
            setError(errorMessage);
        }
    };

    const passwordFields = [
        {
            key: 'currentPassword',
            placeholder: 'Current Password',
            type: 'current',
            icon: Lock
        },
        {
            key: 'newPassword',
            placeholder: 'New Password',
            type: 'new',
            icon: RefreshCw
        },
        {
            key: 'confirmPassword',
            placeholder: 'Confirm New Password',
            type: 'confirm',
            icon: ShieldCheck
        }
    ];

    useEffect(() => {
        let timer;
        if (error) {
            timer = setTimeout(() => setError(null), 1500); // 1.5 seconds 
        }
        if (savedMessage) {
            timer = setTimeout(() => setSavedMessage(null), 1500); // 1.5 seconds 
        }

        return () => clearTimeout(timer); 
    }, [error, savedMessage]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-6 space-y-[2.16rem]"
        >
            {/* Error Message */}
            {error && (
                <div className="bg-red-50 p-3 rounded-lg flex items-center space-x-3 mb-4">
                    <AlertTriangle className="text-red-600 w-5 h-5" />
                    <p className="text-sm text-red-800">{error}</p>
                </div>
            )}

            {/* Success Message */}
            {savedMessage && (
                <div className="bg-green-50 p-3 rounded-lg flex items-center space-x-3 mb-4">
                    <ShieldCheck className="text-green-600 w-5 h-5" />
                    <p className="text-sm text-green-800">{savedMessage.text}</p>
                </div>
            )}

            {/* Edit Profile Buttons */}
            <div className="flex justify-end mb-4 relative">
                <motion.button
                    onClick={handleSavePassword}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 flex items-center font-semibold transition-all"
                >
                    <ShieldCheck className="mr-2 w-5 h-5" /> Update Password
                </motion.button>
            </div>

            {passwordFields.map((field) => (
                <motion.div
                    key={field.key}
                    className="flex items-center space-x-2 md:space-x-3 w-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <field.icon className="text-blue-600 w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                    <div className="relative w-full">
                        <input
                            type={showPasswords[field.key] ? 'text' : 'password'}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2 text-sm md:text-base border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={passwordData[field.key]}
                            onChange={(e) => setPasswordData({
                                ...passwordData,
                                [field.key]: e.target.value
                            })}
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => togglePasswordVisibility(field.key)}
                        >
                            {showPasswords[field.key] ?
                                <EyeOff className="text-blue-600 w-4 h-4 md:w-5 md:h-5" /> :
                                <Eye className="text-blue-600 w-4 h-4 md:w-5 md:h-5" />
                            }
                        </button>
                    </div>
                </motion.div>
            ))}

            {/* Additional Password Security Information */}
            <div className="bg-blue-50 p-3 rounded-lg flex items-center space-x-3">
                <AlertTriangle className="text-yellow-600 w-5 h-5" />
                <p className="text-sm text-blue-800">
                    Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and symbols.
                </p>
            </div>
        </motion.div>
    );
};

export default UserPasswordChange;