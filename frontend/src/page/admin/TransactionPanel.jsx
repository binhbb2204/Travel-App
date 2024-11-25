// page/admin/TransactionPanel.jsx
import React from 'react';

const TransactionPanel = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b bg-gradient-to-r from-white to-gray-50">
                <h2 className="text-lg font-semibold">Transactions from Users</h2>
            </div>
            <div className="p-4">
                {/* Add your users management interface here */}
                <div className="h-96 flex items-center justify-center">
                    <p className="text-gray-500">For testing</p>
                </div>
            </div>
        </div>
    );
};

export default TransactionPanel;