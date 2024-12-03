import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/usersettings.css';

const UserSettings = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
    });
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         console.log('Retrieved Token:', token);

    //         if (!token) {
    //             setError('No token found. Redirecting to login...');
    //             navigate('/login');
    //             return;
    //         }

    //         try {
    //             console.log('Token before API call:', token);
    //             const response = await axios.get('http://localhost:8000/api/v1/users/',
    //                 {
    //                     headers: { Authorization: `Bearer ${token}` },
    //                 });
    //             setUserInfo({
    //                 name: response.data.data.name,
    //                 email: response.data.data.email,
    //                 phone: response.data.data.phone,
    //                 gender: response.data.data.gender || '',
    //             });
    //         } catch (err) {
    //             console.error('Error fetching user information:', err.response ? err.response.data : err);
    //             if (err.response && err.response.status === 401) {
    //                 localStorage.removeItem('token');
    //                 navigate('/login');
    //             } else {
    //                 setError('Failed to fetch user information.');
    //             }
    //         }
    //     };

    //     fetchUserInfo();
    // }, [token, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // try {
        //     const response = await axios.put('http://localhost:8000/api/v1/users/', userInfo, {
        //         headers: { Authorization: `Bearer ${token}` },
        //     });
        //     setSuccess(response.data.message);
        // } catch (err) {
        //     console.error('Error updating user information:', err);
        //     setError('Failed to update user information.');
        // }
    };

    return (
        <div className="user-settings-container" style={{ paddingTop: '100px', paddingBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <div className="panel" style={{ flex: 1, maxWidth: '400px', margin: '0 10px' }}>
                <h2 className="users__title">User Settings</h2>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={userInfo.name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            value={userInfo.phone}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            value={userInfo.gender}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="" enabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={userInfo.password}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <small className="text-muted">Leave blank to keep your current password.</small>
                    </div>

                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>

            <div className="panel" style={{ flex: 1, maxWidth: '400px', paddingTop: '22px', paddingBottom: '20px', margin: '0 10px' }}>
                <h2 className="users__title">Transaction History</h2>
                {transactions.length === 0 ? (
                    <p>No transactions found.</p>
                ) : (
                    <ul className="transaction-list">
                        {transactions.map((transaction) => (
                            <li key={transaction.id} className="transaction-item">
                                <p>Tour: {transaction.tourName}</p>
                                <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
                                <p>Price: ${transaction.price}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserSettings;