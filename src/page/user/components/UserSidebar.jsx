// user/components/UserSidebar.jsx
import React from 'react';
import { User, Lock, CreditCard, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const UserSidebar = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { icon: User, label: 'Overview', value: 'account' },
        { icon: Lock, label: 'Change Password', value: 'password' },
        { icon: CreditCard, label: 'Transactions', value: 'transactions' },
        { icon: Shield, label: 'Security', value: 'security' }
    ];

    return (
        <div className="md:w-72 bg-blue-50 p-4 space-y-3">
            {tabs.map((tab) => (
                <motion.button
                    key={tab.value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab(tab.value)}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 transition-all duration-300 ${activeTab === tab.value ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-blue-100 text-blue-800 hover:shadow-md'}`}
                >
                    <tab.icon className="w-6 h-6" />
                    <span className="font-medium">{tab.label}</span>
                </motion.button>
            ))}
        </div>
    );
};

export default UserSidebar;