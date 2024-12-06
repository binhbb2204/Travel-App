// user/components/UserHeader.jsx
import React from 'react';
import { CheckCircle, AlertCircle, Edit, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserHeader = ({ activeTab, setActiveTab, isEditing, setIsEditing, handleSave, savedMessage }) => {
  // Set a fixed height for the header
  const headerHeight = 'h-20';

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex justify-between items-center relative ${headerHeight}`}>
      <h2 className="text-3xl font-bold tracking-wide">User Settings</h2>
      <AnimatePresence>
        {savedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute right-6 top-full mt-2 px-4 py-2 rounded-lg flex items-center space-x-2 ${savedMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {savedMessage.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
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
  );
};

export default UserHeader;