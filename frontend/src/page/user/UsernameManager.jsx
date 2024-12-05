import React, { useState } from 'react';
import Header from "../../Header/Header";
import UserSettingsPanel from './UserSettingsPanel';

const UsernameManager = () => {
    const [username, setUsername] = useState(localStorage.getItem('username') || ''); // Get username from localStorage

    return (
        <div>
            <Header username={username} /> {/* Pass username as a prop to Header */}
            <UserSettingsPanel username={username} setUsername={setUsername} /> {/* Pass setUsername as a prop */}
        </div>
    );
};

export default UsernameManager;
