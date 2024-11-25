import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiUsers,
    FiBox,
    FiShoppingBag,
    FiDollarSign,
    FiSettings,
    FiLogOut
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../styles/adminpanel.css';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const navigate = useNavigate();

    const dashboardStats = {
        totalUsers: 1234,
        totalProducts: 567,
        totalOrders: 89,
        revenue: 12345.67
    };

    const recentOrders = [
        { id: 1, customer: 'Adolf Hitler', product: 'Historical City Tour', amount: 59.99, status: 'Completed' },
        { id: 2, customer: 'Donald Trump', product: 'Cultural Experience', amount: 129.99, status: 'Pending' },
        { id: 3, customer: 'Binh Chan', product: 'Coastal Hike', amount: 89.99, status: 'Processing' }
    ];

    const handleMenuClick = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        // Perform any necessary logout operations here (like clearing tokens)
        navigate('/');
    };

    return (
        <div className={`admin-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            {/* Sidebar */}
            <nav className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>{isSidebarCollapsed ? 'A' : 'Admin Panel'}</h2>
                    <button
                        className="collapse-btn"
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    >
                        {isSidebarCollapsed ? '→' : '←'}
                    </button>
                </div>

                <div className="sidebar-menu">
                    <motion.button
                        className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('dashboard')}
                        whileHover={{ scale: 1.05, backgroundColor: '#3333ff' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiBox /> {!isSidebarCollapsed && 'Dashboard'}
                    </motion.button>
                    <motion.button
                        className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('users')}
                        whileHover={{ scale: 1.05, backgroundColor: '#3333ff' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiUsers /> {!isSidebarCollapsed && 'Users'}
                    </motion.button>
                    <motion.button
                        className={`menu-item ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('products')}
                        whileHover={{ scale: 1.05, backgroundColor: '#3333ff' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiShoppingBag /> {!isSidebarCollapsed && 'Products'}
                    </motion.button>
                    <motion.button
                        className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('settings')}
                        whileHover={{ scale: 1.05, backgroundColor: '#3333ff' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiSettings /> {!isSidebarCollapsed && 'Settings'}
                    </motion.button>
                </div>

                <motion.button
                    className="logout-btn"
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05, backgroundColor: '#c0c0c0' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiLogOut /> {!isSidebarCollapsed && 'Logout'}
                </motion.button>
            </nav>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                    <div className="admin-profile">
                        <span>Admin</span>
                        <img src="https://via.placeholder.com/40" alt="Admin" />
                    </div>
                </header>

                <div className="admin-content">
                    {activeTab === 'dashboard' && (
                        <div>
                            <div className="stats-grid">
                                <motion.div
                                    className="stat-card"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <FiUsers className="stat-icon" />
                                    <div className="stat-details">
                                        <h3>Total Users</h3>
                                        <p>{dashboardStats.totalUsers}</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="stat-card"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <FiBox className="stat-icon" />
                                    <div className="stat-details">
                                        <h3>Number of Processed Tours</h3>
                                        <p>{dashboardStats.totalProducts}</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="stat-card"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <FiShoppingBag className="stat-icon" />
                                    <div className="stat-details">
                                        <h3>Number of Successful Tours</h3>
                                        <p>{dashboardStats.totalOrders}</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="stat-card"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <FiDollarSign className="stat-icon" />
                                    <div className="stat-details">
                                        <h3>Revenue</h3>
                                        <p>${dashboardStats.revenue.toLocaleString()}</p>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="recent-orders">
                                <h2>Recent Transactions from Users</h2>
                                <div className="orders-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Tour ID</th>
                                                <th>Customer Name</th>
                                                <th>Tour Name</th>
                                                <th>Amount of Transaction</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentOrders.map(order => (
                                                <tr key={order.id}>
                                                    <td>#{order.id}</td>
                                                    <td>{order.customer}</td>
                                                    <td>{order.product}</td>
                                                    <td>${order.amount}</td>
                                                    <td>
                                                        <span className={`status ${order.status.toLowerCase()}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Add other tabs (Users, Products, Settings) content here */}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
