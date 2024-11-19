// src/components/ui/button.js
import React from 'react';

export const Button = ({ 
  children, 
  className = '', 
  type = 'button', 
  size = 'default', 
  variant = 'primary', 
  ...props 
}) => {
  const sizeClasses = {
    default: 'px-4 py-2',
    lg: 'px-6 py-3',
    icon: 'p-2'
  };
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700'
  };

  return (
    <button
      type={type}
      className={`rounded-lg font-medium transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
