import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { authService } from "../../data/Service/authService";
import { userService } from '../../data/Service/userService';
import { transactionService } from '../../data/Service/transactionService';
// import UserHeader from './components/UserHeader';
import UserSidebar from './components/UserSidebar';
import UserProfile from "./tabs/UserProfile";
import UserPasswordChange from './tabs/UserPasswordChange';
import UserTransactions from './tabs/UserTransactions';
import UserSecurity from './tabs/UserSecurity';
import ChristmasParallaxBackground from '../../ui/ChristmasParallaxBackground';

const UserSettingsPanel = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
  const [transactions, setTransactions] = useState({ tours: [], accommodations: [] });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    // useEffect(() => {
    //   const fetchTransactionInfo = async () => {
    //     try {
    //       const userId = authService.getCurrentUser().userId;
    //       const transData = await transactionService.getUserTransaction(userId);
    //       const acco = transData.filter((item) => item.type === 'Accommodation');
    //       const tour = transData.filter((item) => item.type === 'Tour');
    //       setTransactions({tour, acco});
    //     } catch (error) {
    //       console.error('Failed to load user transaction:', err);
    //     }
    //   }
    //   fetchTransactionInfo();
    // }, []);

    const fetchTransactionHistory = async () => {
      setLoading(true);
      try {
        const userId = authService.getCurrentUser().userId;
        // const transData = await transactionService.getUserTransaction(userId);
        const transData = await transactionService.getAllTransactions();
        const accommodations = transData.filter((item) => item.type === 'Accommodation' && item.userId === userId);
        const tours = transData.filter((item) => item.type === 'Tour' && item.userId === userId );
        setTransactions({tours, accommodations});
        console.log(userId);
        console.log(transData)
        console.log(transactions)
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
    fetchTransactionHistory();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return <UserProfile userData={userData} setUserData={setUserData}  handleSave={handleSave}/>;
      case 'password':
        return <UserPasswordChange passwordData={passwordData} setPasswordData={setPasswordData} />;
      case 'transactions':
        return <UserTransactions transactions={transactions} />;
      case 'security':
        return <UserSecurity />;
      default:
        return <UserProfile userData={userData} setUserData={setUserData} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center mt-4 justify-center p-4">
      <ChristmasParallaxBackground/>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex relative"
      >
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden absolute top-4 right-4 z-50 bg-white/80 p-2 rounded-full shadow-md"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 768) && (
            <motion.div
              initial={{ width: window.innerWidth < 768 ? 0 : '250px', opacity: window.innerWidth < 768 ? 0 : 1 }}
              animate={{
                width: isSidebarOpen && window.innerWidth < 768 ? '250px' : window.innerWidth >= 768 ? '250px' : 0,
                opacity: 1
              }}
              exit={{ width: 0, opacity: 0 }}
              className=" relative z-40 overflow-hidden"
            >
              {/* Change variant color for sidebar here */}
              <UserSidebar activeTab={activeTab} setActiveTab={handleTabChange} variant="christmas"/>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            renderTabContent()
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserSettingsPanel;