import React from 'react';

const Alert = ({ children, className = '' }) => {
  return (
    <div 
      className={`p-4 rounded-lg border ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
};

export default Alert;