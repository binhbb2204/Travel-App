// user/tabs/UserSecurity.jsx
import React from 'react';
import { Shield } from 'lucide-react';

const UserSecurity = () => (
    <div className="space-y-4">
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
                <Shield className="text-blue-600" />
                <span>Two-Factor Authentication</span>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                    type="checkbox"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" />
            </div>
        </div>
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
                <Shield className="text-blue-600" />
                <span>Login Activity</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                View Recent
            </button>
        </div>
    </div>
);

export default UserSecurity;