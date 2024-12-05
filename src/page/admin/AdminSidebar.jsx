import React from 'react';
import { 
  Users, 
  Plane, 
  Building2, 
  Map, 
  BarChart3,
  CreditCard,
  LogOut
} from 'lucide-react';

// Define navigation items in a separate array that can be easily modified
const navigationItems = [
  { value: 'overview', icon: BarChart3, label: 'Overview' },
  { value: 'users', icon: Users, label: 'Users' },
  { value: 'tours', icon: Map, label: 'Tours' },
  { value: 'hotels', icon: Building2, label: 'Hotels' },
  { value: 'transactions', icon: CreditCard, label: 'Transactions' }
];

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-10">
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Panel
        </h2>
      </div>
      
      <nav className="mt-6">
        {navigationItems.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
              activeTab === value 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>

      <button 
        onClick={onLogout}
        className="absolute bottom-6 left-6 flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-bold">Home Screen</span>
      </button>
    </div>
  );
};

export default AdminSidebar;