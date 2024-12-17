import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Users, Pencil, Edit, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserProfile = ({ userData, setUserData, handleSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const handleSaveChanges = () => {
        handleSave();
        setIsEditing(false);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-6"
        >
            {/* Edit Profile Buttons */}
            <div className="flex justify-end mb-4 relative">
                {!isEditing ? (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 flex items-center font-semibold transition-all"
                    >
                        <Edit className="mr-2 w-5 h-5" /> Edit Profile
                    </motion.button>
                ) : (
                    <div className="flex -space-x-6 md:space-x-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEditing(false)}
                            className="bg-white text-red-600 px-5 py-2.5 rounded-xl hover:bg-red-50 flex items-center font-semibold transition-all"
                        >
                            <X className="mr-2 w-5 h-5 ml-2 md:ml-0" /> Cancel
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSaveChanges}
                            className="bg-white text-green-600 px-5 py-2.5 rounded-xl hover:bg-green-50 flex items-center font-semibold transition-all"
                        >
                            <Save className="mr-2 w-5 h-5" /> Save Changes
                        </motion.button>
                    </div>
                )}
                <AnimatePresence>
                    {showMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full right-0 mt-2 bg-green-100 border border-green-400 text-green-800 text-sm px-4 py-2 rounded shadow-md flex items-center"
                        >
                            <span>Changes saved successfully!</span>
                            <motion.div
                                className="ml-2 w-6 h-1 bg-green-400 rounded-full"
                                initial={{ width: '100%' }}
                                animate={{ width: 0 }}
                                transition={{ duration: 3 }}
                            ></motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4 sm:space-y-6">
                    {/* Username Field */}
                    <motion.div
                        className="bg-blue-50 p-3 sm:p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-sm sm:text-base text-blue-600 mb-1">Username</h3>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <User className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                            <input
                                type="text"
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                className="w-full bg-transparent text-sm sm:text-lg font-medium focus:outline-none border-none"
                                style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                disabled={!isEditing}
                            />
                            {isEditing && <Pencil className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />}
                        </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                        className="bg-blue-50 p-3 sm:p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-sm sm:text-base text-blue-600 mb-1">Email</h3>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Mail className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                            <input
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                className="w-full bg-transparent text-sm sm:text-lg focus:outline-none"
                                style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                disabled={!isEditing}
                            />
                            {isEditing && <Pencil className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />}
                        </div>
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div
                        className="bg-blue-50 p-3 sm:p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-sm sm:text-base text-blue-600 mb-1">Phone Number</h3>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Phone className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                            <input
                                type="tel"
                                value={userData.phone}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                className="w-full bg-transparent text-sm sm:text-lg focus:outline-none"
                                style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                disabled={!isEditing}
                            />
                            {isEditing && <Pencil className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />}
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {/* Date of Birth Field */}
                    <motion.div
                        className="bg-blue-50 p-3 sm:p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-sm sm:text-base text-blue-600 mb-1">Date of Birth</h3>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Calendar className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                            <input
                                type="date"
                                value={userData.birthDate}
                                onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                                className="w-full bg-transparent text-sm sm:text-lg focus:outline-none"
                                style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                disabled={!isEditing}
                            />
                            {isEditing && <Pencil className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />}
                        </div>
                    </motion.div>

                    {/* Gender Field */}
                    <motion.div
                        className="bg-blue-50 p-3 sm:p-4 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-sm sm:text-base text-blue-600 mb-1">Gender</h3>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Users className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                            <select
                                value={userData.gender}
                                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                className="w-full bg-transparent text-sm sm:text-lg focus:outline-none"
                                style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                disabled={!isEditing}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {isEditing && <Pencil className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default UserProfile;
