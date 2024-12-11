// This class is for referencing, don't delete it yet
import React, { useEffect, useState } from 'react';
import {
  User,
  Lock,
  CreditCard,
  Shield,
  Edit,
  Save,
  X,
  Calendar,
  Phone,
  Mail,
  Users,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Pencil
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { authService } from "../../../data/Service/authService";
import { userService } from '../../../data/Service/userService';

const UserSettingsPanel = () => {
  // const [newUsername, setNewUsername] = useState(username);
  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    birthDate: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [transactions, setTransactions] = useState({
    tours: [],
    accommodations: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const userId = authService.getCurrentUser().userId;
        const userData = await userService.getSingleUser(userId);
        setUserData({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          gender: userData.gender || '',
          birthDate: userData.birthDate || '',
        });
      } catch (err) {
        console.error('Failed to load user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactionHistory = async () => {
      setLoading(true);
      try {
        const userId = authService.getCurrentUser().userId;
        const transactionsData = await userService.getTransactionHistory(userId);
        setTransactions(transactionsData);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
    fetchTransactionHistory();
  }, []);

  const handleSave = async () => {
    setIsEditing(false);
    setSavedMessage(null);

    try {
      const userId = authService.getCurrentUser().userId;
      await userService.updateUserProfile(userId, userData);

      setSavedMessage({
        type: 'success',
        text: 'Profile updated successfully!',
      });
      setTimeout(() => {
        setSavedMessage(null);
      }, 3000);
    } catch (err) {
      const errorMessage = err.response?.data.message || 'Failed to update user information.';
      setError(errorMessage);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleSavePassword = async () => {
    // For debugging
    console.log("Save Password Clicked");
    try {
      const userId = authService.getCurrentUser().userId;
      const token = authService.getCurrentUser().token;

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError('New password and confirmation do not match.');
        return;
      }

      await userService.updateUserPassword(userId, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setSavedMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      const errorMessage = err.response?.data.message || 'Failed to update password.';
      setError(errorMessage);
    }
  };

  // Render functions
  const renderAccountInfo = () => (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <motion.div className="flex flex-col bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500 }} className="text-blue-600 mb-1">Username</h3>
          <div className="flex items-center space-x-4">
            <User className="text-blue-600 w-6 h-6" />
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="w-full bg-transparent text-lg font-medium focus:outline-none"
              disabled={!isEditing}
            />
            {isEditing && <Pencil className="text-blue-600 w-5 h-5" />}
          </div>
        </motion.div>

        <motion.div className="flex flex-col bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500 }} className="text-blue-600 mb-1">Email</h3>
          <div className="flex items-center space-x-4">
            <Mail className="text-blue-600 w-6 h-6" />
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="w-full bg-transparent text-lg focus:outline-none"
              disabled={!isEditing}
            />
            {isEditing && <Pencil className="text-blue-600 w-5 h-5" />}
          </div>
        </motion.div>

        <motion.div className="flex flex-col bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500 }} className="text-blue-600 mb-1">Phone Number</h3>
          <div className="flex items-center space-x-4">
            <Phone className="text-blue-600 w-6 h-6" />
            <input
              type="tel"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              className="w-full bg-transparent text-lg focus:outline-none"
              disabled={!isEditing}
            />
            {isEditing && <Pencil className="text-blue-600 w-5 h-5" />}
          </div>
        </motion.div>
      </div>

      <div className="space-y-6">
        <motion.div className="flex flex-col bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500 }} className="text-blue-600 mb-1">Date of Birth</h3>
          <div className="flex items-center space-x-4">
            <Calendar className="text-blue-600 w-6 h-6" />
            <input
              type="date"
              value={userData.birthDate}
              onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
              className="w-full bg-transparent text-lg focus:outline-none"
              disabled={!isEditing}
            />
            {isEditing && <Pencil className="text-blue-600 w-5 h-5" />}
          </div>
        </motion.div>

        <motion.div className="flex flex-col bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500 }} className="text-blue-600 mb-1">Gender</h3>
          <div className="flex items-center space-x-4">
            <Users className="text-blue-600 w-6 h-6" />
            <select
              value={userData.gender}
              onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
              className="w-full bg-transparent text-lg focus:outline-none"
              disabled={!isEditing}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {isEditing && <Pencil className="text-blue-600 w-5 h-5" />}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderPasswordChange = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Lock className="text-blue-600" />
        <input
          type={showCurrentPassword ? "text" : "password"}
          placeholder="Current Password"
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={passwordData.currentPassword}
          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
        />
        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
          {showCurrentPassword ? <EyeOff className="text-blue-600" /> : <Eye className="text-blue-600" />}
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <Lock className="text-blue-600" />
        <input
          type={showNewPassword ? "text" : "password"}
          placeholder="New Password"
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        />
        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
          {showNewPassword ? <EyeOff className="text-blue-600" /> : <Eye className="text-blue-600" />}
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <Lock className="text-blue-600" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={passwordData.confirmPassword}
          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
        />
        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <EyeOff className="text-blue-600" /> : <Eye className="text-blue-600" />}
        </button>
      </div>
      <div>
        <button
          onClick={handleSavePassword}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save New Password
        </button>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
          <CreditCard className="mr-2" /> Tour Bookings
        </h3>
        {transactions.tours.map((tour) => (
          <div key={tour.id} className="border-b py-2 last:border-b-0">
            <p className="font-medium">{tour.name}</p>
            <div className="text-sm text-gray-600 flex justify-between">
              <span>{tour.date}</span>
              <span className="font-semibold">{tour.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
          <CreditCard className="mr-2" /> Accommodation Bookings
        </h3>
        {transactions.accommodations.map((accommodation) => (
          <div key={accommodation.id} className="border-b py-2 last:border-b-0">
            <p className="font-medium">{accommodation.name}</p>
            <div className="text-sm text-gray-600 flex justify-between">
              <span>{accommodation.checkIn} - {accommodation.checkOut}</span>
              <span className="font-semibold">{accommodation.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          renderAccountInfo()
          // <div className="min-h-[359px]">
          //   {renderAccountInfo()}
          // </div>
        );
      case 'password':
        return (
          <div className="min-h-[359px]">
            {renderPasswordChange()}
          </div>
        );
      case 'transactions':
        return (
          <div className="min-h-[359px]">
            {renderTransactions()}
          </div>
        );
      case 'security':
        return (
          <div className="min-h-[359px]">
            {renderSecuritySettings()}
          </div>
        );
      default:
        return (
          <div className="min-h-[359px]">
            {renderAccountInfo()}
          </div>
        );
    }
  };

  const headerHeight = 'h-20';

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex items-center justify-center p-4 lg:p-8 mt-0 md:mt-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex justify-between items-center relative ${headerHeight}`}>
          <h2 className="text-3xl font-bold tracking-wide">User Settings</h2>
          <AnimatePresence>
            {savedMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`absolute right-6 top-full mt-2 px-4 py-2 rounded-lg flex items-center space-x-2 ${savedMessage.type === 'success'
                  ? 'bg-green-500'
                  : 'bg-red-500'
                  }`}
              >
                {savedMessage.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>{savedMessage.text}</span>
              </motion.div>
            )}
          </AnimatePresence>
          {activeTab === 'account' && (
            <div className="space-x-3">
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-blue-600 px-5 py-2.5 rounded-xl hover:bg-blue-50 flex items-center font-semibold transition-all"
                >
                  <Edit className="mr-2 w-5 h-5" /> Edit Profile
                </motion.button>
              ) : (
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(false)}
                    className="bg-white text-red-600 px-5 py-2.5 rounded-xl hover:bg-red-50 flex items-center font-semibold transition-all"
                  >
                    <X className="mr-2 w-5 h-5" /> Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="bg-white text-green-600 px-5 py-2.5 rounded-xl hover:bg-green-50 flex items-center font-semibold transition-all"
                  >
                    <Save className="mr-2 w-5 h-5" /> Save Changes
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-72 bg-blue-50 p-4 space-y-3">
            {[
              { icon: User, label: 'Overview', value: 'account' },
              { icon: Lock, label: 'Change Password', value: 'password' },
              { icon: CreditCard, label: 'Transactions', value: 'transactions' },
              { icon: Shield, label: 'Security', value: 'security' }
            ].map((tab) => (
              <motion.button
                key={tab.value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.value)}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 transition-all duration-300 ${activeTab === tab.value
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'hover:bg-blue-100 text-blue-800 hover:shadow-md'
                  }`}
              >
                <tab.icon className="w-6 h-6" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>
          <div className="flex-1 p-8">
            {renderTabContent()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSettingsPanel;