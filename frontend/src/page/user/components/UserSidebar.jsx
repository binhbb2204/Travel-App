import React from 'react';
import {
  User,
  Lock,
  CreditCard,
  ShieldCheck,
  Compass,
  TreePine,
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
      label: 'Transactions',
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
    },
    christmas: {
      container: "h-full flex flex-col justify-between p-4 text-white bg-gradient-to-br from-cyan-500 via-blue-300 to-cyan-300",
      activeItem: "bg-white/30 ring-2 ring-white/30 font-bold text-white",
      hoverItem: "hover:bg-white/10"
    },
    gradient: {
      container: "h-full flex flex-col justify-between p-4 text-white bg-gradient-to-r from-green-400 to-blue-500",
      activeItem: "bg-white/30 font-semibold",
      hoverItem: "hover:bg-white/20"
    },
    dark: {
      container: "h-full flex flex-col justify-between p-4 text-gray-200 bg-gray-800",
      activeItem: "bg-gray-700 font-semibold",
      hoverItem: "hover:bg-gray-600"
    },
    light: {
      container: "h-full flex flex-col justify-between p-4 text-gray-800 bg-white",
      activeItem: "bg-gray-200 font-semibold",
      hoverItem: "hover:bg-gray-100"
    },
    business: {
      container: "h-full flex flex-col justify-between p-4 text-gray-900 bg-gray-200",
      activeItem: "bg-blue-500 text-white font-semibold",
      hoverItem: "hover:bg-blue-400"
    },
    retro: {
      container: "h-full flex flex-col justify-between p-4 text-white bg-gradient-to-r from-pink-500 to-yellow-500",
      activeItem: "bg-white/30 font-semibold",
      hoverItem: "hover:bg-white/10"
    },
    ocean: {
      container: "h-full flex flex-col justify-between p-4 text-white bg-gradient-to-br from-blue-400 to-teal-400",
      activeItem: "bg-white/20 font-semibold",
      hoverItem: "hover:bg-white/10"
    }
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <div className={`
      ${currentVariant.container} 
      ${className} 
      h-full 
      w-full 
      flex flex-col
      relative
      overflow-hidden
    `}>
      {/* Snowflake decorations */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/50 rounded-full opacity-50"
            style={{
              width: `${Math.random() * 4}px`,
              height: `${Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 5}s`,
              animationName: 'fall',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear'
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fall {
          from { transform: translateY(-10%); }
          to { transform: translateY(120vh) rotate(360deg); }
        }
      `}</style>

      <div className="flex items-center space-x-3 mb-6 relative z-10">
        <TreePine className="w-8 h-8 text-white" />
        <h2 className="text-xl font-bold">Settings</h2>
      </div>

      <div className="flex-grow space-y-2 relative z-10">
        {sidebarItems.map((item) => (
          <motion.button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              w-full flex items-center space-x-3 p-3 rounded-lg
              transition-all duration-200 
              h-12 
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

      <div className="text-xs opacity-50 text-center mt-auto pb-4 relative z-10">
        © 2024 TAB Travel Corp. ❄️🎄✈️
      </div>
    </div>
  );
};

export default UserSidebar;