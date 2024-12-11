import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const UserPasswordChange = ({ passwordData, setPasswordData }) => {
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const passwordFields = [
        {
            key: 'currentPassword',
            placeholder: 'Current Password',
            type: 'current'
        },
        {
            key: 'newPassword',
            placeholder: 'New Password',
            type: 'new'
        },
        {
            key: 'confirmPassword',
            placeholder: 'Confirm New Password',
            type: 'confirm'
        }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-6 space-y-4"
        >
            {passwordFields.map((field) => (
                <motion.div 
                    key={field.key}
                    className="flex items-center space-x-2 md:space-x-3 w-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Lock className="text-blue-600 w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
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
        </motion.div>
    );
};

export default UserPasswordChange;