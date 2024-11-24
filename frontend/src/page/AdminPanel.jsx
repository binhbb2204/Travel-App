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
import '../styles/adminpanel.css';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const dashboardStats = {
        totalUsers: 1234,
        totalProducts: 567,
        totalOrders: 89,
        revenue: 12345.67
    };

    const recentOrders = [
        { id: 1, customer: 'John Doe', product: 'Tour1', amount: 59.99, status: 'Completed' },
        { id: 2, customer: 'Jane Smith', product: 'Tour2', amount: 129.99, status: 'Pending' },
        { id: 3, customer: 'Bob Johnson', product: 'Tour3', amount: 89.99, status: 'Processing' }
    ];

    const handleMenuClick = (tab) => {
        setActiveTab(tab);
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
                        <span>Admin User</span>
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
                                <h2>Recent Orders</h2>
                                <div className="orders-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th>Product</th>
                                                <th>Amount</th>
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
