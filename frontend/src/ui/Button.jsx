// src/components/ui/button.js
import React from 'react';

export const Button = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};
