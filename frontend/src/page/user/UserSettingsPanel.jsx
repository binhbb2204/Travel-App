// user/UserSettingsPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authService } from "../../data/Service/authService";
import UserHeader from './components/UserHeader';
import UserSidebar from './components/UserSidebar';
import UserOverview from './tabs/UserOverview';
import UserPasswordChange from './tabs/UserPasswordChange';
import UserTransactions from './tabs/UserTransactions';
import UserSecurity from './tabs/UserSecurity';

const UserSettingsPanel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const userId = authService.getCurrentUser().userId;
        const token = authService.getCurrentUser().token;
        const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserData({
          name: response.data.data.name,
          email: response.data.data.email,
          phone: response.data.data.phone,
          gender: response.data.data.gender || '',
          birthDate: response.data.data.birthDate || '',
        });
      } catch (err) {
        console.error('Error fetching user information:', err);
        setError('Failed to fetch user information.');
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactionHistory = async () => {
      setLoading(true);
      try {
        const userId = authService.getCurrentUser().userId;
        const token = authService.getCurrentUser().token;
        const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}/transactions`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setTransactions(response.data.data);
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
      const token = authService.getCurrentUser().token;
      const response = await axios.put(`http://localhost:8000/api/v1/users/${userId}`, userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
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

    // setUsername(newUsername);
    // localStorage.setItem('username', newUsername);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="min-h-[360px]">
            <UserOverview userData={userData} isEditing={isEditing} setUserData={setUserData} />
          </div>
        );
      case 'password':
        return (
          <div className="min-h-[360px]">
            <UserPasswordChange passwordData={passwordData} setPasswordData={setPasswordData} />
          </div>
        );
      case 'transactions':
        return (
          <div className="min-h-[359px]">
            <UserTransactions transactions={transactions} />
          </div>
        );
      case 'security':
        return (
          <div className="min-h-[359px]">
            <UserSecurity />
          </div>
        );
      default:
        return (
          <div className="min-h-[360px]">
            <UserOverview userData={userData} isEditing={isEditing} setUserData={setUserData} />
          </div>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex items-center justify-center p-4 lg:p-8">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden">
        <UserHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSave={handleSave}
          savedMessage={savedMessage}
        />
        <div className="flex flex-col md:flex-row">
          <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPanel;