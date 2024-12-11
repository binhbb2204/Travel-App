import React from 'react';
import { 
  User, 
  Lock, 
  CreditCard, 
  ShieldCheck, 
  Compass 
} from 'lucide-react';
import { motion } from 'framer-motion';

const UserSidebar = ({ 
  activeTab, 
  setActiveTab, 
  variant = 'default',  
  className = ''       
}) => {
  const sidebarItems = [
    { 
      key: 'account', 
      label: 'Profile', 
      icon: <User className="w-5 h-5" />
    },
    { 
      key: 'password', 
      label: 'Security', 
      icon: <Lock className="w-5 h-5" />
    },
    { 
      key: 'transactions', 
      label: 'My Trips', 
      icon: <Compass className="w-5 h-5" />
    },
    { 
      key: 'security', 
      label: 'Account Safety', 
      icon: <ShieldCheck className="w-5 h-5" />
    }
  ];

  // Sidebar style variants
  const variants = {
    default: {
      container: "h-full flex flex-col justify-between p-4 text-white bg-gradient-to-br from-blue-600 to-blue-800",
      activeItem: "bg-white/20 font-semibold",
      hoverItem: "hover:bg-white/10"
    },
    minimal: {
      container: "h-full flex flex-col justify-between p-2 text-gray-700 bg-gray-100",
      activeItem: "bg-blue-100 text-blue-600 font-semibold",
      hoverItem: "hover:bg-gray-200"
    },
    modern: {
      container: "h-full flex flex-col justify-between p-4 text-white bg-gradient-to-tr from-indigo-600 to-purple-600",
      activeItem: "bg-white/30 ring-2 ring-white/20 font-bold",
      hoverItem: "hover:bg-white/10"
    },
    compact: {
      container: "h-full flex flex-col justify-between p-2 text-gray-800 bg-gray-50",
      activeItem: "bg-blue-500 text-white",
      hoverItem: "hover:bg-blue-100"
    }
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <div className={`${currentVariant.container} ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center space-x-3 mb-6">
          <Compass className="w-8 h-8" />
          <h2 className="text-xl font-bold">TravelSync</h2>
        </div>
        
        {sidebarItems.map((item) => (
          <motion.button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              w-full flex items-center space-x-3 p-3 rounded-lg 
              transition-all duration-200 
              ${activeTab === item.key 
                ? currentVariant.activeItem 
                : currentVariant.hoverItem
              }
            `}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </motion.button>
        ))}
      </div>
      
      <div className="text-xs opacity-50 text-center">
        © 2024 TravelSync
      </div>
    </div>
  );
};

export default UserSidebar;