// Handles the user info saving logic
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const addUser = (user) => {
        setUsers(prevUsers => [...prevUsers, user]);
    };

    const editUser = (updatedUser) => {
        setUsers(prevUsers => 
            prevUsers.map(user => 
                user.id === updatedUser.id ? updatedUser : user
            )
        );
    };

    const deleteUser = (userId) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    };

    return (
        <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
};