// user/tabs/UserOverview.jsx
import React from 'react';
import { User, Mail, Phone, Calendar, Users, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';

const UserOverview = ({ userData, isEditing, setUserData }) => (
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

export default UserOverview;