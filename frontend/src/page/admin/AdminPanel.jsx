import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import UsersPanel from "./UsersPanel";
import ToursPanel from './ToursPanel';
import AccommodationsPanel from './AccommodationsPanel';
import OverviewPanel from "./OverviewPanel";
import TransactionsPanel from "./TransactionsPanel";
import { Activity } from 'lucide-react';
import { useUsers } from "./UsersContext";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { clearUsers } = useUsers();

  // Sample data
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 7000 },
    { name: 'Jul', value: 8000 },
    { name: 'Aug', value: 7000 },
    { name: 'Sep', value: 5000 },
    { name: 'Oct', value: 6500 },
    { name: 'Nov', value: 4300 },
    { name: 'Dec', value: 9900 },
  ];

  const stats = {
    totalUsers: 1250,
    activeBookings: 45,
    totalRevenue: 125000,
    pendingBookings: 12,
    growth: 12.5
  };

  const recentBookings = [
    { id: 1, user: "John Doe", tour: "Paris Adventure", status: "Confirmed", amount: 1200, date: "2024-03-20" },
    { id: 2, user: "Jane Smith", tour: "Tokyo Express", status: "Pending", amount: 2300, date: "2024-03-19" },
    { id: 3, user: "Mike Johnson", tour: "Safari Explorer", status: "Confirmed", amount: 3500, date: "2024-03-18" },
    { id: 4, user: "Sarah Williams", tour: "Venice Getaway", status: "Pending", amount: 1800, date: "2024-03-17" }
  ];

  const handleLogout = () => {
    clearUsers();
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPanel stats={stats} revenueData={revenueData} recentBookings={recentBookings} />;
      case 'users':
        return <UsersPanel />;
      case 'tours':
        return <ToursPanel />;
      case 'accommodations':
        return <AccommodationsPanel />;
      case 'transactions':
        return <TransactionsPanel />;
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b bg-gradient-to-r from-white to-gray-50">
              <h2 className="text-lg font-semibold capitalize">{activeTab} Management</h2>
            </div>
            <div className="p-4">
              <div className="h-96 flex items-center justify-center">
                <p className="text-gray-500">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} management interface
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className={`
        p-4 md:p-8 
        ${isMobileMenuOpen ? 'md:ml-64' : 'md:ml-64'}
        transition-all duration-300
      `}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            {/* <p className="text-gray-500 mt-1">Welcome back, Admin</p> */}
          </div>

          {activeTab === 'overview' && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Live Updates</span>
              </div>
            </div>
          )}
        </div>

        {/* Render the active panel */}
        {renderActivePanel()}
      </div>
    </div>
  );
};

export default AdminPanel;

