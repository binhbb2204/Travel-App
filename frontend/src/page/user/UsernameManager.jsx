// user/UsernameManager.jsx
import React, { useState, useEffect } from 'react';
import Header from "../../Header/Header";
import UserOverview from "./tabs/UserOverview";

const UsernameManager = () => {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    useEffect(() => {
        localStorage.setItem('username', username);
    }, [username]);

    return (
        <div>
            <Header username={username} />
            <UserOverview username={username} setUsername={setUsername} />
        </div>
    );
};

export default UsernameManager;