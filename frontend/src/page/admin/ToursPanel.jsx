// components/panels/ToursPanel.jsx
import React from 'react';

const ToursPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b bg-gradient-to-r from-white to-gray-50">
        <h2 className="text-lg font-semibold">Tours Management</h2>
      </div>
      <div className="p-4">
        {/* Add your tours management interface here */}
        <div className="h-96 flex items-center justify-center">
          <p className="text-gray-500">Heil Hitler</p>
        </div>
      </div>
    </div>
  );
};

export default ToursPanel;