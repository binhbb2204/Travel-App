import React from 'react';

const Notifications = ({ notifications, setNotifications }) => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-700">Enable Tour Notifications</span>
                <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-14 h-7 rounded-full relative transition-colors 
                      ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                    <span
                        className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform 
                          ${notifications ? 'translate-x-7' : 'translate-x-0.5'}`}
                    />
                </button>
            </div>
        </div>
    );
};

export default Notifications;