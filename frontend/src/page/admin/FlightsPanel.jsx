// components/panels/FlightsPanel.jsx
import React from 'react';

const FlightsPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b bg-gradient-to-r from-white to-gray-50">
        <h2 className="text-lg font-semibold">Flights Management</h2>
      </div>
      <div className="p-4">
        {/* Add your flights management interface here */}
        <div className="h-96 flex items-center justify-center">
          <p className="text-gray-500">Flights management interface</p>
        </div>
      </div>
    </div>
  );
};

export default FlightsPanel;