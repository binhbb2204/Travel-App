import React, { useState } from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const UserSecurity = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [loginActivityExpanded, setLoginActivityExpanded] = useState(false);

    const securityOptions = [
        {
            icon: <Shield className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />,
            title: 'Two-Factor Authentication',
            type: 'toggle',
            state: twoFactorEnabled,
            onToggle: () => setTwoFactorEnabled(!twoFactorEnabled)
        },
        {
            icon: <Shield className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />,
            title: 'Login Activity',
            type: 'button',
            buttonText: 'View Recent',
            onClick: () => setLoginActivityExpanded(!loginActivityExpanded)
        }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-6 space-y-4"
        >
            {securityOptions.map((option, index) => (
                <motion.div 
                    key={option.title}
                    className="bg-blue-50 p-3 md:p-4 rounded-lg shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 md:space-x-3">
                            {option.icon}
                            <span className="text-sm md:text-base">{option.title}</span>
                        </div>
                        {option.type === 'toggle' && (
                            <div 
                                className={`relative inline-block w-10 md:w-12 select-none cursor-pointer`}
                                onClick={option.onToggle}
                            >
                                <div 
                                    className={`toggle-track h-5 md:h-6 rounded-full transition-colors duration-300 ${
                                        option.state ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                                >
                                    <div 
                                        className={`toggle-thumb absolute top-0.5 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                            option.state ? 'translate-x-5 md:translate-x-6' : 'translate-x-0.5'
                                        }`}
                                    />
                                </div>
                            </div>
                        )}
                        {option.type === 'button' && (
                            <button 
                                className="bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm hover:bg-blue-700 flex items-center"
                                onClick={option.onClick}
                            >
                                {option.buttonText}
                                <ChevronRight className="ml-1 w-4 h-4" />
                            </button>
                        )}
                    </div>
                    {loginActivityExpanded && option.type === 'button' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 bg-white p-3 rounded-lg"
                        >
                            <p className="text-sm text-gray-600">
                                Recent login activities will be displayed here.
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default UserSecurity;