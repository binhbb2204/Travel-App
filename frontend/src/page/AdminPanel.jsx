import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiBox, FiShoppingBag, FiDollarSign, FiSettings, FiLogOut } from 'react-icons/fi';
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

    return (
        <div className={`admin-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
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
                    <button
                        className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <FiBox /> {!isSidebarCollapsed && 'Dashboard'}
                    </button>
                    <button
                        className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <FiUsers /> {!isSidebarCollapsed && 'Users'}
                    </button>
                    <button
                        className={`menu-item ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        <FiShoppingBag /> {!isSidebarCollapsed && 'Products'}
                    </button>
                    <button
                        className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <FiSettings /> {!isSidebarCollapsed && 'Settings'}
                    </button>
                </div>

                <button className="logout-btn">
                    <FiLogOut /> {!isSidebarCollapsed && 'Logout'}
                </button>
            </nav>

            <main className="admin-main">
                <header className="admin-header">
                    <h1>Dashboard</h1>
                    <div className="admin-profile">
                        <span>Admin User</span>
                        <img src="https://via.placeholder.com/40" alt="Admin" />
                    </div>
                </header>

                <div className="admin-content">
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
                                <h3>Products</h3>
                                <p>{dashboardStats.totalProducts}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="stat-card"
                            whileHover={{ scale: 1.02 }}
                        >
                            <FiShoppingBag className="stat-icon" />
                            <div className="stat-details">
                                <h3>Orders</h3>
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
            </main>
        </div>
    );
};

export default AdminPanel;