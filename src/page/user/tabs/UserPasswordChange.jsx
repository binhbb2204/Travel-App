// user/tabs/UserPasswordChange.jsx
import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const UserPasswordChange = ({ passwordData, setPasswordData }) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="space-y-4">
            {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
                <div className="flex items-center space-x-3" key={field}>
                    <Lock className="text-blue-600" />
                    <input
                        type={field === 'currentPassword' ? (showCurrentPassword ? 'text' : 'password') : (showNewPassword ? 'text' : 'password')}
                        placeholder={field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm New Password'}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        value={passwordData[field]}
                        onChange={(e) => setPasswordData({ ...passwordData, [field]: e.target.value })}
                    />
                    <button type="button" onClick={() => {
                        if (field === 'currentPassword') setShowCurrentPassword(!showCurrentPassword);
                        if (field === 'newPassword') setShowNewPassword(!showNewPassword);
                        if (field === 'confirmPassword') setShowConfirmPassword(!showConfirmPassword);
                    }}>
                        {field === 'currentPassword' && (showCurrentPassword ? <EyeOff className="text-blue-600" /> : <Eye className="text-blue-600" />)}
                        {field === 'newPassword' && (showNewPassword ? <EyeOff className="text-blue-600" /> : <Eye className="text-blue-600" />)}
                        {field === 'confirmPassword' && (showConfirmPassword ? <EyeOff className="text-blue-600" /> : <Eye className="text-blue-600" />)}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UserPasswordChange;