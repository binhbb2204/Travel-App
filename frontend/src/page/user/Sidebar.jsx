import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CreditCard, Bell, LogOut } from 'lucide-react';

const Sidebar = ({ activePanel, setActivePanel }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleNavigation = (panel) => {
        if (panel === 'home') {
            navigate('/'); // Redirect to home route
        } else {
            setActivePanel(panel); // Set active panel for other cases
        }
    };

    return (
        <div className="w-64 bg-gray-100 border-r flex flex-col">
            <div className="p-6 border-b flex-grow">
                <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
                <nav className="py-4">
                    <ul>
                        {[
                            { icon: <User />, label: 'Personal Information', panel: 'profile' },
                            { icon: <CreditCard />, label: 'Transaction History', panel: 'transactions' },
                            { icon: <Bell />, label: 'Notifications', panel: 'notifications' },
                        ].map((item) => (
                            <li
                                key={item.label}
                                className={`px-6 py-3 cursor-pointer flex items-center transition-colors 
                                    ${activePanel === item.panel ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-500' : 'text-gray-600 hover:bg-gray-200'}`}
                                onClick={() => handleNavigation(item.panel)}
                            >
                                {item.icon}
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="p-6">
                <button
                    onClick={() => handleNavigation('home')}
                    className="flex items-center text-red-600 font-bold"
                >
                    <LogOut className="mr-2" /> 
                    <span>Home Screen</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;