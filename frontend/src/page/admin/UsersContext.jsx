import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        // Load users from localStorage when initializing
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    const addUser = (user) => {
        setUsers(prevUsers => {
            const updatedUsers = [...prevUsers, user];
            localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save to localStorage
            return updatedUsers;
        });
    };

    const editUser = (updatedUser) => {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.map(user =>
                user.id === updatedUser.id ? updatedUser : user
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers)); 
            return updatedUsers;
        });
    };

    const deleteUser = (userId) => {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.filter(user => user.id !== userId);
            localStorage.setItem('users', JSON.stringify(updatedUsers)); 
            return updatedUsers;
        });
    };

    const clearUsers = () => {
        setUsers([]);
        localStorage.removeItem('users');
    };

    return (
        <UserContext.Provider value={{ users, addUser, editUser, deleteUser, clearUsers }}>
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