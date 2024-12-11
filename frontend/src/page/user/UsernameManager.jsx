// user/UsernameManager.jsx
import React, { useState, useEffect } from 'react';
import Header from "../../Header/Header";
import UserProfile from './tabs/UserProfile';

const UsernameManager = () => {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    useEffect(() => {
        localStorage.setItem('username', username);
    }, [username]);

    return (
        <div>
            <Header username={username} />
            <UserProfile username={username} setUsername={setUsername} />
        </div>
    );
};

export default UsernameManager;