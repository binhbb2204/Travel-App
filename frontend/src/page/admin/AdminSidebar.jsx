import React from 'react';
import { 
  Users, 
  Plane, 
  Building2, 
  Map, 
  BarChart3,
  CreditCard,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// Define navigation items in a separate array that can be easily modified
const navigationItems = [
  { value: 'overview', icon: BarChart3, label: 'Overview' },
  { value: 'users', icon: Users, label: 'Users' },
  { value: 'tours', icon: Map, label: 'Tours' },
  { value: 'accommodations', icon: Building2, label: 'Accommodations' },
  { value: 'transactions', icon: CreditCard, label: 'Transactions' }
];

const AdminSidebar = ({ activeTab, setActiveTab, onLogout, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden fixed top-4 left-4 z-50 opacity-70 bg-white shadow-md p-2 rounded-full"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
      </button>

      {/* Sidebar for Desktop */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 
        transform transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>

        <nav className="mt-6">
          {navigationItems.map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => {
                setActiveTab(value);
                setIsMobileMenuOpen(false);
              }}
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

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
};

export default AdminSidebar;